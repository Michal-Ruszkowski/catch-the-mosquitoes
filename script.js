const container = document.getElementById("container");
const yes = new Audio(src = "audio/yes.wav"); //from https://freesound.org/people/gnuoctathorpe/sounds/404868/
const winner = new Audio(src = "audio/winner.mp3"); //from https://freesound.org/people/FunWithSound/sounds/456966/


document.querySelector("#game").addEventListener("click", function () {
	container.style.display = "block";
	container.style.textAlign = "center";
	container.style.backgroundColor = "#000";
	container.innerHTML = `<p>Wybierz poziom trudności:<p><span class="reload" onclick="difficultEasy()">ŁATWY</span></p><p><span class="reload" onclick="difficultMedium()">ŚREDNI</span></p></p><p><span class="reload" onclick="difficultHard()">TRUDNY</span></p>`
});

function difficultEasy(){
	difficult = "easy";
	countdownMosquitos();
}

function difficultMedium(){
	difficult = "medium";
	countdownMosquitos();
}

function difficultHard(){
	difficult = "hard";
	countdownMosquitos();
}

let howManyMosquitoes = 10;
let restartMosquito = false;
let difficult ="";
let countdown = 3;
let countdownStop = false;
let hiscoreTime = "99:99:99";

function countdownMosquitos(){
	if(countdownStop==false){
		container.innerHTML = `<div id="countdown">${countdown}</div>`;
		countdown--;
		setTimeout("countdownMosquitos()", 1000);
		if(countdown==-1){
			countdownStop = true;
			mosquitosStart();
		}
	}
}

function mosquitosStart(){
	const room = `<div id="room"><div id="howManyMosquitoes">Liczba pozostałych komarów: ${howManyMosquitoes}</div><div id="hi-score"></div><div id="stopwatch">00:00:00</div><div id="newRecord"></div><div id="mosquito1" class="mosquitos"></div><div id="mosquito2" class="mosquitos"></div><div id="mosquito3" class="mosquitos"></div><div id="mosquito4" class="mosquitos"></div><div id="mosquito5" class="mosquitos"></div><div id="mosquito6" class="mosquitos"></div><div id="mosquito7" class="mosquitos"></div><div id="mosquito8" class="mosquitos"></div><div id="mosquito9" class="mosquitos"></div><div id="mosquito10" class="mosquitos"></div></div>`;
	container.innerHTML = room;

	let mosquitos = document.getElementsByClassName("mosquitos");

	for (i=0; i<mosquitos.length; i++){
		if(difficult=="easy"){
			mosquitos[i].style.animationDuration = "30s";
		}else if(difficult=="medium"){
			mosquitos[i].style.animationDuration = "15s";
		}else if(difficult=="hard"){
			mosquitos[i].style.animationDuration = "7s";
		}
	}

	if(restartMosquito == true){
		stopwatch.innerHTML = '00:00:00';
		stoptime=false;
		minutes = 0;
		seconds = 0;
		centiseconds = 0;
		howManyMosquitoes = 10;
		document.getElementById("hi-score").innerHTML = `rekord: ${hiscoreTime}`;
		document.getElementById("howManyMosquitoes").innerHTML = `Liczba pozostałych komarów: ${howManyMosquitoes}`;
	}

	stopwatchStart();

	for (i=0; i<mosquitos.length; i++){
		mosquitos[i].addEventListener("click", function(){
			howManyMosquitoes--;
			yes.play();
			document.getElementById("howManyMosquitoes").innerHTML = `Liczba pozostałych komarów: ${howManyMosquitoes}`;
			this.remove();

			if (howManyMosquitoes==0){
				stopwatchStop();
				let resultTime = document.getElementById("stopwatch").textContent;
				const room = document.getElementById("room");
				room.style.background = "#000";
				room.style.textAlign = "center";
				room.innerHTML = `<div id="hi-score"></div><div id="stopwatch">${resultTime}</div><div id="newRecord"></div><div><span class="reload" onclick="mosquitosStart()">spróbuj jeszcze raz</span></div><div><span class="reload" onclick="location.reload()">powrót</span></div>`;
				document.getElementById("hi-score").style.textAlign = "left";
				restartMosquito = true;

				if(resultTime < hiscoreTime){
					winner.play();
					hiscoreTime = resultTime;
					document.getElementById("hi-score").innerHTML = `rekord: ${resultTime}`;
					document.getElementById("newRecord").innerHTML = "Nowy rekord!";
				}
			}
		});
	}
}
