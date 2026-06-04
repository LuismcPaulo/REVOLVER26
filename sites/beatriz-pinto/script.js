// ===== Botão Foge =====
const botao = document.getElementById("botaoFoge");
const frasesBotao = ["não é fácil", "voltar atrás", "NÃO", "outra vez", "foi quase"];

if (botao) {
  botao.style.position = "absolute";
  botao.addEventListener("mouseenter", () => {
    const largura = window.innerWidth - botao.offsetWidth;
    const altura = window.innerHeight - botao.offsetHeight;

    const x = Math.random() * largura;
    const y = Math.random() * altura;

    botao.style.left = x + "px";
    botao.style.top = y + "px";

    botao.innerText = frasesBotao[Math.floor(Math.random() * frasesBotao.length)];
  });

  botao.addEventListener("click", () => {
    alert("Conseguiste clicar no botão!");
  });
}

// ===== Pop-ups contínuos =====
const mensagens = [
  "user_data collected",
  "location tracked",
  "behavior analyzed",
  "profile updated",
  "interaction stored",
  "scroll detected",
  "click detected"
];

function criarPopup(texto) {
  const popup = document.createElement("div");
  popup.classList.add("popup");
  popup.textContent = texto;

  popup.style.position = "absolute";
  popup.style.left = Math.random() * (window.innerWidth - 200) + "px";
  popup.style.top = Math.random() * (window.innerHeight - 50) + "px";
  popup.style.padding = "30px 50px";
  popup.style.background = "rgba(0,255,156,0.8)";
  popup.style.color = "black";
  popup.style.border = "1px solid #00ff9c";
  popup.style.borderRadius = "5px";
  popup.style.fontFamily = "monospace";
  popup.style.fontSize = "24px";
  popup.style.pointerEvents = "none";
  popup.style.opacity = "0";
  popup.style.transition = "all 0.5s ease";

  document.body.appendChild(popup);
  setTimeout(() => popup.style.opacity = "1", 10);
  setTimeout(() => popup.remove(), 3000);
}

setInterval(() => {
  const msg = mensagens[Math.floor(Math.random() * mensagens.length)];
  criarPopup(msg);
}, 500);

// ===== Jogo da velha =====
const celulas = document.querySelectorAll(".celula");
let jogador = "X";

celulas.forEach(celula => {
  celula.addEventListener("click", () => {
    if (celula.textContent !== "") return;
    celula.textContent = jogador;
    jogador = jogador === "X" ? "O" : "X";
  });
});

// ===== Efeito glitch nos links =====
const links = document.querySelectorAll("a");
links.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    document.body.classList.add("glitch");
    setTimeout(() => {
      window.location = link.href;
    }, 300);
  });
});