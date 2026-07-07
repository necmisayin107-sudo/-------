const trailLayer = document.querySelector(".trail-layer");
const trailLinks = Array.from(document.querySelectorAll("[data-trail]"));
const indexCards = Array.from(document.querySelectorAll(".index-card"));

const fallbackImages = [
  "assets/posters/posters-preview.png",
  "assets/ai-videos/perfume-chatgpt-storyboard.png",
  "assets/internships/travelamp-cover-design.jpg",
  "assets/video-production/documentary-cover.png"
];

let activeImages = fallbackImages;
let lastX = 0;
let lastY = 0;
let lastTime = 0;
let imageIndex = 0;

trailLinks.forEach((link) => {
  link.addEventListener("pointerenter", () => {
    activeImages = [link.dataset.trail, ...fallbackImages];
  });
});

indexCards.forEach((card) => {
  const image = card.dataset.image;
  card.style.setProperty("--card-image", `url("${image}")`);
  card.addEventListener("pointerenter", () => {
    activeImages = [image, ...fallbackImages];
  });
});

window.addEventListener("pointermove", (event) => {
  const distance = Math.hypot(event.clientX - lastX, event.clientY - lastY);
  const now = performance.now();

  if (distance < 72 || now - lastTime < 70) {
    return;
  }

  lastX = event.clientX;
  lastY = event.clientY;
  lastTime = now;
  addTrailImage(event.clientX, event.clientY);
});

function addTrailImage(x, y) {
  const image = document.createElement("img");
  image.className = "trail-image";
  image.src = activeImages[imageIndex % activeImages.length];
  image.alt = "";
  image.style.left = `${x}px`;
  image.style.top = `${y}px`;
  image.style.setProperty("--rotate", `${(imageIndex % 2 === 0 ? -1 : 1) * (4 + imageIndex % 8)}deg`);

  imageIndex += 1;
  trailLayer.append(image);

  window.setTimeout(() => {
    image.remove();
  }, 820);
}
