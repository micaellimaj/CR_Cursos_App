const params = new URLSearchParams(window.location.search);
const token = params.get("token");

// CORREÇÃO: Usar o ID correto do formulário
const form = document.querySelector("form"); // ou adicionar id="resetForm" no HTML
const message = document.getElementById("message");

if (!token) {
  message.innerText = "Token inválido.";
  form.style.display = "none";
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // CORREÇÃO: Usar os names corretos dos inputs
  const password = document.querySelector("input[name='newPassword']").value;
  const confirm = document.querySelector("input[name='confirmPassword']").value;

  if (password !== confirm) {
    message.innerText = "As senhas não coincidem.";
    return;
  }

  // CORREÇÃO: Usar a URL correta
  const res = await fetch("/auth/reset-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, newPassword: password })
  });

  const data = await res.json();
  message.innerText = data.message || "Erro ao alterar senha.";
});