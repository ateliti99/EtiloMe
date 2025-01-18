import React, { ReactNode } from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

interface SectionRowProps {
  iconName: keyof typeof Ionicons.glyphMap;
  title: string;
  children?: ReactNode; // to display optional content on the right side
}

/**
 * A reusable layout component for a single row:
 *  - Left icon (with a themed background)
 *  - Title text
 *  - Optional right content (passed as children)
 */
const SectionRow: React.FC<SectionRowProps> = ({
  iconName,
  title,
  children,
}) => {
  // Get the theme and dynamic colors
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];

  return (
    <View style={styles.section}>
      {/* Icon container */}
      <View style={[styles.iconContainer, { backgroundColor: theme.tertiarySystemBackground } ]}>
        <Ionicons name={iconName} size={20} color="#fff" />
      </View>

      {/* Middle text + optional right content */}
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
    marginVertical: 5,
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
  },
});
