// components/WeightInput.tsx
import React from 'react';
import { StyleSheet, TextInput, useColorScheme } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Colors } from '@/constants/Colors';
import { useAppStore } from '@/store/appStore';
import SectionRow from '@/components/SectionRow';
import { useTranslation } from 'react-i18next';

const WeightInput: React.FC = () => {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];
  const { t } = useTranslation();

  const weight = useAppStore((state) => state.weight);
  const setWeight = useAppStore((state) => state.setWeight);

  const handleWeightChange = async (val: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setWeight(val);
  };

  return (
    <SectionRow iconName="fitness" title={t('weightInput:title')}>
      <TextInput
        style={[styles.inputSmall, { color: theme.label, borderColor: theme.systemGray2 }]}
        keyboardType="numeric"
        placeholder="80 kg"
        placeholderTextColor={theme.systemGray2}
        value={weight}
        onChangeText={handleWeightChange}
      />
    </SectionRow>
  );
};

export default WeightInput;

const styles = StyleSheet.create({
  inputSmall: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    fontSize: 16,
    width: 80,
    textAlign: 'center',
  },
});
