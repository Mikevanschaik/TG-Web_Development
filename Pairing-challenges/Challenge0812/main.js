const catButton = document.getElementById("cat");
const dogButton = document.getElementById("dog");
const pidgeonButton = document.getElementById("pidgeon");
const popUp = document.getElementById("popUp");

popUp.style.display = 'none';

catButton.onclick = showCat;
dogButton.onclick =  showDog;
pidgeonButton.onclick =  showPidgeon;

let popUpDiv = document.createElement('div');
let popUpImg = document.createElement('img')
let popUpClose = document.createElement('span');
let popUpPara = document.createElement('p');

function createPopUpElms() {
    popUp.classList.toggle('showPopUp');
    popUp.appendChild(popUpDiv);
    popUpDiv.appendChild(popUpImg);
    popUpImg.src = '';
    popUpDiv.appendChild(popUpPara);
    popUpPara.innerHTML = '';
    popUpDiv.appendChild(popUpClose);
    popUpClose.innerHTML = 'X';
    popUpClose.onclick = hidePopUp;
    popUp.style.display = "flex";
}

function showCat() {
    createPopUpElms();
    popUpImg.src = 'cat.jpg';
    let catQuotes = [
        'dit is een kat',
        'is dit een kat?',
        'dit is geen duif',
        'dit is geen hond',
        'een echte kat'
    ]
    let catQuote = catQuotes[Math.floor(Math.random() * catQuotes.length)];
    popUpPara.innerHTML = catQuote;
}
function showDog() {
    createPopUpElms();
    popUpImg.src = 'dog.jpg';
    let dogQuotes = [
        'dit is een hond',
        'is dit een hond?',
        'dit is geen duif',
        'dit is geen kat',
        'een echte hond'
    ]
    let dogQuote = dogQuotes[Math.floor(Math.random() * dogQuotes.length)];
    popUpPara.innerHTML = dogQuote;
}
function showPidgeon() {
    createPopUpElms();
    popUpImg.src = 'pidgeon.jpg';
    let pidgeonQuotes = [
        'dit is een duif',
        'is dit een duif?',
        'dit is geen kat',
        'dit is geen hond',
        'een echte duif'
    ]
    let pidgeonQuote = pidgeonQuotes[Math.floor(Math.random() * pidgeonQuotes.length)];
    popUpPara.innerHTML = pidgeonQuote;
}
window.onclick = function(event) {
    if(event.target == popUp) {
        hidePopUp();
    }
}
function hidePopUp() {
    popUp.classList.remove('showPopUp');
    popUp.classList.add('hidePopUp');
    setTimeout(() => {
        popUp.removeChild(popUpDiv);
        popUp.classList.remove('hidePopUp');
        popUp.style.display = 'none';
    }, 600);
}

