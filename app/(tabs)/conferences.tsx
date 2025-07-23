import { useState } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

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
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    companions: 0,
  });

  const handleSubscribe = () => {
    // TODO: Implement subscription logic
    console.log("Subscribing with data:", formData);
    setShowForm(false);
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
                onPress={() => setShowForm(true)}
              >
                <Text style={styles.subscribeButtonText}>Subscribe</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
        {showForm && (
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Conference Subscription</Text>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={formData.phone}
              onChangeText={(text) => setFormData({ ...formData, phone: text })}
            />
            <View style={styles.companionsContainer}>
              <Text style={styles.label}>Number of Companions:</Text>
              <TextInput
                style={styles.companionsInput}
                keyboardType="numeric"
                value={formData.companions.toString()}
                onChangeText={(text) => setFormData({ ...formData, companions: parseInt(text) || 0 })}
              />
            </View>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubscribe}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}
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
