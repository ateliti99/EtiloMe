import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";

export default function RootLayout() {
  const colorScheme = useColorScheme() || "light";
  const theme = Colors[colorScheme];

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
