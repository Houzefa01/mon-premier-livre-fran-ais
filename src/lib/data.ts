/** Données pédagogiques françaises */

export interface LettreData {
  lettre: string;
  majuscule: string;
  motExemple: string;
  emoji: string;
  couleur: string;
}

export const ALPHABET: LettreData[] = [
  { lettre: "a", majuscule: "A", motExemple: "avion", emoji: "✈️", couleur: "bg-primary" },
  { lettre: "b", majuscule: "B", motExemple: "ballon", emoji: "🎈", couleur: "bg-secondary" },
  { lettre: "c", majuscule: "C", motExemple: "chat", emoji: "🐱", couleur: "bg-fun-purple" },
  { lettre: "d", majuscule: "D", motExemple: "dauphin", emoji: "🐬", couleur: "bg-fun-green" },
  { lettre: "e", majuscule: "E", motExemple: "étoile", emoji: "⭐", couleur: "bg-fun-yellow" },
  { lettre: "f", majuscule: "F", motExemple: "fleur", emoji: "🌸", couleur: "bg-fun-pink" },
  { lettre: "g", majuscule: "G", motExemple: "girafe", emoji: "🦒", couleur: "bg-primary" },
  { lettre: "h", majuscule: "H", motExemple: "hibou", emoji: "🦉", couleur: "bg-secondary" },
  { lettre: "i", majuscule: "I", motExemple: "igloo", emoji: "🏠", couleur: "bg-fun-purple" },
  { lettre: "j", majuscule: "J", motExemple: "jardin", emoji: "🌻", couleur: "bg-fun-green" },
  { lettre: "k", majuscule: "K", motExemple: "koala", emoji: "🐨", couleur: "bg-fun-yellow" },
  { lettre: "l", majuscule: "L", motExemple: "lion", emoji: "🦁", couleur: "bg-primary" },
  { lettre: "m", majuscule: "M", motExemple: "maison", emoji: "🏡", couleur: "bg-fun-pink" },
  { lettre: "n", majuscule: "N", motExemple: "nuage", emoji: "☁️", couleur: "bg-secondary" },
  { lettre: "o", majuscule: "O", motExemple: "orange", emoji: "🍊", couleur: "bg-primary" },
  { lettre: "p", majuscule: "P", motExemple: "papillon", emoji: "🦋", couleur: "bg-fun-purple" },
  { lettre: "q", majuscule: "Q", motExemple: "quatre", emoji: "4️⃣", couleur: "bg-fun-green" },
  { lettre: "r", majuscule: "R", motExemple: "robot", emoji: "🤖", couleur: "bg-secondary" },
  { lettre: "s", majuscule: "S", motExemple: "soleil", emoji: "☀️", couleur: "bg-fun-yellow" },
  { lettre: "t", majuscule: "T", motExemple: "tortue", emoji: "🐢", couleur: "bg-fun-green" },
  { lettre: "u", majuscule: "U", motExemple: "usine", emoji: "🏭", couleur: "bg-fun-pink" },
  { lettre: "v", majuscule: "V", motExemple: "vélo", emoji: "🚲", couleur: "bg-primary" },
  { lettre: "w", majuscule: "W", motExemple: "wagon", emoji: "🚃", couleur: "bg-secondary" },
  { lettre: "x", majuscule: "X", motExemple: "xylophone", emoji: "🎵", couleur: "bg-fun-purple" },
  { lettre: "y", majuscule: "Y", motExemple: "yacht", emoji: "⛵", couleur: "bg-fun-yellow" },
  { lettre: "z", majuscule: "Z", motExemple: "zèbre", emoji: "🦓", couleur: "bg-fun-pink" },
];

export const VOYELLES = ["a", "e", "i", "o", "u", "é", "è", "ê"];
export const CONSONNES = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "r", "s", "t", "v"];

/** Syllabes par niveau de difficulté */
export const SYLLABES_NIVEAUX = [
  {
    niveau: 1,
    nom: "Syllabes simples",
    syllabes: ["ba", "be", "bi", "bo", "bu", "da", "de", "di", "do", "du", "fa", "fe", "fi", "fo", "fu"],
  },
  {
    niveau: 2,
    nom: "Syllabes courantes",
    syllabes: ["la", "le", "li", "lo", "lu", "ma", "me", "mi", "mo", "mu", "na", "ne", "ni", "no", "nu"],
  },
  {
    niveau: 3,
    nom: "Syllabes avancées",
    syllabes: ["pa", "pe", "pi", "po", "pu", "ra", "re", "ri", "ro", "ru", "sa", "se", "si", "so", "su", "ta", "te", "ti", "to", "tu"],
  },
];

export interface MotLecture {
  mot: string;
  image: string;
  syllabes: string[];
}

export const MOTS_LECTURE: MotLecture[] = [
  { mot: "chat", image: "🐱", syllabes: ["chat"] },
  { mot: "lune", image: "🌙", syllabes: ["lu", "ne"] },
  { mot: "papa", image: "👨", syllabes: ["pa", "pa"] },
  { mot: "mama", image: "👩", syllabes: ["ma", "ma"] },
  { mot: "bébé", image: "👶", syllabes: ["bé", "bé"] },
  { mot: "vélo", image: "🚲", syllabes: ["vé", "lo"] },
  { mot: "livre", image: "📖", syllabes: ["li", "vre"] },
  { mot: "soleil", image: "☀️", syllabes: ["so", "leil"] },
  { mot: "maison", image: "🏡", syllabes: ["mai", "son"] },
  { mot: "banane", image: "🍌", syllabes: ["ba", "na", "ne"] },
  { mot: "tomate", image: "🍅", syllabes: ["to", "ma", "te"] },
  { mot: "robot", image: "🤖", syllabes: ["ro", "bot"] },
];
