// import all sound effects
let redAudio = new Audio('./sources/audio/red.mp3')
let blueAudio = new Audio('./sources/audio/blue.mp3')
let yellowAudio = new Audio('./sources/audio/yellow.mp3')
let greenAudio = new Audio('./sources/audio/green.mp3')
let winAudio = new Audio('./sources/audio/you_won.mp3')
let wrongAudio = new Audio('./sources/audio/wrong.mp3')

// import all buttons
let redBtn = document.getElementById("red")
let blueBtn = document.getElementById("blue")
let yellowBtn = document.getElementById("yellow")
let greenBtn = document.getElementById("green")
let startBtn = document.getElementById("start-btn")
let repeatBtn = document.getElementById("repeat-btn")

// simons says diff array
let randList = []
// check diff pointer
let pointer = 0

// load last game session on page load
function loadScore(){
	// get saved diff array from local storage
	randList = JSON.parse(localStorage.getItem('lastGame'))
	// if no array was found, array must be empty
	if(randList === null || randList.length === 0){
		randList = []
	}
	// load old score
	document.getElementById("score").innerHTML = randList.length * 50
	console.log("Last session loaded.")
}

// start new game
function startNewGame(){
	// add random number to array
	randList.push(Math.floor(Math.random() * 4) + 1)
	console.log(randList)
	console.log("New Game")
	// show saimon says diff
	showDiff()
}

// show saimon says diff on game field
function showDiff(){
	// block all buttons
	blockBtns(true)
	// timeout timer pointer
	i = 0 
	// show all buttons
	randList.forEach((e) => {
		setTimeout(() => {
			// show red button
			if(e === 1){
				// make red button background dark
				redBtn.style.backgroundColor = "darkred"
				// play audio sample
				redAudio.play().then(()=>{
					// wait 0.5 second before changing color back
					setTimeout(() => {
						// change background color back
						redBtn.style.backgroundColor = "red"
					}, 500);
				})
			} 
			// show blue button
			else if(e === 2){
				// make blue button background dark
				blueBtn.style.backgroundColor = "darkblue"
				// play audio sample
				blueAudio.play().then(()=>{
					// wait 0.5 second before changing color back
					setTimeout(() => {
						// change background color back
						blueBtn.style.backgroundColor = "blue"
					}, 500);
				})
			} 
			// show yellow button
			else if(e === 3){
				// make yellow button background dark
				yellowBtn.style.backgroundColor = "darkgoldenrod"
				// play audio sample
				yellowAudio.play().then(()=>{
					// wait 0.5 second before changing color back
					setTimeout(() => {
						// change background color back
						yellowBtn.style.backgroundColor = "yellow"
					}, 500);
				})
			} 
			// show green button
			else if(e === 4){
				// make green button background dark
				greenBtn.style.backgroundColor = "darkgreen"
				// play audio sample
				greenAudio.play().then(()=>{
					// wait 0.5 second before changing color back
					setTimeout(() => {
						// change background color back
						greenBtn.style.backgroundColor = "green"
					}, 500);
				})
			}
		}, i * 1000)
		i += 1
	})
	// wait all audios before unblock buttons back
	setTimeout(() => {
		// unblock buttons
		blockBtns(false)
	}, i* 1000)
}

// red button press handler
function pressRedBtn(){
	// play audio sample
	redAudio.play().then(() => {
		console.log("Red")
		// check diff
		checkEntry(1)
	})
}

// blue button press handler
function pressBlueBtn(){
	// play audio sample
	blueAudio.play().then(() => {
		console.log("Blue")
		// check diff
		checkEntry(2)
	})
}

// yellow button press handler
function pressYellowBtn(){
	// play audio sample
	yellowAudio.play().then(() => {
		console.log("Yellow")
		// check diff
		checkEntry(3)
	})
}

// green button press handler
function pressGreenBtn(){
	// play audio sample
	greenAudio.play().then(() => {
		console.log("Green")
		// check diff
		checkEntry(4)
	})
}

// check user entry with simon says diff
function checkEntry(btn){
	// diff array cant be empty
	if(randList.length != 0){
		// check if button correct
		if(btn === randList[pointer]){
			// update pointer for next user entry
			pointer += 1
			// if entry is last
			if(randList.length === pointer){
				// user wins
				win()
			}
		} else{
			// user looses
			wrong()
		}
	}
}

// user win
function win(){
	winAudio.play().then(() => {
		console.log("win")
		pointer = 0
		localStorage.setItem('lastGame', JSON.stringify(randList))
		document.getElementById("score").innerHTML = randList.length * 50
		setTimeout(() => {
			startNewGame()
		}, 2000);
	})
}

// user loose
function wrong(){
	// reset array and pointer
	randList = []
	pointer = 0
	// play looser audio
	wrongAudio.play().then(() => {
		console.log("loose")
		// clear score and local storage
		localStorage.removeItem('lastGame')
		document.getElementById("score").innerHTML = 0
	})
}

// block buttons
function blockBtns(status){
	redBtn.disabled = status
	blueBtn.disabled = status
	yellowBtn.disabled = status
	greenBtn.disabled = status
	startBtn.disabled = status
	repeatBtn.disabled = status
}