var Game = {
	chars: "@@##$$%%^^&&**((==[[{{;;::<<??".split(''),
	selectedCards: [],
	cardIds: [],
	tilesFlipped: 0,
}

function newGame() {
	var board = '';

	Game.tilesFlipped = 0;
	alert("Starting new game...");
	document.getElementById('board').innerHTML = "";
	shuffleCards();

	for (var i = 0; i < 30; i++) 
		board += '<div id="card_'+ i +'" class="card"  onclick="revealCard(this,\'' + Game.chars[i] + '\')"></div>';
	document.getElementById('board').innerHTML = board;
	console.log('cheat:\n', Game.chars.join('').match(new RegExp('.{1,' + 6 + '}', 'g')));
}

function shuffleCards() {
	for (let i = 0; i < 30; i++) {
        var random = Math.floor(Math.random() * (i + 1));
		[Game.chars[i], Game.chars[random]] = [Game.chars[random], [Game.chars[i]]];
	}
}

function revealCard(card, char) {
	if (card.innerHTML == "" && Game.selectedCards.length < 2) {
		card.style.background = 'transparent';
		card.innerHTML = char;

		if (!Game.selectedCards[0] || !Game.selectedCards[1]) {
			Game.selectedCards.push(char);
			Game.cardIds.push(card.id);
		}
		if (Game.selectedCards[0] && Game.selectedCards[1])
			Game.selectedCards[0] == Game.selectedCards[1] ? (Game.tilesFlipped += 2, [Game.selectedCards, Game.cardIds] = [[],[]]) : setTimeout(revertCards, 500);

		if (Game.tilesFlipped == Game.chars.length) newGame();
	}
}

function revertCards() {
    var card_1 = document.getElementById(Game.cardIds[0]);
    var card_2 = document.getElementById(Game.cardIds[1]);
    card_1.innerHTML = card_2.innerHTML = "";
    [Game.selectedCards, Game.cardIds] = [[],[]];
}