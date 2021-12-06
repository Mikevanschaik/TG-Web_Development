class game {

    constructor(container, icons) {

        icons.forEach((icon, hand) => {
        const button = document.createElement("button");
        button.innerText = icon;
        container.appendChild(button);
    }



new Game(document.querySelector('#container'), ['👊', '✋', '✌️']);

 