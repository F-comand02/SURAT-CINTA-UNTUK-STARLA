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
        // MUSIC CONTROL
        // ============================

        function updateMusicButton() {
            musicText.textContent = playing ? "Music On" : "Music Off";
            musicIcon.textContent = playing ? "♫" : "♪";
        }

        function showMusicUnavailable() {
            musicText.textContent = "Music unavailable";
            musicIcon.textContent = "♪";
            musicButton.title = "Pastikan file backsound.mp3 tersedia.";
        }

        async function startMusic() {
            if (playing) return;
            if (music.networkState === HTMLMediaElement.NETWORK_NO_SOURCE || music.error) {
                showMusicUnavailable();
                return;
            }

            try {
                await music.play();
                playing = true;
                updateMusicButton();
            } catch (error) {
                showMusicUnavailable();
            }
        }

        window.addEventListener("load", () => {
            updateMusicButton();
            startMusic();
        });

        // Nyalakan musik saat interaksi klik pertama di mana saja (kecuali tombol musik)
        document.addEventListener("click", (e) => {
            if (!playing && !musicButton.contains(e.target)) {
                startMusic();
            }
        }, { once: true });

        musicButton.addEventListener("click", (e) => {
            e.stopPropagation();

            if (playing) {
                music.pause();
                playing = false;
                updateMusicButton();
            } else {
                startMusic();
            }
        });

        music.addEventListener("ended", () => {
            playing = false;
            updateMusicButton();
        });

        // ============================
        // GIFT INTERACTION
        // ============================

        function openGift() {
            if (opened || opening) return;

            opening = true;
            opened = true;

            gift.classList.add("opened");

            instruction.textContent = "A little surprise, just for you ♡";
            openButton.textContent = "Opening your surprise...";
            openButton.disabled = true;
            startMusic();

            setTimeout(() => {
                message.classList.add("visible");
                openButton.textContent = "Opened With Love ♡";
                opening = false;

                setTimeout(() => {
                    message.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });
                }, 300);

            }, 900);
        }

        gift.addEventListener("click", openGift);
        openButton.addEventListener("click", openGift);

        // ============================
        // FLOATING HEARTS
        // ============================

        function createHeart() {
            const heart = document.createElement("span");
            heart.className = "heart";

            const symbols = ["♡", "♥", "❤"];
            heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];

            heart.style.left = Math.random() * 100 + "vw";
            heart.style.fontSize = (12 + Math.random() * 15) + "px";

            const duration = 5 + Math.random() * 5;
            heart.style.animationDuration = duration + "s";

            hearts.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, duration * 1000);
        }

        setInterval(createHeart, 700);