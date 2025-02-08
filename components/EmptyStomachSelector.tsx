import React from 'react';
import { Text, View, Pressable, StyleSheet, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Colors } from '@/constants/Colors';
import { useAppStore } from '@/store/appStore';
import SectionRow from '@/components/SectionRow';
import { useTranslation } from 'react-i18next';

const EmptyStomachSelector: React.FC = () => {
  const { t } = useTranslation();
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];

  const emptyStomach = useAppStore((state) => state.emptyStomach);
  const setEmptyStomach = useAppStore((state) => state.setEmptyStomach);

  const handlePress = async (isEmpty: boolean) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setEmptyStomach(isEmpty);
  };

  return (
    <SectionRow iconName="nutrition" title={t('emptyStomachSelector:title')}>
      <View style={styles.iconsContainer}>
        <Pressable onPress={() => handlePress(true)} style={styles.iconWrapper}>
          <Ionicons
            name="checkmark-circle"
            size={25}
            color={emptyStomach === true ? theme.systemTeal : theme.label}
          />
        </Pressable>
        <Pressable onPress={() => handlePress(false)} style={styles.iconWrapper}>
          <Ionicons
            name="close-circle"
            size={25}
            color={emptyStomach === false ? theme.systemPink : theme.label}
          />
        </Pressable>
      </View>
    </SectionRow>
  );
};

export default EmptyStomachSelector;

const styles = StyleSheet.create({
  iconsContainer: {
    flexDirection: 'row',
  },
  iconWrapper: {
    marginLeft: 15,
  },
});