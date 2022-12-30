const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.querySelector('.loader');
let result=document.querySelector('.result');
loader.classList.add('hidden');
let apiQuotes = [];

// Get Quotes from API

//Show new quotes:
function newQuote() {
  //Pick random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  //check if author field is blank and replace it with "Uknown"
  if (!quote.author) {
    authorText.textContent = "Unkown";
  } else {
    authorText.textContent = quote.author;
  }
  //Check Quote length to determine styling 
  if (quote.text.length > 120) {quoteText.classList.add(long-quote)} 
  quoteText.textContent = quote.text;
  return `${quoteText.textContent}\n${authorText.textContent}`
}

// Si on veut travailler en local:
// function newQuote(){
//     //Pick random quote from apiQuotes array
//     const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)]
//     console.log(quote);
// }

async function getQuotes() {
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // catch error here
    console.log(error);
  }
}
//On load

//Twiter Button
twitterBtn.addEventListener('click', function() {
  const text = `${quoteText.textContent}\n${authorText.textContent}`
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
});
//New Quote Button
newQuoteBtn.addEventListener('click', function() {
  // Show the loader
  loader.classList.remove('hidden');

  // Call the getQuotes function and wait for the result
  getQuotes().then(function() {
    // When the result is ready, hide the loader and show the result
    loader.classList.add('hidden');
    result.classList.remove('hidden');
  });
});