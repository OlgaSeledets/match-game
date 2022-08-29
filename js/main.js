'use strict'

const playingField = document.querySelector('.playing-field')
const level1Btn = document.querySelector('.level1')
const level2Btn = document.querySelector('.level2')
const level3Btn = document.querySelector('.level3')
const level4Btn = document.querySelector('.level4')


const levels = {
    level1: ['pink', 'pink', 'red', 'red', 'purple', 'purple', 'Fuchsia', 'Fuchsia'], //8
    level2: ['red', 'red', 'blue', 'blue', 'yellow', 'yellow', 'purple', 'purple', 'pink', 'pink', 'orange', 'orange'], //12
    level3: ['red', 'red', 'blue', 'blue', 'yellow', 'yellow', 'purple', 'purple', 'pink', 'pink', 'orange', 'orange','Fuchsia', 'Fuchsia', 'RosyBrown', 'RosyBrown'], //16
    level4: ['red', 'red', 'blue', 'blue', 'yellow', 'yellow', 'purple', 'purple', 'pink', 'pink', 'orange', 'orange', 'CadetBlue', 'CadetBlue', 'MediumPurple', 'MediumPurple', 'Fuchsia', 'Fuchsia', 'RosyBrown', 'RosyBrown'], //20
}
let cards = []
let info = []

// if (cards.length > 0) {
//     console.log('->', playingField.childElementCount)
//     for (const card of cards) {
//         playingField.removeChild(card)
//     }
// }

const watch = document.querySelector('#watch')
let milliseconds = 0
let timer

function createplayingField(level, endGameNum) {
    cards = []
    if (playingField.hasChildNodes()) {
        while (playingField.firstChild) {
            playingField.removeChild(playingField.firstChild)
        }
    }
    //console.log(playingField.children)
    info = shuffle(level);
    for (let i = 0; i < endGameNum * 2; i++) {
        let card = document.createElement('div')
        playingField.appendChild(card)
        card.className = 'card'
        card.style.backgroundColor = info[i]
        cards.push(card)
    }
    setTimeout(cover, 5000)
    //setTimeout(time, 4000)
    play(endGameNum)
}

let currentLevel 

level1Btn.addEventListener('click', () => {
    createplayingField(levels.level1, 4)
    resetTime()
    currentLevel = 1
})

level2Btn.addEventListener('click', () => {
    createplayingField(levels.level2, 6)
    resetTime()
    currentLevel = 2
})

level3Btn.addEventListener('click', () => {
    createplayingField(levels.level3, 8)
    resetTime()
    currentLevel = 3
})

level4Btn.addEventListener('click', () => {
    createplayingField(levels.level4, 10)
    resetTime()
    currentLevel = 4
})

function shuffle(array){
    let i = array.length
    while(--i > 0) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
        //[array[i], array[j]] = [array[j], array[i]]
    }
    return array;
}

function cover() {
    for (let i = 0; i < cards.length; i++) {
        let card = cards[i]
        card.style.backgroundColor = 'white'
        card.textContent = '?'
    }
}

function coverItem() {
    for (let i = 0; i < cards.length; i++) {
        let card = cards[i]
        if (cards[i].style.border != '3px solid green') {
            card.style.backgroundColor = 'white'
            card.textContent = '?'
        }
    }
}

let cardsStyle = []
let comparison = []
let endGame = []
let counterCheck = []

const winner = document.createElement('span');
const winnerField = document.querySelector('.winner-field');

const timeLevels = {
    level1: [],
    level2: [],
    level3: [],
    level4: [],
}

document.addEventListener("DOMContentLoaded", () => {
    const scoreData1 = JSON.parse(localStorage.getItem('watchLevel1'))
    const scoreData2 = JSON.parse(localStorage.getItem('watchLevel2'))
    const scoreData3 = JSON.parse(localStorage.getItem('watchLevel3'))
    const scoreData4 = JSON.parse(localStorage.getItem('watchLevel4'))
    const timeText1 = JSON.parse(localStorage.getItem('timeLevel1'))
    const timeText2 = JSON.parse(localStorage.getItem('timeLevel2'))
    const timeText3 = JSON.parse(localStorage.getItem('timeLevel3'))
    const timeText4 = JSON.parse(localStorage.getItem('timeLevel4'))
    
    timeLevels.level1 = scoreData1 === null ? [] : scoreData1
    level1Btn.textContent = timeText1 === null ? 'Level 1' : timeText1
    timeLevels.level2 = scoreData2 === null ? [] : scoreData2
    level2Btn.textContent = timeText2 === null ? 'Level 2' : timeText2
    timeLevels.level3 = scoreData3 === null ? [] : scoreData3
    level3Btn.textContent = timeText3 === null ? 'Level 3' : timeText3
    timeLevels.level4 = scoreData4 === null ? [] : scoreData4
    level4Btn.textContent = timeText4 === null ? 'Level 4' : timeText4
})


function theBestTime(arr, text) {
    const resultsInSeconds = arr.map((item) => item.slice(0, 2) * 60 + +item.slice(-2))
    const minutes = Math.trunc(Math.min(...resultsInSeconds) / 60)
    const seconds = Math.trunc(Math.round((Math.min(...resultsInSeconds) / 60 - minutes) * 60))
    text.textContent = `Level ${currentLevel} ${minutes}:${seconds}`
    switch (currentLevel) {
        case 1:
            localStorage.setItem('timeLevel1', JSON.stringify(text.textContent))
            break
        case 2:
            localStorage.setItem('timeLevel2', JSON.stringify(text.textContent))
            break
        case 3:
            localStorage.setItem('timeLevel3', JSON.stringify(text.textContent))
            break
        case 4: 
            localStorage.setItem('timeLevel4', JSON.stringify(text.textContent))
            break
    }
}

function play(endGameNum) {
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", () => {
            counterCheck.push(i)
            cards[i].style.backgroundColor = info[i]
            cards[i].textContent = ''
            cardsStyle.push(cards[i].style.backgroundColor)
            comparison.push(i);
            console.log(counterCheck.length)
            if (counterCheck.length === 2) {
                if (counterCheck[0] === counterCheck[1]) {
                    counterCheck = []
                    setTimeout(coverItem, 100)
                    cardsStyle = []
                    comparison = []
                }
                counterCheck = []
            }
            if ((cardsStyle.length === 2 && comparison.length !== 2) || (cardsStyle.length === 2 && comparison.length === 2 && info[comparison[0]] !== info[comparison[1]])) {
                setTimeout(coverItem, 500);
                cardsStyle = [];
                comparison = [];
            } 
            else if (cardsStyle.length === 2 && comparison.length === 2 && info[comparison[0]] === info[comparison[1]]) {
                cards[comparison[0]].style.border = '3px solid green'
                cards[comparison[1]].style.border = '3px solid green'
                cards[comparison[0]].textContent = ''
                cards[comparison[1]].textContent = ''
                cards[comparison[0]].style.pointerEvents = 'none'
                cards[comparison[1]].style.pointerEvents = 'none'
                endGame.push(i)
                if (endGame.length === endGameNum) {
                    clearInterval(timer);
                    //document.getElementById("off-pause").disabled = true;
                    
                    winnerField.appendChild(winner);
                    winner.classList.add('winner');
                    winner.textContent = 'You won :)'

                    switch (currentLevel) {
                        case 1:
                            timeLevels.level1.push(watch.textContent)
                            localStorage.setItem('watchLevel1', JSON.stringify(timeLevels.level1))
                            theBestTime(timeLevels.level1, level1Btn)
                            console.log(timeLevels.level1)
                            break
                        case 2:
                            timeLevels.level2.push(watch.textContent)
                            localStorage.setItem('watchLevel2', JSON.stringify(timeLevels.level2))
                            theBestTime(timeLevels.level2, level2Btn)
                            console.log(timeLevels.level2)
                            break
                        case 3:
                            timeLevels.level3.push(watch.textContent)
                            localStorage.setItem('watchLevel3', JSON.stringify(timeLevels.level3))
                            theBestTime(timeLevels.level3, level3Btn)
                            console.log(timeLevels.level3)
                            console.log(currentLevel)
                            break
                        case 4:
                            timeLevels.level4.push(watch.textContent)
                            localStorage.setItem('watchLevel4', JSON.stringify(timeLevels.level4))
                            theBestTime(timeLevels.level4, level4Btn)
                            console.log(timeLevels.level4)
                            break
                    }
                }
                cardsStyle = [];
                comparison = [];
            }
        });
    }
    endGame = []
    winner.textContent = ' '
}

//Stopwatch

const time = () => {
	//watch.classList.remove('paused')
	clearInterval(timer)
	timer = setInterval(()=>{
		milliseconds += 10
		let dateTimer = new Date(milliseconds)
		watch.textContent =
			('0'+dateTimer.getMinutes()).slice(-2) + ':' +
			('0'+dateTimer.getSeconds()).slice(-2)
	}, 10)
}

const resetTime = () => {
    clearInterval(timer)
    milliseconds = 0
    watch.textContent = '00:00'
    setTimeout(time, 4000)
}

// const pauseWatch = () => {
//   watch.classList.add('paused');
//   clearInterval(timer);
//   document.querySelector('.playing-field').style.pointerEvents = 'none';
// }

// const offPause = () => {
//     time()
//     document.querySelector('.playing-field').style.pointerEvents = 'auto'
// }

//setTimeout(offPause, 5000);

// document.addEventListener('click', (e) =>{
// 	const element = e.target;
// 	if (element.id === 'pause') pauseWatch();
//     if (element.id === 'off-pause') offPause();
// });

