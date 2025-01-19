// Add event listener to fetch button
document.getElementById('getDataButton')?.addEventListener('click', function () {
    console.log('Fetching data from API...');
    fetch('http://localhost:8080/api/data')
        .then((response) => response.text())
        .then((data) => {
            console.log('Data received:', data);
            document.getElementById('responseMessage').textContent = data;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

// Elements
const navbarMenu = document.querySelector(".navbar .links");
const menuBtn = document.querySelector(".menu-btn");
const hideMenuBtn = document.querySelector(".close-btn");
const showPopupBtn = document.querySelector(".login-btn");
const formPopup = document.querySelector(".form-popup");
const hidePopupBtn = document.querySelector(".form-popup .close-btn");
const loginSignupLink = document.querySelectorAll(".form-box .bottom-link a");

// Check if navbarMenu exists and log it
console.log(navbarMenu);

// Function to fetch and load pages dynamically
function goToPage(page) {
    console.log('Fetching page:', page); // Check which page is being fetched
    fetch(page)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Page not found: ${response.status}`);
            }
            return response.text();
        })
        .then((data) => {
            const contentElement = document.getElementById("content");
            contentElement.classList.remove("content-loaded"); // Fade out
            setTimeout(() => {
                contentElement.innerHTML = data; // Update content
                contentElement.classList.add("content-loaded"); // Fade in
            }, 500); // Match fade-out duration
        })
        .catch((error) => {
            console.error("Error loading page:", error);
            document.getElementById("content").innerHTML = `
                <h2>Oops! Page not found</h2>
                <p>Please check the navigation and try again.</p>
            `;
        });
}



// Dynamic navigation using data attributes
navbarMenu?.addEventListener("click", (e) => {
    const target = e.target.closest("a");
    if (target && target.dataset.page) {
        e.preventDefault();
        console.log('Navigating to:', target.dataset.page); // Log which page is being loaded
        goToPage(target.dataset.page);
    }
});

// Toggle menu visibility
menuBtn?.addEventListener("click", () => {
    console.log('Toggling menu visibility');
    navbarMenu.classList.toggle("show-menu");
});

hideMenuBtn?.addEventListener("click", () => {
    console.log('Hiding menu');
    navbarMenu.classList.remove("show-menu");
});

// Show/hide popup
showPopupBtn?.addEventListener("click", () => {
    console.log('Toggling popup visibility');
    document.body.classList.toggle("show-popup");
});

hidePopupBtn?.addEventListener("click", () => {
    console.log('Closing popup');
    document.body.classList.remove("show-popup");
});

// Toggle between login and signup forms
loginSignupLink.forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        console.log('Switching between login and signup forms');
        formPopup.classList[link.id === "signup-link" ? "add" : "remove"]("show-signup");
    });
});

// Store filter functionality
function filterStores() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toLowerCase();
    const stores = document.querySelectorAll('.store');

    stores.forEach((store) => {
        const location = store.getAttribute('data-location').toLowerCase();
        store.style.display = location.includes(filter) ? "" : "none";
    });
}


