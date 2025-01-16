import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";

interface SectionTitleProps {
    title: string;
}

export default function SectionTitle({ title }: SectionTitleProps) {
    const colorScheme = useColorScheme() || "light";
    const theme = Colors[colorScheme];

    return (
        <View style={styles.container}>
            <Text style={[styles.text, { color: theme.label }]}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '90%',
    },
    text: {
        fontSize: 30, // Increased font size for title
        fontWeight: 'bold', // Bold text for title
    },
});