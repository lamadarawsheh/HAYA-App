import { Ionicons } from "@expo/vector-icons";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 60 }}>
      <View style={styles.headerContainer}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
        />
        <Text style={styles.header}>HAYA Health Organization</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Mission</Text>
        <Text style={styles.sectionContent}>
          Empowering communities through health education, support, and advocacy.
          We strive to create a healthier society by providing accessible healthcare
          resources and promoting wellness awareness.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Team</Text>
        <View style={styles.teamContainer}>
          <View style={styles.teamMember}>
            <Text style={styles.teamName}>Dr. Sarah Al-Masri</Text>
            <Text style={styles.teamRole}>Medical Director</Text>
          </View>
          <View style={styles.teamMember}>
            <Text style={styles.teamName}>Mohammed Al-Khaldi</Text>
            <Text style={styles.teamRole}>Community Outreach Coordinator</Text>
          </View>
          <View style={styles.teamMember}>
            <Text style={styles.teamName}>Lina Al-Haddad</Text>
            <Text style={styles.teamRole}>Health Education Specialist</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support Us</Text>
        <Text style={styles.sectionContent}>
          Your donations help us continue our mission of providing health education
          and support to our community.
        </Text>
        <TouchableOpacity style={styles.donateButton}>
          <Text style={styles.donateButtonText}>Donate Now</Text>
          <Ionicons name="arrow-forward" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    
  },
  headerContainer: {
    alignItems: "center",
    paddingVertical: 32,
    backgroundColor: "#1D3D47",
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  section: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1D3D47",
    marginBottom: 16,
  },
  sectionContent: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
  },
  teamContainer: {
    marginTop: 16,
  },
  teamMember: {
    marginBottom: 16,
  },
  teamName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1D3D47",
  },
  teamRole: {
    fontSize: 16,
    color: "#666",
  },
  donateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
  },
  donateButtonText: {
    color: "#fff",
    marginRight: 8,
    fontWeight: "600",
  },
});
