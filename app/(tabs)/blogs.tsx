import { BLOG_DATA, type BlogPost } from '@/types/blog';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useMemo, useState } from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function BlogList() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBlogs = useMemo(() => {
    if (!searchQuery) return BLOG_DATA;
    
    const query = searchQuery.toLowerCase();
    return BLOG_DATA.filter(blog => 
      blog.title.toLowerCase().includes(query) || 
      blog.summary.toLowerCase().includes(query) ||
      blog.content.toLowerCase().includes(query) ||
      blog.tags?.some(tag => tag.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  const renderBlogItem = useCallback(({ item }: { item: BlogPost }) => (
    <Link href={`/${item.id}`} asChild>
      <TouchableOpacity style={styles.blogCard}>
        <Image source={{ uri: item.image }} style={styles.blogImage} />
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
              <Text style={styles.metaText}>{item.author}</Text>
            </View>
            <View style={styles.readersContainer}>
              <Ionicons name="eye-outline" size={16} color="#666" />
              <Text style={styles.readersText}>{item.readers.toLocaleString()}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  ), []);

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
        
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="newspaper-outline" size={48} color="#ccc" />
            <Text style={styles.emptyStateText}>No articles found</Text>
            <Text style={styles.emptyStateSubtext}>Try adjusting your search</Text>
          </View>
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
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  blogImage: {
    width: '100%',
    height: 180,
  },
  blogContent: {
    padding: 16,
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
