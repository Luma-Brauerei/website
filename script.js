"use strict";

/* =========================================================
   Bier-Slider
========================================================= */

const beers = [
    {
        name: "Helles",
        style: "Klassisch",
        image: "bier-helles.png",
        description:
            "Süffig, klar und ausgewogen. Ein unkompliziertes Bier für fast jeden Anlass.",
        hops:
            "Hallertauer Mittelfrüh, Tettnanger",
        malts:
            "Pilsner Malz, Wiener Malz",
        ibu:
            "ca. 20",
        abv:
            "ca. 5.0 %"
    },
    {
        name: "Brown Ale",
        style: "Malzig",
        image: "bier-brown-ale.png",
        description:
            "Rund, malzig und leicht karamellig. Vollmundig, aber nicht schwer.",
        hops:
            "East Kent Goldings, Fuggle",
        malts:
            "Pale Ale, Münchner, Crystal, Chocolate",
        ibu:
            "ca. 28",
        abv:
            "ca. 5.5 %"
    },
    {
        name: "Cold IPA",
        style: "Modern",
        image: "bier-cold-ipa.png",
        description:
            "Trocken, schlank und hopfenbetont. IPA-Aroma mit besonders klarem Finish.",
        hops:
            "Citra, Mosaic, Simcoe",
        malts:
            "Pilsner Malz, Reisflocken",
        ibu:
            "ca. 45",
        abv:
            "ca. 6.2 %"
    },
    {
        name: "Hazy IPA",
        style: "Fruchtig",
        image: "bier-hazy-ipa.png",
        description:
            "Saftig, weich und aromatisch. Viel Hopfenaroma, weniger kantige Bittere.",
        hops:
            "Citra, Mosaic, Galaxy",
        malts:
            "Pale Ale, Haferflocken, Weizenmalz",
        ibu:
            "ca. 35",
        abv:
            "ca. 6.0 %"
    }
];

let currentBeerIndex = 0;
let autoSlideTimer = null;


/* =========================================================
   DOM-Elemente
========================================================= */

const beerImage =
    document.getElementById(
        "beerImage"
    );

const beerStyle =
    document.getElementById(
        "beerStyle"
    );

const beerName =
    document.getElementById(
        "beerName"
    );

const beerDescription =
    document.getElementById(
        "beerDescription"
    );

const beerHops =
    document.getElementById(
        "beerHops"
    );

const beerMalts =
    document.getElementById(
        "beerMalts"
    );

const beerIbu =
    document.getElementById(
        "beerIbu"
    );

const beerAbv =
    document.getElementById(
        "beerAbv"
    );

const beerDots =
    document.getElementById(
        "beerDots"
    );

const prevBeer =
    document.getElementById(
        "prevBeer"
    );

const nextBeer =
    document.getElementById(
        "nextBeer"
    );

const menuToggle =
    document.getElementById(
        "menuToggle"
    );

const mainNav =
    document.getElementById(
        "mainNav"
    );

const certificateModal =
    document.getElementById(
        "certificateModal"
    );

const certificateModalImage =
    document.getElementById(
        "certificateModalImage"
    );

const certificateModalTitle =
    document.getElementById(
        "certificateModalTitle"
    );

const certificateModalClose =
    document.getElementById(
        "certificateModalClose"
    );

const certificateModalBackdrop =
    document.getElementById(
        "certificateModalBackdrop"
    );

const certificateCards =
    document.querySelectorAll(
        ".certificate-card"
    );


/* =========================================================
   Bier-Slider-Funktionen
========================================================= */

function renderBeer(index) {
    if (
        !beerImage ||
        !beerStyle ||
        !beerName ||
        !beerDescription ||
        !beerHops ||
        !beerMalts ||
        !beerIbu ||
        !beerAbv ||
        !beerDots
    ) {
        return;
    }

    const beer = beers[index];

    beerImage.style.backgroundImage =
        "linear-gradient(" +
        "135deg, " +
        "rgba(141,255,120,0.12), " +
        "rgba(255,79,163,0.12)" +
        "), " +
        "url('" +
        beer.image +
        "')";

    beerStyle.textContent =
        beer.style;

    beerName.textContent =
        beer.name;

    beerDescription.textContent =
        beer.description;

    beerHops.textContent =
        beer.hops;

    beerMalts.textContent =
        beer.malts;

    beerIbu.textContent =
        beer.ibu;

    beerAbv.textContent =
        beer.abv;

    const dots =
        beerDots.querySelectorAll(
            "button"
        );

    dots.forEach(function(
        dot,
        dotIndex
    ) {
        dot.classList.toggle(
            "active",
            dotIndex === index
        );
    });
}


function goToBeer(index) {
    if (index < 0) {
        currentBeerIndex =
            beers.length - 1;
    } else if (
        index >= beers.length
    ) {
        currentBeerIndex = 0;
    } else {
        currentBeerIndex = index;
    }

    renderBeer(
        currentBeerIndex
    );

    restartAutoSlide();
}


function createDots() {
    if (!beerDots) {
        return;
    }

    beerDots.innerHTML = "";

    beers.forEach(function(
        _,
        index
    ) {
        const button =
            document.createElement(
                "button"
            );

        button.type =
            "button";

        button.setAttribute(
            "aria-label",
            "Bier " +
            (index + 1) +
            " anzeigen"
        );

        button.addEventListener(
            "click",
            function() {
                goToBeer(index);
            }
        );

        beerDots.appendChild(
            button
        );
    });
}


function startAutoSlide() {
    if (beers.length <= 1) {
        return;
    }

    autoSlideTimer =
        window.setInterval(
            function() {
                goToBeer(
                    currentBeerIndex +
                    1
                );
            },
            8000
        );
}


function stopAutoSlide() {
    if (
        autoSlideTimer !== null
    ) {
        window.clearInterval(
            autoSlideTimer
        );

        autoSlideTimer = null;
    }
}


function restartAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
}


/* =========================================================
   Zertifikats-Dialog
========================================================= */

function openCertificate(
    imageSource,
    title
) {
    if (
        !certificateModal ||
        !certificateModalImage ||
        !certificateModalTitle
    ) {
        return;
    }

    certificateModalImage.src =
        imageSource;

    certificateModalImage.alt =
        title;

    certificateModalTitle.textContent =
        title;

    certificateModal.classList.add(
        "open"
    );

    certificateModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "modal-open"
    );

    window.setTimeout(
        function() {
            if (
                certificateModalClose
            ) {
                certificateModalClose
                    .focus();
            }
        },
        50
    );
}


function closeCertificate() {
    if (!certificateModal) {
        return;
    }

    certificateModal.classList.remove(
        "open"
    );

    certificateModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "modal-open"
    );

    if (
        certificateModalImage
    ) {
        certificateModalImage.src =
            "";

        certificateModalImage.alt =
            "";
    }
}


/* =========================================================
   Navigation
========================================================= */

function initializeNavigation() {
    if (
        !menuToggle ||
        !mainNav
    ) {
        return;
    }

    menuToggle.addEventListener(
        "click",
        function() {
            mainNav.classList.toggle(
                "open"
            );

            const isOpen =
                mainNav.classList
                    .contains(
                        "open"
                    );

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );
        }
    );

    mainNav
        .querySelectorAll("a")
        .forEach(function(link) {
            link.addEventListener(
                "click",
                function() {
                    mainNav.classList.remove(
                        "open"
                    );

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );
                }
            );
        });
}


/* =========================================================
   Ereignisse
========================================================= */

function initializeBeerSlider() {
    if (prevBeer) {
        prevBeer.addEventListener(
            "click",
            function() {
                goToBeer(
                    currentBeerIndex -
                    1
                );
            }
        );
    }

    if (nextBeer) {
        nextBeer.addEventListener(
            "click",
            function() {
                goToBeer(
                    currentBeerIndex +
                    1
                );
            }
        );
    }

    const beerSlider =
        document.querySelector(
            ".beer-slider"
        );

    if (beerSlider) {
        beerSlider.addEventListener(
            "mouseenter",
            stopAutoSlide
        );

        beerSlider.addEventListener(
            "mouseleave",
            startAutoSlide
        );
    }
}


function initializeCertificateGallery() {
    certificateCards.forEach(
        function(card) {
            card.addEventListener(
                "click",
                function() {
                    const imageSource =
                        card.dataset
                            .certificate ||
                        "";

                    const title =
                        card.dataset.title ||
                        "Zertifikat";

                    openCertificate(
                        imageSource,
                        title
                    );
                }
            );
        }
    );

    if (
        certificateModalClose
    ) {
        certificateModalClose
            .addEventListener(
                "click",
                closeCertificate
            );
    }

    if (
        certificateModalBackdrop
    ) {
        certificateModalBackdrop
            .addEventListener(
                "click",
                closeCertificate
            );
    }

    document.addEventListener(
        "keydown",
        function(event) {
            if (
                event.key ===
                    "Escape" &&
                certificateModal &&
                certificateModal
                    .classList
                    .contains(
                        "open"
                    )
            ) {
                closeCertificate();
            }
        }
    );
}


/* =========================================================
   Initialisierung
========================================================= */

function initializeWebsite() {
    initializeNavigation();

    initializeBeerSlider();

    initializeCertificateGallery();

    createDots();

    renderBeer(
        currentBeerIndex
    );

    startAutoSlide();
}


if (
    document.readyState ===
    "loading"
) {
    document.addEventListener(
        "DOMContentLoaded",
        initializeWebsite
    );
} else {
    initializeWebsite();
}
