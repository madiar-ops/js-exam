const quoteBtn = document.getElementById('get-quote');
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');

quoteBtn.addEventListener('click', async () => {
  quoteText.textContent = "Загружаю...";
  quoteAuthor.textContent = "";

  try {
    const response = await fetch('https://quoteslate.vercel.app/api/quotes/random');
    const data = await response.json();

    quoteText.textContent = `"${data.quote}"`;
    quoteAuthor.textContent = `— ${data.author}`;
  } catch (error) {
    quoteText.textContent = "Что-то пошло не так :(";
    console.error(error);
  }
});
