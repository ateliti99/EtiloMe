import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";
import { Ionicons } from '@expo/vector-icons';

interface ProfileHeaderProps {
    liters: number;
}

export default function ProfileHeader({ liters }: ProfileHeaderProps) {
    const colorScheme = useColorScheme() || "light";
    const theme = Colors[colorScheme];

    return (
        <View style={[styles.container, { backgroundColor: theme.systemGray6 }]}>
            <Ionicons 
                name="wine" 
                size={40} 
                color={theme.label} 
                style={styles.icon}
            />
            <Text style={[styles.text, { color: theme.label }]}>
                {liters}<Text style={[styles.smallText, { color: theme.label }]}> L</Text>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center', // Center horizontally
        alignItems: 'center', // Center vertically
        width: '90%',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
    },
    icon: {
        marginRight: 5,
    },
    text: {
        fontSize: 40,
        textAlign: 'center', // Center the text
    },
    smallText: {
        fontSize: 20,
    },
});
