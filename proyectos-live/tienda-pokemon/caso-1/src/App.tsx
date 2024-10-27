import type { Pokemon } from "./types";

import { useEffect, useState } from "react";

import { POKEMONS } from "./constants";

function App() {
  const [cart, setCart] = useState<Pokemon[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [query, setQuery] = useState<string>("");
  const [pokemons, setPokemons] = useState<Pokemon[]>(POKEMONS);

  useEffect(() => {
    const filteredPokemons = POKEMONS.filter((pokemon) => {
      return pokemon.name.toLowerCase().includes(query.toLowerCase());
    });

    setPokemons(filteredPokemons);
  }, [query]);

  const handleFavoriteClick = (id: string) => {
    const updatedPokemons = pokemons.map((pokemon) => {
      if (pokemon.id === id) {
        return {
          ...pokemon,
          favorite: !pokemon.favorite,
        };
      }

      return pokemon;
    });

    setPokemons(updatedPokemons);
  };

  return (
    <>
      <nav>
        <input
          className="nes-input"
          id="name_field"
          placeholder="Charmander"
          type="text"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </nav>
      <section>
        {pokemons.map((pokemon) => (
          <article key={pokemon.id}>
            <figure>
              <i
                className={`nes-icon is-medium ${
                  !pokemon.favorite ? "is-transparent" : ""
                } heart`}
                style={{
                  zIndex: 1,
                }}
                onClick={() => handleFavoriteClick(pokemon.id)}
              />

              <img className="nes-container" src={pokemon.image} />
            </figure>
            <div>
              <p>
                {pokemon.name} (${pokemon.price})
              </p>
              <p>{pokemon.description}</p>
            </div>
            <button
              className="nes-btn"
              onClick={() => {
                if (totalPrice < 10 && totalPrice + pokemon.price <= 10) {
                  setCart(cart.concat(pokemon));
                  setTotalPrice((prevState) => {
                    return prevState + pokemon.price;
                  });
                } else {
                  return;
                }
              }}
            >
              Agregar
            </button>
          </article>
        ))}
      </section>
      <aside>
        <button className="nes-btn is-primary">{`${cart.length} items (total $${totalPrice})`}</button>
      </aside>
    </>
  );
}

export default App;
