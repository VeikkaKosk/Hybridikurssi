import { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { fetchQuote } from './api';
import { getDailyQuote, saveDailyQuote, saveFavoriteQuote } from './storage';
import { Quote } from './types';


export default function App() {
const [quote, setQuote] = useState<Quote | null>(null);


useEffect(() => {
async function loadQuote() {
try {
const daily = await getDailyQuote();
if (daily) {
setQuote(daily);
} else {
const newQuote = await fetchQuote();
setQuote(newQuote);
await saveDailyQuote(newQuote);
}
} catch (error) {
console.error('Error fetching quote:', error);
}
}
loadQuote();
}, []);


if (!quote) return <Text style={{ marginTop: 50, textAlign: 'center' }}>Loading...</Text>;


return (
<View style={styles.container}>
<Text style={styles.quote}>"{quote.quote}"</Text>
<Text style={styles.author}>— {quote.author}</Text>
<Button title="Save to Favorites" onPress={() => saveFavoriteQuote(quote)} />
</View>
);
}


const styles = StyleSheet.create({
container: { flex: 1, justifyContent: 'center', padding: 20 },
quote: { fontSize: 18, marginBottom: 12 },
author: { fontStyle: 'italic', marginBottom: 20 }
});