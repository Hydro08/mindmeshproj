export function initAuth(elements) {
  const {
    loginUsername,
    loginPassword,
    loginShowPassIcon,
    loginBtn,
    signupUsername,
    signupPassword,
    signupConfirmPassword,
    signupShowPassIcon,
    signupConfirmShowPassIcon,
    signupBtn,
  } = elements;

  togglePassword(loginPassword, loginShowPassIcon);
  togglePassword(signupPassword, signupShowPassIcon);
  togglePassword(signupConfirmPassword, signupConfirmShowPassIcon);

  const getUsers = () => JSON.parse(localStorage.getItem("users")) || [];
  const saveUsers = (users) =>
    localStorage.setItem("users", JSON.stringify(users));

  const setSession = (username) => {
    localStorage.setItem("currentUser", username);
    localStorage.setItem("isLoggedIn", "true");
  };

  const userExists = (username) =>
    getUsers().some((u) => u.username.toLowerCase() === username.toLowerCase());

  const addUser = (username, password) => {
    if (userExists(username)) return false;
    saveUsers([...getUsers(), { username, password }]);
    return true;
  };

  const validateUser = (username, password) =>
    getUsers().find(
      (u) =>
        u.username.toLowerCase() === username.toLowerCase() &&
        u.password === password,
    );

  bindEnter([loginUsername, loginPassword, loginBtn], checkLogin);
  bindEnter(
    [signupUsername, signupPassword, signupConfirmPassword, signupBtn],
    checkSignup,
  );

  loginBtn?.addEventListener("click", checkLogin);
  signupBtn?.addEventListener("click", checkSignup);

  function checkLogin() {
    const username = loginUsername?.value.trim();
    const password = loginPassword?.value;

    if (!username) return alert("Username is empty");
    if (!password) return alert("Password is empty");

    const user = validateUser(username, password);
    if (!user) return alert("Invalid credentials");

    setSession(user.username);
    loginUsername.value = "";
    loginPassword.value = "";
    window.location.href = "source/pages/dashboard.html";
  }

  function checkSignup() {
    const username = signupUsername?.value.trim();
    const password = signupPassword?.value;
    const confirmPassword = signupConfirmPassword?.value;

    if (!username) return alert("Username is empty");
    if (!password) return alert("Password is empty");
    if (password !== confirmPassword) return alert("Passwords do not match");

    if (!addUser(username, password)) return alert("Username already exists");

    const userData = {
      joinedDate: new Date().toISOString(),
      totalStudyTime: 0,
    };
    localStorage.setItem(`user_${username}`, JSON.stringify(userData));

    signupUsername.value = "";
    signupPassword.value = "";
    signupConfirmPassword.value = "";

    alert("Signup successful!");
    window.location.href = "../../index.html";
  }

  function bindEnter(elements, callback) {
    elements.filter(Boolean).forEach((el) => {
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          callback();
        }
      });
    });
  }

  function togglePassword(input, wrapper) {
    if (!input || !wrapper) return;

    const icon = wrapper.querySelector("i");
    if (!icon) return;

    wrapper.addEventListener("click", () => {
      const isHidden = input.type === "password";
      input.type = isHidden ? "text" : "password";
      icon.className = isHidden ? "fa-solid fa-eye-slash" : "fa-solid fa-eye";
    });
  }
}
