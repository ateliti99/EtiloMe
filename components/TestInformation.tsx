import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import Modal from 'react-native-modal';

export default function TestInformation() {
    const colorScheme = useColorScheme() || "light";
    const theme = Colors[colorScheme];
    const [selectedGender, setSelectedGender] = useState<string | null>(null);
    const [age, setAge] = useState<string>('');
    const [weight, setWeight] = useState<string>('');
    const [emptyStomach, setEmptyStomach] = useState<boolean | null>(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [drinkQuantity, setDrinkQuantity] = useState<string>('');
    const [alcoholPercentage, setAlcoholPercentage] = useState<string>('');
    const [timeAgo, setTimeAgo] = useState<string>('');
    const [drinks, setDrinks] = useState<Array<{ quantity: string; percentage: string; time: string }>>([]);

    const handleOpenModal = () => {
        handleHapticFeedback();
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setDrinkQuantity('');
        setAlcoholPercentage('');
        setTimeAgo('');
    };

    const handleSaveDrink = () => {
        if (drinkQuantity && alcoholPercentage && timeAgo) {
            setDrinks((prevDrinks) => [
                ...prevDrinks,
                { quantity: drinkQuantity, percentage: alcoholPercentage, time: timeAgo },
            ]);
        }
        handleCloseModal();
    };    

    const handleHapticFeedback = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); // Medium intensity feedback
    };

    const handleRemoveDrink = (index: number) => {
        setDrinks((prevDrinks) => prevDrinks.filter((_, i) => i !== index));
    };    

    const handleMalePress = () => {
        handleHapticFeedback();
        setSelectedGender('male');
        console.log("Male icon pressed");
    };

    const handleFemalePress = () => {
        handleHapticFeedback();
        setSelectedGender('female');
        console.log("Female icon pressed");
    };

    const handleYesPress = () => {
        handleHapticFeedback();
        setEmptyStomach(true);
        console.log("Empty stomach: Yes");
    };

    const handleNoPress = () => {
        handleHapticFeedback();
        setEmptyStomach(false);
        console.log("Empty stomach: No");
    };

    const handleCalculate = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy); // High intensity feedback
        console.log('Calculate button pressed');
        // Add your calculation logic here
    };    

    return (
        <ScrollView style={[styles.parentContainer, { backgroundColor: theme.systemGray6 }]}>
        <KeyboardAvoidingView
            style={{ backgroundColor: theme.systemGray6, width: '100%' }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        >

            {/* Gender */}
            <View style={styles.section}>
                <View style={[styles.iconContainer, { backgroundColor: theme.systemPurple }]}>
                    <Ionicons name="person-circle" size={20} color="#fff" />
                </View>
                <View style={styles.contentContainer}>
                    <Text style={[styles.text, { color: theme.label }]}>Gender</Text>
                    <View style={styles.iconsContainer}>
                        <Pressable onPress={handleMalePress} style={styles.iconWrapper}>
                            <Ionicons 
                                name="male" 
                                size={25} 
                                color={selectedGender === 'male' ? theme.systemTeal : theme.label} 
                            />
                        </Pressable>
                        <Pressable onPress={handleFemalePress} style={styles.iconWrapper}>
                            <Ionicons 
                                name="female" 
                                size={25} 
                                color={selectedGender === 'female' ? theme.systemPink : theme.label} 
                            />
                        </Pressable>
                    </View>
                </View>
            </View>

            {/* Separator */}
            <View style={[styles.separator, { backgroundColor: theme.systemGray3 }]} />

            {/* Age */}
            <View style={styles.section}>
                <View style={[styles.iconContainer, { backgroundColor: theme.systemGreen }]}>
                    <Ionicons name="calendar" size={20} color="#fff" />
                </View>
                <View style={styles.contentContainer}>
                    <Text style={[styles.text, { color: theme.label }]}>Age</Text>
                    <TextInput 
                        style={[styles.ageInput, { color: theme.label, borderColor: theme.systemGray2 }]} 
                        keyboardType="numeric" 
                        placeholder="+18" 
                        placeholderTextColor={theme.systemGray2}
                        value={age}
                        onChangeText={(text) => {
                            handleHapticFeedback();
                            setAge(text);
                        }}
                    />
                </View>
            </View>

            {/* Separator */}
            <View style={[styles.separator, { backgroundColor: theme.systemGray3 }]} />

            {/* Weight */}
            <View style={styles.section}>
                <View style={[styles.iconContainer, { backgroundColor: theme.systemOrange }]}>
                    <Ionicons name="fitness" size={20} color="#fff" />
                </View>
                <View style={styles.contentContainer}>
                    <Text style={[styles.text, { color: theme.label }]}>Weight</Text>
                    <TextInput 
                        style={[styles.ageInput, { color: theme.label, borderColor: theme.systemGray2 }]} 
                        keyboardType="numeric" 
                        placeholder="80 kg" 
                        placeholderTextColor={theme.systemGray2}
                        value={weight}
                        onChangeText={(text) => {
                            handleHapticFeedback();
                            setWeight(text);
                        }}
                    />
                </View>
            </View>

            {/* Separator */}
            <View style={[styles.separator, { backgroundColor: theme.systemGray3 }]} />

            {/* On an empty stomach */}
            <View style={styles.section}>
                <View style={[styles.iconContainer, { backgroundColor: theme.systemRed }]}>
                    <Ionicons name="nutrition" size={20} color="#fff" />
                </View>
                <View style={styles.contentContainer}>
                    <Text style={[styles.text, { color: theme.label }]}>Empty stomach?</Text>
                    <View style={styles.iconsContainer}>
                        <Pressable onPress={handleYesPress} style={styles.iconWrapper}>
                            <Ionicons 
                                name="checkmark-circle" 
                                size={25} 
                                color={emptyStomach === true ? theme.systemTeal : theme.label} 
                            />
                        </Pressable>
                        <Pressable onPress={handleNoPress} style={styles.iconWrapper}>
                            <Ionicons 
                                name="close-circle" 
                                size={25} 
                                color={emptyStomach === false ? theme.systemPink : theme.label} 
                            />
                        </Pressable>
                    </View>
                </View>
            </View>

            {/* Separator */}
            <View style={[styles.separator, { backgroundColor: theme.systemGray3 }]} />

            {/* What have you drink */}
            <View style={styles.section}>
                <View style={[styles.iconContainer, { backgroundColor: theme.systemBlue }]}>
                    <Ionicons name="beer" size={20} color="#fff" />
                </View>
                <View style={styles.contentContainer}>
                    <Text style={[styles.text, { color: theme.label }]}>Add your drinks</Text>
                    <View style={styles.iconsContainer}>
                        <Pressable onPress={handleOpenModal} style={styles.iconWrapper}>
                            <Ionicons 
                                name="add-circle" 
                                size={25} 
                                color={theme.systemGreen} 
                            />
                        </Pressable>
                    </View>
                </View>
            </View>

            {/* Separator */}
            <View style={[styles.separator, { backgroundColor: theme.systemGray3 }]} />
            <View style={[styles.separator, { backgroundColor: theme.systemGray3 }]} />

            {drinks.length > 0 && (
            <View>
                <Text style={[styles.text, { color: theme.label, marginVertical: 10 }]}>Your Drinks</Text>
                {drinks.map((drink, index) => (
                    <View key={index} style={[styles.drinkItem, { backgroundColor: theme.systemGray5 }]}>
                        <Text style={[styles.drinkText, { color: theme.label }]}>
                            Quantity: {drink.quantity}ml, Alcohol: {drink.percentage}%, Time: {drink.time} minutes ago
                        </Text>
                        <Pressable
                            onPress={() => handleRemoveDrink(index)}
                            style={styles.removeIcon}
                        >
                            <Ionicons name="remove-circle" size={24} color={theme.systemRed} />
                        </Pressable>
                    </View>
                ))}
            </View>
            )}


            {/* Modal */}
            {isModalVisible && (
                <Modal
                    isVisible={isModalVisible}
                    onBackdropPress={handleCloseModal}
                    onBackButtonPress={handleCloseModal}
                    style={styles.modal}
                    animationIn="slideInUp"
                    animationOut="slideOutDown"
                    animationInTiming={500}
                    animationOutTiming={500}
                    backdropTransitionInTiming={500}
                    backdropTransitionOutTiming={500}
                    avoidKeyboard={true}
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
                        <View style={styles.modalButtons}>
                            <Pressable onPress={handleCloseModal} style={styles.button}>
                                <Text style={[styles.buttonText, { color: theme.systemRed }]}>Cancel</Text>
                            </Pressable>
                            <Pressable onPress={handleSaveDrink} style={styles.button}>
                                <Text style={[styles.buttonText, { color: theme.systemGreen }]}>Save</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            )}
        </KeyboardAvoidingView>

        <Pressable style={[styles.calculateButton, { backgroundColor: theme.systemBlue }]} onPress={handleCalculate}>
            <Text style={styles.calculateButtonText}>Calculate</Text>
        </Pressable>

        </ScrollView>

    );
}

const styles = StyleSheet.create({
    parentContainer: {
        width: '90%',
        borderRadius: 10,
        marginVertical: 10,
        padding: 15,
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    iconContainer: {
        width: 35,
        height: 35,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 10,
    },
    text: {
        fontSize: 18,
        textAlign: 'left',
    },
    iconsContainer: {
        flexDirection: 'row',
    },
    iconWrapper: {
        marginLeft: 15,
    },
    separator: {
        height: 1,
        width: '100%',
        marginVertical: 5,
    },
    ageInput: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        fontSize: 16,
        width: '20%',
        textAlign: 'center',
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
    removeIcon: {
        marginLeft: 10, // Space between text and icon
    },
    calculateButton: {
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 20,
        marginHorizontal: 10,
    },
    calculateButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
