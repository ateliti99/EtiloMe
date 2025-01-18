import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  useColorScheme,
} from 'react-native';
import { Colors } from '@/constants/Colors';

// Child components
import GenderSelector from '@/components/GenderSelector';
import AgeInput from '@/components/AgeInput';
import WeightInput from '@/components/WeightInput';
import EmptyStomachSelector from '@/components/EmptyStomachSelector';
import DrinksSection from '@/components/DrinksSection';
import AddDrinkModal from '@/components/AddDrinkModal';

export default function TestInformation() {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];

  return (
    <ScrollView style={[styles.parentContainer, { backgroundColor: theme.systemGray6 }]}>
      <KeyboardAvoidingView
        style={{ width: '100%' }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        {/* Gender */}
        <GenderSelector />
        <View style={[styles.separator, { backgroundColor: theme.systemGray3 }]} />

        {/* Age */}
        <AgeInput />
        <View style={[styles.separator, { backgroundColor: theme.systemGray3 }]} />

        {/* Weight */}
        <WeightInput />
        <View style={[styles.separator, { backgroundColor: theme.systemGray3 }]} />

        {/* Empty Stomach */}
        <EmptyStomachSelector />
        <View style={[styles.separator, { backgroundColor: theme.systemGray3 }]} />

        {/* Drinks Section */}
        <DrinksSection />

        {/**
         * The AddDrinkModal is rendered here
         * but only visible if isModalVisible === true in the store
         */}
        <AddDrinkModal />
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  parentContainer: {
    width: '90%',
    borderRadius: 10,
    marginVertical: 10,
    padding: 15,
    alignSelf: 'center',
  },
  separator: {
    height: 1,
    width: '100%',
    marginVertical: 5,
  },
});
