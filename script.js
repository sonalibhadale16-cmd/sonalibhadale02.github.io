const API_URL = "http://localhost:5000";

// REGISTER
document.getElementById("registerForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("regName").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });

  const data = await res.json();
  alert(data.message);
});

// LOGIN
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  if (data.token) {
    localStorage.setItem("token", data.token);
    alert("Login successful!");
    window.location.href = "dashboard.html";
  } else {
    document.getElementById("loginMessage").innerText = data.message;
  }
});

// CONTACT FORM
document.getElementById("contactForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("contactName").value;
  const email = document.getElementById("contactEmail").value;
  const message = document.getElementById("contactMessage").value;

  const res = await fetch(`${API_URL}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, message })
  });

  const data = await res.json();
  document.getElementById("contactResponse").innerText = data.message;
});

// DASHBOARD (Protected Route)
async function getMyPlans() {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/api/dashboard/myplans`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  document.getElementById("plansOutput").innerText = JSON.stringify(data, null, 2);
}
