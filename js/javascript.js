/* let biler = []; // Global variabel, kendt af alle hvis data skal hentes fra jsonbin
 fetch("https://api.jsonbin.io/b/61f8300d518e5f3b2ab39a7a") // Husk at URL skal passe med json data 
// fetch("js/biler.json") // Eksempel med billiste fra lokal fil. Husk at køre live server.
    .then(function (data) { //støbt i cement
        return data.json(); //støbt i cement
    })                      //støbt i cement
    .then(function (post) {
        biler = post.billiste; // Global variable sat til JSON indhold
    }) */

    //Herunder er json data hardcoded
    let biler = [
        {
            bilmaerke: "Audi E-tron",
            billede: "billeder/e-tron.jpeg",
            billedtekst: "Billede af udlejningsbil",
            kategori: "Smuttur",
            personer: "4",
            kufferter: "2",
            tillaeg: "105"
        },
        {
            bilmaerke: "BMW i3",
            billede: "billeder/bmw-i3.jpeg",
            billedtekst: "Billede af udlejningsbil",
            kategori: "Budget",
            personer: "4",
            kufferter: "0",
            tillaeg: "0"
        },
        {
            bilmaerke: "Familievan",
            billede: "billeder/biler/familien.webp",
            billedtekst: "Billede af udlejningsbil",
            kategori: "Road Trip",
            personer: "6",
            kufferter: "8",
            tillaeg: "60"
        },
        {
            bilmaerke: "Porsche Taycan",
            billede: "billeder/taycan.jpeg",
            billedtekst: "Billede af udlejningsbil",
            kategori: "Baller",
            personer: "4",
            kufferter: "4",
            tillaeg: "60"
        },
        {
            bilmaerke: "Tesla Model 3",
            billede: "billeder/tesla.jpg",
            billedtekst: "Billede af udlejningsbil",
            kategori: "Sjov og ballade",
            personer: "5",
            kufferter: "4",
            tillaeg: "60"
        }
    ];

const sektion = document.getElementById('bil_sektion');
const skabelon = document.getElementById('skabelon_output');
const personer = document.getElementById('personer');
const kufferter = document.getElementById('kufferter');
const formular = document.getElementById('formular');
const afhentningsdato = document.getElementById('afhentning');
const afleveringsdato = document.getElementById('aflevering');

formular.addEventListener("submit", function (event) {
    event.preventDefault();
    if (valideDatoer(afhentningsdato.value, afleveringsdato.value)) {
        sektion.innerHTML = ""; //Nulstiller output-sektion
        for (const bil of biler) {
            if (kufferter.value <= bil.kufferter && personer.value <= bil.personer) {
                const antaldage = beregnAntalLejedage(afhentningsdato.value, afleveringsdato.value);
                const klon = skabelon.content.cloneNode(true);
                const bilMM = klon.querySelector(".bilMM");
                const billedtag = klon.querySelector("img");
                const kategori = klon.querySelector(".kategori");
                const antalpersoner = klon.querySelector(".antalpersoner");
                const antalkufferter = klon.querySelector(".antalkufferter");
                const lejeudgift = klon.querySelector(".lejeudgift");
                const link = klon.querySelector("a");

                link.href = `udstyr.html?bil=${bil.bilmaerke}&afhentning=${afhentningsdato.value}&aflevering=${afleveringsdato.value}&lejedage=${antaldage}&lejeudgift=${beregnLejeudgift(antaldage, bil.tillaeg)}`;
                billedtag.src = bil.billede;
                billedtag.alt = bil.billedtekst;
                bilMM.textContent = bil.bilmaerke;
                kategori.textContent += bil.kategori;
                antalkufferter.textContent += bil.kufferter;
                antalpersoner.textContent += bil.personer;
                lejeudgift.textContent = "kr. " + beregnLejeudgift(antaldage, bil.tillaeg);
                sektion.appendChild(klon);
            }
        }
    } else {
        sektion.innerText = "Opgiv en afleveringsdato som ligger efter afhentingsdato.";
    }

})

function valideDatoer(afhentningsdato, afleveringsdato) {
    const afhentning = new Date(afhentningsdato);
    const aflevering = new Date(afleveringsdato);
    if (afhentning > aflevering) {
        return false;
    } else {
        return true;
    }
};

function beregnAntalLejedage(afhentningsdato, afleveringsdato) {
    const AFHENTNING = new Date(afhentningsdato);
    const AFLEVERING = new Date(afleveringsdato);
    const FORSKELITID = AFLEVERING.getTime() - AFHENTNING.getTime();
    const FORSKELIDAGE = FORSKELITID / (1000 * 3600 * 24) + 1;
    return FORSKELIDAGE;
}

function beregnLejeudgift(antaldage, biltillaeg) {
    const MOMS = 0.25;
    const GRUNDBELOEB = 495;
    const PRISPRDAG = 100;
    const LEJEUDGIFT = (GRUNDBELOEB + (antaldage * PRISPRDAG) + (antaldage * biltillaeg)) * (1 + MOMS);
    return LEJEUDGIFT.toFixed(2);
}

//Flip card
const card = document.querySelector('.card__inner');

card.addEventListener('click', function() {
   if (!card.classList.contains('is-flipped')) {
    card.classList.toggle('is-flipped')
   };
});

//Flip card slut

//Scroll effekt til næste sektion
const scrollBtn = document.getElementById('knap');
const sec2 =document.getElementById('section2')

scrollBtn.addEventListener("click", function() {
    sec2.scrollIntoView({behavior: "smooth"});
});

//Log ind
// Get the login modal
const modal = document.getElementById("login-modal");

// Get the button that opens the modal
const btn = document.querySelector("button");

// Get the <span> element that closes the modal
const span = document.querySelector(".close");

// Function to open the modal
function openModal() {
  modal.style.display = "block";
}

// Function to close the modal
function closeModal() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    closeModal();
  }
}

