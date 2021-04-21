let minutes = 0;
let seconds = 0;
let centiseconds = 0;
let stoptime = false;

function stopwatchStart() {
	if(stoptime== false){
		centiseconds = parseInt(centiseconds);
		seconds = parseInt(seconds);
		minutes = parseInt(minutes);
		centiseconds++;
		if (centiseconds == 60) {
			seconds = seconds + 1;
			centiseconds = 0;
		}
		if (seconds == 60) {
			minutes = minutes + 1;
			seconds = 0;
		}
		if (centiseconds < 10) centiseconds = "0" + centiseconds;
		if (seconds < 10) seconds = "0" + seconds;
		if (minutes < 10) minutes = "0" + minutes;

		document.getElementById("stopwatch").innerHTML = minutes + ":" + seconds + ":" + centiseconds;
		setTimeout("stopwatchStart()", 10);
	}
}

function  stopwatchStop(){
	stoptime = true;
}
