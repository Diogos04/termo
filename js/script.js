const rows = document.querySelectorAll(".row");
const currentRow = 0; // Apenas a primeira linha
let currentCell = 0;

const palavraSecreta = "CHOMA";
let tentativas = 0;
const maxTentativas = 5;

function verificarPalavra() {
  let tentativa = "";

  for (let i = 0; i < 5; i++) {
    tentativa += rows[currentRow].children[i].textContent;
  }

  if (tentativa === palavraSecreta) {
    alert("Parabéns !!! Você acertou.");
    desativarTeclado();
  } else {
    tentativas++;
    if (tentativas >= maxTentativas) {
      alert(`Você errou! A palavra correta era ${palavraSecreta}.`);
      desativarTeclado();
    } else {
      alert(`Tentativa ${tentativas} de ${maxTentativas}`);
      limparLinha();
    }
  }
}

function limparLinha() {
  for (let i = 0; i < 5; i++) {
    rows[currentRow].children[i].textContent = "";
  }
  currentCell = 0;
}

function desativarTeclado() {
  document.querySelectorAll(".key").forEach(button => {
    button.disabled = true;
    button.style.opacity = 0.5;
    button.style.cursor = "not-allowed";
  });
}

// Usar apenas o teclado virtual da tela
document.querySelectorAll(".key").forEach(button => {
  button.addEventListener("click", () => {
    if (tentativas >= maxTentativas) return;

    const key = button.textContent;

    if (key === "Enter") {
      if (currentCell === 5) {
        verificarPalavra();
      }
    } else if (key === "←") {
      if (currentCell > 0) {
        currentCell--;
        rows[currentRow].children[currentCell].textContent = "";
      }
    } else if (/^[A-Z]$/.test(key) && currentCell < 5) {
      rows[currentRow].children[currentCell].textContent = key;
      currentCell++;
    }
  });
});
