import { useState } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from 'expo-status-bar';

export default function ConferenceSubscribe() {
  const router = useRouter();
  const { conferenceId } = useLocalSearchParams();
  
  // In a real app, you would fetch the conference details using the conferenceId
  const conference = {
    id: conferenceId,
    title: "Annual Health Awareness Conference",
    date: "October 15-17, 2025",
    location: "Amman, Jordan",
    image: "https://via.placeholder.com/1200x600",
    description: "Join leading health professionals for discussions on the latest advancements in healthcare and community health initiatives."
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    companions: 0,
  });

  const handleSubmit = () => {
    // Handle form submission
    console.log("Subscribing to conference:", {
      ...formData,
      conferenceId: conference.id,
    });
    // Here you would typically send the data to your backend
    router.back(); // Go back to the conferences list
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.coverImageContainer}>
          <Image 
            source={{ uri: conference.image }} 
            style={styles.coverImage} 
            resizeMode="cover"
          />
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleBack}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.contentContainer}>
          <Text style={styles.conferenceTitle}>{conference.title}</Text>
          <View style={styles.metaContainer}>
            <Text style={styles.conferenceDate}>{conference.date}</Text>
            <Text style={styles.conferenceLocation}>• {conference.location}</Text>
          </View>
          <Text style={styles.conferenceDescription}>{conference.description}</Text>

          <View style={styles.formContainer}>
            <Text style={styles.sectionTitle}>Registration Details</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
                value={formData.phone}
                onChangeText={(text) => setFormData({ ...formData, phone: text })}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Number of Companions</Text>
              <TextInput
                style={styles.input}
                placeholder="0"
                keyboardType="numeric"
                value={formData.companions.toString()}
                onChangeText={(text) => 
                  setFormData({ ...formData, companions: parseInt(text) || 0 })
                }
              />
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Complete Registration</Text>
            </TouchableOpacity>

            <Text style={styles.disclaimer}>
              By registering, you agree to our Terms of Service and Privacy Policy.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  coverImageContainer: {
    position: 'relative',
    width: '100%',
    height: 220,
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    padding: 20,
  },
  conferenceTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1D3D47',
    marginBottom: 8,
  },
  metaContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  conferenceDate: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '500',
    marginRight: 8,
  },
  conferenceLocation: {
    fontSize: 16,
    color: '#666',
  },
  conferenceDescription: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
    marginBottom: 24,
  },
  formContainer: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1D3D47',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  disclaimer: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 16,
  },
});
