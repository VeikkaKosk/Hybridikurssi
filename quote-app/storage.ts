import AsyncStorage from '@react-native-async-storage/async-storage';
import { Quote } from './types';


const QUOTE_KEY = 'DAILY_QUOTE';
const DATE_KEY = 'QUOTE_DATE';
const FAVORITES_KEY = 'FAVORITES';


export async function getDailyQuote(): Promise<Quote | null> {
const today = new Date().toDateString();
const savedDate = await AsyncStorage.getItem(DATE_KEY);


if (savedDate === today) {
const savedQuote = await AsyncStorage.getItem(QUOTE_KEY);
return savedQuote ? JSON.parse(savedQuote) : null;
}
return null;
}


export async function saveDailyQuote(quote: Quote) {
const today = new Date().toDateString();
await AsyncStorage.setItem(QUOTE_KEY, JSON.stringify(quote));
await AsyncStorage.setItem(DATE_KEY, today);
}


export async function saveFavoriteQuote(quote: Quote) {
const stored = await AsyncStorage.getItem(FAVORITES_KEY);
const favorites: Quote[] = stored ? JSON.parse(stored) : [];
favorites.push(quote);
await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}