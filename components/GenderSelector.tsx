// components/GenderSelector.tsx
import React from 'react';
import { View, Pressable, StyleSheet, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Colors } from '@/constants/Colors';
import { useAppStore } from '@/store/appStore';
import SectionRow from '@/components/SectionRow';

const GenderSelector: React.FC = () => {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];

  const selectedGender = useAppStore((state) => state.selectedGender);
  const setSelectedGender = useAppStore((state) => state.setSelectedGender);

  const handlePressGender = async (gender: 'male' | 'female') => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSelectedGender(gender);
  };

  return (
    <SectionRow iconName="person-circle" title="Gender">
      <View style={styles.iconsContainer}>
        <Pressable onPress={() => handlePressGender('male')} style={styles.iconWrapper}>
          <Ionicons
            name="male"
            size={25}
            color={selectedGender === 'male' ? theme.systemTeal : theme.label}
          />
        </Pressable>
        <Pressable onPress={() => handlePressGender('female')} style={styles.iconWrapper}>
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
