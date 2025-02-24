// components/SearchABVModal.tsx
import React, { useState, useMemo } from 'react';
import { 
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  FlatList,
  useColorScheme
} from 'react-native';
import Modal from 'react-native-modal';
import * as Haptics from 'expo-haptics';
import { useTranslation } from 'react-i18next';

// Our local "database"
import { BEVERAGES_DB } from '@/data/BeverageDatabase';
import { Colors } from '@/constants/Colors';

interface SearchABVModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectABV: (abv: string) => void; // Callback to set the ABV in the parent
  maxResults?: number; // Optional prop to limit the number of results shown
}

const SearchABVModal: React.FC<SearchABVModalProps> = ({
  visible,
  onClose,
  onSelectABV,
  maxResults = 10, // Default to 10 if not provided
}) => {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];
  const { t } = useTranslation();

  const [searchTerm, setSearchTerm] = useState('');

  // Compute filtered list and limit results using useMemo
  const results = useMemo(() => {
    const filtered = searchTerm
      ? BEVERAGES_DB.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : BEVERAGES_DB;
    return filtered.slice(0, maxResults);
  }, [searchTerm, maxResults]);

  const handleSelect = async (abv: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onSelectABV(abv);
    onClose();
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      avoidKeyboard
      useNativeDriver
      hideModalContentWhileAnimating
      onModalHide={() => {
        // Dismiss keyboard if open
        TextInput.State.blurTextInput(TextInput.State.currentlyFocusedInput());
      }}
    >
      <View style={[styles.container, { backgroundColor: theme.systemGray6 }]}>
        <Text style={[styles.title, { color: theme.label }]}>
          {t('searchABVModal:title')}
        </Text>

        {/* Search field */}
        <TextInput
          style={[
            styles.input,
            { borderColor: theme.systemGray3, color: theme.label }
          ]}
          placeholder="Type beverage name..."
          placeholderTextColor={theme.systemGray3}
          value={searchTerm}
          onChangeText={setSearchTerm}
        />

        {/* Results */}
        <FlatList
          data={results}
          keyExtractor={(item) => item.name}
          style={styles.list}
          keyboardShouldPersistTaps="always" // Allow taps even when keyboard is open
          renderItem={({ item }) => (
            <Pressable
              style={[styles.listItem, { backgroundColor: theme.systemGray5 }]}
              onPress={() => handleSelect(item.abv.toString())}
            >
              <Text style={{ color: theme.label }}>
                {item.name} ({item.abv}%)
              </Text>
            </Pressable>
          )}
        />


        {/* Close button */}
        <View style={styles.footer}>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Text style={[styles.closeButtonText, { color: theme.systemBlue }]}>
              {t('searchABVModal:closeButton')}
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default SearchABVModal;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 10,
  },
  container: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  list: {
    marginBottom: 15,
  },
  listItem: {
    padding: 10,
    marginVertical: 3,
    borderRadius: 6,
  },
  footer: {
    alignItems: 'center',
  },
  closeButton: {
    padding: 10,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
