// list-script.js
document.addEventListener('DOMContentLoaded', () => {
  const pokemonListContainer = document.getElementById('pokemon-list');

  const getPokemonList = async () => {
      for (let i = 1; i <= 151; i++) {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
          const data = await response.json();
          const pokemonCard = createPokemonCard(data);
          pokemonListContainer.appendChild(pokemonCard);
      }
  };

  const createPokemonCard = (pokemon) => {
      const card = document.createElement('div');
      card.classList.add('pokemon-card');

      const img = document.createElement('img');
      img.src = pokemon.sprites.front_default;
      img.alt = pokemon.name;

      const name = document.createElement('h3');
      name.textContent = capitalizeFirstLetter(pokemon.name);

      const height = document.createElement('p');
      height.textContent = `Height: ${pokemon.height}`;

      const weight = document.createElement('p');
      weight.textContent = `Weight: ${pokemon.weight}`;

      const types = document.createElement('p');
      types.textContent = `Type: ${pokemon.types.map(type => type.type.name).join(', ')}`;

      card.appendChild(img);
      card.appendChild(name);
      card.appendChild(height);
      card.appendChild(weight);
      card.appendChild(types);

      return card;
  };

  const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Load the Pokémon list when the page loads
  getPokemonList();
});