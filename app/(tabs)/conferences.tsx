import { useState } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";

const CONFERENCES = [
  {
    id: "1",
    title: "Annual Health Awareness Conference",
    date: "October 15-17, 2025",
    location: "Amman, Jordan",
    description: "Join leading health professionals for discussions on the latest advancements in healthcare and community health initiatives.",
    isUpcoming: true,
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: "2",
    title: "Mental Health Symposium",
    date: "November 5, 2025",
    location: "Virtual",
    description: "Expert-led sessions on mental health awareness and support strategies.",
    isUpcoming: true,
    image: "https://via.placeholder.com/300x200",
  },
];

export default function ConferencesScreen() {
  const handleSubscribe = (conferenceId: string) => {
    // Navigate to the conference subscription page with the conference ID
    router.push({
      pathname: '/conference-subscribe',
      params: { conferenceId }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Upcoming Conferences</Text>
          <Text style={styles.subheader}>Join our health and wellness events</Text>
        </View>
        {CONFERENCES.map((conference) => (
          <View key={conference.id} style={styles.conferenceCard}>
            <Image
              source={{ uri: conference.image }}
              style={styles.conferenceImage}
              resizeMode="cover"
            />
            <Text style={styles.conferenceTitle}>{conference.title}</Text>
            <Text style={styles.conferenceDate}>{conference.date}</Text>
            <Text style={styles.conferenceLocation}>{conference.location}</Text>
            <Text style={styles.conferenceDescription}>{conference.description}</Text>
            
            {conference.isUpcoming && (
              <TouchableOpacity
                style={styles.subscribeButton}
                onPress={() => handleSubscribe(conference.id)}
              >
                <Text style={styles.subscribeButtonText}>Register Now</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  }, headerContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1D3D47",
  },
  conferenceCard: {
    backgroundColor: "#F5F7FA",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  conferenceImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  conferenceTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1D3D47",
    marginBottom: 8,
  },
  conferenceDate: {
    fontSize: 16,
    color: "#666",
    marginBottom: 4,
  },
  conferenceLocation: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  conferenceDescription: {
    fontSize: 16,
    color: "#555",
    marginBottom: 16,
  },
  subscribeButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  subscribeButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  formContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    marginVertical: 20,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
    color: "#1D3D47",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  companionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  label: {
    marginRight: 12,
    fontSize: 16,
    color: "#555",
  },
  companionsInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    width: 80,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#1D3D47",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
