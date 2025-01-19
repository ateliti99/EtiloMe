import React from 'react';
import { View, Text, Pressable, StyleSheet, useColorScheme, Linking } from 'react-native';
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

  const handleOpenUber = async () => {
    const uberAppUrl = 'uber://'; // Deep link to open the Uber app
    const uberWebUrl = 'https://m.uber.com/'; // Fallback to the Uber website
    try {
      const supported = await Linking.canOpenURL(uberAppUrl);
      if (supported) {
        await Linking.openURL(uberAppUrl);
      } else {
        await Linking.openURL(uberWebUrl);
      }
    } catch (error) {
      console.error('Error opening Uber:', error);
    }
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

        <Text style={[styles.resultText, { color: theme.label }]}>{calcResult || 'No result'}</Text>

        <Text style={[styles.disclaimerText, { color: theme.secondaryLabel }]}>
          Note: The values shown are only estimates and should not be used to make decisions about
          driving or other activities. Always drink responsibly.
        </Text>

        {/* Open Uber Button */}
        <Pressable onPress={handleOpenUber} style={[styles.uberButton, { backgroundColor: theme.systemBackground, borderColor: theme.label }]}>
          <Text style={[styles.uberButtonText, { color: theme.label }]}>
          🚖 Call a Taxi
          </Text>
        </Pressable>

        {/* Close Button */}
        <Pressable onPress={handleClose} style={[styles.closeButton, { borderColor: theme.systemBlue }]}>
          <Text style={[styles.closeButtonText, { color: theme.systemBlue }]}>Close</Text>
        </Pressable>
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
  uberButton: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    width: '90%',
    borderWidth: 3,
  },
  uberButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
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
