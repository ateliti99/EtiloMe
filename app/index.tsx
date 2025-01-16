import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";
import Summary from "@/components/Summary";
import SectionTitle from "@/components/SectionTitle";
import TestInformation from "@/components/TestInformation";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const colorScheme = useColorScheme() || "light";
  const theme = Colors[colorScheme];

  return (
    <SafeAreaView style={[styles.main, {backgroundColor: theme.systemBackground}]}>
      {/* Space */}
      <View style={{ height: 20 }} />

      {/* Summary */}
      <SectionTitle title="Summary"/>
      <Summary liters={50}/>

      {/* Space */}
      <View style={{ height: 20 }} />

      {/* Alcohol Test */}
      <SectionTitle title="Alcohol Test"/>
      <TestInformation />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});