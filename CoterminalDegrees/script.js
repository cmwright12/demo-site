// (Radians) http://www.codeskulptor.org/#user47_Nho1qe6sqd_0.py
document.addEventListener("DOMContentLoaded", 
	function (event) {

		var randPositive = Math.floor(Math.random() * 1000) + 360;
		var randNegative = -Math.floor(Math.random() * 1000) + 1;
		var score = 0;
		var total = 0;
		var ans;
		var btn_answer_clicked = false;


		document.getElementById("locknumber1").innerHTML = randPositive + "°";
		document.getElementById("results").textContent = "";
		updateScore(score, total);

		function mod(x,n) {
			return ((x % n ) + n ) % n;
		}

		function showNewNumber(event) {
			btn_answer_clicked = false;
			document.documentElement.style.setProperty('--terminal-rotation', 90);
			document.getElementById("results").textContent = "";
			document.getElementById("guess1").value = "";
			randPositive = Math.floor(Math.random() * 1000) + 360;
			randNegative = -Math.floor(Math.random() * 1000) + 1;
			var possible = [randPositive, randNegative];

			var randomIdx = Math.floor(Math.random() * possible.length);

			document.getElementById("results").style.color = "black";
			document.getElementById("locknumber1").innerHTML = possible[randomIdx] + "°";

		}

		function updateScore(score, total) {
			document.getElementById("score").textContent = score;
			document.getElementById("total").textContent = total;
		}

		function findNumRotations(angle) {
			var num = 0;
			var x = angle;
			if (angle >= 0 && angle < 360)
				return num;
			else if (angle >= 360) {
				while (x >= 360) {
					x -=360;
					num++;
				}
			} else {
				while (x < 0) {
					x += 360;
					num++;
				}
			}
			return num;
		}

		function drawRotations(n) {
			//var para = document.createElement("p");                 // Create a <p> element
			//para.innerHTML = "This is a paragraph.";                // Insert text
			//document.getElementById("lock").appendChild(para);     // Append <p> to <div> with id="myDIV" 
		}


		function checkAnswer (event) {

			var x1 = document.getElementById("locknumber1").textContent;
			x1 = (+x1.slice(0,-1));
			ans = mod(x1,360);
			var guess = document.getElementById("guess1").valueAsNumber;
			var numRotations = findNumRotations(x1);
			console.log("numRotations: " + numRotations);
			document.documentElement.style.setProperty('--terminal-rotation', -guess + 90);

			//console.log("guess = " + guess);
			//console.log("ans = " + ans)
			if (guess === ans) {
				//say "good job"
				score += 1;
				total += 1;
				updateScore(score, total);

				document.getElementById("results").style.color = "green";
				document.getElementById("results").textContent = "good job!";
			} else {
				// else say "try again"
				
				//updateScore(score, total);
				document.getElementById("results").style.color = "red";
				document.getElementById("results").textContent = "try again";
			}	

		}

		function showAnswer (event) {
			x1 = document.getElementById("locknumber1").textContent;
			x1 = (+x1.slice(0,-1));
			ans = mod(x1,360);
			document.documentElement.style.setProperty('--terminal-rotation', -ans + 90);
			document.getElementById("results").style.color = "blue";
			document.getElementById("results").textContent = ans + "°";
			if (!btn_answer_clicked) {
				total += 1;
				updateScore(score, total);
				btn_answer_clicked = true;
			}
		}

		function resetScore (event) {
			updateScore(0, 0);
			document.documentElement.style.setProperty('--terminal-rotation', 90);
			document.getElementById("results").textContent = "";
		}

		//document.getElementById("coterminal1").addEventListener("click", checkAnswer);
		//document.querySelector("button")
      	//		.addEventListener("click", checkAnswer);
      	document.getElementById("reset")
      			.addEventListener("click", resetScore);
      	document.getElementById("newproblem")
      			.addEventListener("click", showNewNumber);
      	document.getElementById("coterminal1")
      			.addEventListener("click", checkAnswer);
      	document.getElementById("answer")
      			.addEventListener("click", showAnswer);


	}

);

	





