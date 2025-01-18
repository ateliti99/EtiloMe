import React from 'react';
import { View, Pressable, StyleSheet, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import SectionRow from './SectionRow';

interface EmptyStomachSelectorProps {
  emptyStomach: boolean | null;
  onSelectYes: () => void;
  onSelectNo: () => void;
}

/**
 * A section row to choose if the user is on an empty stomach.
 */
const EmptyStomachSelector: React.FC<EmptyStomachSelectorProps> = ({
  emptyStomach,
  onSelectYes,
  onSelectNo,
}) => {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];

  return (
    <SectionRow iconName="nutrition" title="Empty stomach?">
      <View style={styles.iconsContainer}>
        <Pressable onPress={onSelectYes} style={styles.iconWrapper}>
          <Ionicons
            name="checkmark-circle"
            size={25}
            color={
              emptyStomach === true ? theme.systemTeal : theme.label
            }
          />
        </Pressable>
        <Pressable onPress={onSelectNo} style={styles.iconWrapper}>
          <Ionicons
            name="close-circle"
            size={25}
            color={
              emptyStomach === false ? theme.systemPink : theme.label
            }
          />
        </Pressable>
      </View>
    </SectionRow>
  );
};

export default EmptyStomachSelector;

const styles = StyleSheet.create({
  iconsContainer: {
    flexDirection: 'row',
  },
  iconWrapper: {
    marginLeft: 15,
  },
});
