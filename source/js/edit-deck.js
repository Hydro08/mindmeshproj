import { protectPage } from "./utils.js";

export function initEditDeck(elements) {
  const { editDeckForm, editDeckName, editCategoryName, editDeckCancelBtn } =
    elements;

  const currentUser = protectPage();
  if (!currentUser) return;

  const urlParams = new URLSearchParams(window.location.search);
  const deckId = Number(urlParams.get("deckId"));

  const decksKey = `decks_${currentUser}`;

  if (isNaN(deckId) || deckId === null) {
    alert("Invalid deck!");
    window.location.href = "dashboard.html";
    return;
  }

  let currentDeck = null;

  function loadDeckData() {
    const decks = JSON.parse(localStorage.getItem(decksKey)) || [];

    currentDeck = decks.find((d) => d.id == deckId);

    if (!currentDeck) {
      alert("Deck not found!");
      window.location.href = "dashboard.html";
      return;
    }

    editDeckName.value = currentDeck.title;
    editCategoryName.value = currentDeck.category;
  }

  function updateDeck(title, category) {
    const decks = JSON.parse(localStorage.getItem(decksKey)) || [];
    const deckIndex = decks.findIndex((d) => d.id == deckId);

    if (deckIndex === -1) {
      alert("Deck not found!");
      return false;
    }

    decks[deckIndex].title = title.trim();
    decks[deckIndex].category = category.trim();

    localStorage.setItem(decksKey, JSON.stringify(decks));

    return true;
  }

  editDeckForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = editDeckName.value.trim();
    const category = editCategoryName.value.trim();

    if (!title) {
      alert("Please enter a deck name!");
      return;
    }

    if (!category) {
      alert("Please enter a category!");
      return;
    }

    if (updateDeck(title, category)) {
      alert("Deck updated successfully!");
      window.location.href = "dashboard.html";
    }
  });

  editDeckCancelBtn?.addEventListener("click", () => {
    window.location.href = "dashboard.html";
  });

  document
    .getElementById("editDeckBackLink")
    ?.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "dashboard.html";
    });

  loadDeckData();
}
