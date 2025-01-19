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

// Import the new search modal
import SearchABVModal from './SearchABVModal';

const AddDrinkModal: React.FC = () => {
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

  const handleClose = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setModalVisible(false);
    setNewDrinkQuantity('');
    setNewAlcoholPercentage('');
    setNewTimeAgo('');
  };

  const handleSaveDrink = async () => {
    if (newDrinkQuantity && newAlcoholPercentage && newTimeAgo) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      addDrink(newDrinkQuantity, newAlcoholPercentage, newTimeAgo);
    }
    handleClose();
  };

  const setPresetVolume = async (volume: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setNewDrinkQuantity(volume);
  };

  /**
   * Called when the user picks a beverage from local DB.
   */
  const handleSelectABV = (abv: string) => {
    setNewAlcoholPercentage(abv);
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
      TextInput.State.blurTextInput(TextInput.State.currentlyFocusedInput());
      }}
    >
      <View style={[styles.modalContent, { backgroundColor: theme.systemGray6 }]}>
        <Text style={[styles.modalTitle, { color: theme.label }]}>Add Drink</Text>

        {/* Quantity (ml) */}
        <TextInput
          style={[styles.input, { color: theme.label, borderColor: theme.systemGray3 }]}
          placeholder="Quantity (ml)"
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
            <Text style={[styles.presetText, { color: theme.label }]}>Shot{"\n"}40ml</Text>
          </Pressable>

          {/* Wine */}
          <Pressable
            style={[styles.presetButton, { backgroundColor: theme.systemGray5 }]}
            onPress={() => setPresetVolume('150')}
          >
            <Ionicons name="wine-outline" size={20} color={theme.label} style={styles.icon} />
            <Text style={[styles.presetText, { color: theme.label }]}>Wine{"\n"}150ml</Text>
          </Pressable>

          {/* Little Beer */}
          <Pressable
            style={[styles.presetButton, { backgroundColor: theme.systemGray5 }]}
            onPress={() => setPresetVolume('330')}
          >
            <Ionicons name="beer-outline" size={20} color={theme.label} style={styles.icon} />
            <Text style={[styles.presetText, { color: theme.label }]}>Medium Beer{"\n"}330ml</Text>
          </Pressable>

          {/* Big Beer */}
          <Pressable
            style={[styles.presetButton, { backgroundColor: theme.systemGray5 }]}
            onPress={() => setPresetVolume('500')}
          >
            <Ionicons name="beer-outline" size={24} color={theme.label} style={styles.icon} />
            <Text style={[styles.presetText, { color: theme.label }]}>Large Beer{"\n"}500ml</Text>
          </Pressable>
        </View>

        {/* "Alcohol %" + search button on the LEFT */}
        <View style={styles.alcoholRow}>
          {/* Search button on the LEFT */}
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
            placeholder="Alcohol %"
            placeholderTextColor={theme.systemGray3}
            keyboardType="numeric"
            value={newAlcoholPercentage}
            onChangeText={setNewAlcoholPercentage}
          />
        </View>

        {/* Time ago (minutes) */}
        <TextInput
          style={[styles.input, { color: theme.label, borderColor: theme.systemGray3 }]}
          placeholder="Time ago (minutes)"
          placeholderTextColor={theme.systemGray3}
          keyboardType="numeric"
          value={newTimeAgo}
          onChangeText={setNewTimeAgo}
        />

        {/* Modal buttons */}
        <View style={styles.modalButtons}>
          <Pressable onPress={handleClose} style={styles.button}>
            <Text style={[styles.buttonText, { color: theme.systemRed }]}>Cancel</Text>
          </Pressable>
          <Pressable onPress={handleSaveDrink} style={styles.button}>
            <Text style={[styles.buttonText, { color: theme.systemGreen }]}>Save</Text>
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

  // Alcohol row for search button + text input
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
