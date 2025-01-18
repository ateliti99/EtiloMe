// components/AddDrinkModal.tsx
import React from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, useColorScheme } from 'react-native';
import Modal from 'react-native-modal';
import * as Haptics from 'expo-haptics';
import { Colors } from '@/constants/Colors';
import { useAppStore } from '@/store/appStore';

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

  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={handleClose}
      onBackButtonPress={handleClose}
      style={styles.modal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      avoidKeyboard
    >
      <View style={[styles.modalContent, { backgroundColor: theme.systemGray6 }]}>
        <Text style={[styles.modalTitle, { color: theme.label }]}>Add Drink</Text>

        <TextInput
          style={[styles.input, { color: theme.label, borderColor: theme.systemGray3 }]}
          placeholder="Quantity (ml)"
          placeholderTextColor={theme.systemGray3}
          keyboardType="numeric"
          value={newDrinkQuantity}
          onChangeText={setNewDrinkQuantity}
        />

        <TextInput
          style={[styles.input, { color: theme.label, borderColor: theme.systemGray3 }]}
          placeholder="Alcohol %"
          placeholderTextColor={theme.systemGray3}
          keyboardType="numeric"
          value={newAlcoholPercentage}
          onChangeText={setNewAlcoholPercentage}
        />

        <TextInput
          style={[styles.input, { color: theme.label, borderColor: theme.systemGray3 }]}
          placeholder="Time ago (minutes)"
          placeholderTextColor={theme.systemGray3}
          keyboardType="numeric"
          value={newTimeAgo}
          onChangeText={setNewTimeAgo}
        />

        <View style={styles.modalButtons}>
          <Pressable onPress={handleClose} style={styles.button}>
            <Text style={[styles.buttonText, { color: theme.systemRed }]}>Cancel</Text>
          </Pressable>
          <Pressable onPress={handleSaveDrink} style={styles.button}>
            <Text style={[styles.buttonText, { color: theme.systemGreen }]}>Save</Text>
          </Pressable>
        </View>
      </View>
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
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    padding: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
