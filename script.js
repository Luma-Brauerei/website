"use strict";

const beers = [
    {
        name: "Helles",
        style: "Klassisch",
        image: "bier-helles.png",
        description: "Süffig, klar und ausgewogen. Ein unkompliziertes Bier für fast jeden Anlass.",
        hops: "Hallertauer Mittelfrüh, Tettnanger",
        malts: "Pilsner Malz, Wiener Malz",
        ibu: "ca. 20",
        abv: "ca. 5.0 %"
    },
    {
        name: "Brown Ale",
        style: "Malzig",
        image: "bier-brown-ale.png",
        description: "Rund, malzig und leicht karamellig. Vollmundig, aber nicht schwer.",
        hops: "East Kent Goldings, Fuggle",
        malts: "Pale Ale, Münchner, Crystal, Chocolate",
        ibu: "ca. 28",
        abv: "ca. 5.5 %"
    },
    {
        name: "Cold IPA",
        style: "Modern",
        image: "bier-cold-ipa.png",
        description: "Trocken, schlank und hopfenbetont. IPA-Aroma mit besonders klarem Finish.",
        hops: "Citra, Mosaic, Simcoe",
        malts: "Pilsner Malz, Reisflocken",
        ibu: "ca. 45",
        abv: "ca. 6.2 %"
    },
    {
        name: "Hazy IPA",
        style: "Fruchtig",
        image: "bier-hazy-ipa.png",
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

function renderBeer(index){
    if(!beerImage) return;
    const beer = beers[index];
    beerImage.style.backgroundImage=`linear-gradient(135deg, rgba(141,255,120,.12), rgba(255,79,163,.12)), url('${beer.image}')`;
    beerStyle.textContent=beer.style;
    beerName.textContent=beer.name;
    beerDescription.textContent=beer.description;
    beerHops.textContent=beer.hops;
    beerMalts.textContent=beer.malts;
    beerIbu.textContent=beer.ibu;
    beerAbv.textContent=beer.abv;
    beerDots.querySelectorAll("button").forEach((b,i)=>b.classList.toggle("active",i===index));
}

function goToBeer(index){
    currentBeerIndex=(index+beers.length)%beers.length;
    renderBeer(currentBeerIndex);
    restartAutoSlide();
}

function createDots(){
    if(!beerDots) return;
    beers.forEach((_,i)=>{
        const b=document.createElement("button");
        b.setAttribute("aria-label","Bier "+(i+1));
        b.addEventListener("click",()=>goToBeer(i));
        beerDots.appendChild(b);
    });
}

function startAutoSlide(){
    autoSlideTimer=setInterval(()=>goToBeer(currentBeerIndex+1),8000);
}
function restartAutoSlide(){
    if(autoSlideTimer) clearInterval(autoSlideTimer);
    startAutoSlide();
}

function openCertificate(src,title){
    if(!certificateModal) return;
    certificateModalImage.src=src;
    certificateModalImage.alt=title;
    certificateModalTitle.textContent=title;
    certificateModal.classList.add("open");
    document.body.classList.add("modal-open");
}
function closeCertificate(){
    if(!certificateModal) return;
    certificateModal.classList.remove("open");
    certificateModalImage.src="";
    document.body.classList.remove("modal-open");
}

prevBeer?.addEventListener("click",()=>goToBeer(currentBeerIndex-1));
nextBeer?.addEventListener("click",()=>goToBeer(currentBeerIndex+1));
menuToggle?.addEventListener("click",()=>mainNav?.classList.toggle("open"));
mainNav?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>mainNav.classList.remove("open")));

certificateCards.forEach(card=>{
    card.addEventListener("click",()=>{
        openCertificate(card.dataset.certificate||"",card.dataset.title||"Zertifikat");
    });
});

certificateModalClose?.addEventListener("click",closeCertificate);
certificateModalBackdrop?.addEventListener("click",closeCertificate);

document.addEventListener("keydown",e=>{
    if(e.key==="Escape") closeCertificate();
});

createDots();
renderBeer(currentBeerIndex);
startAutoSlide();
