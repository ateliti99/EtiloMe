import React from 'react';
import { StyleSheet, TextInput, useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';
import SectionRow from './SectionRow';

interface WeightInputProps {
  weight: string;
  onChangeWeight: (newWeight: string) => void;
}

/**
 * A section row to input the user's weight.
 */
const WeightInput: React.FC<WeightInputProps> = ({
  weight,
  onChangeWeight,
}) => {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];

  return (
    <SectionRow iconName="fitness" title="Weight">
      <TextInput
        style={[
          styles.inputSmall,
          { color: theme.label, borderColor: theme.systemGray2 },
        ]}
        keyboardType="numeric"
        placeholder="80 kg"
        placeholderTextColor={theme.systemGray2}
        value={weight}
        onChangeText={onChangeWeight}
      />
    </SectionRow>
  );
};

export default WeightInput;

const styles = StyleSheet.create({
  inputSmall: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    fontSize: 16,
    width: 80,
    textAlign: 'center',
  },
});
