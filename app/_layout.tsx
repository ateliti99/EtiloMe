import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { useColorScheme, View, Text } from "react-native";
import { Colors } from "../constants/Colors";
import mobileAds from "react-native-google-mobile-ads";
import {
  getTrackingPermissionsAsync,
  PermissionStatus,
  requestTrackingPermissionsAsync,
} from "expo-tracking-transparency";
import * as SplashScreen from "expo-splash-screen";

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme() || "light";
  const theme = Colors[colorScheme];
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function initializeServices() {
      try {
        // Get tracking permissions
        const { status } = await getTrackingPermissionsAsync();
        if (status === PermissionStatus.UNDETERMINED) {
          await requestTrackingPermissionsAsync();
        }

        // Initialize mobile ads
        const adapterStatuses = await mobileAds().initialize();
        // Optionally, handle adapterStatuses if needed

        // Artificially delay for two seconds to simulate a slow loading experience
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
        // Hide the splash screen
        SplashScreen.hideAsync();
      }
    }

    initializeServices();
  }, []);

  if (!isReady) {
    return null; // Optionally, you can return a loading indicator here
  }

  return (
    <Stack>
      {/* Your app content goes here */}
    </Stack>
  );
}
