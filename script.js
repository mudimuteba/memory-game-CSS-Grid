var Game = {
	chars: "@@##$$%%^^&&**((==[[{{;;::<<??".split(''),
	selectedCards: [],
	cardIds: [],
	tilesFlipped: 0,
}

function newGame() {
	var board = '';

	Game.tilesFlipped = 0;	
	shuffle();

	for (var i = 0; i < 30; i++) {
		board += '<div id="tile_'+ i +'" class="card"  onclick="revealCard(this,\'' + Game.chars[i] + '\')"></div>';
		document.getElementById('board').innerHTML = board;
	}
	console.log('cheat:\n', Game.chars.join('').match(new RegExp('.{1,' + 6 + '}', 'g')));
}

function shuffle() {
	for (let i = 0; i < 30; i++) {
        var random = Math.floor(Math.random() * (i + 1));
		[Game.chars[i], Game.chars[random]] = [Game.chars[random], [Game.chars[i]]];
	}
}

function revealCard(tile, char) {
	if (tile.innerHTML == "" && Game.selectedCards.length < 2) {
		tile.style.background = 'transparent';
		tile.innerHTML = char;

		if (!Game.selectedCards[0] || !Game.selectedCards[1]) {
			Game.selectedCards.push(char);
			Game.cardIds.push(tile.id);
		}

		if (Game.selectedCards[0] && Game.selectedCards[1])
			Game.selectedCards[0] == Game.selectedCards[1] ? (Game.tilesFlipped += 2, [Game.selectedCards, Game.cardIds] = [[],[]]) : setTimeout(revertCards, 500);

		if (Game.tilesFlipped == Game.chars.length) {
			alert("Starting new game...");
			document.getElementById('board').innerHTML = "";
			newGame();
		}
	}
}

function revertCards() {
    var tile_1 = document.getElementById(Game.cardIds[0]);
    var tile_2 = document.getElementById(Game.cardIds[1]);
    tile_1.innerHTML = tile_2.innerHTML = "";
    [Game.selectedCards, Game.cardIds] = [[],[]];
}