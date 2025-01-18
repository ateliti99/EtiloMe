import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";

// Your imports
import { Colors } from "@/constants/Colors";
import { useAppStore } from "@/store/appStore";
import Summary from "@/components/Summary";
import SectionTitle from "@/components/SectionTitle";
import TestInformation from "@/components/TestInformation";

export default function Index() {
  const colorScheme = useColorScheme() || "light";
  const theme = Colors[colorScheme];

  // If you need to access store values for the calculation:
  const { age, weight, selectedGender, emptyStomach, drinks } = useAppStore();

  /**
   * Handler for the "Calculate" button
   */
  const handleCalculate = async () => {
    // Haptic feedback
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    // Example usage: log or compute with current store state
    console.log("Calculate with:", {
      age,
      weight,
      selectedGender,
      emptyStomach,
      drinks,
    });

    // TODO: implement your real calculation logic or navigation
  };

  return (
    <SafeAreaView style={[styles.main, { backgroundColor: theme.systemBackground }]}>
      {/* Space */}
      <View style={{ height: 20 }} />

      {/* Summary */}
      <SectionTitle title="Summary" />
      <Summary liters={50} />

      {/* Space */}
      <View style={{ height: 20 }} />

      {/* Alcohol Test */}
      <SectionTitle title="Alcohol Test" />
      <TestInformation />

      {/* Space */}
      <View style={{ height: 20 }} />

      {/* CALCULATE button */}
      <Pressable
        style={[styles.calculateButton, { backgroundColor: theme.systemBlue }]}
        onPress={handleCalculate}
      >
        <Text style={styles.calculateButtonText}>Calculate</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
    calculateButton: {
      width: '90%',  
      paddingVertical: 15,
      borderRadius: 10,
      alignItems: 'center',
  },
  calculateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
