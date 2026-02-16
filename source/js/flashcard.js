import { protectPage } from "./utils.js";
import { updateDeckLastStudied } from "./dashboard.js";

export function initFlashcard(elements) {
  const currentUser = protectPage();
  if (!currentUser) return;

  const {
    flashcardWrapper,
    flashcardRevealBtn,
    flashcardBackBtn,
    flashcardSubmitBtn,
    flashcardAnswerInput,
    flashcardPrevBtn,
    flashcardNextBtn,
    flashboardCreateBtn,
    allCategoriesBtn,
    categoryDropdown,
    flashcardOptionsBtn,
    flashcardOptionsMenu,
    editFlashcardBtn,
    deleteFlashcardBtn,
    resetProgressBtn,
  } = elements;

  const flashcardPrevBtnMobile = document.getElementById(
    "flashcardPrevBtnMobile",
  );
  const flashcardNextBtnMobile = document.getElementById(
    "flashcardNextBtnMobile",
  );

  const urlParams = new URLSearchParams(window.location.search);
  const deckId = Number(urlParams.get("deckId"));
  const decksKey = `decks_${currentUser}`;
  const userDataKey = `user_${currentUser}`;

  let flashcards = [];
  let currentCardIndex = 0;
  let currentDeck = null;
  let cardHistory = [];
  let historyPosition = 0;
  let viewedCardIds = new Set();
  let studyStartTime = null;

  function startStudyTimeTracking() {
    if (flashcards.length === 0) return;
    studyStartTime = Date.now();
  }

  function saveStudyTime() {
    if (!studyStartTime) return;

    const studyEndTime = Date.now();
    const studyDuration = Math.floor((studyEndTime - studyStartTime) / 60000);

    if (studyDuration > 0) {
      const userData = JSON.parse(localStorage.getItem(userDataKey)) || {
        totalStudyTime: 0,
      };
      userData.totalStudyTime = (userData.totalStudyTime || 0) + studyDuration;
      localStorage.setItem(userDataKey, JSON.stringify(userData));
    }
  }

  window.addEventListener("beforeunload", saveStudyTime);

  if (deckId) {
    updateDeckLastStudied(deckId);
  }

  function loadFlashcardsFromStorage() {
    if (!deckId) return [];

    const decks = JSON.parse(localStorage.getItem(decksKey)) || [];
    currentDeck = decks.find((d) => d.id == deckId);

    if (currentDeck) {
      const titleElem = document.querySelector(".subject-title");
      if (titleElem) titleElem.textContent = currentDeck.title;

      const countElem = document.querySelector(".card-info");
      if (countElem) {
        countElem.textContent = `${currentDeck.flashcards?.length || 0} cards • Active Recall Mode`;
      }
    }

    return currentDeck?.flashcards || [];
  }

  flashcards = loadFlashcardsFromStorage();
  startStudyTimeTracking();

  function getRandomCardIndex() {
    if (flashcards.length === 0) return 0;
    if (flashcards.length === 1) return 0;

    const unviewedIndices = [];
    for (let i = 0; i < flashcards.length; i++) {
      const cardId = flashcards[i].id;
      if (!viewedCardIds.has(cardId)) {
        unviewedIndices.push(i);
      }
    }

    if (unviewedIndices.length > 0) {
      const randomIndex = Math.floor(Math.random() * unviewedIndices.length);
      return unviewedIndices[randomIndex];
    }

    return null;
  }

  function hasViewedAllCards() {
    return viewedCardIds.size >= flashcards.length;
  }

  function closeAllMenus() {
    flashcardOptionsMenu?.classList.remove("show");
    categoryDropdown?.classList.remove("show");
  }

  function updateNavigationButtons() {
    const isFlipped = flashcardWrapper?.classList.contains("flipped");

    if (isFlipped) {
      flashcardPrevBtn.disabled = true;
      flashcardNextBtn.disabled = true;
      if (flashcardPrevBtnMobile) flashcardPrevBtnMobile.disabled = true;
      if (flashcardNextBtnMobile) flashcardNextBtnMobile.disabled = true;
    } else {
      const prevDisabled = historyPosition === 0;
      const allViewed = hasViewedAllCards();
      const atEnd = historyPosition === cardHistory.length - 1;
      const nextDisabled = allViewed && atEnd;

      flashcardPrevBtn.disabled = prevDisabled;
      flashcardNextBtn.disabled = nextDisabled;
      if (flashcardPrevBtnMobile)
        flashcardPrevBtnMobile.disabled = prevDisabled;
      if (flashcardNextBtnMobile)
        flashcardNextBtnMobile.disabled = nextDisabled;
    }
  }

  flashcardRevealBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    flashcardWrapper?.classList.add("flipped");
    closeAllMenus();
    updateNavigationButtons();
  });

  flashcardBackBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    flashcardWrapper?.classList.remove("flipped");
    if (flashcardAnswerInput) flashcardAnswerInput.value = "";
    closeAllMenus();
    updateNavigationButtons();
  });

  flashcardSubmitBtn?.addEventListener("click", () => {
    if (!flashcards.length) return;

    const userAnswer = flashcardAnswerInput.value.trim();
    if (!userAnswer) {
      alert("Please enter an answer!");
      return;
    }

    const currentFlashcard = flashcards[currentCardIndex];
    const correctAnswer = currentFlashcard.answer;

    currentFlashcard.isMastered =
      userAnswer.toLowerCase() === correctAnswer.toLowerCase();

    alert(
      currentFlashcard.isMastered
        ? "✅ Correct!"
        : `❌ Wrong! Correct: ${correctAnswer}`,
    );

    flashcardWrapper.classList.add("flipped");
    flashcardAnswerInput.value = "";
    closeAllMenus();
    updateNavigationButtons();

    saveDeckProgress(currentFlashcard);
  });

  flashcardAnswerInput?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") flashcardSubmitBtn?.click();
  });

  function saveDeckProgress(currentFlashcard) {
    const decks = JSON.parse(localStorage.getItem(decksKey)) || [];
    const deckIndex = decks.findIndex((d) => d.id == deckId);

    if (deckIndex !== -1) {
      const deck = decks[deckIndex];

      const cardIndex = deck.flashcards.findIndex(
        (c) => c.id === currentFlashcard.id,
      );
      if (cardIndex !== -1) {
        deck.flashcards[cardIndex] = currentFlashcard;
      }

      deck.cards = deck.flashcards.length;
      deck.mastered = deck.flashcards.filter((c) => c.isMastered).length;
      deck.progress =
        deck.cards === 0 ? 0 : Math.round((deck.mastered / deck.cards) * 100);

      decks[deckIndex] = deck;
      localStorage.setItem(decksKey, JSON.stringify(decks));

      window.dispatchEvent(new Event("storage"));
    }
  }

  function handlePrevious() {
    if (!flashcards.length) return;

    if (historyPosition > 0) {
      historyPosition--;
      currentCardIndex = cardHistory[historyPosition];
      loadCard();
    }
  }

  function handleNext() {
    if (!flashcards.length) return;

    if (hasViewedAllCards() && historyPosition === cardHistory.length - 1) {
      return;
    }

    if (historyPosition < cardHistory.length - 1) {
      historyPosition++;
      currentCardIndex = cardHistory[historyPosition];
      loadCard();
      return;
    }

    const newCardIndex = getRandomCardIndex();

    if (newCardIndex === null) {
      loadCard();
      return;
    }

    currentCardIndex = newCardIndex;
    cardHistory.push(currentCardIndex);
    historyPosition = cardHistory.length - 1;

    loadCard();
  }

  flashcardPrevBtn?.addEventListener("click", handlePrevious);
  flashcardPrevBtnMobile?.addEventListener("click", handlePrevious);

  flashcardNextBtn?.addEventListener("click", handleNext);
  flashcardNextBtnMobile?.addEventListener("click", handleNext);

  flashboardCreateBtn?.addEventListener("click", () => {
    if (!deckId) {
      alert("No deck selected!");
      return;
    }
    localStorage.setItem("activeDeckId", deckId);
    window.location.href = "create-flashcard.html";
  });

  document
    .getElementById("flashcardBackButton")
    ?.addEventListener("click", () => {
      window.location.href = "dashboard.html";
    });

  function loadCategoriesDropdown() {
    if (!categoryDropdown) return;

    const decks = JSON.parse(localStorage.getItem(decksKey)) || [];
    const categories = [...new Set(decks.map((deck) => deck.category))].filter(
      Boolean,
    );

    categoryDropdown.innerHTML = "";

    categories.forEach((category) => {
      const item = document.createElement("div");
      item.className = "category-item";
      item.textContent = category;
      item.dataset.category = category;

      if (currentDeck && category === currentDeck.category) {
        item.classList.add("active");
      }

      item.addEventListener("click", () => {
        filterByCategory(category);
      });

      categoryDropdown.appendChild(item);
    });
  }

  function filterByCategory(category) {
    const decks = JSON.parse(localStorage.getItem(decksKey)) || [];
    const categoryDecks = decks.filter((d) => d.category === category);

    if (categoryDecks.length === 0) {
      alert("No decks found in this category");
      return;
    }

    const firstDeck = categoryDecks[0];
    window.location.href = `content.html?deckId=${firstDeck.id}`;
  }

  allCategoriesBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    categoryDropdown?.classList.toggle("show");
    flashcardOptionsMenu?.classList.remove("show");
  });

  flashcardOptionsBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    flashcardOptionsMenu?.classList.toggle("show");
    categoryDropdown?.classList.remove("show");
  });

  editFlashcardBtn?.addEventListener("click", () => {
    if (!flashcards.length) return;
    const currentFlashcard = flashcards[currentCardIndex];
    window.location.href = `edit-flashcard.html?flashcardId=${currentFlashcard.id}&deckId=${deckId}`;
  });

  deleteFlashcardBtn?.addEventListener("click", () => {
    if (!flashcards.length) return;

    const currentFlashcard = flashcards[currentCardIndex];

    if (
      !confirm(
        `Delete this flashcard?\n\nQuestion: ${currentFlashcard.question}`,
      )
    ) {
      closeAllMenus();
      return;
    }

    const decks = JSON.parse(localStorage.getItem(decksKey)) || [];
    const deckIndex = decks.findIndex((d) => d.id == deckId);

    if (deckIndex === -1) {
      alert("Deck not found!");
      return;
    }

    decks[deckIndex].flashcards = decks[deckIndex].flashcards.filter(
      (card) => card.id !== currentFlashcard.id,
    );

    decks[deckIndex].cards = decks[deckIndex].flashcards.length;
    localStorage.setItem(decksKey, JSON.stringify(decks));

    flashcards = decks[deckIndex].flashcards;

    cardHistory = flashcards.length > 0 ? [0] : [];
    historyPosition = 0;
    currentCardIndex = 0;
    viewedCardIds.clear();

    closeAllMenus();
    loadCard();
    alert("✅ Flashcard deleted successfully!");
  });

  resetProgressBtn?.addEventListener("click", () => {
    if (!flashcards.length) {
      alert("No flashcards to reset!");
      return;
    }

    const confirmed = confirm(
      "Are you sure you want to reset all progress for this deck?\n\nThis will mark all cards as not mastered.",
    );

    if (!confirmed) return;

    flashcards.forEach((card) => {
      card.isMastered = false;
    });

    const decks = JSON.parse(localStorage.getItem(decksKey)) || [];
    const deckIndex = decks.findIndex((d) => d.id == deckId);

    if (deckIndex !== -1) {
      decks[deckIndex].flashcards = flashcards;
      decks[deckIndex].mastered = 0;
      decks[deckIndex].progress = 0;

      localStorage.setItem(decksKey, JSON.stringify(decks));
      window.dispatchEvent(new Event("storage"));
    }

    viewedCardIds.clear();
    cardHistory = [0];
    historyPosition = 0;
    currentCardIndex = 0;

    loadCard();
    alert("✅ Progress reset successfully!");
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".category-dropdown-wrapper")) {
      categoryDropdown?.classList.remove("show");
    }
    if (!e.target.closest(".flashcard-options-wrapper")) {
      flashcardOptionsMenu?.classList.remove("show");
    }
  });

  function loadCard() {
    if (!flashcards.length) {
      showEmptyState();
      return;
    }

    closeAllMenus();

    const card = flashcards[currentCardIndex];

    if (card && card.id) {
      viewedCardIds.add(card.id);
    }

    document.querySelector(".flashcard-question").textContent = card.question;
    document.querySelector(".flashcard-answer").textContent = card.answer;

    document.getElementById("currentCard").textContent = viewedCardIds.size;
    document.getElementById("totalCards").textContent = flashcards.length;

    flashcardAnswerInput.value = "";
    flashcardWrapper.style.display = "block";
    flashcardWrapper.classList.remove("flipped");

    updateNavigationButtons();

    const emptyState = document.querySelector(".empty-state");
    if (emptyState) emptyState.style.display = "none";
  }

  function showEmptyState() {
    flashcardWrapper.style.display = "none";

    let emptyState = document.querySelector(".empty-state");
    if (!emptyState) {
      emptyState = document.createElement("div");
      emptyState.className = "empty-state";
      emptyState.innerHTML = `
        <i class="fa-solid fa-layer-group"></i>
        <h2>No Flashcards Yet</h2>
        <p>Click "+ Create Flashcard" to get started!</p>
      `;
      flashcardWrapper.parentElement.insertBefore(emptyState, flashcardWrapper);
    } else {
      emptyState.style.display = "flex";
    }

    flashcardPrevBtn.disabled = true;
    flashcardNextBtn.disabled = true;
    if (flashcardPrevBtnMobile) flashcardPrevBtnMobile.disabled = true;
    if (flashcardNextBtnMobile) flashcardNextBtnMobile.disabled = true;

    document.getElementById("currentCard").textContent = "0";
    document.getElementById("totalCards").textContent = "0";
  }

  loadCategoriesDropdown();

  if (flashcards.length > 0) {
    cardHistory = [0];
    historyPosition = 0;
    currentCardIndex = 0;
  }

  loadCard();
}
