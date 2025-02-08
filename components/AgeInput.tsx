import React from 'react';
import { StyleSheet, TextInput, useColorScheme } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Colors } from '@/constants/Colors';
import { useAppStore } from '@/store/appStore';
import SectionRow from '@/components/SectionRow';
import { useTranslation } from 'react-i18next';

const AgeInput: React.FC = () => {
  const { t } = useTranslation();
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];

  const age = useAppStore((state) => state.age);
  const setAge = useAppStore((state) => state.setAge);

  const handleAgeChange = async (value: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setAge(value);
  };

  return (
    <SectionRow iconName="calendar" title={t('ageInput:title')}>
      <TextInput
        style={[styles.inputSmall, { color: theme.label, borderColor: theme.systemGray2 }]}
        keyboardType="numeric"
        placeholder={t('ageInput:placeholder')}
        placeholderTextColor={theme.systemGray2}
        value={age}
        onChangeText={handleAgeChange}
      />
    </SectionRow>
  );
};

export default AgeInput;

const styles = StyleSheet.create({
  inputSmall: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    fontSize: 16,
    width: 60,
    textAlign: 'center',
  },
});