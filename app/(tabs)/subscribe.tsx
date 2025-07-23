import { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SubscribeScreen() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    medicalHistory: "",
  });

  const handleSubmit = () => {
    // Handle form submission
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your backend
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView  contentContainerStyle={{ paddingBottom: 60 }}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Patient Subscription</Text>
          <Text style={styles.subheader}>Join our healthcare network</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              value={formData.fullName}
              onChangeText={(text) => setFormData({ ...formData, fullName: text })}
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
            <Text style={styles.label}>Date of Birth</Text>
            <TextInput
              style={styles.input}
              placeholder="DD/MM/YYYY"
              value={formData.dateOfBirth}
              onChangeText={(text) => setFormData({ ...formData, dateOfBirth: text })}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Gender</Text>
            <View style={styles.radioGroup}>
              <TouchableOpacity 
                style={[styles.radioButton, formData.gender === 'male' && styles.radioButtonSelected]}
                onPress={() => setFormData({ ...formData, gender: 'male' })}
              >
                <Text style={styles.radioText}>Male</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.radioButton, formData.gender === 'female' && styles.radioButtonSelected]}
                onPress={() => setFormData({ ...formData, gender: 'female' })}
              >
                <Text style={styles.radioText}>Female</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.radioButton, formData.gender === 'other' && styles.radioButtonSelected]}
                onPress={() => setFormData({ ...formData, gender: 'other' })}
              >
                <Text style={styles.radioText}>Other</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Medical History (Optional)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Brief medical history or any existing conditions"
              multiline
              numberOfLines={4}
              value={formData.medicalHistory}
              onChangeText={(text) => setFormData({ ...formData, medicalHistory: text })}
            />
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Subscribe Now</Text>
          </TouchableOpacity>

          <Text style={styles.disclaimer}>
            By subscribing, you agree to our Terms of Service and Privacy Policy.
          </Text>
        </View>
      </ScrollView>
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
  formContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1D3D47",
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  radioGroup: {
    flexDirection: "row",
    marginTop: 8,
  },
  radioButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
    backgroundColor: "#f9f9f9",
  },
  radioButtonSelected: {
    backgroundColor: "#e3f2fd",
    borderColor: "#2196F3",
  },
  radioText: {
    color: "#333",
  },
  submitButton: {
    backgroundColor: "#2196F3",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  disclaimer: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
    lineHeight: 16,
  },
});
