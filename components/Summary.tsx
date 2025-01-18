import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

interface ProfileHeaderProps {
  liters: number;
  /**
   * Optional callback to handle editing liters.
   * If omitted, pressing the icon won't do anything.
   */
  onEditLiters?: () => void;
}

export default function ProfileHeader({ liters, onEditLiters }: ProfileHeaderProps) {
  const colorScheme = useColorScheme() || "light";
  const theme = Colors[colorScheme];

  const handleEditPress = () => {
    if (onEditLiters) {
      onEditLiters();
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.systemGray6 }]}>
      {/* Left section: icon and liters text */}
      <View style={styles.litersContainer}>
        <Ionicons name="wine" size={40} color={theme.label} style={styles.icon} />
        <Text style={[styles.litersText, { color: theme.label }]}>
          {liters.toFixed(2)}
          <Text style={[styles.smallText, { color: theme.label }]}> L</Text>
        </Text>
      </View>

      {/* Right section: edit icon */}
      <Pressable onPress={handleEditPress} style={styles.editIconContainer}>
        <Ionicons name="create-outline" size={24} color={theme.label} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,

    // Space between left (liters) and right (edit icon)
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  litersContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 5,
  },
  litersText: {
    fontSize: 40,
    textAlign: "center",
  },
  smallText: {
    fontSize: 20,
  },
  editIconContainer: {
    // Optionally add padding or hitSlop if desired
    padding: 5,
  },
});
