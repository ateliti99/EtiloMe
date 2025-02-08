// components/AddDrinkModal.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import Modal from 'react-native-modal';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useAppStore } from '@/store/appStore';
import { useTranslation } from 'react-i18next';

// Import the new search modal
import SearchABVModal from './SearchABVModal';

const AddDrinkModal: React.FC = () => {
  const { t } = useTranslation();
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];

  // Zustand states
  const isModalVisible = useAppStore((state) => state.isModalVisible);
  const setModalVisible = useAppStore((state) => state.setModalVisible);

  const {
    newDrinkQuantity,
    setNewDrinkQuantity,
    newAlcoholPercentage,
    setNewAlcoholPercentage,
    newTimeAgo,
    setNewTimeAgo,
  } = useAppStore();

  const addDrink = useAppStore((state) => state.addDrink);

  // Local state for showing the search modal
  const [showSearchABV, setShowSearchABV] = useState(false);

  /**
   * Closes the modal and resets fields.
   */
  const handleClose = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setModalVisible(false);
    setNewDrinkQuantity('');
    setNewAlcoholPercentage('');
    setNewTimeAgo('');
  };

  /**
   * Saves the drink if all fields are filled.
   */
  const handleSaveDrink = async () => {
    if (newDrinkQuantity && newAlcoholPercentage && newTimeAgo) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      addDrink(newDrinkQuantity, newAlcoholPercentage, newTimeAgo);
    }
    handleClose();
  };

  /**
   * Quickly set the preset volume (ml).
   */
  const setPresetVolume = async (volume: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setNewDrinkQuantity(volume);
  };

  /**
   * User picks a beverage from local DB => sets the Alcohol %.
   */
  const handleSelectABV = (abv: string) => {
    setNewAlcoholPercentage(abv);
  };

  /**
   * Quickly set the time (minutes ago).
   */
  const setTimePreset = async (minutes: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setNewTimeAgo(minutes);
  };

  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={handleClose}
      onBackButtonPress={handleClose}
      style={styles.modal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      avoidKeyboard
      useNativeDriver
      hideModalContentWhileAnimating
      onModalHide={() => {
        // Dismiss keyboard if it was open
        TextInput.State.blurTextInput(TextInput.State.currentlyFocusedInput());
      }}
    >
      <View style={[styles.modalContent, { backgroundColor: theme.systemGray6 }]}>
        <Text style={[styles.modalTitle, { color: theme.label }]}>{t('addDrinkModal:title')}</Text>

        {/* Quantity (ml) */}
        <TextInput
          style={[styles.input, { color: theme.label, borderColor: theme.systemGray3 }]}
          placeholder={t('addDrinkModal:quantityPlaceholder')}
          placeholderTextColor={theme.systemGray3}
          keyboardType="numeric"
          value={newDrinkQuantity}
          onChangeText={setNewDrinkQuantity}
        />

        {/* 2x2 Grid of Presets */}
        <View style={styles.presetsContainer}>
          {/* Shot */}
          <Pressable
            style={[styles.presetButton, { backgroundColor: theme.systemGray5 }]}
            onPress={() => setPresetVolume('40')}
          >
            <Ionicons name="cafe-outline" size={20} color={theme.label} style={styles.icon} />
            <Text style={[styles.presetText, { color: theme.label }]}>{t('addDrinkModal:presetVolumes:40')}</Text>
          </Pressable>

          {/* Wine */}
          <Pressable
            style={[styles.presetButton, { backgroundColor: theme.systemGray5 }]}
            onPress={() => setPresetVolume('150')}
          >
            <Ionicons name="wine-outline" size={20} color={theme.label} style={styles.icon} />
            <Text style={[styles.presetText, { color: theme.label }]}>{t('addDrinkModal:presetVolumes:150')}</Text>
          </Pressable>

          {/* Medium Beer */}
          <Pressable
            style={[styles.presetButton, { backgroundColor: theme.systemGray5 }]}
            onPress={() => setPresetVolume('330')}
          >
            <Ionicons name="beer-outline" size={20} color={theme.label} style={styles.icon} />
            <Text style={[styles.presetText, { color: theme.label }]}>{t('addDrinkModal:presetVolumes:330')}</Text>
          </Pressable>

          {/* Large Beer */}
          <Pressable
            style={[styles.presetButton, { backgroundColor: theme.systemGray5 }]}
            onPress={() => setPresetVolume('500')}
          >
            <Ionicons name="beer-outline" size={24} color={theme.label} style={styles.icon} />
            <Text style={[styles.presetText, { color: theme.label }]}>{t('addDrinkModal:presetVolumes:500')}</Text>
          </Pressable>
        </View>

        {/* "Alcohol %" + search button on the LEFT */}
        <View style={styles.alcoholRow}>
          {/* Search button */}
          <Pressable
            style={[styles.searchButton, { backgroundColor: theme.systemGray3 }]}
            onPress={() => setShowSearchABV(true)}
          >
            <Ionicons name="search-outline" size={20} color={theme.label} />
          </Pressable>

          {/* Alcohol % input */}
          <TextInput
            style={[
              styles.alcoholInput,
              { color: theme.label, borderColor: theme.systemGray3 },
            ]}
            placeholder={t('addDrinkModal:alcoholPlaceholder')}
            placeholderTextColor={theme.systemGray3}
            keyboardType="numeric"
            value={newAlcoholPercentage}
            onChangeText={setNewAlcoholPercentage}
          />
        </View>

        {/* Time ago (minutes) */}
        <TextInput
          style={[styles.input, { color: theme.label, borderColor: theme.systemGray3 }]}
          placeholder={t('addDrinkModal:timeAgoPlaceholder')}
          placeholderTextColor={theme.systemGray3}
          keyboardType="numeric"
          value={newTimeAgo}
          onChangeText={setNewTimeAgo}
        />

        {/* Quick Time Presets */}
        <View style={styles.timePresetsRow}>
          <Pressable
            style={[styles.timePresetButton, { backgroundColor: theme.systemGray5 }]}
            onPress={() => setTimePreset('30')}
          >
            <Text style={[styles.timePresetText, { color: theme.label }]}>{t('addDrinkModal:timePresets:30')}</Text>
          </Pressable>
          <Pressable
            style={[styles.timePresetButton, { backgroundColor: theme.systemGray5 }]}
            onPress={() => setTimePreset('60')}
          >
            <Text style={[styles.timePresetText, { color: theme.label }]}>{t('addDrinkModal:timePresets:60')}</Text>
          </Pressable>
          <Pressable
            style={[styles.timePresetButton, { backgroundColor: theme.systemGray5 }]}
            onPress={() => setTimePreset('120')}
          >
            <Text style={[styles.timePresetText, { color: theme.label }]}>{t('addDrinkModal:timePresets:120')}</Text>
          </Pressable>
        </View>

        {/* Modal buttons */}
        <View style={styles.modalButtons}>
          <Pressable onPress={handleClose} style={styles.button}>
            <Text style={[styles.buttonText, { color: theme.systemRed }]}>{t('addDrinkModal:cancelButton')}</Text>
          </Pressable>
          <Pressable onPress={handleSaveDrink} style={styles.button}>
            <Text style={[styles.buttonText, { color: theme.systemGreen }]}>{t('addDrinkModal:saveButton')}</Text>
          </Pressable>
        </View>
      </View>

      {/* Our new search modal */}
      <SearchABVModal
        visible={showSearchABV}
        onClose={() => setShowSearchABV(false)}
        onSelectABV={handleSelectABV}
      />
    </Modal>
  );
};

export default AddDrinkModal;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 10,
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  presetsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  presetButton: {
    width: '48%',
    height: 80,
    borderRadius: 8,
    marginBottom: 10,

    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginBottom: 4,
  },
  presetText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },

  alcoholRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  searchButton: {
    width: 44,
    height: 44,
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alcoholInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
  },

  timePresetsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  timePresetButton: {
    width: 80,
    height: 44,
    borderRadius: 8,

    alignItems: 'center',
    justifyContent: 'center',
  },
  timePresetText: {
    fontSize: 14,
    fontWeight: '600',
  },

  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  button: {
    padding: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
