const slides = [
    { img: "Silk.jpg", name: "UNIVERSO", sub: "LA EMPERATRIZ DE SEDA", url: "Workinprogress.html"},
    { img: "Background.png", name: "CUEVAS", sub: "PROFUNDIDADES OSCURAS", url: "Workinprogress.html" },
    { img: "Silk.jpg", name: "COLISEO", sub: "ARENA SUBTERRÁNEA", url: "Workinprogress.html" },
    { img: "Background.png", name: "CASTILLO", sub: "EL TRONO DE SEDA", url: "Workinprogress.html" },
    { img: "PIXEL.png", name: "ORIGINAL", sub: "PRIMER JUEGO DE WITCHOLET", url: "Workinprogress.html" }
];

let currentIdx = 0;

function updateCarousel() {
    const leftIdx = (currentIdx - 1 + slides.length) % slides.length;
    const rightIdx = (currentIdx + 1) % slides.length;

    const mainImg = document.getElementById('main-img');
    const elements = [
        mainImg, 
        document.getElementById('side-l-img'), 
        document.getElementById('side-r-img'), 
        document.querySelector('.info-card')
    ];

    // Efecto de transición (desvanecimiento)
    elements.forEach(el => { if(el) el.style.opacity = "0"; });

    setTimeout(() => {
        const currentSlide = slides[currentIdx];

        // Actualización de contenidos del centro
        mainImg.src = currentSlide.img;
        document.getElementById('char-name').innerText = currentSlide.name;
        document.getElementById('char-subtitle').innerText = currentSlide.sub;

        // ACTUALIZACIÓN DEL LINK: Redirige al artículo después de cliquear la caja
        const charLink = document.getElementById('char-link');
        if (charLink) {
            charLink.href = currentSlide.url;
        }

        // Actualización de laterales
        document.getElementById('side-l-img').src = slides[leftIdx].img;
        document.getElementById('side-l-text').innerText = slides[leftIdx].name;
        document.getElementById('side-r-img').src = slides[rightIdx].img;
        document.getElementById('side-r-text').innerText = slides[rightIdx].name;

        // Sistema de persistencia: guarda el artículo visitado en el historial
        guardarEnHistorial(currentSlide);

        elements.forEach(el => { if(el) el.style.opacity = "1"; });
    }, 300);
}
function renderLatestArticles() {
    const grid = document.getElementById('latest-grid');
    if (!grid) return;

    // Tomamos los 5 artículos más recientes del arreglo 'slides'
    // .slice(0, 5) asegura que siempre se muestren solo los últimos cinco
    const latestItems = slides.slice(0, 5);

    grid.innerHTML = latestItems.map(item => `
        <div class="latest-card" onclick="accederArticulo('${item.url}', '${item.name}')">
            <img src="${item.img}" alt="${item.name}">
            <div class="card-info-bottom">                
                <span class="sub">${item.sub}</span>
                <span class="title">${item.name}</span>
            </div>
        </div>
    `).join('');
}

// Nueva función para manejar el acceso directo y guardar el historial
function accederArticulo(url, nombre) {
    // Registramos la visita en el historial antes de navegar
    guardarEnHistorial({ name: nombre, url: url });
    
    // Redirección directa a la página del artículo
    window.location.href = url;
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

function guardarEnHistorial(articulo) {
    let historial = JSON.parse(localStorage.getItem('witcholet_history')) || [];
    
    // Evita duplicados consecutivos
    if (historial.length === 0 || historial[0].name !== articulo.name) {
        historial.unshift({
            name: articulo.name,
            url: articulo.url,
            fecha: new Date().toISOString()
        });
    }

    // Mantiene solo los últimos 10 elementos para optimizar el almacenamiento
    if (historial.length > 10) historial.pop();
    
    localStorage.setItem('witcholet_history', JSON.stringify(historial));
}

window.onload = () => {
    updateCarousel();
    renderLatestArticles();
};