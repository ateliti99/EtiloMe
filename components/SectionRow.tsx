// components/SectionRow.tsx
import React, { ReactNode } from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

interface SectionRowProps {
  iconName: keyof typeof Ionicons.glyphMap;
  title: string;
  children?: ReactNode;
}

const SectionRow: React.FC<SectionRowProps> = ({ iconName, title, children }) => {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];

  return (
    <View style={styles.section}>
      <View style={[styles.iconContainer, { backgroundColor: theme.systemGray4 }]}>
        <Ionicons name={iconName} size={20} color="#fff" />
      </View>
      <View style={styles.contentContainer}>
        <Text style={[styles.text, { color: theme.label }]}>{title}</Text>
        {children}
      </View>
    </View>
  );
};

export default SectionRow;

const styles = StyleSheet.create({
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  iconContainer: {
    width: 35,
    height: 35,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 10,
  },
  text: {
    fontSize: 18,
    textAlign: 'left',
  },
});
