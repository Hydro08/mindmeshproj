import { protectPage } from "./utils.js";

export function initDashboard(elements) {
  const {
    dashboardSignoutBtn,
    dashboardUsername,
    searchInput,
    clearSearch,
    dashboardCreateDeckCard,
    menuBarMobile,
    dashboardMenuBarMobile,
    mobileCloseBar,
    dashboardMobileSignOutBtn,
    dashboardMobileUsername,
  } = elements;

  const currentUser = protectPage();
  if (!currentUser) return;

  const storageKey = `decks_${currentUser}`;

  const getUserDecks = () => JSON.parse(localStorage.getItem(storageKey)) || [];
  const saveUserDecks = (decks) =>
    localStorage.setItem(storageKey, JSON.stringify(decks));
  const deleteDeck = (id) =>
    saveUserDecks(getUserDecks().filter((deck) => deck.id !== id));

  const formatLastStudied = (date) => {
    const now = new Date();
    const studiedDate = new Date(date);
    const diffTime = Math.abs(now - studiedDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));

    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60)
      return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
    if (diffHours < 24)
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;

    return studiedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year:
        studiedDate.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  };

  const createdDeckOutsideBar = document.querySelectorAll(
    ".dashboard-created-deck-card",
  );
  const dashboardDecksGrid = document.querySelector(".dashboard-decks-grid");
  const outsideBarMobile = [
    dashboardDecksGrid,
    dashboardCreateDeckCard,
    menuBarMobile,
    ...createdDeckOutsideBar,
  ];

  function disabledOutsideBar() {
    outsideBarMobile.forEach((obm) => (obm.style.pointerEvents = "none"));
  }

  function enabledOutsideBar() {
    outsideBarMobile.forEach((obm) => (obm.style.pointerEvents = "auto"));
  }

  menuBarMobile?.addEventListener("click", () => {
    dashboardMenuBarMobile.style.display = "block";
    setTimeout(() => {
      dashboardMenuBarMobile.style.top = "0";
      disabledOutsideBar();
    }, 500);
  });

  mobileCloseBar?.addEventListener("click", () => {
    dashboardMenuBarMobile.style.top = "-300px";
    enabledOutsideBar();
    setTimeout(() => {
      dashboardMenuBarMobile.style.display = "none";
    }, 500);
  });

  const updateLastStudied = (deckId) => {
    const decks = getUserDecks();
    const deckIndex = decks.findIndex((d) => d.id === parseInt(deckId));

    if (deckIndex === -1) return;

    decks[deckIndex].lastStudied = new Date().toISOString();
    saveUserDecks(decks);

    const card = document.querySelector(
      `.dashboard-created-deck-card[data-id='${deckId}']`,
    );
    if (card) {
      card.querySelector(".created-deck-last-studied").textContent =
        formatLastStudied(decks[deckIndex].lastStudied);
    }
  };

  const calculateDeckProgress = (deck) => {
    const totalCards = deck.flashcards?.length || 0;
    const masteredCards =
      deck.flashcards?.filter((c) => c.isMastered).length || 0;

    const progress =
      totalCards === 0 ? 0 : Math.round((masteredCards / totalCards) * 100);

    return {
      totalCards,
      masteredCards,
      progress,
    };
  };

  const updateDeckCard = (deck) => {
    const card = document.querySelector(
      `.dashboard-created-deck-card[data-id='${deck.id}']`,
    );
    if (!card) return;

    const stats = calculateDeckProgress(deck);

    card.querySelector(".created-deck-all-cards").textContent =
      stats.totalCards === 1
        ? `${stats.totalCards} Card`
        : `${stats.totalCards} Cards`;

    card.querySelector(".created-deck-mastered").textContent =
      stats.masteredCards === 0
        ? "Not mastered yet"
        : stats.masteredCards === stats.totalCards
          ? "100% Mastered"
          : `${stats.masteredCards} of ${stats.totalCards} Mastered`;

    const progressBar = card.querySelector(".created-deck-percentage");
    if (progressBar) {
      progressBar.value = stats.progress;
    }

    card.querySelector(".created-deck-last-studied").textContent =
      deck.lastStudied
        ? formatLastStudied(deck.lastStudied)
        : "Not studied yet";
  };

  const renderDecks = () => {
    const grid = document.querySelector(".dashboard-decks-grid");
    const template = document.getElementById("createdDeckTemplate");
    if (!grid || !template) return;

    grid
      .querySelectorAll(".dashboard-created-deck-card")
      .forEach((card) => card.remove());

    const decks = getUserDecks();

    decks.forEach((deck, index) => {
      const stats = calculateDeckProgress(deck);
      decks[index].cards = stats.totalCards;
      decks[index].mastered = stats.masteredCards;
      decks[index].progress = stats.progress;
    });

    saveUserDecks(decks);

    decks.forEach((deck) => {
      const clone = template.content.cloneNode(true);
      const card = clone.querySelector(".dashboard-created-deck-card");
      card.dataset.id = deck.id;
      card.querySelector(".created-subject-name").textContent = deck.title;
      card.querySelector(".created-deck-category").textContent = deck.category;

      const stats = calculateDeckProgress(deck);

      card.querySelector(".created-deck-all-cards").textContent =
        stats.totalCards === 1
          ? `${stats.totalCards} Card`
          : `${stats.totalCards} Cards`;

      card.querySelector(".created-deck-mastered").textContent =
        stats.masteredCards === 0
          ? "Not mastered yet"
          : stats.masteredCards === stats.totalCards
            ? "100% Mastered"
            : `${stats.masteredCards} of ${stats.totalCards} Mastered`;

      const progressBar = card.querySelector(".created-deck-percentage");
      if (progressBar) {
        progressBar.value = stats.progress;
      }

      card.querySelector(".created-deck-last-studied").textContent =
        deck.lastStudied
          ? formatLastStudied(deck.lastStudied)
          : "Not studied yet";

      card.addEventListener("click", (e) => {
        if (!e.target.closest(".deck-options-wrapper")) {
          window.location.href = `content.html?deckId=${deck.id}`;
        }
      });

      grid.appendChild(clone);
    });

    attachOptionsMenuHandlers();
  };

  function attachOptionsMenuHandlers() {
    const grid = document.querySelector(".dashboard-decks-grid");
    if (!grid) return;

    grid.addEventListener("click", (e) => {
      const optionsBtn = e.target.closest(".deck-options-btn");

      if (optionsBtn) {
        e.stopPropagation();
        const wrapper = optionsBtn.closest(".deck-options-wrapper");
        const menu = wrapper.querySelector(".deck-options-menu");

        document.querySelectorAll(".deck-options-menu").forEach((m) => {
          if (m !== menu) m.classList.remove("show");
        });

        menu.classList.toggle("show");
        return;
      }

      const editBtn = e.target.closest(".edit-deck-option");
      if (editBtn) {
        e.stopPropagation();
        const card = editBtn.closest(".dashboard-created-deck-card");
        const deckId = card.dataset.id;

        editBtn.closest(".deck-options-menu").classList.remove("show");

        window.location.href = `edit-deck.html?deckId=${deckId}`;
        return;
      }

      const deleteBtn = e.target.closest(".delete-deck-option");
      if (deleteBtn) {
        e.stopPropagation();
        const card = deleteBtn.closest(".dashboard-created-deck-card");
        const deckId = Number(card.dataset.id);

        deleteBtn.closest(".deck-options-menu").classList.remove("show");

        if (!confirm("Delete this deck? This action cannot be undone.")) return;

        deleteDeck(deckId);
        card.remove();
        return;
      }
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".deck-options-wrapper")) {
        document.querySelectorAll(".deck-options-menu").forEach((menu) => {
          menu.classList.remove("show");
        });
      }
    });
  }

  if (dashboardUsername) dashboardUsername.textContent = currentUser;
  if (dashboardMobileUsername)
    dashboardMobileUsername.textContent = currentUser;

  dashboardSignoutBtn?.addEventListener("click", () => {
    logoutFunc();
  });

  dashboardMobileSignOutBtn?.addEventListener("click", () => {
    logoutFunc();
  });

  function logoutFunc() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    window.location.href = "../../index.html";
  }

  if (searchInput && clearSearch) {
    searchInput.addEventListener("input", () => {
      clearSearch.style.display = searchInput.value ? "block" : "none";
      const query = searchInput.value.toLowerCase();
      getUserDecks().forEach((deck) => {
        const card = document.querySelector(
          `.dashboard-created-deck-card[data-id='${deck.id}']`,
        );
        if (card)
          card.style.display = deck.title.toLowerCase().includes(query)
            ? "block"
            : "none";
      });
    });

    clearSearch.addEventListener("click", () => {
      searchInput.value = "";
      clearSearch.style.display = "none";
      renderDecks();
    });
  }

  dashboardCreateDeckCard?.addEventListener("click", () => {
    window.location.href = "../pages/create-deck.html";
  });

  window.addEventListener("storage", (e) => {
    if (!e.key?.startsWith("decks_")) return;
    renderDecks();
  });

  renderDecks();

  return {
    updateDeckCard,
    renderDecks,
    calculateDeckProgress,
    updateLastStudied,
    formatLastStudied,
  };
}

export function updateDeckLastStudied(deckId) {
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) return;

  const storageKey = `decks_${currentUser}`;
  const decks = JSON.parse(localStorage.getItem(storageKey)) || [];
  const deckIndex = decks.findIndex((d) => d.id === parseInt(deckId));

  if (deckIndex === -1) return;

  decks[deckIndex].lastStudied = new Date().toISOString();
  localStorage.setItem(storageKey, JSON.stringify(decks));
}
