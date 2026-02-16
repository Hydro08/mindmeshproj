export function protectPage() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const currentUser = localStorage.getItem("currentUser");

  if (!isLoggedIn || !currentUser) {
    window.location.href = "../../index.html";
    return null;
  }

  return currentUser;
}
