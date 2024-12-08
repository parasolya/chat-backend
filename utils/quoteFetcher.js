import axios from 'axios';
import dotenv from 'dotenv';


dotenv.config();

const API_KEY = process.env.API_KEY;



const getRandomQuote = async () => {
  try {
    const response = await axios.get('https://quotes.rest/qod', {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,  
      },
    });
    console.log('Random Quote:', response.data.contents.quotes[0].quote);
    
    return response.data.contents.quotes[0].quote;
  } catch (err) {
    console.error('Error fetching quote:', err);
    return 'Sorry, I couldn\'t fetch a quote at the moment.';
  }
};

export default getRandomQuote;