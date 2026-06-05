"use strict";

const beers = [
    {
        name: "Helles",
        style: "Klassisch",
        image: "beer-helles.png",
        description: "Süffig, klar und ausgewogen. Ein unkompliziertes Bier für fast jeden Anlass.",
        hops: "Hallertauer Mittelfrüh, Tettnanger",
        malts: "Pilsner Malz, Wiener Malz",
        ibu: "ca. 20",
        abv: "ca. 5.0 %"
    },
    {
        name: "Brown Ale",
        style: "Malzig",
        image: "beer-brown-ale.png",
        description: "Rund, malzig und leicht karamellig. Vollmundig, aber nicht schwer.",
        hops: "East Kent Goldings, Fuggle",
        malts: "Pale Ale, Münchner, Crystal, Chocolate",
        ibu: "ca. 28",
        abv: "ca. 5.5 %"
    },
    {
        name: "Cold IPA",
        style: "Modern",
        image: "beer-cold-ipa.png",
        description: "Trocken, schlank und hopfenbetont. IPA-Aroma mit besonders klarem Finish.",
        hops: "Citra, Mosaic, Simcoe",
        malts: "Pilsner Malz, Reisflocken",
        ibu: "ca. 45",
        abv: "ca. 6.2 %"
    },
    {
        name: "Hazy png",
        style: "Fruchtig",
        image: "beer-hazy-ipa.jpg",
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

function renderBeer(index) {
    const beer = beers[index];

    beerImage.style.backgroundImage = `linear-gradient(135deg, rgba(141,255,120,0.12), rgba(255,79,163,0.12)), url('${beer.image}')`;
    beerStyle.textContent = beer.style;
    beerName.textContent = beer.name;
    beerDescription.textContent = beer.description;
    beerHops.textContent = beer.hops;
    beerMalts.textContent = beer.malts;
    beerIbu.textContent = beer.ibu;
    beerAbv.textContent = beer.abv;

    const dots = beerDots.querySelectorAll("button");
    dots.forEach(function(dot, dotIndex) {
        dot.classList.toggle("active", dotIndex === index);
    });
}

function goToBeer(index) {
    if (index < 0) {
        currentBeerIndex = beers.length - 1;
    } else if (index >= beers.length) {
        currentBeerIndex = 0;
    } else {
        currentBeerIndex = index;
    }

    renderBeer(currentBeerIndex);
    restartAutoSlide();
}

function createDots() {
    beers.forEach(function(_, index) {
        const button = document.createElement("button");
        button.setAttribute("aria-label", "Bier " + (index + 1) + " anzeigen");
        button.addEventListener("click", function() {
            goToBeer(index);
        });
        beerDots.appendChild(button);
    });
}

function startAutoSlide() {
    autoSlideTimer = window.setInterval(function() {
        goToBeer(currentBeerIndex + 1);
    }, 8000);
}

function restartAutoSlide() {
    if (autoSlideTimer !== null) {
        window.clearInterval(autoSlideTimer);
    }

    startAutoSlide();
}

prevBeer.addEventListener("click", function() {
    goToBeer(currentBeerIndex - 1);
});

nextBeer.addEventListener("click", function() {
    goToBeer(currentBeerIndex + 1);
});

menuToggle.addEventListener("click", function() {
    mainNav.classList.toggle("open");
});

mainNav.querySelectorAll("a").forEach(function(link) {
    link.addEventListener("click", function() {
        mainNav.classList.remove("open");
    });
});

createDots();
renderBeer(currentBeerIndex);
startAutoSlide();
