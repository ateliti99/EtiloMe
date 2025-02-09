import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";
import mobileAds from "react-native-google-mobile-ads";
import {
  getTrackingPermissionsAsync,
  PermissionStatus,
  requestTrackingPermissionsAsync,
} from "expo-tracking-transparency";

export default function RootLayout() {
  const colorScheme = useColorScheme() || "light";
  const theme = Colors[colorScheme];

  useEffect(() => {
    async function initializeServices() {
      // Get tracking permissions
      const { status } = await getTrackingPermissionsAsync();
      if (status === PermissionStatus.UNDETERMINED) {
        await requestTrackingPermissionsAsync();
      }

      // Initialize mobile ads
      const adapterStatuses = await mobileAds().initialize();
      // Optionally, handle adapterStatuses if needed
    }

    initializeServices();
  }, []);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerTitle: "EtiloMe",
        headerStyle: {
          backgroundColor: theme.systemBackground,
        },
        headerTintColor: theme.label,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    />
  );
}
