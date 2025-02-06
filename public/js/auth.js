document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (!token) {
        window.location.href = "login.html"; // Redirect if not logged in
    }

    document.getElementById("logoutButton").addEventListener("click", () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        window.location.href = "login.html";
    });

    // Display the logged-in user
    if (username) {
        document.getElementById("welcomeMessage").innerText = `Welcome, ${username}!`;
    }
});
