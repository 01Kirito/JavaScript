// Get quote and set it to html
var apiQuotes = [];
var quote;

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");
const link_nextQuote = document.getElementById("newQuote");
const link_tweet = document.getElementById("tweet");
const copy = document.getElementById("copy");
const text = document.getElementById("placeholder - 9dj27");
const loader = document.getElementById('loader');
const textcopied = document.getElementById("textCopy");


function addClassForDuration(element, className, duration) {
  element.classList.add(className); // Add the class to the element

  setTimeout(function () {
    element.classList.remove(className); // Remove the class after the specified duration
  }, duration);
}


function newQuote() {
  var quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  quoteText.textContent = quote.text;
  if (quote.author === null) {
    quoteAuthor.textContent = "Unknown";
  } else {
    quoteAuthor.textContent = quote.author;
  }
}

async function getQuotes() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";

  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    alert(error);
  }
  complete();
}

getQuotes();

function handleClick(event) {
  event.preventDefault();
  getQuotes();
}


link_nextQuote.addEventListener("click", handleClick);
link_tweet.addEventListener("click", TweetQuote);
copy.addEventListener("click", copyToClipboard);

// Tweet Quote

function TweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent}&url=`;
  window.open(twitterUrl, "_blank");
}

// Function to copy text to the clipboard
function copyToClipboard() {
  const tempTextarea = document.createElement("textarea");
  tempTextarea.value = quoteText.textContent;

  // Append the temporary textarea to the document
  document.body.appendChild(tempTextarea);

  // Select and copy the text from the temporary textarea
  tempTextarea.select();
  document.execCommand("copy");

  // Remove the temporary textarea from the document
  document.body.removeChild(tempTextarea);
  textcopied.classList.add("show");
  addClassForDuration(textcopied, "show", 2000);
  // Optionally, display a message to indicate that the text has been copied
  // alert("Text copied to clipboard: " + quoteText);
}


//  Show loading

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

