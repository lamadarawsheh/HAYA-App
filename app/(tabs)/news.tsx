import { Ionicons } from "@expo/vector-icons";
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const NEWS_FEED = [
  {
    id: "1",
    type: "article",
    title: "New Study Shows Benefits of Regular Exercise",
    summary: "A recent study published in the Journal of Health Sciences highlights the long-term benefits of maintaining a regular exercise routine.",
    image: "https://via.placeholder.com/600x300",
    date: "Today",
    category: "Health Tips",
    categoryColor: "#4CAF50",
    author: "Dr. Sarah Al-Masri",
    readTime: "5 min",
  },
  {
    id: "2",
    type: "event",
    title: "Annual Health Expo 2025",
    summary: "Join us for the largest health and wellness event in the region. Featuring expert speakers, workshops, and health screenings.",
    image: "https://via.placeholder.com/600x300",
    date: "Oct 15-17, 2025",
    category: "Events",
    categoryColor: "#FF9800",
    location: "Amman Convention Center",
  },
  {
    id: "3",
    type: "update",
    title: "New Health Program Launch",
    summary: "We're excited to announce the launch of our new community health program aimed at improving access to healthcare services.",
    image: "https://via.placeholder.com/600x300",
    date: "Yesterday",
    category: "Updates",
    categoryColor: "#2196F3",
    stats: {
      views: 125,
      shares: 32,
    },
  },
  {
    id: "4",
    type: "article",
    title: "Mental Health Awareness Month",
    summary: "October is Mental Health Awareness Month. Learn about the importance of mental health and how to support yourself and others.",
    image: "https://via.placeholder.com/600x300",
    date: "Oct 1, 2025",
    category: "Awareness",
    categoryColor: "#9C27B0",
    author: "Mohammed Al-Khaldi",
    readTime: "3 min",
  },
];

function NewsCard({ item }: { item: typeof NEWS_FEED[0] }) {
  return (
    <TouchableOpacity style={styles.card}>
      <Image
        source={{ uri: item.image }}
        style={styles.cardImage}
        resizeMode="cover"
      />
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <View style={styles.categoryTag}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
          <Text style={styles.cardDate}>{item.date}</Text>
        </View>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardSummary}>{item.summary}</Text>
        
        {item.type === "article" && (
          <View style={styles.articleFooter}>
            <View style={styles.authorInfo}>
              <Ionicons name="person-circle-outline" size={20} color="#666" />
              <Text style={styles.authorName}>{item.author}</Text>
            </View>
            <Text style={styles.readTime}>{item.readTime}</Text>
          </View>
        )}

        {item.type === "event" && (
          <View style={styles.eventFooter}>
            <View style={styles.locationIcon}>
              <Ionicons name="location-outline" size={16} color="#666" />
            </View>
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
        )}

        {item.type === "update" && item.stats && (
          <View style={styles.updateFooter}>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Ionicons name="eye-outline" size={16} color="#666" />
                <Text style={styles.statNumber}>{item.stats.views}</Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="share-outline" size={16} color="#666" />
                <Text style={styles.statNumber}>{item.stats.shares}</Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.header}>Latest Updates</Text>
        </View>
        <Text style={styles.subheader}>Stay informed about health and wellness</Text>
      </View>
      <FlatList
        data={NEWS_FEED}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NewsCard item={item} />}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    
  },
  headerContainer: {
    padding: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
  },
  seeAllText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '500',
    marginRight: 4,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1D3D47",
  },
  subheader: {
    fontSize: 16,
    color: "#666",
    marginTop: 8,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  cardImage: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  categoryTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#f0f0f0",
    borderRadius: 16,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "600",
  },
  cardDate: {
    fontSize: 12,
    color: "#888",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1D3D47",
    marginBottom: 8,
  },
  cardSummary: {
    fontSize: 14,
    color: "#555",
    lineHeight: 22,
    marginBottom: 12,
  },
  articleFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  authorInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  authorName: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
  },
  readTime: {
    fontSize: 14,
    color: "#666",
  },
  eventFooter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  locationIcon: {
    marginRight: 8,
  },
  locationText: {
    fontSize: 14,
    color: "#666",
  },
  updateFooter: {
    marginTop: 8,
  },
  statsContainer: {
    flexDirection: "row",
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 24,
  },
  statNumber: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
});
