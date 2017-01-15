// event listener to respond to "Show another quote" button clicks
// when user clicks anywhere on the button, the "printQuote" function is called


var html = '';
var usedQuotes = [];
var refreshIntervalId;

function initialize()
{
	resetAvailableQuoteIndexes();
    refreshIntervalId = window.setInterval(printQuote, 10 * 1000);
}

// Reset the available quote indexes so that all quotes are 
// available again.
function resetQuotes()
{
  quotes = usedQuotes;
  usedQuotes = [];
}

// Retrieve a non-duplicate random quotation object for the defined set of quotes.
function getRandomQuote(){
  var quoteIdx = Math.floor(Math.random() * quotes.length);
  var quote = quotes[quoteIdx];

  // Let's move the quote into the usedQuotes so we don't use it again
  // until all the other quotes have been displayed.
  quotes.splice(quoteIdx,1);
  usedQuotes.push(quote);

  if (quotes.length === 0)
  {
  	quotes = usedQuotes;
  	usedQuotes = [];
  }
  return quote;
}

// Update page with a new random quotation
function printQuote()
{
	window.clearInterval(refreshIntervalId);
	var quotation = getRandomQuote();
	html = '<p class="quote">' + quotation.quote + '</p>';
	html += '<p class="source">' + quotation.source;
	formatOptional(quotation, "citation");
    formatOptional(quotation, "year");
    formatOptional(quotation, "mood");
    if (hasProperty(quotation, "resource"))
    {
    	formatResource(quotation);
    }
    updateBackgroundColor();
	document.getElementById('quote-box').innerHTML = html;
	refreshIntervalId = window.setInterval(printQuote, 10 * 1000);
}

// Format an optional property (if it is available)
function formatOptional(quotation, property)
{
	if (hasProperty(quotation, property))
    {
    	html += '<span class="' + property + '">' + quotation[property] + '</span>';
    }
}

// Format a resource 
function formatResource(quotation)
{
  var resource = quotation["resource"];
  html += '<p class="resource"><a target="_blank" href="' + resource.link + '">' + resource.description + '</a></p>';
}

// Check if a property exists on a quotation object
function hasProperty(quotation, property)
{
   return quotation[property] !== undefined;
}

// Update the background color (only using up to 100 in each of the r, g, b values so that 
// the text will always be visible.)
function updateBackgroundColor()
{
  var r = Math.floor(Math.random() * 100);
  var g = Math.floor(Math.random() * 100);
  var b = Math.floor(Math.random() * 100);
  document.body.style.backgroundColor = "rgb(" + r + "," + g + "," + b +")"
}

document.getElementById('loadQuote').addEventListener("click", printQuote, false);

