import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";
import mobileAds from "react-native-google-mobile-ads";
import { useEffect } from "react";
import { requestTrackingPermissionsAsync } from "expo-tracking-transparency";

export default function RootLayout() {
  const colorScheme = useColorScheme() || "light";
  const theme = Colors[colorScheme];

  // Initialize Google Mobile Ads SDK
  useEffect(() => {
    (async () => {
      // Google AdMob will show any messages here that you just set up on the AdMob Privacy & Messaging page
      const { status: trackingStatus } = await requestTrackingPermissionsAsync();
      if (trackingStatus !== 'granted') {
        // Do something here such as turn off Sentry tracking, store in context/redux to allow for personalized ads, etc.
      }

      // Initialize the ads
      await mobileAds().initialize();
    })();
  }, [])
  
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
