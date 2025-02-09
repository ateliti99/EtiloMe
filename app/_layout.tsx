import { Stack } from "expo-router";
import { useColorScheme, Platform } from "react-native";
import { Colors } from "../constants/Colors";
import mobileAds from "react-native-google-mobile-ads";
import { useEffect } from "react";
import { requestTrackingPermissionsAsync } from "expo-tracking-transparency";

export default function RootLayout() {
  const colorScheme = useColorScheme() || "light";
  const theme = Colors[colorScheme];

  useEffect(() => {
    (async () => {
      try {
        if (Platform.OS === 'ios') {
          const { status: trackingStatus } = await requestTrackingPermissionsAsync();
          if (trackingStatus !== 'granted') {
            // Optionally handle the case where tracking is not permitted.
          }
        }
        await mobileAds().initialize();
      } catch (error) {
        console.error('Error during ads initialization:', error);
      }
    })();
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
