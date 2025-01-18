import React from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, useColorScheme } from 'react-native';
import Modal from 'react-native-modal';
import { Colors } from '../constants/Colors';

interface AddDrinkModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSave: () => void;

  // Controlled inputs for the new drink
  drinkQuantity: string;
  setDrinkQuantity: (val: string) => void;
  alcoholPercentage: string;
  setAlcoholPercentage: (val: string) => void;
  timeAgo: string;
  setTimeAgo: (val: string) => void;
}

/**
 * A sliding-up modal to add a new drink, with text inputs and action buttons.
 */
const AddDrinkModal: React.FC<AddDrinkModalProps> = ({
  isVisible,
  onClose,
  onSave,
  drinkQuantity,
  setDrinkQuantity,
  alcoholPercentage,
  setAlcoholPercentage,
  timeAgo,
  setTimeAgo,
}) => {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={500}
      animationOutTiming={500}
      backdropTransitionInTiming={500}
      backdropTransitionOutTiming={500}
      avoidKeyboard
    >
      <View style={[styles.modalContent, { backgroundColor: theme.systemGray6 }]}>
        <Text style={[styles.modalTitle, { color: theme.label }]}>Add Drink</Text>

        <TextInput
          style={[styles.input, { color: theme.label, borderColor: theme.systemGray3 }]}
          placeholder="Quantity (ml)"
          placeholderTextColor={theme.systemGray3}
          keyboardType="numeric"
          value={drinkQuantity}
          onChangeText={setDrinkQuantity}
        />

        <TextInput
          style={[styles.input, { color: theme.label, borderColor: theme.systemGray3 }]}
          placeholder="Alcohol %"
          placeholderTextColor={theme.systemGray3}
          keyboardType="numeric"
          value={alcoholPercentage}
          onChangeText={setAlcoholPercentage}
        />

        <TextInput
          style={[styles.input, { color: theme.label, borderColor: theme.systemGray3 }]}
          placeholder="Time ago (minutes)"
          placeholderTextColor={theme.systemGray3}
          keyboardType="numeric"
          value={timeAgo}
          onChangeText={setTimeAgo}
        />

        {/* Action buttons */}
        <View style={styles.modalButtons}>
          <Pressable onPress={onClose} style={styles.button}>
            <Text style={[styles.buttonText, { color: theme.systemRed }]}>Cancel</Text>
          </Pressable>
          <Pressable onPress={onSave} style={styles.button}>
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
