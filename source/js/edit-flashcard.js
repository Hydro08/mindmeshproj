import { protectPage } from "./utils.js";

export function initEditFlashcard(elements) {
  const {
    editFlashcardForm,
    editFlashcardQuestion,
    editFlashcardAnswer,
    editFlashcardCancelBtn,
  } = elements;

  const currentUser = protectPage();
  if (!currentUser) return;

  const urlParams = new URLSearchParams(window.location.search);
  const flashcardId = Number(urlParams.get("flashcardId"));
  const deckId = Number(urlParams.get("deckId"));

  const decksKey = `decks_${currentUser}`;

  if (
    isNaN(flashcardId) ||
    isNaN(deckId) ||
    flashcardId === null ||
    deckId === null
  ) {
    alert("Invalid flashcard or deck!");
    window.location.href = "dashboard.html";
    return;
  }

  let currentDeck = null;
  let currentFlashcard = null;

  function loadFlashcardData() {
    const decks = JSON.parse(localStorage.getItem(decksKey)) || [];

    currentDeck = decks.find((d) => d.id == deckId);

    if (!currentDeck) {
      alert("Deck not found!");
      window.location.href = `content.html?deckId=${deckId}`;
      return;
    }

    currentFlashcard = currentDeck.flashcards?.find((f) => f.id == flashcardId);

    if (!currentFlashcard) {
      alert("Flashcard not found!");
      window.location.href = `content.html?deckId=${deckId}`;
      return;
    }

    const categoryElement = document.getElementById("editFlashcardCategory");
    if (categoryElement) {
      categoryElement.textContent = currentDeck.category;
    }

    editFlashcardQuestion.value = currentFlashcard.question;
    editFlashcardAnswer.value = currentFlashcard.answer;
  }

  function updateFlashcard(question, answer) {
    const decks = JSON.parse(localStorage.getItem(decksKey)) || [];
    const deckIndex = decks.findIndex((d) => d.id == deckId); // use == not ===

    if (deckIndex === -1) {
      alert("Deck not found!");
      return false;
    }

    const flashcardIndex = decks[deckIndex].flashcards.findIndex(
      (f) => f.id == flashcardId, // use == not ===
    );

    if (flashcardIndex === -1) {
      alert("Flashcard not found!");
      return false;
    }

    decks[deckIndex].flashcards[flashcardIndex].question = question.trim();
    decks[deckIndex].flashcards[flashcardIndex].answer = answer.trim();

    localStorage.setItem(decksKey, JSON.stringify(decks));

    return true;
  }

  editFlashcardForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    const question = editFlashcardQuestion.value.trim();
    const answer = editFlashcardAnswer.value.trim();

    if (!question) {
      alert("Please enter a question!");
      return;
    }

    if (!answer) {
      alert("Please enter an answer!");
      return;
    }

    if (updateFlashcard(question, answer)) {
      alert("✅ Flashcard updated successfully!");
      window.location.href = `content.html?deckId=${deckId}`;
    }
  });

  editFlashcardCancelBtn?.addEventListener("click", () => {
    window.location.href = `content.html?deckId=${deckId}`;
  });

  document
    .getElementById("editFlashcardBackLink")
    ?.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = `content.html?deckId=${deckId}`;
    });

  loadFlashcardData();
}
