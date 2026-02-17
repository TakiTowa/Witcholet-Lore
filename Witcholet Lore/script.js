const slides = [
    { img: "Silk.jpg", name: "UNIVERSO", sub: "LA EMPERATRIZ DE SEDA" },
    { img: "Background.png", name: "CUEVAS", sub: "PROFUNDIDADES OSCURAS" },
    { img: "Silk.jpg", name: "COLISEO", sub: "ARENA SUBTERRÁNEA" },
    { img: "Background.png", name: "CASTILLO", sub: "EL TRONO DE SEDA" },
    { img: "PIXEL.png", name: "ORIGINAL", sub: "PRIMER JUEGO DE WITCHOLET" }
];

let currentIdx = 0;

function updateCarousel() {
    const leftIdx = (currentIdx - 1 + slides.length) % slides.length;
    const rightIdx = (currentIdx + 1) % slides.length;

    const elements = [
        document.getElementById('main-img'),
        document.getElementById('side-l-img'),
        document.getElementById('side-r-img'),
        document.querySelector('.info-card'),
        document.getElementById('side-l-text'),
        document.getElementById('side-r-text')
    ];

    elements.forEach(el => { if(el) el.style.opacity = "0"; });

    setTimeout(() => {
        // Centro
        document.getElementById('main-img').src = slides[currentIdx].img;
        document.getElementById('char-name').innerText = slides[currentIdx].name;
        document.getElementById('char-subtitle').innerText = slides[currentIdx].sub;

        // Izquierda
        document.getElementById('side-l-img').src = slides[leftIdx].img;
        document.getElementById('side-l-text').innerText = slides[leftIdx].name;

        // Derecha
        document.getElementById('side-r-img').src = slides[rightIdx].img;
        document.getElementById('side-r-text').innerText = slides[rightIdx].name;

        elements.forEach(el => { if(el) el.style.opacity = "1"; });
    }, 300);
}

function renderLatestArticles() {
    const grid = document.getElementById('latest-grid');
    // Toma los últimos 5 del array (puedes añadir más a 'slides' y siempre tomará los 5 primeros de esta lista)
    const latestItems = slides.slice(0, 5);

    grid.innerHTML = latestItems.map(item => `
        <div class="latest-card" onclick="jumpToSlide('${item.name}')">
            <img src="${item.img}" alt="${item.name}">
            <div class="card-info-bottom">
                <span class="sub">${item.sub}</span>
                <span class="title">${item.name}</span>
            </div>
        </div>
    `).join('');
}

function openFull(src) {
    // Crea un modal básico para mostrar la imagen
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed; top:0; left:0; width:100%; height:100%;
        background: rgba(0,0,0,0.9); z-index:1000;
        display: flex; align-items: center; justify-content: center;
        cursor: pointer;
    `;
    modal.innerHTML = `<img src="${src}" style="max-width: 90%; max-height: 90%; border: 2px solid var(--gold);">`;
    modal.onclick = () => modal.remove();
    document.body.appendChild(modal);
}

function jumpToSlide(name) {
    const index = slides.findIndex(s => s.name === name);
    if (index !== -1) {
        currentIdx = index;
        updateCarousel();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function changeSlide(direction) {
    currentIdx = (currentIdx + direction + slides.length) % slides.length;
    updateCarousel();
}

window.onload = () => {
    updateCarousel();
    renderLatestArticles();
};