'use strict'

const cards = document.querySelectorAll('.cards');
const colors = ['red', 'red', 'blue', 'blue', 'yellow', 'yellow', 'purple', 'purple', 'pink', 'pink', 'orange', 'orange'];

let info = [];

function shuffle(array){
    let i = array.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i + 1));
        temp = array[j];
        array[j] = array[i];
        array[i] = temp;
    }
    return array;
}

info = shuffle(colors);

for (let i = 0; i < cards.length; i++) {
    let card = cards[i];

    card.style.backgroundColor = info[i];
}

function cover() {
    for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        
        card.style.backgroundColor = 'white';
    }
}

setTimeout(cover, 5000);

function coverItem() {
    for (let i = 0; i < cards.length; i++) {
        let card = cards[i];

        if (cards[i].style.border != '3px solid green') {
            card.style.backgroundColor = 'white';
        }
    }
}

let cardsStyle = [];
let comparison = [];
let endGame = [];

const winner = document.createElement('span');
const winnerField = document.querySelector('.winner-field');

for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", () => {
        cards[i].style.backgroundColor = info[i];
        cardsStyle.push(cards[i].style.backgroundColor);
        comparison.push(i);
        if ((cardsStyle.length === 2 && comparison.length !== 2) || (cardsStyle.length === 2 && comparison.length === 2 && info[comparison[0]] !== info[comparison[1]])) {
            setTimeout(coverItem, 500);
            cardsStyle = [];
            comparison = [];
        } else if (cardsStyle.length === 2 && comparison.length === 2 && info[comparison[0]] === info[comparison[1]]) {
            cards[comparison[0]].style.border = '3px solid green';
            cards[comparison[1]].style.border = '3px solid green';

            endGame.push(i);
            if (endGame.length === 6) {
                clearInterval(timer);
                document.getElementById("off-pause").disabled = true;
                
                winnerField.appendChild(winner);
                winner.classList.add('winner');
                winner.textContent = 'You won :)'
            }
            
            cardsStyle = [];
            comparison = [];
        }
    });
}

//Watch

const watch = document.querySelector('#watch');
let milliseconds = 0;
let timer;

const time = () => {
	watch.classList.remove('paused');
	clearInterval(timer);
	timer = setInterval(()=>{
		milliseconds += 10;
		let dateTimer = new Date(milliseconds);
		watch.innerHTML =
			('0'+dateTimer.getMinutes()).slice(-2) + ':' +
			('0'+dateTimer.getSeconds()).slice(-2);
	},10);
};

const pauseWatch = () => {
  watch.classList.add('paused');
  clearInterval(timer);
};

const offPause = () => {
    time();
}

document.addEventListener('click', (e) =>{
	const element = e.target;
	if (element.id === 'pause') pauseWatch();
    if (element.id === 'off-pause') offPause();
});

function startWatch() {
    time();
}

setTimeout(startWatch, 5000);


