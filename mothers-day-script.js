const intro = document.getElementById("intro");
const slideshow = document.getElementById("slideshow");
const albumStage = document.getElementById("albumStage");
const startButton = document.getElementById("startButton");
const music = document.getElementById("backgroundMusic");
const envelopeScreen = document.getElementById("envelopeScreen");
const envelope = document.getElementById("envelope");
const clickHint = document.getElementById("clickHint");

const photos = [
  { src: "images/photo1.jpg", caption: "Our sweetest beginning" },
  { src: "images/photo2.jpg", caption: "A memory wrapped in love" },
  { src: "images/photo3.jpg", caption: "Your smile, our home" },
  { src: "images/photo4.jpg", caption: "Little moments, forever kept" },
  { src: "images/photo5.jpg", caption: "Every day feels warmer with you" },
  { src: "images/photo6.jpg", caption: "The heart of our family" },
  { src: "images/photo7.jpg", caption: "Love in every tiny detail" },
  { src: "images/photo8.jpg", caption: "Our biggest blessing" },
  { src: "images/photo9.jpg", caption: "Always, always Amma" }
];

let currentPhoto = 0;
let slideTimer;
let envelopeOpened = false;

function buildAlbum() {
  photos.forEach((photo, index) => {
    const card = document.createElement("article");
    card.className = "photo-card";
    card.style.setProperty("--tilt", `${index % 2 === 0 ? -1.4 : 1.2}deg`);
    card.innerHTML = `
      <div class="photo" style="--photo-url: url('${photo.src}')">
        <span>${photo.caption}</span>
      </div>
    `;
    albumStage.appendChild(card);
  });
}

function showPhoto(index) {
  const cards = [...document.querySelectorAll(".photo-card")];
  cards.forEach((card, cardIndex) => {
    card.classList.remove("active", "leaving");
    if (cardIndex === index) card.classList.add("active");
    if (cardIndex === index - 1) card.classList.add("leaving");
  });
}

function startSlideshow() {
  slideshow.classList.remove("hidden");
  showPhoto(currentPhoto);

  slideTimer = setInterval(() => {
    currentPhoto += 1;

    if (currentPhoto < photos.length) {
      showPhoto(currentPhoto);
    } else {
      clearInterval(slideTimer);
      endSlideshow();
    }
  }, 4600);
}

function endSlideshow() {
  const cards = [...document.querySelectorAll(".photo-card")];
  cards.forEach(card => card.classList.remove("active"));
  if (cards.at(-1)) cards.at(-1).classList.add("leaving");

  setTimeout(() => {
    slideshow.classList.add("hidden");
    envelopeScreen.classList.remove("hidden");
  }, 1200);
}

function launchConfetti() {
  const colors = ["#ffd8c7", "#d7efe5", "#fff1a8", "#f5b6a3", "#ffffff"];
  const pieces = 92;

  for (let i = 0; i < pieces; i += 1) {
    const confetti = document.createElement("span");
    confetti.className = "confetti-piece";
    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDelay = `${Math.random() * 0.8}s`;
    confetti.style.setProperty("--drift", `${(Math.random() - 0.5) * 280}px`);
    confetti.style.setProperty("--spin", `${Math.random() * 900 + 360}deg`);
    document.body.appendChild(confetti);

    confetti.addEventListener("animationend", () => confetti.remove());
  }
}

startButton.addEventListener("click", async () => {
  startButton.disabled = true;

  try {
    await music.play();
  } catch (error) {
    console.warn("Audio could not play. Replace the placeholder src with a valid audio file.", error);
  }

  intro.classList.add("exiting");

  setTimeout(() => {
    intro.classList.add("hidden");
    startSlideshow();
  }, 950);
});

envelope.addEventListener("click", () => {
  if (envelopeOpened) return;
  envelopeOpened = true;
  envelope.classList.add("open");
  clickHint.style.opacity = "0";
  clickHint.style.pointerEvents = "none";

  setTimeout(launchConfetti, 1050);
});

buildAlbum();
