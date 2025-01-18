// components/DrinksSection.tsx
import React from 'react';
import { View, Pressable, Text, StyleSheet, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Colors } from '@/constants/Colors';
import { useAppStore } from '@/store/appStore';
import SectionRow from '@/components/SectionRow';

const DrinksSection: React.FC = () => {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];

  const drinks = useAppStore((state) => state.drinks);
  const removeDrink = useAppStore((state) => state.removeDrink);

  const setModalVisible = useAppStore((state) => state.setModalVisible);

  const handleOpenModal = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setModalVisible(true);
  };

  const handleRemoveDrink = async (index: number) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    removeDrink(index);
  };

  return (
    <View>
      <SectionRow iconName="beer" title="Add your drinks">
        <Pressable onPress={handleOpenModal} style={styles.iconWrapper}>
          <Ionicons name="add-circle" size={25} color={theme.systemGreen} />
        </Pressable>
      </SectionRow>

      {/* Separators */}
      <View style={[styles.separator, { backgroundColor: theme.systemGray3 }]} />
      <View style={[styles.separator, { backgroundColor: theme.systemGray3 }]} />

      {drinks.length > 0 ? (
        <View>
          <Text style={[styles.drinksTitle, { color: theme.label, marginVertical: 10 }]}>
        Your Drinks
          </Text>
          {drinks.map((drink, index) => (
        <View
          key={index}
          style={[styles.drinkItem, { backgroundColor: theme.systemGray4 }]}
        >
          <Text style={[styles.drinkText, { color: theme.label }]}>
            Quantity: {drink.quantity}ml, Alcohol: {drink.percentage}%,
            Time: {drink.time} min ago
          </Text>
          <Pressable onPress={() => handleRemoveDrink(index)}>
            <Ionicons name="remove-circle" size={24} color={theme.systemRed} />
          </Pressable>
        </View>
          ))}
        </View>
      ) : (
          <Text style={[styles.drinksTitle, { color: theme.label, marginVertical: 10 }]}>
          No drinks added yet 🍺
          </Text>
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
    fontWeight: '300'
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
