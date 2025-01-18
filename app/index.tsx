import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";

// Your imports
import { Colors } from "@/constants/Colors";
import { useAppStore } from "@/store/appStore";
import Summary from "@/components/Summary";         // or ProfileHeader
import SectionTitle from "@/components/SectionTitle";
import TestInformation from "@/components/TestInformation";
import ResultModal from "@/components/ResultModal";
import LitersModal from "@/components/LitersModal";

export default function Index() {
  const colorScheme = useColorScheme() || "light";
  const theme = Colors[colorScheme];

  // Zustand store usage
  const {
    age,
    weight,
    selectedGender,
    emptyStomach,
    drinks,
    liters,

    setCalcModalVisible,
    setCalcResult,
    incrementLiters,

    // Our new store props for the Liters Modal
    setLitersModalVisible,
  } = useAppStore();

  /**
   * Called when user taps pencil icon to edit liters.
   * Instead of directly incrementing, we'll open the LitersModal for manual input.
   */
  const handleOnEditLiters = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // Open the "Edit Liters" modal
    setLitersModalVisible(true);
  };

  /**
   * Handler for the "Calculate" button (BAC using Widmark formula).
   */
  const handleCalculate = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    if (!age || !weight || !selectedGender || !drinks || drinks.length === 0) {
      alert("Please fill in all required information to proceed with the calculation.");
      return;
    }

    const weightKg = parseFloat(weight);
    if (isNaN(weightKg) || weightKg <= 0) {
      alert("Please enter a valid weight in kilograms.");
      return;
    }

    const ageVal = parseInt(age, 10);
    if (isNaN(ageVal) || ageVal < 18) {
      alert("You must be at least 18 years old (or provide a valid age) to use this calculator.");
      return;
    }

    // Widmark formula factors
    const r = selectedGender === "male" ? 0.68 : 0.55;
    let metabolismRate = selectedGender === "male" ? 0.015 : 0.017;
    const emptyStomachMultiplier = emptyStomach ? 1.1 : 1.0;
    const weightInGrams = weightKg * 1000;
    let totalBACgPerdL = 0;
    let totalDrinkMl = 0;

    drinks.forEach((drink) => {
      const volumeMl = parseFloat(drink.quantity);
      const alcoholPct = parseFloat(drink.percentage);
      const timeMinutes = parseFloat(drink.time);

      if (
        isNaN(volumeMl) ||
        isNaN(alcoholPct) ||
        isNaN(timeMinutes) ||
        volumeMl <= 0 ||
        alcoholPct <= 0 ||
        timeMinutes < 0
      ) {
        return;
      }

      // Track total volume (for demonstration)
      totalDrinkMl += volumeMl;

      // 1) Grams of ethanol
      const ethanolGrams = volumeMl * (alcoholPct / 100) * 0.789;
      // 2) initial BAC in g/dL
      const singleDrinkBAC_gPerdL = (ethanolGrams / (weightInGrams * r)) * 100;
      // 3) subtract metabolism
      const hoursSinceDrink = timeMinutes / 60;
      let leftover = singleDrinkBAC_gPerdL - metabolismRate * hoursSinceDrink;
      if (leftover < 0) leftover = 0;

      totalBACgPerdL += leftover;
    });

    // Adjust for empty stomach
    totalBACgPerdL *= emptyStomachMultiplier;
    // Convert g/dL to g/L
    const totalBACgPerL = totalBACgPerdL * 10;
    // Final clamp
    const finalBACgPerL = Math.max(0, totalBACgPerL);
    const formatted = finalBACgPerL.toFixed(3) + " g/L";

    // Set the result in the store & show result modal
    setCalcResult(formatted);
    setCalcModalVisible(true);

    // Also increment total liters based on totalDrinkMl
    incrementLiters(parseFloat((totalDrinkMl / 1000).toFixed(2)));
  };

  return (
    <SafeAreaView style={[styles.main, { backgroundColor: theme.systemBackground }]}>
      {/* Title */}
      <SectionTitle title="Summary" />

      {/* Summary with pencil icon to edit liters */}
      <Summary
        liters={liters}
        onEditLiters={handleOnEditLiters} // <--- Pass the callback
      />

      {/* Space */}
      <View style={{ height: 10 }} />

      <SectionTitle title="Alcohol Test" />
      <TestInformation />

      {/* Space */}
      <View style={{ height: 5 }} />

      {/* CALCULATE button */}
      <Pressable
        style={[styles.calculateButton, { backgroundColor: theme.systemBlue }]}
        onPress={handleCalculate}
      >
        <Text style={styles.calculateButtonText}>Calculate</Text>
      </Pressable>

      {/* Show BAC result in a modal */}
      <ResultModal />
      <LitersModal />
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
    width: "90%",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  calculateButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
