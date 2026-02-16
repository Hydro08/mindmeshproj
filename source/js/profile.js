import { protectPage } from "./utils.js";

export function initProfile(elements) {
  const { profileBackButton, profileLogoutBtn } = elements;

  const currentUser = protectPage();
  if (!currentUser) return;

  const decksKey = `decks_${currentUser}`;
  const userDataKey = `user_${currentUser}`;

  function loadUserInfo() {
    const userData = JSON.parse(localStorage.getItem(userDataKey)) || {};
    const joinedDate = userData.joinedDate || new Date().toISOString();

    document.getElementById("profileUsername").textContent = currentUser;
    document.getElementById("profileJoinedDate").textContent = new Date(
      joinedDate,
    ).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    if (!userData.joinedDate) {
      userData.joinedDate = joinedDate;
      localStorage.setItem(userDataKey, JSON.stringify(userData));
    }
  }

  function loadStatistics() {
    const decks = JSON.parse(localStorage.getItem(decksKey)) || [];
    const userData = JSON.parse(localStorage.getItem(userDataKey)) || {};

    const totalDecks = decks.length;
    document.getElementById("totalDecks").textContent = totalDecks;

    const totalCards = decks.reduce(
      (sum, deck) => sum + (deck.flashcards?.length || 0),
      0,
    );
    document.getElementById("totalCards").textContent = totalCards;

    const totalStudyTime = userData.totalStudyTime || 0;
    document.getElementById("totalStudyTime").textContent =
      `${totalStudyTime} min`;
  }

  function loadMostStudiedDecks() {
    const decks = JSON.parse(localStorage.getItem(decksKey)) || [];
    const mostStudiedContent = document.getElementById("mostStudiedContent");

    const studiedDecks = decks.filter((deck) => deck.lastStudied);

    if (studiedDecks.length === 0) {
      mostStudiedContent.innerHTML =
        '<p class="no-data">No study history yet</p>';
      return;
    }

    studiedDecks.sort(
      (a, b) => new Date(b.lastStudied) - new Date(a.lastStudied),
    );

    const top3 = studiedDecks.slice(0, 3);

    mostStudiedContent.innerHTML = top3
      .map(
        (deck, index) => `
        <div class="studied-deck-item">
          <div class="studied-deck-info">
            <span class="deck-rank">${index + 1}.</span>
            <div>
              <p class="deck-name">${deck.title}</p>
              <p class="deck-cards">${deck.flashcards?.length || 0} cards</p>
            </div>
          </div>
          <button class="deck-study-btn" onclick="window.location.href='content.html?deckId=${deck.id}'">
            <i class="fa-solid fa-play"></i>
          </button>
        </div>
      `,
      )
      .join("");
  }

  profileBackButton?.addEventListener("click", () => {
    window.location.href = "dashboard.html";
  });

  profileLogoutBtn?.addEventListener("click", () => {
    if (confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("currentUser");
      window.location.href = "../../index.html";
    }
  });

  loadUserInfo();
  loadStatistics();
  loadMostStudiedDecks();
}
