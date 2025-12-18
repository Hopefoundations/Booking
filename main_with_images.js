const slides = [
    {
        title: "Hamnet",
        tag: "Now Playing",
        meta: "In theaters now",
        desc: "A moving reimagining of Shakespeare’s family.",
        img: "./images/hamnet.png"
    },
    {
        title: "Song Sung Blue",
        tag: "Coming Soon",
        meta: "December release",
        desc: "A musical journey of love and loss.",
        img: "./images/song_sung_blue.png"
    },
    {
        title: "Bugonia",
        tag: "Now Streaming",
        meta: "Watch at home",
        desc: "A dark and thrilling satire.",
        img: "./images/bugonia.png"
    }
];

const newsItems = slides;
const films = slides;

document.addEventListener("DOMContentLoaded", () => {
    revealSections();

    if (document.body.dataset.page === "home") {
        setupHero();
        renderNews();
        renderFilms();
    }

    if (document.body.dataset.page === "news") renderNews();
    if (document.body.dataset.page === "films") renderFilms();
});

function setupHero() {
    let index = 0;
    const poster = document.getElementById("heroPosterImg");
    const title = document.getElementById("heroTitle");
    const tag = document.getElementById("heroTag");
    const meta = document.getElementById("heroMeta");
    const desc = document.getElementById("heroDesc");

    setInterval(() => {
        index = (index + 1) % slides.length;
        poster.style.opacity = 0;

        setTimeout(() => {
            poster.src = slides[index].img;
            title.textContent = slides[index].title;
            tag.textContent = slides[index].tag;
            meta.textContent = slides[index].meta;
            desc.textContent = slides[index].desc;
            poster.style.opacity = 1;
        }, 250);
    }, 5000);
}

function renderNews() {
    const grid = document.getElementById("newsGrid");
    if (!grid) return;

    grid.innerHTML = "";
    newsItems.forEach(item => {
        grid.innerHTML += `
            <div class="news-card">
                <img src="${item.img}">
                <div style="padding:1rem">
                    <h3>${item.title}</h3>
                    <p>${item.meta}</p>
                </div>
            </div>
        `;
    });
}

function renderFilms() {
    const row = document.getElementById("filmRow");
    if (!row) return;

    row.innerHTML = "";
    films.forEach(item => {
        row.innerHTML += `
            <div class="film-card">
                <img src="${item.img}">
                <div style="padding:1rem">
                    <h3>${item.title}</h3>
                    <p>${item.meta}</p>
                </div>
            </div>
        `;
    });
}

function revealSections() {
    const sections = document.querySelectorAll("[data-section]");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
            }
        });
    });
    sections.forEach(section => observer.observe(section));
}