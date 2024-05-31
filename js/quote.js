const quoteContainer = document.getElementById('quote');
const authorContainer = document.getElementById('author');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const url = 'https://api.quotable.io/random';

// Store all fetched quotes
let quotesHistory = [];

// Why not start from 0? Because you want to be able to go back to the "previous" quotes. If not, it won't work. Why?
let currentQuoteIndex = -1;

// Fetch the quote, then adds to quotesHistory. 
let getQuote = () => {
    fetch(url) // Add the fetch function call
    .then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(item => {
        quotesHistory.push({
            content: item.content, 
            author: item.author
        });
        // Updates the currentQuoteIndex to be the last item in the quotesHistory array.
        currentQuoteIndex = quotesHistory.length - 1;
        displayQuote();
    })
    .catch((error) => {
        console.error('Fetch error:', error);
        // Optionally, display an error message to the user
        quoteContainer.innerText = 'Failed to fetch quote. Please try again later.';
        authorContainer.innerText = '';
    });
};

let displayQuote = () => {
    // Get the specific quote. If just quotesHistory will get all of the quotes array.
    const quoteData = quotesHistory[currentQuoteIndex];
    quoteContainer.innerText = quoteData.content;
    authorContainer.innerText = quoteData.author;
};

prevBtn.addEventListener('click', () => {
    if (currentQuoteIndex > 0) {
        currentQuoteIndex--;
        displayQuote();
    }
});

getQuote();

nextBtn.addEventListener('click', getQuote);