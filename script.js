// script.js
document.addEventListener('DOMContentLoaded', () => {
  const pokemonImage = document.getElementById('pokemon-image');
  const guessInput = document.getElementById('guess-input');
  const guessButton = document.getElementById('guess-button');
  const message = document.getElementById('message');

  let currentPokemon = '';
  let currentPokemonHint = '';
  let wrongGuesses = 0;

  const getPokemon = async () => {
      const randomId = Math.floor(Math.random() * 151) + 1; // Get a random Pokemon ID (1-151)
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      const data = await response.json();
      currentPokemon = data.name;
      currentPokemonHint = generateHint(currentPokemon);
      pokemonImage.src = data.sprites.front_default;
      wrongGuesses = 0;
      message.textContent = '';
      guessInput.value = '';
  };

  const generateHint = (pokemonName) => {
      return `${pokemonName.charAt(0).toUpperCase()}${'_'.repeat(pokemonName.length - 1)}`;
  };

  const handleGuess = () => {
      const userGuess = guessInput.value.trim().toLowerCase();
      if (userGuess === currentPokemon) {
          message.textContent = 'Correct! You guessed it!';
          message.style.color = 'green';
          setTimeout(getPokemon, 3000);  // Load a new Pokemon after 3 seconds
      } else {
          wrongGuesses++;
          if (wrongGuesses === 1) {
              message.textContent = 'Incorrect! Try again.';
              message.style.color = 'red';
          } else if (wrongGuesses === 2) {
              message.textContent = `Hint: ${currentPokemonHint}`;
              message.style.color = 'blue';
          } else if (wrongGuesses === 3) {
              message.textContent = `The correct answer was ${currentPokemon}. Loading a new Pokémon...`;
              message.style.color = 'purple';
              setTimeout(getPokemon, 3000); // Load a new Pokemon after 3 seconds
          }
      }
      guessInput.value = '';
  };

  guessButton.addEventListener('click', handleGuess);

  // Trigger guess button click on Enter key press
  guessInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
          handleGuess();
      }
  });

  // Load the first Pokemon when the page loads
  getPokemon();
});