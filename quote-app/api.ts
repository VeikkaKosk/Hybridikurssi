import { Quote } from './types';


const API_URL = 'https://dummyjson.com/quotes/random';


export async function fetchQuote(): Promise<Quote> {
const response = await fetch(API_URL);
if (!response.ok) throw new Error(`API request failed with status ${response.status}`);


const data = await response.json();
return {
quote: data.quote,
author: data.author
};
}