# THE CARD GAME
Made Feb 2019 by Gavin Callander - WDI student at General Assembly: Seattle, WA

# Instructions
- Each player begins with three cards in their hand.
- Starting player is randomized and can draw and field a card on turn one, however may not attack.
- Turns alternate from this point, with each player able to draw, field and attack once per turn. For the human player, this is done by clicking on their deck to draw; clicking on a card in their hand to field; and by clicking both the card they have fielded and the card they wish to attack on the enemy side. As play continues, players attack with all cards they have managed to place on the field.
- The game ends when one player's LP (shown to the side of each hand) drops to or below zero.

# About
The Fantasy Card Game was developed using HTML5, CSS and Javascript.

### 2/2
    Development began with a combination of initial wireframing and brainstorming as to what type of game it would be. Ultimately, the decision was made to create a game styled as a hybrid of Hearthstone and Yu-Gi-Oh Worldwide Edition.

### 2/3
    Initial outline of game created using HTML and CSS.

### 2/4
    Rudimental card designs were created as well as initial required variables. This was where a failure in the planning stage became apparent, as I was now handling a multitude of variables with similar names, given the nature of the project I was undertaking. It was clear that significant refactoring would be required down the line.

### 2/5
    Much of the day was spent refactoring code into a form that was, at least, understandable. While time consuming and involved taking a step back, I was able to push forward at a much faster rate afterwards.

### 2/6
    The basic Javascript framework was completed, with all variables able to be accessed. Cards held in hand were now shown and the player was able to draw a card at the beginning of their turn.

### 2/7
    Javascript continued to be built upon. Cards in field were able to be shown on the board and a the groundworks for a basic computer AI were put in place.

### 2/8
    Battle logic was begun, with human player able to attack the computer controlled player and vice versa.

### 2/9
    Basic AI and turn system were built out almost to completion, with a randomized start followed by turn based play working in testing.

### 2/10
    AI and turn system became fully working at version 1 level, with player and computer able to play a complete game.

### 2/11
    Given the extra time allotted, CSS was restructured into flex. Previously, the game had no responsiveness so this was felt to be more beneficial to the end user.

## Future additions
In it's current state, the game functions as a very rudimentary version 1. Future versions would ideally include images and animations to create a more immersive experience for the user. Additionally, a card tiering system would also make sense from a gameplay perspective. This would likely take the appearance of a tiering system similar to Hearthstone or Magic the Gathering. 