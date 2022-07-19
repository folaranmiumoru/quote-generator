const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterButton = document.getElementById("twitter");
const newQuoteButton = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// Show Loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}
// get quotes from API
let apiQuotes = [];

//show new quote
function newQuote() {
  loading();
  const proxyUrl = "https://whispering-tor-04671.herokuapp.com/";
  //pick a randomquote from apiQuotes array
  const quoteNow = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  //check if author field is blank and replace with "unknown"
  if (!quoteNow.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quoteNow.author;
  }
  //check quote length to determine the styling
  if (quoteNow.text.length > 50) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  //console.log(quoteNow);
  quoteText.textContent = quoteNow.text;
  complete();
}

async function getQuotes() {
  loading();
  const proxyUrl = "https://whispering-tor-04671.herokuapp.com/";
  const apiUrl = "https://type.fit/api/quotes";

  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {}
}

//Tweet quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

//Event Listeners
newQuoteButton.addEventListener("click", newQuote);
twitterButton.addEventListener("click", tweetQuote);

//loading();
getQuotes();
