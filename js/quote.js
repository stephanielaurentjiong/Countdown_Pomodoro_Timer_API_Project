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
    fetch(url)
    .then((data) => data.json())
    .then(item => {
        quotesHistory.push({
            content: item.content, 
            author: item.author
        });
        // Updates the currentQuoteIndex to be the last item in the quotesHistory element. This will allow the "previous" button to navigate back through history. 
        currentQuoteIndex = quotesHistory.length - 1;
        displayQuote();
    });
};

let displayQuote = () => {
    // Get the specific quote. If just quotesHistory will get all of the quotes array.
    const quoteData = quotesHistory[currentQuoteIndex];
    quoteContainer.innerText = quoteData.content;
    authorContainer.innerText = quoteData.author;
};

nextBtn.addEventListener('click', getQuote);

prevBtn.addEventListener('click', () => {
    if (currentQuoteIndex > 0) {
        currentQuoteIndex--;
        displayQuote();
    }
});

getQuote();