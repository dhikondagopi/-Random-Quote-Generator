const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");
const copyBtn = document.getElementById("copy-quote");
const tweetBtn = document.getElementById("tweet-quote");
const loader = document.getElementById("loader");

// ✅ Your API key
const API_KEY = "rxvwqvsbX8p/xt0ZeVjfRg==c1ceG6sJrN4UmqEg";
const API_URL = "https://api.api-ninjas.com/v2/quotes?categories=success,wisdom";

async function getQuote() {
  showLoader();

  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "X-Api-Key": API_KEY,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error(`API Error: ${response.status}`);

    const data = await response.json();

    // ✅ API returns an array; pick first quote safely
    const quoteObj = data[0] || { quote: "No quote found", author: "Unknown" };

    // Add fade animation for smooth change
    quoteText.classList.remove("fade");
    void quoteText.offsetWidth; // restart animation
    quoteText.classList.add("fade");

    // ✅ Display quote text and author correctly
    quoteText.textContent = `"${quoteObj.quote}"`;
    quoteAuthor.textContent = `— ${quoteObj.author || "Unknown"}`;

    hideLoader();
    changeBackground();
  } catch (error) {
    console.error("Error fetching quote:", error);
    quoteText.textContent = "⚠️ Error fetching quote.";
    quoteAuthor.textContent = "";
    hideLoader();
  }
}

function showLoader() {
  loader.style.display = "block";
  quoteText.style.display = "none";
  quoteAuthor.style.display = "none";
}

function hideLoader() {
  loader.style.display = "none";
  quoteText.style.display = "block";
  quoteAuthor.style.display = "block";
}

function changeBackground() {
  const colors = [
    ["#667eea", "#764ba2"],
    ["#ff6b6b", "#556270"],
    ["#56ab2f", "#a8e063"],
    ["#ff9966", "#ff5e62"],
    ["#43cea2", "#185a9d"],
  ];
  const random = Math.floor(Math.random() * colors.length);
  document.body.style.background = `linear-gradient(135deg, ${colors[random][0]}, ${colors[random][1]})`;
}

// 📋 Copy quote
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(`${quoteText.textContent} ${quoteAuthor.textContent}`);
  alert("✅ Quote copied to clipboard!");
});

// 🐦 Tweet quote
tweetBtn.addEventListener("click", () => {
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `${quoteText.textContent} ${quoteAuthor.textContent}`
  )}`;
  window.open(tweetUrl, "_blank");
});

// 🔁 Button listener
newQuoteBtn.addEventListener("click", getQuote);

// 🚀 Auto-load first quote on page load
getQuote();
