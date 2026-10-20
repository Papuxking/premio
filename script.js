const celebrateButton = document.querySelector("#celebrateButton");
const toast = document.querySelector("#toast");
const confettiContainer = document.querySelector("#confetti");
const scanStatus = document.querySelector("#scanStatus");
const moderatorNotice = document.querySelector("#moderatorNotice");
const rewardKey = "qr-magic-premio-QR-2048";

const colors = ["#ffd87b", "#f08eff", "#9b83ff", "#72f4b2", "#ffffff"];

function hasClaimedReward() {
  return window.localStorage.getItem(rewardKey) === "claimed";
}

function markRewardAsClaimed() {
  window.localStorage.setItem(rewardKey, "claimed");
}

function showAlreadyClaimedState() {
  scanStatus.innerHTML = '<span class="status-dot status-dot-claimed"></span> Premio ya reclamado';
  scanStatus.classList.add("claimed-status");
  celebrateButton.disabled = true;
  celebrateButton.setAttribute("aria-disabled", "true");
  celebrateButton.querySelector("span:first-child").textContent = "Premio ya reclamado";
  moderatorNotice.classList.add("claimed-notice");
  moderatorNotice.querySelector("strong").textContent = "Este premio ya fue reclamado";
  moderatorNotice.querySelector("small").textContent = "Este dispositivo ya registró este código QR";
}

function celebrate() {
  const fragment = document.createDocumentFragment();

  for (let index = 0; index < 42; index += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.backgroundColor = colors[index % colors.length];
    piece.style.animationDelay = `${Math.random() * 0.35}s`;
    piece.style.transform = `rotate(${Math.random() * 180}deg)`;
    fragment.appendChild(piece);
  }

  confettiContainer.replaceChildren(fragment);
  toast.classList.add("visible");

  window.setTimeout(() => {
    toast.classList.remove("visible");
  }, 3200);

  window.setTimeout(() => {
    confettiContainer.replaceChildren();
  }, 2400);
}

if (hasClaimedReward()) {
  showAlreadyClaimedState();
} else {
  markRewardAsClaimed();
  celebrateButton.addEventListener("click", celebrate);
}
