// components/Index.tsx
import React, { useEffect, useState, useCallback } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { useTranslation } from "react-i18next";
import {
  RewardedInterstitialAd,
  RewardedAdEventType,
  TestIds,
  AdEventType,
} from "react-native-google-mobile-ads";
import * as Device from 'expo-device';

import "../lang/i18n";
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
  const r = selectedGender === "male" ? 0.68 : 0.55;
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
      const ethanolGrams = volumeMl * (alcoholPct / 100) * 0.789;
      const initialBAC = (ethanolGrams / (weightInGrams * r)) * 100;
      const hoursSinceDrink = timeMinutes / 60;
      const drinkBAC = Math.max(0, initialBAC - metabolismRate * hoursSinceDrink);
      acc.totalBACgPerdL += drinkBAC;
      return acc;
    },
    { totalBACgPerdL: 0, totalDrinkMl: 0 }
  );

  const adjustedBAC = emptyStomach ? totalBACgPerdL * 1.1 : totalBACgPerdL;
  const finalBACgPerL = Math.max(0, adjustedBAC * 10);
  return { bac: finalBACgPerL, totalDrinkMl };
}

export default function Index() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme() || "light";
  const theme = Colors[colorScheme];

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

  const iosAdmobInterstitial = "ca-app-pub-3383825260934343/2119017019";
  const androidAdmobInterstitial= "ca-app-pub-3383825260934343/4117736220";
  const productionID = Device.osName === 'Android' ? androidAdmobInterstitial : iosAdmobInterstitial;

  // --- Rewarded Interstitial Ad State & Loader --
  const adUnitId =
    __DEV__
      ? TestIds.REWARDED_INTERSTITIAL
      : productionID;
  const [rewardedInterstitial, setRewardedInterstitial] =
    useState<RewardedInterstitialAd | null>(null);
  const [adLoaded, setAdLoaded] = useState(false);

  // Helper: Creates a new rewarded interstitial ad, sets up listeners, and loads it.
  const loadRewardedInterstitialAd = useCallback(() => {
    // Create a new instance.
    const ad = RewardedInterstitialAd.createForAdRequest(adUnitId, {
      keywords: ["wine", "beer"],
    });

    // Listen for the ad loaded event.
    const unsubscribeLoaded = ad.addAdEventListener(RewardedAdEventType.LOADED, () => {
      setAdLoaded(true);
    });

    // Listen for the reward earned event.
    const unsubscribeEarned = ad.addAdEventListener(RewardedAdEventType.EARNED_REWARD, (reward) => {
      console.log("User earned reward");
      // Show the result modal once the reward is earned.
      setCalcModalVisible(true);
    });

    // Listen for ad closed event: after ad is closed, reset state and load a new ad.
    const unsubscribeClosed = ad.addAdEventListener(AdEventType.CLOSED, () => {
      setAdLoaded(false);
      // Clean up listeners before creating a new ad.
      unsubscribeLoaded();
      unsubscribeEarned();
      unsubscribeClosed();
      // Load a new ad instance for the next time.
      loadRewardedInterstitialAd();
    });

    ad.load();
    setRewardedInterstitial(ad);
  }, [adUnitId, setCalcModalVisible]);

  // Initialize the rewarded interstitial ad on mount.
  useEffect(() => {
    loadRewardedInterstitialAd();
  }, [loadRewardedInterstitialAd]);

  /**
   * Opens the Liters Modal for manual editing.
   */
  const handleOnEditLiters = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setLitersModalVisible(true);
  };

  /**
   * Handler for the "Calculate" button.
   * Validates input, calculates BAC, updates the store, and shows the rewarded interstitial ad.
   * The results modal is shown only after the ad reward is earned.
   */
  const handleCalculate = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    if (!age || !weight || !selectedGender || !drinks || drinks.length === 0) {
      alert(t("index:fillRequiredInfo"));
      return;
    }

    const weightKg = parseFloat(weight);
    if (isNaN(weightKg) || weightKg <= 0) {
      alert(t("index:validWeight"));
      return;
    }

    const ageVal = parseInt(age, 10);
    if (isNaN(ageVal) || ageVal < 18) {
      alert(t("index:validAge"));
      return;
    }

    if (selectedGender !== "male" && selectedGender !== "female") {
      alert(t("index:validGender"));
      return;
    }

    // Calculate BAC and update store.
    const { bac, totalDrinkMl } = calculateBAC(
      drinks,
      weightKg,
      selectedGender as "male" | "female",
      !!emptyStomach
    );
    const formattedBAC = `${bac.toFixed(3)} g/L`;

    setCalcResult(formattedBAC);
    incrementLiters(parseFloat((totalDrinkMl / 1000).toFixed(2)));

    // Show the ad (if loaded) before showing results.
    if (adLoaded && rewardedInterstitial) {
      rewardedInterstitial.show();
    } else {
      console.log("Ad not loaded; showing results immediately.");
      setCalcModalVisible(true);
    }
  };

  return (
    <SafeAreaView style={[styles.main, { backgroundColor: theme.systemBackground }]}>
      <SectionTitle title={t("index:summary")} />
      <Summary liters={liters} onEditLiters={handleOnEditLiters} />

      {/* Spacer */}
      <View style={styles.spacer} />

      <SectionTitle title={t("index:alcoholTest")} />
      <TestInformation />

      {/* Small Spacer */}
      <View style={styles.smallSpacer} />

      <Pressable
        style={[styles.calculateButton, { backgroundColor: theme.systemBlue }]}
        onPress={handleCalculate}
      >
        <Text style={styles.calculateButtonText}>{t("index:calculate")}</Text>
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
