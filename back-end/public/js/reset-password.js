const params = new URLSearchParams(window.location.search);
const token = params.get("token");

const form = document.getElementById("resetForm");
const message = document.getElementById("message");

if (!token) {
  message.innerText = "Token inválido.";
  form.style.display = "none";
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirmPassword").value;

  if (password !== confirm) {
    message.innerText = "As senhas não coincidem.";
    return;
  }

  const res = await fetch("/reset-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, newPassword: password })
  });

  const data = await res.json();

  message.innerText = data.message || "Erro ao alterar senha.";
});
