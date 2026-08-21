"use strict";

const beers = [
    {
        name: "Helles",
        style: "Klassisch",
        image: "assets/images/beers/helles.png",
        description: "Süffig, klar und ausgewogen. Ein unkompliziertes Bier für fast jeden Anlass.",
        hops: "Hallertauer Mittelfrüh, Tettnanger",
        malts: "Pilsner Malz, Wiener Malz",
        ibu: "ca. 20",
        abv: "ca. 5.0 %"
    },
    {
        name: "Brown Ale",
        style: "Malzig",
        image: "assets/images/beers/brown-ale.png",
        description: "Rund, malzig und leicht karamellig. Vollmundig, aber nicht schwer.",
        hops: "East Kent Goldings, Fuggle",
        malts: "Pale Ale, Münchner, Crystal, Chocolate",
        ibu: "ca. 28",
        abv: "ca. 5.5 %"
    },
    {
        name: "Cold IPA",
        style: "Modern",
        image: "assets/images/beers/cold-ipa.png",
        description: "Trocken, schlank und hopfenbetont. IPA-Aroma mit besonders klarem Finish.",
        hops: "Citra, Mosaic, Simcoe",
        malts: "Pilsner Malz, Reisflocken",
        ibu: "ca. 45",
        abv: "ca. 6.2 %"
    },
    {
        name: "Hazy IPA",
        style: "Fruchtig",
        image: "assets/images/beers/hazy-ipa.png",
        description: "Saftig, weich und aromatisch. Viel Hopfenaroma, weniger kantige Bittere.",
        hops: "Citra, Mosaic, Galaxy",
        malts: "Pale Ale, Haferflocken, Weizenmalz",
        ibu: "ca. 35",
        abv: "ca. 6.0 %"
    }
];

let currentBeerIndex = 0;
let autoSlideTimer = null;

const beerImage = document.getElementById("beerImage");
const beerStyle = document.getElementById("beerStyle");
const beerName = document.getElementById("beerName");
const beerDescription = document.getElementById("beerDescription");
const beerHops = document.getElementById("beerHops");
const beerMalts = document.getElementById("beerMalts");
const beerIbu = document.getElementById("beerIbu");
const beerAbv = document.getElementById("beerAbv");
const beerDots = document.getElementById("beerDots");
const prevBeer = document.getElementById("prevBeer");
const nextBeer = document.getElementById("nextBeer");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

const certificateModal = document.getElementById("certificateModal");
const certificateModalImage = document.getElementById("certificateModalImage");
const certificateModalTitle = document.getElementById("certificateModalTitle");
const certificateModalClose = document.getElementById("certificateModalClose");
const certificateModalBackdrop = document.getElementById("certificateModalBackdrop");
const certificateCards = document.querySelectorAll(".certificate-card");

function renderBeer(index) {
    if (!beerImage) return;

    const beer = beers[index];
    beerImage.style.backgroundImage = `linear-gradient(135deg, rgba(141,255,120,.12), rgba(255,79,163,.12)), url('${beer.image}')`;
    beerStyle.textContent = beer.style;
    beerName.textContent = beer.name;
    beerDescription.textContent = beer.description;
    beerHops.textContent = beer.hops;
    beerMalts.textContent = beer.malts;
    beerIbu.textContent = beer.ibu;
    beerAbv.textContent = beer.abv;

    beerDots?.querySelectorAll("button").forEach((button, dotIndex) => {
        button.classList.toggle("active", dotIndex === index);
    });
}

function goToBeer(index) {
    currentBeerIndex = (index + beers.length) % beers.length;
    renderBeer(currentBeerIndex);
    restartAutoSlide();
}

function createDots() {
    if (!beerDots) return;

    beerDots.innerHTML = "";

    beers.forEach((_, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.setAttribute("aria-label", `Bier ${index + 1} anzeigen`);
        button.addEventListener("click", () => goToBeer(index));
        beerDots.appendChild(button);
    });
}

function startAutoSlide() {
    if (!beerImage) return;
    autoSlideTimer = window.setInterval(() => goToBeer(currentBeerIndex + 1), 8000);
}

function restartAutoSlide() {
    if (autoSlideTimer) window.clearInterval(autoSlideTimer);
    startAutoSlide();
}

function openCertificate(src, title) {
    if (!certificateModal || !certificateModalImage || !certificateModalTitle) return;

    certificateModalImage.src = src;
    certificateModalImage.alt = title;
    certificateModalTitle.textContent = title;
    certificateModal.classList.add("open");
    certificateModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    certificateModalClose?.focus();
}

function closeCertificate() {
    if (!certificateModal || !certificateModalImage) return;

    certificateModal.classList.remove("open");
    certificateModal.setAttribute("aria-hidden", "true");
    certificateModalImage.src = "";
    document.body.classList.remove("modal-open");
}

prevBeer?.addEventListener("click", () => goToBeer(currentBeerIndex - 1));
nextBeer?.addEventListener("click", () => goToBeer(currentBeerIndex + 1));

menuToggle?.addEventListener("click", () => {
    const isOpen = mainNav?.classList.toggle("open") ?? false;
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Menü schliessen" : "Menü öffnen");
});

mainNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        menuToggle?.setAttribute("aria-expanded", "false");
        menuToggle?.setAttribute("aria-label", "Menü öffnen");
    });
});

certificateCards.forEach((card) => {
    card.addEventListener("click", () => {
        openCertificate(card.dataset.certificate || "", card.dataset.title || "Zertifikat");
    });
});

certificateModalClose?.addEventListener("click", closeCertificate);
certificateModalBackdrop?.addEventListener("click", closeCertificate);

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && certificateModal?.classList.contains("open")) {
        closeCertificate();
    }
});

createDots();
renderBeer(currentBeerIndex);
startAutoSlide();
