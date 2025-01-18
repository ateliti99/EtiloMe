import React from 'react';
import { View, Pressable, StyleSheet, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import SectionRow from './SectionRow';

interface GenderSelectorProps {
  selectedGender: string | null;
  onSelectMale: () => void;
  onSelectFemale: () => void;
}

/**
 * A section row to choose between male or female gender.
 */
const GenderSelector: React.FC<GenderSelectorProps> = ({
  selectedGender,
  onSelectMale,
  onSelectFemale,
}) => {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];

  return (
    <SectionRow iconName="person-circle" title="Gender">
      <View style={styles.iconsContainer}>
        <Pressable onPress={onSelectMale} style={styles.iconWrapper}>
          <Ionicons
            name="male"
            size={25}
            color={selectedGender === 'male' ? theme.systemTeal : theme.label}
          />
        </Pressable>
        <Pressable onPress={onSelectFemale} style={styles.iconWrapper}>
          <Ionicons
            name="female"
            size={25}
            color={selectedGender === 'female' ? theme.systemPink : theme.label}
          />
        </Pressable>
      </View>
    </SectionRow>
  );
};

export default GenderSelector;

const styles = StyleSheet.create({
  iconsContainer: {
    flexDirection: 'row',
  },
  iconWrapper: {
    marginLeft: 15,
  },
});
