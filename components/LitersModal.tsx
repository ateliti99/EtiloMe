// components/LitersModal.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, useColorScheme } from 'react-native';
import Modal from 'react-native-modal';
import { Colors } from '@/constants/Colors';
import { useAppStore } from '@/store/appStore';
import * as Haptics from 'expo-haptics';

export default function LitersModal() {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];

  // Zustand store
  const litersModalVisible = useAppStore((state) => state.litersModalVisible);
  const setLitersModalVisible = useAppStore((state) => state.setLitersModalVisible);

  const setLiters = useAppStore((state) => state.setLiters);
  const currentLiters = useAppStore((state) => state.liters);

  // Local state to hold the *new* liters value
  const [newLiters, setNewLiters] = useState<string>(currentLiters.toString());

  /**
   * When the modal is opened, we might want to reset the input to the current store value.
   * A simple approach is to use 'onModalShow' or 'useEffect' whenever litersModalVisible changes.
   */
  const handleModalShow = () => {
    setNewLiters(currentLiters.toString());
  };

  const handleClose = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setLitersModalVisible(false);
  };
  const handleSave = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const parsed = parseFloat(newLiters.replace(',', '.'));
    if (!isNaN(parsed) && parsed >= 0) {
      setLiters(parsed);
    }
    setLitersModalVisible(false);
  };

  return (
    <Modal
      isVisible={litersModalVisible}
      onModalShow={handleModalShow} // Called once the modal is fully open
      onBackdropPress={handleClose}
      onBackButtonPress={handleClose}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropTransitionOutTiming={500}
      style={styles.modal}
      avoidKeyboard={true}
    >
      <View style={[styles.modalContent, { backgroundColor: theme.systemGray6 }]}>
        <Text style={[styles.title, { color: theme.label }]}>Edit Liters</Text>

        <TextInput
          style={[styles.input, { borderColor: theme.systemGray, color: theme.label }]}
          keyboardType="numeric"
          value={newLiters}
          onChangeText={setNewLiters}
          autoFocus
        />

        <View style={styles.buttonsContainer}>
          <Pressable onPress={handleClose} style={styles.button}>
            <Text style={[styles.buttonText, { color: theme.systemRed }]}>Cancel</Text>
          </Pressable>
          <Pressable onPress={handleSave} style={styles.button}>
            <Text style={[styles.buttonText, { color: theme.systemGreen }]}>Save</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

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
  title: {
    fontSize: 20,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  buttonsContainer: {
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
