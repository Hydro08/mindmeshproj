import { protectPage } from "./utils.js";

export function initCreateDeck(elements) {
  const {
    createDeckForm,
    createDeckName,
    createCategoryName,
    createDeckCancelBtn,
  } = elements;

  const currentUser = protectPage();
  if (!currentUser) return;

  const storageKey = `decks_${currentUser}`;

  const getUserDecks = () => JSON.parse(localStorage.getItem(storageKey)) || [];
  const saveUserDecks = (decks) =>
    localStorage.setItem(storageKey, JSON.stringify(decks));

  createDeckCancelBtn?.addEventListener("click", () => {
    window.location.href = "dashboard.html";
  });

  createDeckForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = createDeckName.value.trim();
    if (!title) return alert("Deck name is required");

    const newDeck = {
      id: Date.now(),
      title,
      category: createCategoryName.value.trim() || "Uncategorized",
      flashcards: [],
      lastStudied: "Not studied yet",
    };

    const decks = getUserDecks();
    decks.push(newDeck);
    saveUserDecks(decks);

    window.location.href = "dashboard.html";
  });
}
