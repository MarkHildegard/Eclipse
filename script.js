document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("login-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const authSection = document.getElementById("auth-section");
    const shopSection = document.getElementById("shop-section");
    const errorMsg = document.getElementById("error-msg");
    const scriptsDiv = document.getElementById("scripts");

    let currentUser = null;

    // Login/Register
    loginBtn.addEventListener("click", () => {
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!username || !password) {
            errorMsg.textContent = "Fill in all fields!";
            return;
        }

        if (!users[username]) {
            users[username] = { password, balance: 20 };
            purchases[username] = [];
        } else if (users[username].password !== password) {
            errorMsg.textContent = "Incorrect password!";
            return;
        }

        currentUser = username;
        loadShop();
    });

    // Logout
    logoutBtn.addEventListener("click", () => {
        currentUser = null;
        authSection.style.display = "block";
        shopSection.style.display = "none";
    });

    // Shop laden
    function loadShop() {
        authSection.style.display = "none";
        shopSection.style.display = "block";
        scriptsDiv.innerHTML = "";

        scripts.forEach(script => {
            const scriptDiv = document.createElement("div");
            scriptDiv.classList.add("script-item");
            scriptDiv.textContent = `${script.name} - $${script.price}`;

            scriptDiv.addEventListener("click", () => buyScript(script));

            if (purchases[currentUser].includes(script.name)) {
                scriptDiv.textContent += " (Owned)";
                scriptDiv.style.color = "lime";
            }

            scriptsDiv.appendChild(scriptDiv);
        });
    }

    // Kaufen
    function buyScript(script) {
        if (purchases[currentUser].includes(script.name)) {
            alert("You already own this script!");
            return;
        }

        if (users[currentUser].balance < script.price) {
            alert("Not enough money!");
            return;
        }

        users[currentUser].balance -= script.price;
        purchases[currentUser].push(script.name);
        loadShop();
    }

    // Animationen
    gsap.from(".glitch", { opacity: 0, y: -20, duration: 1, ease: "power2.out" });
    gsap.from("input, button", { opacity: 0, scale: 0.9, delay: 0.5, duration: 0.8, stagger: 0.2 });
});
