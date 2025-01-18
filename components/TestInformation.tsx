import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Pressable,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useColorScheme } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Colors } from '../constants/Colors';

// Child components
import GenderSelector from './GenderSelector';
import AgeInput from './AgeInput';
import WeightInput from './WeightInput';
import EmptyStomachSelector from './EmptyStomachSelector';
import DrinksSection from './DrinksSection';
import AddDrinkModal from './AddDrinkModal';

/**
 * Collect user info: gender, age, weight, empty stomach,
 * manage a list of drinks, and "calculate" results (BAC, etc.).
 */
export default function TestInformation() {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];

  // Gender, age, weight, empty stomach
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [age, setAge] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [emptyStomach, setEmptyStomach] = useState<boolean | null>(null);

  // Drinks management
  const [drinks, setDrinks] = useState<Array<{
    quantity: string;
    percentage: string;
    time: string;
  }>>([]);

  // Modal state
  const [isModalVisible, setModalVisible] = useState(false);
  const [drinkQuantity, setDrinkQuantity] = useState('');
  const [alcoholPercentage, setAlcoholPercentage] = useState('');
  const [timeAgo, setTimeAgo] = useState('');

  /**
   * Utility to trigger a specific style of haptic feedback.
   */
  const triggerHapticFeedback = async (style: Haptics.ImpactFeedbackStyle) => {
    await Haptics.impactAsync(style);
  };

  /**
   * Handlers for gender selection.
   */
  const handleMalePress = () => {
    triggerHapticFeedback(Haptics.ImpactFeedbackStyle.Medium);
    setSelectedGender('male');
  };
  const handleFemalePress = () => {
    triggerHapticFeedback(Haptics.ImpactFeedbackStyle.Medium);
    setSelectedGender('female');
  };

  /**
   * Handlers for empty stomach selection.
   */
  const handleYesPress = () => {
    triggerHapticFeedback(Haptics.ImpactFeedbackStyle.Medium);
    setEmptyStomach(true);
  };
  const handleNoPress = () => {
    triggerHapticFeedback(Haptics.ImpactFeedbackStyle.Medium);
    setEmptyStomach(false);
  };

  /**
   * Modal controls for adding a drink.
   */
  const handleOpenModal = () => {
    triggerHapticFeedback(Haptics.ImpactFeedbackStyle.Medium);
    setModalVisible(true);
  };
  const handleCloseModal = () => {
    setModalVisible(false);
    setDrinkQuantity('');
    setAlcoholPercentage('');
    setTimeAgo('');
  };

  const handleSaveDrink = () => {
    if (drinkQuantity && alcoholPercentage && timeAgo) {
      setDrinks((prevDrinks) => [
        ...prevDrinks,
        { quantity: drinkQuantity, percentage: alcoholPercentage, time: timeAgo },
      ]);
    }
    handleCloseModal();
  };

  const handleRemoveDrink = (index: number) => {
    setDrinks((prevDrinks) => prevDrinks.filter((_, i) => i !== index));
  };

  /**
   * Final "Calculate" logic (BAC or similar).
   */
  const handleCalculate = () => {
    triggerHapticFeedback(Haptics.ImpactFeedbackStyle.Heavy);
    // TODO: implement calculation logic
  };

  return (
    <ScrollView style={[styles.parentContainer, { backgroundColor: theme.systemGray6 }]}>
      <KeyboardAvoidingView
        style={{ width: '100%' }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        {/* Gender Selector */}
        <GenderSelector
          selectedGender={selectedGender}
          onSelectMale={handleMalePress}
          onSelectFemale={handleFemalePress}
        />

        <View style={[styles.separator, { backgroundColor: theme.systemGray3 }]} />

        {/* Age Input */}
        <AgeInput
          age={age}
          onChangeAge={(val) => {
            triggerHapticFeedback(Haptics.ImpactFeedbackStyle.Medium);
            setAge(val);
          }}
        />

        <View style={[styles.separator, { backgroundColor: theme.systemGray3 }]} />

        {/* Weight Input */}
        <WeightInput
          weight={weight}
          onChangeWeight={(val) => {
            triggerHapticFeedback(Haptics.ImpactFeedbackStyle.Medium);
            setWeight(val);
          }}
        />

        <View style={[styles.separator, { backgroundColor: theme.systemGray3 }]} />

        {/* Empty Stomach Selector */}
        <EmptyStomachSelector
          emptyStomach={emptyStomach}
          onSelectYes={handleYesPress}
          onSelectNo={handleNoPress}
        />

        <View style={[styles.separator, { backgroundColor: theme.systemGray3 }]} />

        {/* Drinks Section (Add + List) */}
        <DrinksSection
          drinks={drinks}
          onAddDrink={handleOpenModal}
          onRemoveDrink={handleRemoveDrink}
        />

        {/* Add Drink Modal */}
        <AddDrinkModal
          isVisible={isModalVisible}
          onClose={handleCloseModal}
          onSave={handleSaveDrink}
          drinkQuantity={drinkQuantity}
          setDrinkQuantity={setDrinkQuantity}
          alcoholPercentage={alcoholPercentage}
          setAlcoholPercentage={setAlcoholPercentage}
          timeAgo={timeAgo}
          setTimeAgo={setTimeAgo}
        />
      </KeyboardAvoidingView>

      {/* Calculate Button */}
      <Pressable
        style={[styles.calculateButton, { backgroundColor: theme.systemBlue }]}
        onPress={handleCalculate}
      >
        <Text style={styles.calculateButtonText}>Calculate</Text>
      </Pressable>
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
  calculateButton: {
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 10,
  },
  calculateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
