export function initMouse(elements) {
  const {
    loginBtn,
    signupBtn,
    dashboardSignoutBtn,
    createDeckBackLink,
    createDeckCancelBtn,
    createDeckSubmitBtn,
    flashcardBackButton,
    editDeckBackLink,
    editDeckCancelBtn,
    editDeckSubmitBtn,
  } = elements;
  const dashboardCards = [
    ...document.querySelectorAll(".dashboard-created-deck-card"),
  ];

  const pressables = [
    loginBtn,
    signupBtn,
    ...dashboardCards,
    dashboardSignoutBtn,
    createDeckBackLink,
    createDeckCancelBtn,
    createDeckSubmitBtn,
    flashcardBackButton,
    editDeckBackLink,
    editDeckCancelBtn,
    editDeckSubmitBtn,
  ].filter(Boolean);

  pressables.forEach((iliments) => {
    iliments.addEventListener("mousedown", () => {
      iliments.style.transform = "scale(0.9)";
    });
    iliments.addEventListener("mouseup", () => {
      iliments.style.transform = "scale(1)";
    });
    iliments.addEventListener("mouseleave", () => {
      iliments.style.transform = "scale(1)";
    });
  });
}
