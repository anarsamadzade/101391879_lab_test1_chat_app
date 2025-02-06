document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const username = document.getElementById("username").value;
    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:5000/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, firstname, lastname, password })
        });

        const data = await response.json();
        if (response.ok) {
            alert("Signup successful! Please login.");
            window.location.href = "login.html";
        } else {
            alert("Error: " + data.error);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Signup failed!");
    }
});
