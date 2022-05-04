let redAudio = new Audio('./sources/audio/red.mp3')
let blueAudio = new Audio('./sources/audio/blue.mp3')
let yellowAudio = new Audio('./sources/audio/yellow.mp3')
let greenAudio = new Audio('./sources/audio/green.mp3')
let winAudio = new Audio('./sources/audio/you_won.mp3')
let wrongAudio = new Audio('./sources/audio/wrong.mp3')

let randList = []
let difficulty = 4
let score = 0

let redBtn = document.getElementById("red")
let blueBtn = document.getElementById("blue")
let yellowBtn = document.getElementById("yellow")
let greenBtn = document.getElementById("green")
let startBtn = document.getElementById("start-btn")
let repeatBtn = document.getElementById("repeat-btn")

function loadScore(){
	score =	localStorage.getItem('gameScore')
	difficulty = localStorage.getItem('gameDifficulty')
	if(score === null || difficulty === null){
		difficulty = 4
		score = 0
	} else{
		score = parseInt(score)
		difficulty = parseInt(difficulty)
	}
	document.getElementById("score").innerHTML = score
	console.log("old score loaded")
}

function startNewGame(){
	randList = []
	for (step = 0; step < difficulty; step++) {
		randList.push(Math.floor(Math.random() * 4) + 1)
	}
	console.log(randList)
	console.log("New Game")
	showDiff()
}

function showDiff(){
	if(randList.length === difficulty){
		blockBtns(true)
		i = 0
		randList.forEach((e) => {
			setTimeout(() => {
				if(e === 1){
					redBtn.style.backgroundColor = "darkred"
					redAudio.play().then(()=>{
						setTimeout(() => {
							redBtn.style.backgroundColor = "red"
						}, 500);
					})
				} else if(e === 2){
					blueBtn.style.backgroundColor = "darkblue"
					blueAudio.play().then(()=>{
						setTimeout(() => {
							blueBtn.style.backgroundColor = "blue"
						}, 500);
					})
				} else if(e === 3){
					yellowBtn.style.backgroundColor = "darkgoldenrod"
					yellowAudio.play().then(()=>{
						setTimeout(() => {
							yellowBtn.style.backgroundColor = "yellow"
						}, 500);
					})
				} else if(e === 4){
					greenBtn.style.backgroundColor = "darkgreen"
					greenAudio.play().then(()=>{
						setTimeout(() => {
							greenBtn.style.backgroundColor = "green"
						}, 500);
					})
				}
			}, i * 1000)
			i += 1
		})
		setTimeout(() => {
			blockBtns(false)
		}, i* 1000)
	}
}

function pressRedBtn(){
	redAudio.play().then(() => {
		console.log("Red")
		checkEntry(1)
	})
}

function pressBlueBtn(){
	blueAudio.play().then(() => {
		console.log("Blue")
		checkEntry(2)
	})
}

function pressYellowBtn(){
	yellowAudio.play().then(() => {
		console.log("Yellow")
		checkEntry(3)
	})
}

function pressGreenBtn(){
	greenAudio.play().then(() => {
		console.log("Green")
		checkEntry(4)
	})
}

function checkEntry(btn){
	if(randList.length != 0){
		if(btn === randList[0]){
			randList.shift()
			if(randList.length === 0){
				win()
			}
		} else{
			wrong()
		}
	}
}

function win(){
	winAudio.play().then(() => {
		console.log("win")
		score += 50
		difficulty += 1
		localStorage.setItem('gameScore', score)
		localStorage.setItem('gameDifficulty', difficulty)
		document.getElementById("score").innerHTML = score
		setTimeout(() => {
			startNewGame()
		}, 2000);
	})
}

function wrong(){
	randList = []
	wrongAudio.play().then(() => {
		console.log("loose")
		score = 0
		difficulty = 4
		localStorage.removeItem('gameScore')
		localStorage.removeItem('gameDifficulty')
		document.getElementById("score").innerHTML = 0
	})
}

function blockBtns(status){
	redBtn.disabled = status
	blueBtn.disabled = status
	yellowBtn.disabled = status
	greenBtn.disabled = status
	startBtn.disabled = status
	repeatBtn.disabled = status
}