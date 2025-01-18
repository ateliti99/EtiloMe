import React from 'react';
import { View, Text, Pressable, StyleSheet, useColorScheme } from 'react-native';
import Modal from 'react-native-modal';
import * as Haptics from 'expo-haptics';
import { Colors } from '@/constants/Colors';
import { useAppStore } from '@/store/appStore';

export default function ResultModal() {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];

  // Zustand
  const calcModalVisible = useAppStore((state) => state.calcModalVisible);
  const setCalcModalVisible = useAppStore((state) => state.setCalcModalVisible);
  const calcResult = useAppStore((state) => state.calcResult);

  // Close the modal
  const handleClose = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setCalcModalVisible(false);
  };

  return (
    <Modal
      isVisible={calcModalVisible}
      onBackdropPress={handleClose}
      onBackButtonPress={handleClose}
      style={styles.modal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      avoidKeyboard
    >
      <View style={[styles.modalContent, { backgroundColor: theme.systemGray6 }]}>
        <Text style={[styles.modalTitle, { color: theme.label }]}>Your Alcohol Level</Text>

        <Text style={[styles.resultText, { color: theme.label }]}>
          {calcResult || "No result"}
        </Text>

        <Text style={[styles.disclaimerText, { color: theme.secondaryLabel }]}>
          Note: The values shown are only estimates and should not be used to make decisions about
          driving or other activities. Always drink responsibly.
        </Text>

        {/* Action buttons */}
        <Pressable onPress={handleClose} style={[styles.closeButton, { borderColor: theme.systemBlue }]}>
          <Text style={[styles.closeButtonText, { color: theme.systemBlue }]}>Close</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 10,
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  resultText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  disclaimerText: {
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  closeButton: {
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    borderWidth: 1,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
