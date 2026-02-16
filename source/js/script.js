import { initAuth } from "../js/auth.js";
import { initDashboard } from "../js/dashboard.js";
import { initCreateDeck } from "../js/create-deck.js";
import { initMouse } from "../js/mouse.js";
import { initFlashcard } from "../js/flashcard.js";
import { initCreateFlashcard } from "../js/create-flashcard.js";
import { initEditDeck } from "../js/edit-deck.js";
import { initEditFlashcard } from "../js/edit-flashcard.js";
import { initProfile } from "../js/profile.js";

const elements = {
  // === LOGIN FUNCTION === //
  loginUsername: document.getElementById("loginUsername"),
  loginPassword: document.getElementById("loginPassword"),
  loginShowPassIcon: document.getElementById("loginShowPassIcon"),
  loginBtn: document.getElementById("loginBtn"),

  // === SIGNUP FUNCTION === //
  signupUsername: document.getElementById("signupUsername"),
  signupPassword: document.getElementById("signupPassword"),
  signupShowPassIcon: document.getElementById("signupShowPassIcon"),
  signupConfirmPassword: document.getElementById("signupConfirmPassword"),
  signupConfirmShowPassIcon: document.getElementById(
    "signupConfirmShowPassIcon",
  ),
  signupBtn: document.getElementById("signupBtn"),

  // === DASHBOARD FUNCTION === //
  dashboardUsername: document.getElementById("dashboardUsername"),
  dashboardSignoutBtn: document.getElementById("dashboardSignoutBtn"),
  searchInput: document.getElementById("searchInput"),
  clearSearch: document.getElementById("clearSearch"),
  dashboardCreateDeckCard: document.getElementById("dashboardCreateDeckCard"),
  menuBarMobile: document.getElementById("menuBarMobile"),
  dashboardMenuBarMobile: document.getElementById("dashboardMenuBarMobile"),
  mobileCloseBar: document.getElementById("mobileCloseBar"),
  dashboardMobileSignOutBtn: document.getElementById(
    "dashboardMobileSignOutBtn",
  ),
  dashboardMobileUsername: document.getElementById("dashboardMobileUsername"),

  // === CREATE DECK FUNCTION === //
  createDeckBackLink: document.getElementById("createDeckBackLink"),
  createDeckPage: document.getElementById("createDeckPage"),
  createDeckCancelBtn: document.getElementById("createDeckCancelBtn"),
  createDeckSubmitBtn: document.getElementById("createDeckSubmitBtn"),
  createDeckForm: document.querySelector(".create-deck-form"),
  createDeckName: document.getElementById("createDeckName"),
  createCategoryName: document.getElementById("createCategoryName"),

  // === FLASHCARD FUNCTION === //
  flashcardBackButton: document.getElementById("flashcardBackButton"),
  flashcardWrapper: document.querySelector(".flashcard-wrapper"),
  flashcardRevealBtn: document.getElementById("flashcardRevealBtn"),
  flashcardBackBtn: document.getElementById("flashcardBackBtn"),
  flashcardSubmitBtn: document.getElementById("flashcardSubmitBtn"),
  flashcardAnswerInput: document.getElementById("flashcardAnswerInput"),
  flashcardPrevBtn: document.getElementById("flashcardPrevBtn"),
  flashcardNextBtn: document.getElementById("flashcardNextBtn"),
  flashboardCreateBtn: document.getElementById("flashboardCreateBtn"),
  allCategoriesBtn: document.getElementById("allCategoriesBtn"),
  categoryDropdown: document.getElementById("categoryDropdown"),
  flashcardOptionsBtn: document.getElementById("flashcardOptionsBtn"),
  flashcardOptionsMenu: document.getElementById("flashcardOptionsMenu"),
  editFlashcardBtn: document.getElementById("editFlashcardBtn"),
  deleteFlashcardBtn: document.getElementById("deleteFlashcardBtn"),
  resetProgressBtn: document.getElementById("resetProgressBtn"),

  // === CREATE FLASHCARD FUNCTION === //
  createFlashcardPage: document.getElementById("createFlashcardPage"),
  createFlashcardForm: document.querySelector(".create-flashcard-form"),
  createFlashcardQuestion: document.getElementById("createFlashcardQuestion"),
  createFlashcardAnswer: document.getElementById("createFlashcardAnswer"),
  createFlashcardCancelBtn: document.getElementById("createFlashcardCancelBtn"),
  createFlashcardBackLink: document.getElementById("createFlashcardBackLink"),

  // === EDIT DECK FUNCTION === //
  editDeckPage: document.getElementById("editDeckPage"),
  editDeckForm: document.getElementById("editDeckForm"),
  editDeckName: document.getElementById("editDeckName"),
  editCategoryName: document.getElementById("editCategoryName"),
  editDeckCancelBtn: document.getElementById("editDeckCancelBtn"),
  editDeckBackLink: document.getElementById("editDeckBackLink"),
  editDeckSubmitBtn: document.getElementById("editDeckSubmitBtn"),

  // === EDIT FLASHCARD FUNCTION === //
  editFlashcardPage: document.getElementById("editFlashcardPage"),
  editFlashcardForm: document.querySelector(".edit-flashcard-form"),
  editFlashcardQuestion: document.getElementById("editFlashcardQuestion"),
  editFlashcardAnswer: document.getElementById("editFlashcardAnswer"),
  editFlashcardCancelBtn: document.getElementById("editFlashcardCancelBtn"),
  editFlashcardBackLink: document.getElementById("editFlashcardBackLink"),
  editFlashcardSubmitBtn: document.getElementById("editFlashcardSubmitBtn"),

  // === PROFILE FUNCTION === //
  profilePage: document.getElementById("profilePage"),
  profileBackButton: document.getElementById("profileBackButton"),
  profileLogoutBtn: document.getElementById("profileLogoutBtn"),
};

document.addEventListener("DOMContentLoaded", () => {
  if (elements.loginBtn || elements.signupBtn) {
    initAuth(elements);
  }

  if (elements.dashboardUsername || elements.dashboardSignoutBtn) {
    initDashboard(elements);
  }

  if (elements.createDeckPage) {
    initCreateDeck(elements);
  }

  if (elements.flashcardWrapper) {
    initFlashcard(elements);
  }

  if (elements.createFlashcardPage) {
    initCreateFlashcard(elements);
  }

  if (elements.editDeckPage) {
    initEditDeck(elements);
  }

  if (elements.editFlashcardPage) {
    initEditFlashcard(elements);
  }

  if (elements.profilePage) {
    initProfile(elements);
  }

  if (
    elements.loginBtn ||
    elements.signupBtn ||
    elements.dashboardSignoutBtn ||
    elements.createDeckPage ||
    elements.flashcardBackButton ||
    elements.createFlashcardPage ||
    elements.editFlashcardPage ||
    elements.editDeckPage ||
    elements.profilePage
  ) {
    initMouse(elements);
  }
});
