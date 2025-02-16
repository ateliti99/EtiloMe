# EtiloMe

EtiloMe is a comprehensive mobile application designed to help users estimate their Blood Alcohol Concentration (BAC) using the Widmark formula. The app provides a user-friendly interface to input personal information, track alcohol consumption, and calculate BAC levels. It also includes features for localization, ad integration, and a variety of customization options to enhance the user experience.

Here are some screenshots of the EtiloMe app:

![Screenshot 1](screenshots/screenshot1.png)
![Screenshot 2](screenshots/screenshot2.png)
![Screenshot 3](screenshots/screenshot3.png)

## Features

### User Information Input
- **Age Input**: Users can input their age using the [`AgeInput`](components/AgeInput.tsx ) component.
- **Weight Input**: Users can input their weight in kilograms using the [`WeightInput`](components/WeightInput.tsx ) component.
- **Gender Selection**: Users can select their gender using the [`GenderSelector`](components/GenderSelector.tsx ) component.
- **Empty Stomach Selector**: Users can indicate whether they have an empty stomach using the [`EmptyStomachSelector`](components/EmptyStomachSelector.tsx ) component.

### Alcohol Consumption Tracking
- **Add Drink Modal**: Users can add details about their drinks, including quantity, alcohol percentage, and time since consumption using the [`AddDrinkModal`](components/AddDrinkModal.tsx ) component.
- **Preset Volumes**: Quick selection of common drink volumes (e.g., shot, wine, medium beer, large beer).
- **Search ABV Modal**: Users can search for beverages from a local database to quickly set the alcohol percentage using the [`SearchABVModal`](components/SearchABVModal.tsx ) component.
- **Drinks Section**: Displays a list of added drinks and allows users to remove drinks using the [`DrinksSection`](components/DrinksSection.tsx ) component.

### BAC Calculation
- **Calculate BAC**: Uses the Widmark formula to calculate BAC based on user inputs and displays the result in a modal using the [`ResultModal`](components/ResultModal.tsx ) component.
- **Liters Modal**: Allows users to manually edit the total liters of alcohol consumed using the [`LitersModal`](components/LitersModal.tsx ) component.

### Localization
- **Multi-language Support**: The app supports multiple languages, including English, Spanish, Portuguese, Hindi, German, French, Italian, and Russian. Localization is managed using the `i18next` library and language files located in the [`lang`](lang ) directory.

### Ad Integration
- **Google Mobile Ads**: The app integrates with Google Mobile Ads to display banner ads and rewarded interstitial ads. Ad components are implemented using the [`InlineAd`](components/InlineAd.tsx ) component and ad-related logic in the [`app/index.tsx`](app/index.tsx ) file.

### Theming
- **Dark and Light Mode**: The app supports both dark and light themes, with colors defined in the [`Colors`](constants/Colors.ts ) file.

## Project Structure

```
.expo/
.gitignore
app/
    _layout.tsx
    index.tsx
app.json
assets/
    fonts/
    icons/
components/
    AddDrinkModal.tsx
    AgeInput.tsx
    DrinksSection.tsx
    EmptyStomachSelector.tsx
    GenderSelector.tsx
    InlineAd.tsx
    LitersModal.tsx
    ResultModal.tsx
    SearchABVModal.tsx
    SectionRow.tsx
    SectionTitle.tsx
    Summary.tsx
    TestInformation.tsx
    WeightInput.tsx
constants/
    Colors.ts
data/
    BeverageDatabase.ts
eas.json
expo-env.d.ts
lang/
    en.json
    es.json
    fr.json
    de.json
    it.json
    pt.json
    hi.json
    ru.json
    i18n.ts
package.json
README.md
store/
    appStore.tsx
tsconfig.json
```

### Key Files and Directories

- **app/**: Contains the main application components and layout files.
- **assets/**: Contains fonts and icons used in the app.
- **components/**: Contains reusable UI components such as modals, input fields, and sections.
- **constants/**: Contains constant values used throughout the app, such as color themes.
- **data/**: Contains the local beverage database.
- **lang/**: Contains localization files for different languages and the i18n configuration.
- **store/**: Contains the Zustand store for state management.
- **tsconfig.json**: TypeScript configuration file.
- **package.json**: Project dependencies and scripts.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- Expo CLI installed globally (`npm install -g expo-cli`).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/etilome.git
   cd etilome
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the app:

   ```bash
   npx expo start
   ```

   This command will start the Expo development server and provide options to open the app in a development build, Android emulator, iOS simulator, or Expo Go.

## Usage

1. **Input Personal Information**: Enter your age, weight, select your gender, and indicate if you have an empty stomach.
2. **Add Drinks**: Use the "Add Drink" button to input details about your drinks. You can use preset volumes or search for beverages to quickly set the alcohol percentage.
3. **Calculate BAC**: Press the "Calculate" button to estimate your BAC. The result will be displayed in a modal.
4. **Edit Liters**: If needed, you can manually edit the total liters of alcohol consumed using the "Edit Liters" button.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgements

- [Expo](https://expo.dev) for providing a powerful framework for building cross-platform apps.
- [i18next](https://www.i18next.com) for localization support.
- [Zustand](https://zustand.surge.sh) for state management.
- [React Native Google Mobile Ads](https://github.com/invertase/react-native-google-mobile-ads) for ad integration.

## Contact

For any questions or feedback, please contact [aurelio.teliti@gmail.com](aurelio.teliti@gmail.com).
