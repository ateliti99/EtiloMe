import React from 'react';
import { View, Pressable, Text, StyleSheet, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import SectionRow from './SectionRow';

interface Drink {
  quantity: string;
  percentage: string;
  time: string;
}

interface DrinksSectionProps {
  drinks: Drink[];
  onAddDrink: () => void;
  onRemoveDrink: (index: number) => void;
}

/**
 * A section row to add drinks, plus a list of the user's current drinks.
 */
const DrinksSection: React.FC<DrinksSectionProps> = ({
  drinks,
  onAddDrink,
  onRemoveDrink,
}) => {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];

  return (
    <View>
      <SectionRow iconName="beer" title="Add your drinks">
        <Pressable onPress={onAddDrink} style={styles.iconWrapper}>
          <Ionicons
            name="add-circle"
            size={25}
            color={theme.systemGreen}
          />
        </Pressable>
      </SectionRow>

      {/* Separators */}
      <View style={[styles.separator, { backgroundColor: theme.systemGray3 }]} />
      <View style={[styles.separator, { backgroundColor: theme.systemGray3 }]} />

      {drinks.length > 0 && (
        <View>
          <Text
            style={[
              styles.drinksTitle,
              { color: theme.label, marginVertical: 10 },
            ]}
          >
            Your Drinks
          </Text>
          {drinks.map((drink, index) => (
            <View
              key={index}
              style={[styles.drinkItem, { backgroundColor: theme.systemGray5 }]}
            >
              <Text style={[styles.drinkText, { color: theme.label }]}>
                Quantity: {drink.quantity}ml, Alcohol: {drink.percentage}%,
                Time: {drink.time} min ago
              </Text>
              <Pressable onPress={() => onRemoveDrink(index)}>
                <Ionicons name="remove-circle" size={24} color={theme.systemRed} />
              </Pressable>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default DrinksSection;

const styles = StyleSheet.create({
  iconWrapper: {
    marginLeft: 15,
  },
  separator: {
    height: 1,
    width: '100%',
    marginVertical: 5,
  },
  drinksTitle: {
    fontSize: 18,
    textAlign: 'left',
  },
  drinkItem: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  drinkText: {
    fontSize: 16,
    flex: 1,
  },
});
