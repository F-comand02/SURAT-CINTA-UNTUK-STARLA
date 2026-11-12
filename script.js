
const gift = document.getElementById("gift");
const openButton = document.getElementById("openButton");
const instruction = document.getElementById("instruction");
const message = document.getElementById("message");

const music = document.getElementById("music");
const musicButton = document.getElementById("musicButton");
const musicText = document.getElementById("musicText");
const musicIcon = document.getElementById("musicIcon");

const hearts = document.getElementById("hearts");

let opened = false;
let playing = false;
let opening = false;

// ============================
// MUSIC AUTOPLAY
// ============================

async function startMusic() {
    try {
        await music.play();

        playing = true;
        updateMusicButton();

    } catch (error) {
        console.log("Autoplay diblokir browser.");
    }
}

function updateMusicButton() {
    musicText.textContent = playing ? "Music On" : "Music Off";
    musicIcon.textContent = playing ? "♫" : "♪";
}

window.addEventListener("load", () => {
    startMusic();
});

// Jika autoplay diblokir, coba lagi setelah interaksi
document.addEventListener("click", () => {
    if (!playing) {
        startMusic();
    }
}, { once: true });

// ============================
// GIFT INTERACTION
// ============================

async function openGift() {
    if (opened || opening) return;

    opening = true;
    opened = true;

    // Coba mulai musik saat hadiah dibuka
    await startMusic();

    gift.classList.add("opened");

    instruction.textContent =
        "A little surprise, just for you ♡";

    openButton.textContent =
        "Opening your surprise...";

    openButton.disabled = true;

    // Tampilkan pesan setelah animasi kotak
    setTimeout(() => {
        message.classList.add("visible");

        openButton.textContent =
            "Opened With Love ♡";

        opening = false;

        setTimeout(() => {
            message.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }, 250);

    }, 900);
}

gift.addEventListener("click", openGift);
openButton.addEventListener("click", openGift);

// ============================
// MUSIC CONTROL
// ============================

musicButton.addEventListener("click", async () => {
    try {
        if (!playing) {
            await music.play();
            playing = true;
        } else {
            music.pause();
            playing = false;
        }

        updateMusicButton();

    } catch (error) {
        console.log("Musik tidak dapat diputar.");
    }
});

music.addEventListener("ended", () => {
    playing = false;
    updateMusicButton();
});

// ============================
// FLOATING HEARTS
// ============================

function createHeart() {
    const heart = document.createElement("span");

    heart.className = "heart";

    const symbols = ["♡", "♥", "❤"];

    heart.textContent =
        symbols[Math.floor(Math.random() * symbols.length)];

    heart.style.left = Math.random() * 100 + "vw";

    heart.style.fontSize =
        (12 + Math.random() * 15) + "px";

    const duration = 5 + Math.random() * 5;

    heart.style.animationDuration = duration + "s";

    hearts.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

setInterval(createHeart, 700);
