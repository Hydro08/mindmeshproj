import { protectPage } from "./utils.js";

export function initCreateFlashcard(elements) {
  const {
    createFlashcardForm,
    createFlashcardQuestion,
    createFlashcardAnswer,
    createFlashcardCancelBtn,
  } = elements;

  const currentUser = protectPage();
  if (!currentUser) return;

  const activeDeckId = Number(localStorage.getItem("activeDeckId"));

  if (!activeDeckId) {
    alert("No deck selected!");
    window.location.href = "dashboard.html";
    return;
  }

  const decksKey = `decks_${currentUser}`;

  function loadDeckInfo() {
    const decks = JSON.parse(localStorage.getItem(decksKey)) || [];
    const currentDeck = decks.find((d) => d.id === activeDeckId);

    if (!currentDeck) {
      alert("Deck not found!");
      window.location.href = "dashboard.html";
      return;
    }

    const categoryElement = document.getElementById("flashcardCategory");
    if (categoryElement) {
      categoryElement.textContent = currentDeck.category;
    }

    return currentDeck;
  }

  function saveFlashcard(question, answer) {
    const decks = JSON.parse(localStorage.getItem(decksKey)) || [];
    const deckIndex = decks.findIndex((d) => d.id === activeDeckId);

    if (deckIndex === -1) {
      alert("Deck not found!");
      return false;
    }

    const newFlashcard = {
      id: Date.now(),
      question: question.trim(),
      answer: answer.trim(),
    };

    if (!decks[deckIndex].flashcards) {
      decks[deckIndex].flashcards = [];
    }

    decks[deckIndex].flashcards.push(newFlashcard);
    decks[deckIndex].cards = decks[deckIndex].flashcards.length;
    localStorage.setItem(decksKey, JSON.stringify(decks));

    return true;
  }

  createFlashcardForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    const question = createFlashcardQuestion.value.trim();
    const answer = createFlashcardAnswer.value.trim();

    if (!question) {
      alert("Please enter a question!");
      return;
    }

    if (!answer) {
      alert("Please enter an answer!");
      return;
    }

    if (saveFlashcard(question, answer)) {
      alert("✅ Flashcard created successfully!");

      window.location.href = `content.html?deckId=${activeDeckId}`;
    }
  });

  createFlashcardCancelBtn?.addEventListener("click", () => {
    window.location.href = `content.html?deckId=${activeDeckId}`;
  });

  document
    .getElementById("createFlashcardBackLink")
    ?.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = `content.html?deckId=${activeDeckId}`;
    });

  loadDeckInfo();
}
