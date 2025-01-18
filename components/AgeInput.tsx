import React from 'react';
import { StyleSheet, TextInput, useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';
import SectionRow from './SectionRow';

interface AgeInputProps {
  age: string;
  onChangeAge: (newAge: string) => void;
}

/**
 * A section row to input the user's age.
 */
const AgeInput: React.FC<AgeInputProps> = ({ age, onChangeAge }) => {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];

  return (
    <SectionRow iconName="calendar" title="Age">
      <TextInput
        style={[
          styles.inputSmall,
          { color: theme.label, borderColor: theme.systemGray2 },
        ]}
        keyboardType="numeric"
        placeholder="+18"
        placeholderTextColor={theme.systemGray2}
        value={age}
        onChangeText={onChangeAge}
      />
    </SectionRow>
  );
};

export default AgeInput;

const styles = StyleSheet.create({
  inputSmall: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    fontSize: 16,
    width: 60,
    textAlign: 'center',
  },
});
