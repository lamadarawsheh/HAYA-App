import { type BlogPost } from '@/types/blog';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Image, RefreshControl, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { fetchBlogs } from '@/services/api';

export default function BlogList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Load all blogs once when the component mounts
  const loadBlogs = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      // Fetch all blogs without any search filter
      const data = await fetchBlogs();
      setBlogs(data);
    } catch (err) {
      console.error('Failed to load blogs:', err);
      setError('Failed to load blogs. Please try again.');
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadBlogs();
  }, []);

  // Handle pull-to-refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadBlogs();
  }, [loadBlogs]);

  // Filter blogs based on search query
  const filteredBlogs = useMemo(() => {
    if (!searchQuery.trim()) return blogs;
    
    const query = searchQuery.trim().toLowerCase();
    return blogs.filter(blog => 
      blog.title.toLowerCase().includes(query) || 
      (blog.summary && blog.summary.toLowerCase().includes(query)) ||
      (blog.content && blog.content.toLowerCase().includes(query))
    );
  }, [blogs, searchQuery]);

  // Track image errors by post ID
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = useCallback((postId: string) => (e: any) => {
    setImageErrors(prev => ({ ...prev, [postId]: true }));
  }, []);

  const handleImageLoadStart = useCallback((postId: string) => {
    setImageErrors(prev => ({ ...prev, [postId]: false }));
  }, []);

  const handleImageLoadEnd = useCallback(() => {
    // Image loaded successfully
  }, []);

  const renderBlogItem = useCallback(({ item }: { item: BlogPost }) => {
    const hasError = imageErrors[item.id] || false;
    
    return (
      <Link href={`/${item.id}`} asChild>
        <TouchableOpacity style={styles.blogCard}>
          <View style={styles.imageContainer}>
            {!hasError ? (
              <Image 
                source={{ uri: item.image }} 
                style={styles.blogImage} 
                resizeMode="cover"
                onError={handleImageError(item.id)}
                onLoadStart={() => handleImageLoadStart(item.id)}
                onLoadEnd={handleImageLoadEnd}
              />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Ionicons name="image-outline" size={48} color="#ccc" />
                <Text style={styles.placeholderText}>Image not available</Text>
              </View>
            )}
          </View>
          <View style={styles.blogContent}>
            <View style={[styles.categoryTag, { backgroundColor: `${item.categoryColor}20` }]}>
              <Text style={[styles.categoryText, { color: item.categoryColor }]}>{item.category}</Text>
            </View>
            <Text style={styles.blogTitle} numberOfLines={2}>{item.title}</Text>
            <Text style={styles.blogSummary} numberOfLines={2}>{item.summary}</Text>
            <View style={styles.blogFooter}>
              <View style={styles.metaInfo}>
                <Ionicons name="time-outline" size={14} color="#666" />
                <Text style={styles.metaText}>{item.readTime}</Text>
                <Ionicons name="person-outline" size={14} color="#666" style={styles.metaIcon} />
                <Text style={styles.metaText} numberOfLines={1} ellipsizeMode="tail">{item.author}</Text>
              </View>
              <View style={styles.readersContainer}>
                <Ionicons name="eye-outline" size={16} color="#666" />
                <Text style={styles.readersText}>
                  {typeof item.readers === 'number' ? item.readers.toLocaleString() : '0'}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Link>
    );
  }, []);

  // Loading state
  if (isLoading && !refreshing && blogs.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading articles...</Text>
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={48} color="#FF3B30" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={loadBlogs}
        >
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Health Blog</Text>
        <Text style={styles.headerSubtitle}>Stay updated with the latest health tips</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search articles..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
            <Ionicons name="close-circle" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={filteredBlogs}
        renderItem={renderBlogItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.blogList}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#007AFF']}
            tintColor="#007AFF"
          />
        }
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="newspaper-outline" size={48} color="#ccc" />
            <Text style={styles.emptyStateText}>
              {searchQuery ? 'No matching articles found' : 'No articles available'}
            </Text>
            <Text style={styles.emptyStateSubtext}>
              {searchQuery ? 'Try a different search term' : 'Check back later for new content'}
            </Text>
          </View>
        }
        ListFooterComponent={
          isLoading && blogs.length > 0 ? (
            <View style={styles.footerLoading}>
              <ActivityIndicator color="#007AFF" />
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  errorText: {
    marginTop: 16,
    fontSize: 16,
    color: '#FF3B30',
    textAlign: 'center',
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footerLoading: {
    paddingVertical: 20,
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 15,
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    padding: 0,
  },
  clearButton: {
    padding: 5,
  },
  blogList: {
    padding: 20,
    paddingTop: 10,
    paddingBottom:60,
  },
  blogCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  blogContent: {
    padding: 16,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    backgroundColor: '#f5f5f5',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  blogImage: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    marginTop: 8,
    color: '#999',
    fontSize: 14,
  },
  categoryTag: {
    alignSelf: 'flex-start',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  blogTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 6,
    lineHeight: 24,
  },
  blogSummary: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  blogFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  metaIcon: {
    marginLeft: 12,
  },
  readersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readersText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
});
