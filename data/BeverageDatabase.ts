export interface Beverage {
  id: string;
  name: string;
  abv: number;
  category: string;
  // For beers and specific brand drinks, this property represents the brand name.
  brand?: string;
}

export const BEVERAGES_DB: Beverage[] = [
  // --- Beer entries with brand names (IDs 1–15) ---
  { id: '1',  name: 'Heineken Lager',             abv: 5,   category: 'Beer',   brand: 'Heineken' },
  { id: '2',  name: 'Budweiser',                  abv: 5,   category: 'Beer',   brand: 'Budweiser' },
  { id: '3',  name: 'Corona Extra',               abv: 4.5, category: 'Beer',   brand: 'Corona' },
  { id: '4',  name: 'Stella Artois',              abv: 5,   category: 'Beer',   brand: 'Stella Artois' },
  { id: '5',  name: 'Guinness Draught',           abv: 4.2, category: 'Beer',   brand: 'Guinness' },
  { id: '6',  name: 'Carlsberg Lager',            abv: 5,   category: 'Beer',   brand: 'Carlsberg' },
  { id: '7',  name: 'Peroni Nastro Azzurro',      abv: 5.1, category: 'Beer',   brand: 'Peroni' },
  { id: '8',  name: 'Asahi Super Dry',            abv: 5,   category: 'Beer',   brand: 'Asahi' },
  { id: '9',  name: 'Modelo Especial',            abv: 4.4, category: 'Beer',   brand: 'Modelo Especial' },
  { id: '10', name: 'Coors Light',                abv: 4.2, category: 'Beer',   brand: 'Coors Light' },
  { id: '11', name: 'Samuel Adams Boston Lager',  abv: 5,   category: 'Beer',   brand: 'Samuel Adams' },
  { id: '12', name: 'Sierra Nevada Pale Ale',     abv: 5.6, category: 'Beer',   brand: 'Sierra Nevada' },
  { id: '13', name: 'Brooklyn Lager',             abv: 5.2, category: 'Beer',   brand: 'Brooklyn Brewery' },
  { id: '14', name: 'Blue Moon Belgian White',    abv: 5.4, category: 'Beer',   brand: 'Blue Moon' },
  { id: '15', name: 'Dos Equis Lager',            abv: 4.7, category: 'Beer',   brand: 'Dos Equis' },

  // --- Cocktail entries (IDs 16–100) ---
  { id: '16',  name: 'Margarita',               abv: 20,  category: 'Cocktail' },
  { id: '17',  name: 'Mojito',                  abv: 15,  category: 'Cocktail' },
  { id: '18',  name: 'Martini',                 abv: 30,  category: 'Cocktail' },
  { id: '19',  name: 'Old Fashioned',           abv: 32,  category: 'Cocktail' },
  { id: '20',  name: 'Cosmopolitan',            abv: 25,  category: 'Cocktail' },
  { id: '21',  name: 'Bloody Mary',             abv: 15,  category: 'Cocktail' },
  { id: '22',  name: 'Daiquiri',                abv: 20,  category: 'Cocktail' },
  { id: '23',  name: 'Piña Colada',             abv: 15,  category: 'Cocktail' },
  { id: '24',  name: 'Long Island Iced Tea',    abv: 35,  category: 'Cocktail' },
  { id: '25',  name: 'Manhattan',               abv: 30,  category: 'Cocktail' },
  { id: '26',  name: 'Negroni',                 abv: 28,  category: 'Cocktail' },
  { id: '27',  name: 'Whiskey Sour',            abv: 25,  category: 'Cocktail' },
  { id: '28',  name: 'Gimlet',                  abv: 25,  category: 'Cocktail' },
  { id: '29',  name: 'Sidecar',                 abv: 30,  category: 'Cocktail' },
  { id: '30',  name: 'Caipirinha',              abv: 25,  category: 'Cocktail' },
  { id: '31',  name: 'Mint Julep',              abv: 20,  category: 'Cocktail' },
  { id: '32',  name: 'Tom Collins',             abv: 20,  category: 'Cocktail' },
  { id: '33',  name: 'Aperol Spritz',           abv: 11,  category: 'Cocktail' },
  { id: '34',  name: 'Sazerac',                 abv: 30,  category: 'Cocktail' },
  { id: '35',  name: 'French 75',               abv: 20,  category: 'Cocktail' },
  { id: '36',  name: 'Espresso Martini',        abv: 25,  category: 'Cocktail' },
  { id: '37',  name: 'White Russian',           abv: 25,  category: 'Cocktail' },
  { id: '38',  name: 'Black Russian',           abv: 25,  category: 'Cocktail' },
  { id: '39',  name: 'Moscow Mule',             abv: 20,  category: 'Cocktail' },
  { id: '40',  name: 'Rum Punch',               abv: 18,  category: 'Cocktail' },
  { id: '41',  name: 'Tequila Sunrise',         abv: 18,  category: 'Cocktail' },
  { id: '42',  name: 'Sex on the Beach',        abv: 20,  category: 'Cocktail' },
  { id: '43',  name: 'Blue Lagoon',             abv: 18,  category: 'Cocktail' },
  { id: '44',  name: 'Bahama Mama',             abv: 15,  category: 'Cocktail' },
  { id: '45',  name: 'Screwdriver',             abv: 20,  category: 'Cocktail' },
  { id: '46',  name: 'Caipiroska',              abv: 20,  category: 'Cocktail' },
  { id: '47',  name: 'Gin and Tonic',           abv: 20,  category: 'Cocktail' },
  { id: '48',  name: 'Rum Runner',              abv: 22,  category: 'Cocktail' },
  { id: '49',  name: 'Hurricane',               abv: 28,  category: 'Cocktail' },
  { id: '50',  name: 'Planter\'s Punch',        abv: 22,  category: 'Cocktail' },
  { id: '51',  name: 'Frozen Margarita',        abv: 18,  category: 'Cocktail' },
  { id: '52',  name: 'Frozen Daiquiri',         abv: 18,  category: 'Cocktail' },
  { id: '53',  name: 'Kir Royale',              abv: 12,  category: 'Cocktail' },
  { id: '54',  name: 'Bellini',                 abv: 12,  category: 'Cocktail' },
  { id: '55',  name: 'Mimosa',                  abv: 10,  category: 'Cocktail' },
  { id: '56',  name: 'Irish Coffee',            abv: 15,  category: 'Cocktail' },
  { id: '57',  name: 'Hot Toddy',               abv: 20,  category: 'Cocktail' },
  { id: '58',  name: 'Brandy Alexander',        abv: 25,  category: 'Cocktail' },
  { id: '59',  name: 'Singapore Sling',         abv: 20,  category: 'Cocktail' },
  { id: '60',  name: 'Clover Club',             abv: 18,  category: 'Cocktail' },
  { id: '61',  name: 'Aviation',                abv: 20,  category: 'Cocktail' },
  { id: '62',  name: 'Vesper Martini',          abv: 35,  category: 'Cocktail' },
  { id: '63',  name: 'Rob Roy',                 abv: 30,  category: 'Cocktail' },
  { id: '64',  name: 'Lynchburg Lemonade',      abv: 20,  category: 'Cocktail' },
  { id: '65',  name: 'Fuzzy Navel',             abv: 12,  category: 'Cocktail' },
  { id: '66',  name: 'Amaretto Sour',           abv: 18,  category: 'Cocktail' },
  { id: '67',  name: 'Alabama Slammer',         abv: 20,  category: 'Cocktail' },
  { id: '68',  name: 'Golden Cadillac',         abv: 20,  category: 'Cocktail' },
  { id: '69',  name: 'B-52',                    abv: 25,  category: 'Cocktail' },
  { id: '70',  name: 'Grasshopper',             abv: 15,  category: 'Cocktail' },
  { id: '71',  name: 'Rusty Nail',              abv: 25,  category: 'Cocktail' },
  { id: '72',  name: 'Between the Sheets',      abv: 30,  category: 'Cocktail' },
  { id: '73',  name: 'Cable Car',               abv: 25,  category: 'Cocktail' },
  { id: '74',  name: 'Bramble',                 abv: 18,  category: 'Cocktail' },
  { id: '75',  name: 'Salty Dog',               abv: 18,  category: 'Cocktail' },
  { id: '76',  name: 'Red Russian',             abv: 20,  category: 'Cocktail' },
  { id: '77',  name: 'White Lady',              abv: 28,  category: 'Cocktail' },
  { id: '78',  name: 'Suffering Bastard',       abv: 20,  category: 'Cocktail' },
  { id: '79',  name: 'Zombie',                  abv: 40,  category: 'Cocktail' },
  { id: '80',  name: 'Painkiller',              abv: 28,  category: 'Cocktail' },
  { id: '81',  name: 'Mai Tai',                 abv: 28,  category: 'Cocktail' },
  { id: '82',  name: 'Blue Hawaiian',           abv: 18,  category: 'Cocktail' },
  { id: '83',  name: 'Scorpion',                abv: 35,  category: 'Cocktail' },
  { id: '84',  name: 'Tiki Punch',              abv: 25,  category: 'Cocktail' },
  { id: '85',  name: 'Jungle Juice',            abv: 15,  category: 'Cocktail' },
  { id: '86',  name: 'Sangria',                 abv: 10,  category: 'Cocktail' },
  { id: '87',  name: 'Mulled Wine',             abv: 12,  category: 'Cocktail' },
  { id: '88',  name: 'Hot Buttered Rum',        abv: 25,  category: 'Cocktail' },
  { id: '89',  name: 'Eggnog',                  abv: 20,  category: 'Cocktail' },
  { id: '90',  name: 'Cuba Libre',              abv: 18,  category: 'Cocktail' },
  { id: '91',  name: 'Black Velvet',            abv: 12,  category: 'Cocktail' },
  { id: '92',  name: 'Kir',                     abv: 12,  category: 'Cocktail' },
  { id: '93',  name: 'Spritz',                  abv: 10,  category: 'Cocktail' },
  { id: '94',  name: 'Raspberry Margarita',     abv: 20,  category: 'Cocktail' },
  { id: '95',  name: 'Watermelon Vodka Cooler', abv: 15,  category: 'Cocktail' },
  { id: '96',  name: 'Tropical Punch',          abv: 18,  category: 'Cocktail' },
  { id: '97',  name: 'Grapefruit Mule',         abv: 20,  category: 'Cocktail' },
  { id: '98',  name: 'Cherry Bomb',             abv: 22,  category: 'Cocktail' },
  { id: '99',  name: 'Cucumber Cooler',         abv: 16,  category: 'Cocktail' },
  { id: '100', name: 'Lime Rickey',            abv: 18,  category: 'Cocktail' },

  // --- Italian drink entries (IDs 101–112) ---
  { id: '101', name: 'Amaro Montenegro',       abv: 23, category: 'Italian Drink', brand: 'Amaro Montenegro' },
  { id: '102', name: 'Campari',                abv: 25, category: 'Italian Drink', brand: 'Campari' },
  { id: '103', name: 'Aperol',                 abv: 11, category: 'Italian Drink', brand: 'Aperol' },
  { id: '104', name: 'Limoncello',             abv: 30, category: 'Italian Drink', brand: 'Limoncello' },
  { id: '105', name: 'Sambuca',                abv: 38, category: 'Italian Drink', brand: 'Sambuca' },
  { id: '106', name: 'Fernet-Branca',          abv: 39, category: 'Italian Drink', brand: 'Fernet-Branca' },
  { id: '107', name: 'Amaro Averna',           abv: 29, category: 'Italian Drink', brand: 'Amaro Averna' },
  { id: '108', name: 'Amaro Lucano',           abv: 28, category: 'Italian Drink', brand: 'Amaro Lucano' },
  { id: '109', name: 'Cynar',                  abv: 16, category: 'Italian Drink', brand: 'Cynar' },
  { id: '110', name: 'Ramazzotti',             abv: 30, category: 'Italian Drink', brand: 'Ramazzotti' },
  { id: '111', name: 'Strega',                 abv: 40, category: 'Italian Drink', brand: 'Strega' },
  { id: '112', name: 'Mirto',                  abv: 30, category: 'Italian Drink', brand: 'Mirto' }
];
