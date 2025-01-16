import { Text, View } from "react-native";
import React from "react";
import { useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";

export default function Index() {
  const colorScheme = useColorScheme() || "light";
  const theme = Colors[colorScheme];

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.systemBackground,
      }}
    >
      <Text style={{color: theme.label}}>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
