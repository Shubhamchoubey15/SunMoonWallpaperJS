(function () {
    function createSky() {
        const sky = document.createElement("div");
        sky.classList.add("sky");
        document.body.appendChild(sky);

        const sun = document.createElement("div");
        sun.classList.add("sun");
        sun.id = "sun";
        sky.appendChild(sun);

        const moon = document.createElement("div");
        moon.classList.add("moon");
        moon.id = "moon";
        sky.appendChild(moon);
    }

    function updateSky() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const sun = document.getElementById("sun");
        const moon = document.getElementById("moon");
        const totalDaySeconds = 24 * 60 * 60;
        const currentSeconds = (hours * 3600) + (minutes * 60) + seconds;

        if (hours >= 6 && hours < 18) {
            document.body.style.background = "#A9A9A9";
            sun.style.display = "block";
            moon.style.display = "none";
            removeStars();
        } else {
            document.body.style.background = "#000";
            sun.style.display = "none";
            moon.style.display = "block";
            generateStars();
        }

        const sunAngle = (currentSeconds / totalDaySeconds) * 360;
        const moonAngle = sunAngle + 180;

        sun.style.transform = `translate(${40 * Math.cos(sunAngle * Math.PI / 180) + 50}vw, ${40 * Math.sin(sunAngle * Math.PI / 180) + 50}vh)`;
        moon.style.transform = `translate(${40 * Math.cos(moonAngle * Math.PI / 180) + 50}vw, ${40 * Math.sin(moonAngle * Math.PI / 180) + 50}vh)`;
    }

    function generateStars() {
        if (document.getElementsByClassName("star").length === 0) {
            for (let i = 0; i < 100; i++) {
                let star = document.createElement("div");
                star.classList.add("star");
                star.style.top = `${Math.random() * 100}vh`;
                star.style.left = `${Math.random() * 100}vw`;
                document.body.appendChild(star);
            }
        }
    }

    function removeStars() {
        document.querySelectorAll(".star").forEach(star => star.remove());
    }

    function applyStyles() {
        const style = document.createElement("style");
        style.innerHTML = `
            .sky {
                position: absolute;
                width: 100vw;
                height: 100vh;
            }
            .sun, .moon {
                position: absolute;
                width: 80px;
                height: 80px;
                border-radius: 50%;
                transition: transform 30s linear;
            }
            .sun { background: yellow; box-shadow: 0 0 50px yellow; }
            .moon { background: lightgray; box-shadow: 0 0 30px white; }
            .star {
                position: absolute;
                background: white;
                width: 3px;
                height: 3px;
                border-radius: 50%;
                opacity: 0.7;
                animation: blink 2s infinite alternate;
            }
            @keyframes blink {
                0% { opacity: 0.3; transform: scale(0.8); }
                100% { opacity: 1; transform: scale(1.2); }
            }
        `;
        document.head.appendChild(style);
    }

    applyStyles();
    createSky();
    updateSky();
    setInterval(updateSky, 1000);
})();
