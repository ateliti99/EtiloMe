// components/Index.tsx
import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { useTranslation } from 'react-i18next';

import '../lang/i18n';
import { Colors } from "@/constants/Colors";
import { useAppStore } from "@/store/appStore";
import Summary from "@/components/Summary";
import SectionTitle from "@/components/SectionTitle";
import TestInformation from "@/components/TestInformation";
import ResultModal from "@/components/ResultModal";
import LitersModal from "@/components/LitersModal";
import InlineAd from "@/components/InlineAd";

interface Drink {
  quantity: string;
  percentage: string;
  time: string;
}

/**
 * Calculates Blood Alcohol Concentration (BAC) using the Widmark formula.
 * Returns an object containing:
 * - bac: total BAC in g/L.
 * - totalDrinkMl: total volume of drinks in milliliters.
 *
 * @param drinks Array of drinks consumed.
 * @param weightKg Weight of the individual in kilograms.
 * @param selectedGender "male" or "female".
 * @param emptyStomach Boolean indicating if the person drank on an empty stomach.
 */
function calculateBAC(
  drinks: Drink[],
  weightKg: number,
  selectedGender: "male" | "female",
  emptyStomach: boolean
): { bac: number; totalDrinkMl: number } {
  // Alcohol distribution ratio (r)
  const r = selectedGender === "male" ? 0.68 : 0.55;
  // Metabolism rate in g/dL per hour (approximate values)
  const metabolismRate = selectedGender === "male" ? 0.015 : 0.017;
  const weightInGrams = weightKg * 1000;

  const { totalBACgPerdL, totalDrinkMl } = drinks.reduce(
    (acc, drink) => {
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
        return acc;
      }

      acc.totalDrinkMl += volumeMl;
      // Grams of ethanol (density of ethanol ~0.789 g/mL)
      const ethanolGrams = volumeMl * (alcoholPct / 100) * 0.789;
      // Initial BAC in g/dL (Widmark formula)
      const initialBAC = (ethanolGrams / (weightInGrams * r)) * 100;
      const hoursSinceDrink = timeMinutes / 60;
      // Subtract metabolism; clamp to 0 if negative
      const drinkBAC = Math.max(0, initialBAC - metabolismRate * hoursSinceDrink);
      acc.totalBACgPerdL += drinkBAC;
      return acc;
    },
    { totalBACgPerdL: 0, totalDrinkMl: 0 }
  );

  // Increase BAC if consumed on an empty stomach
  const adjustedBAC = emptyStomach ? totalBACgPerdL * 1.1 : totalBACgPerdL;
  // Convert from g/dL to g/L (1 g/dL = 10 g/L) and clamp to a minimum of 0.
  const finalBACgPerL = Math.max(0, adjustedBAC * 10);
  return { bac: finalBACgPerL, totalDrinkMl };
}

export default function Index() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme() || "light";
  const theme = Colors[colorScheme];

  // Zustand store values and actions
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
    setLitersModalVisible,
  } = useAppStore();

  /**
   * Opens the Liters Modal for manual editing.
   */
  const handleOnEditLiters = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setLitersModalVisible(true);
  };

  /**
   * Handler for the "Calculate" button. Validates input, calculates BAC, and then updates the store.
   */
  const handleCalculate = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    if (!age || !weight || !selectedGender || !drinks || drinks.length === 0) {
      alert(t('index:fillRequiredInfo'));
      return;
    }

    const weightKg = parseFloat(weight);
    if (isNaN(weightKg) || weightKg <= 0) {
      alert(t('index:validWeight'));
      return;
    }

    const ageVal = parseInt(age, 10);
    if (isNaN(ageVal) || ageVal < 18) {
      alert(t('index:validAge'));
      return;
    }

    if (selectedGender !== "male" && selectedGender !== "female") {
      alert(t('index:validGender'));
      return;
    }
    const { bac, totalDrinkMl } = calculateBAC(drinks, weightKg, selectedGender as "male" | "female", !!emptyStomach);
    const formattedBAC = `${bac.toFixed(3)} g/L`;

    setCalcResult(formattedBAC);
    setCalcModalVisible(true);
    incrementLiters(parseFloat((totalDrinkMl / 1000).toFixed(2)));
  };

  return (
    <SafeAreaView style={[styles.main, { backgroundColor: theme.systemBackground }]}>
      <SectionTitle title={t('index:summary')} />
      <Summary liters={liters} onEditLiters={handleOnEditLiters} />

      {/* Spacer */}
      <View style={styles.spacer} />

      <SectionTitle title={t('index:alcoholTest')} />
      <TestInformation />

      {/* Small Spacer */}
      <View style={styles.smallSpacer} />

      <Pressable
        style={[styles.calculateButton, { backgroundColor: theme.systemBlue }]}
        onPress={handleCalculate}
      >
        <Text style={styles.calculateButtonText}>{t('index:calculate')}</Text>
      </Pressable>

      {/* Small Spacer */}
      <View style={styles.smallSpacer} />
      
      <InlineAd />

      {/* Modals */}
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
  spacer: {
    height: 10,
  },
  smallSpacer: {
    height: 5,
  },
  calculateButton: {
    width: "90%",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  calculateButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
