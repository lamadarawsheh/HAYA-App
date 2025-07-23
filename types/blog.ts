export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
  categoryColor: string;
  readers: number;
  tags?: string[];
}

export const BLOG_DATA: BlogPost[] = [
  {
    id: '1',
    title: 'The Importance of Regular Exercise',
    summary: 'Learn how regular exercise can improve your overall health and wellbeing.',
    content: 'Regular exercise is one of the most important things you can do for your health. It has many benefits, including improving your overall health and fitness, and reducing your risk for many chronic diseases. Exercise can help you maintain a healthy weight, reduce your risk of heart disease, and strengthen your bones and muscles. It can also improve your mental health and mood, and help you sleep better.',
    image: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    date: 'Oct 15, 2025',
    author: 'Dr. Sarah Al-Masri',
    readTime: '5 min',
    category: 'Health & Wellness',
    categoryColor: '#4CAF50',
    readers: 1245,
    tags: ['exercise', 'fitness', 'health']
  },
  {
    id: '2',
    title: 'Nutrition Tips for a Healthy Lifestyle',
    summary: 'Discover the key nutritional guidelines for maintaining optimal health.',
    content: 'Good nutrition is an important part of leading a healthy lifestyle. Combined with physical activity, your diet can help you to reach and maintain a healthy weight, reduce your risk of chronic diseases, and promote your overall health. Eating a variety of fruits and vegetables, whole grains, lean proteins, and healthy fats can provide your body with the nutrients it needs to function properly.',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    date: 'Oct 10, 2025',
    author: 'Dr. Omar Khalid',
    readTime: '4 min',
    category: 'Nutrition',
    categoryColor: '#2196F3',
    readers: 987,
    tags: ['nutrition', 'diet', 'healthy eating']
  },
  {
    id: '3',
    title: 'Understanding Mental Health',
    summary: 'A comprehensive guide to understanding and managing mental health.',
    content: 'Mental health includes our emotional, psychological, and social well-being. It affects how we think, feel, and act. It also helps determine how we handle stress, relate to others, and make choices. Mental health is important at every stage of life, from childhood and adolescence through adulthood. Throughout your life, if you experience mental health problems, your thinking, mood, and behavior could be affected.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    date: 'Oct 5, 2025',
    author: 'Dr. Leila Hassan',
    readTime: '6 min',
    category: 'Mental Health',
    categoryColor: '#9C27B0',
    readers: 1532,
    tags: ['mental health', 'wellbeing', 'self-care']
  }
];
