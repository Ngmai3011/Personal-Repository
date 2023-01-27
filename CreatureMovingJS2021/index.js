
const run = async () => {
	const obstacles = await fetch('http://localhost:3010/')
		.then(response => response.json())

	function drawObstacle(x, y) {
		var obstacleElement = document.createElement('div');
		var containerElement = document.getElementById('container');
		containerElement.appendChild(obstacleElement);
		obstacleElement.classList.add('obstacle');

		obstacleElement.style.top = (y * 48).toString() + 'px';
		obstacleElement.style.left = (x * 48).toString() + 'px';
	}


	for (let i = 0; i < obstacles.length; i++) {
		drawObstacle(obstacles[i].x, obstacles[i].y)
	}


	// function that builds a grid in the "container"
	function createGrid() {
		for (var rows = 0; rows < 20; rows++) {
			for (var columns = 0; columns < 20; columns++) {
				$("#container").append("<div class='grid'></div>");



			};
		};
		$(".grid").width(960 / 20);
		$(".grid").height(960 / 20);
	};

	$(document).ready(function () {
		createGrid();
	});

	var interval = null;
	var direction = 'right';

	document.addEventListener('keydown', (e) => {

		switch (e.code) {
			case "ArrowUp":
				direction = 'up'
				break;

			case "ArrowDown":
				direction = 'down'
				break;

			case "ArrowLeft":
				direction = 'left'
				break;

			case "ArrowRight":
				direction = 'right'
				break;

			default:
				break;
		}

	});




	function isCollide(x, y) {
		for (let i = 0; i < obstacles.length; i++) {
			if (obstacles[i].x == x && obstacles[i].y == y) {
				return true;
			}
		}

		return false;
	}


	var button = document.getElementById('btn');

	function moving() {
		direction = 'right';
		var element = document.getElementById("creatureMoving");
		element.style.top = '0px';
		element.style.left = '0px';

		var x = 0;
		var y = 0;

		clearInterval(interval);

		interval = setInterval(creature, 300);

		function creature() {

			if (x == 19 && y == 19) {
				alert('Congratulation');
				clearInterval(interval);
				return;
			}

			switch (direction) {
				case 'right':
					x++;
					if (x == 20 || isCollide(x, y)) {
						alert('Failure');
						clearInterval(interval);
					}

					else {
						element.style.left = (x * 48).toString() + "px";
					}
					break;

				case 'left':
					x--;
					if (x == -1 || isCollide(x, y)) {
						clearInterval(interval);
						alert('Failure');
					}
					else {
						element.style.left = (x * 48).toString() + "px";
					}
					break;

				case 'up':
					y--;
					if (y == -1 || isCollide(x, y)) {
						clearInterval(interval);
						alert('Failure');
					}
					else {
						element.style.top = (y * 48).toString() + "px";
					}
					break;

				case 'down':
					y++;
					if (y == 20 || isCollide(x, y)) {
						clearInterval(interval);
						alert('Failure');
					}
					else {
						element.style.top = (y * 48).toString() + "px";
					}
					break;

				default:
					break;
			}
		}
	}
	button.addEventListener('click', moving);
}

run();