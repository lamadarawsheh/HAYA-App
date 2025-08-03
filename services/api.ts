import { BlogPost } from '@/types/blog';

const API_BASE_URL = 'http://localhost:3000'; // Local development server

// Helper function to handle API requests
async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Set default headers
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...options.headers,
  });

  // You can add authentication token here if needed
  // const token = await getAuthToken();
  // if (token) {
  //   headers.append('Authorization', `Bearer ${token}`);
  // }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Something went wrong');
  }

  return response.json();
}

// Interface for the API response format
interface ApiResponse<T> {
  data: T;
  message?: string;
}

// Interface for paginated response
interface PaginatedResponse<T> {
  data: T[];
  totalItems: number;
}

// Convert API post to BlogPost format
const mapPostToBlogPost = (post: any): BlogPost => {
  // Safely handle the date
  let formattedDate = '';
  try {
    const dateValue = post.createdAt || post.created_at || post.date;
    if (dateValue) {
      const date = new Date(dateValue);
      if (!isNaN(date.getTime())) {
        formattedDate = date.toISOString().split('T')[0];
      }
    }
  } catch (e) {
    console.warn('Error formatting date:', e);
  }

  // Safely extract user information
  let author = 'Anonymous';
  if (typeof post.user === 'string') {
    author = post.user;
  } else if (post.user?.username) {
    author = post.user.username;
  } else if (post.author) {
    author = post.author;
  }

  // Safely extract category information
  let category = 'Uncategorized';
  let categoryColor = '#666666';
  
  if (typeof post.category === 'string') {
    category = post.category;
  } else if (post.category?.name) {
    category = post.category.name;
    categoryColor = post.category.color || categoryColor;
  }

  // Safely extract content and create summary
  const content = post.content || '';
  const summary = content.substring(0, 150) + (content.length > 150 ? '...' : '');

  // Handle image URL
  let imageUrl = 'https://via.placeholder.com/800x400?text=No+Image';
  if (post.image) {
    // Check if the image is already a full URL
    if (post.image.startsWith('http')) {
      imageUrl = post.image;
    } 
    // Check if it's a relative path
    else if (post.image.startsWith('/')) {
      imageUrl = `${API_BASE_URL}${post.image}`;
    }
    // Handle case where it's just a filename (most common case)
    else {
      // The backend serves images from the /uploads/posts/ directory
      imageUrl = `${API_BASE_URL}/uploads/posts/${post.image}`;
    }
    // console.log('Original image:', post.image, 'Processed URL:', imageUrl);
  } else {
    // console.log('No image found for post:', post.id);
  }

  return {
    id: post.id?.toString() || '',
    title: post.title || 'Untitled',
    summary: summary || 'No summary available',
    content: content,
    image: imageUrl,
    date: formattedDate,
    author: author,
    readTime: `${Math.ceil(content.length / 1000)} min`,
    category: category,
    categoryColor: categoryColor,
    readers: post.views || post.readers || 0,
    tags: Array.isArray(post.tags) ? post.tags : [],
  };
};

export const fetchBlogs = async (): Promise<BlogPost[]> => {
  try {
    const params = new URLSearchParams();
    
    // Add pagination parameters with default values
    const limit = 20; // Adjust based on your needs
    const offset = 0; // Start from the first record
    
    params.append('limit', limit.toString());
    params.append('offset', offset.toString());
    
    const queryString = params.toString();
    const endpoint = `/post?${queryString}`;
    
    // console.log('Fetching blogs from:', endpoint);
    
    // Make the API request
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`API request failed: ${response.status} ${response.statusText} - ${error}`);
    }
    
    // Parse the response as JSON
    let responseData;
    try {
      responseData = await response.json();
      // console.log('API Response:', JSON.stringify(responseData, null, 2));
    } catch (e) {
      // console.error('Failed to parse JSON response:', e);
      return [];
    }
    
    // Extract posts array from response
    let posts: any[] = [];
    if (Array.isArray(responseData)) {
      posts = responseData;
    } else if (responseData && Array.isArray(responseData.data)) {
      posts = responseData.data;
    } else if (responseData && responseData.posts && Array.isArray(responseData.posts)) {
      posts = responseData.posts;
    } else if (responseData && responseData.items && Array.isArray(responseData.items)) {
      posts = responseData.items;
    }
    
    // Ensure we have an array to work with
    if (!Array.isArray(posts)) {
      console.error('Unexpected API response format. Expected an array of posts.');
      return [];
    }
    
    // Map posts to BlogPost format with error handling
    const blogPosts: BlogPost[] = [];
    for (const post of posts) {
      try {
        if (post && typeof post === 'object') {
          const blogPost = mapPostToBlogPost(post);
          // Ensure all required fields are strings or numbers
          if (blogPost && 
              typeof blogPost.id === 'string' &&
              typeof blogPost.title === 'string') {
            blogPosts.push(blogPost);
          } else {
            console.warn('Skipping invalid blog post format:', post);
          }
        }
      } catch (error) {
        console.error('Error mapping blog post:', error, 'Post data:', post);
      }
    }
    
    console.log(`Successfully mapped ${blogPosts.length} blog posts`);
    return blogPosts;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error fetching blogs:', error);
    throw new Error(`Failed to fetch blogs: ${errorMessage}`);
  }
};

export const fetchBlogById = async (id: string): Promise<BlogPost> => {
  try {
    console.log(`Fetching blog with id: ${id}`);
    const response = await apiRequest<any>(`/post/${id}`);
    console.log('Blog details response:', JSON.stringify(response, null, 2));
    
    if (!response || typeof response !== 'object') {
      throw new Error('Invalid blog post data');
    }
    
    return mapPostToBlogPost(response);
  } catch (error) {
    console.error(`Error fetching blog with id ${id}:`, error);
    throw error;
  }
};

// Add this function to fetch categories
export const fetchCategories = async () => {
  try {
    const response = await apiRequest<ApiResponse<any[]>>('/category');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};