import axios from 'axios';
import 'dotenv/config';

const API_KEY = process.env.API_KEY;

const date = new Date('2024-12-09T14:07:00');
// 9 грудня 2024 року о 14:07.

let cachedQuote = 'Hello! its me';
let lastFetched = date.getTime();

const getRandomQuote = async () => {
  const now = Date.now();
  if (cachedQuote && lastFetched && now - lastFetched < 24 * 60 * 60 * 1000) {
    return cachedQuote;
  }

  try {
    const response = await axios.get("https://quotes.rest/qod", {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });
    cachedQuote = response.data.contents.quotes[0].quote;
    lastFetched = now;
    console.log("Fetched new quote:", cachedQuote);
    return cachedQuote;
  } catch (error) {
    console.error("Error fetching quote:", error);
    return "Sorry, no quote available.";
  }
};

export default getRandomQuote;