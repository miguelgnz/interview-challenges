import type { Pokemon } from "./types";

import { useCallback, useState } from "react";

import { POKEMONS } from "./constants";
import PokemonCard from "./PokemonCard";

function App() {
  const [cart, setCart] = useState<Pokemon[]>([]);

  const handleIncrement = (pokemon: Pokemon) => {
    //check if pokemon is in cart
    if (cart.some((item) => item.id === pokemon.id)) {
      //if it is, increment the quantity
      setCart((cart) => {
        const newCart = cart.map((item) => {
          if (item.id === pokemon.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
        return newCart
      }
      );
    } else {
      //if it isn't, add it to the cart
      setCart((cart) => cart.concat({ ...pokemon, quantity: 1 }));
    }
  };

  return (
    <>
      <nav>
        <input
          className="nes-input"
          id="name_field"
          placeholder="Charmander"
          type="text"
        />
      </nav>
      <section>
        {POKEMONS.map((pokemon) => {
          const existsInCart = cart.some((item) => item.id === pokemon.id);

          return (
            <article key={pokemon.id}>
              <p>{existsInCart ? "Ya está en el carrito" : ""}</p>
              <img className="nes-container" src={pokemon.image} />
              <div>
                <p>{pokemon.name}</p>
                <p>{pokemon.description}</p>
              </div>
              {existsInCart ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <button className="nes-btn"> - </button>
                  <p>{pokemon.quantity}</p>
                  <button
                    className="nes-btn"
                    onClick={() => handleIncrement(pokemon)}
                  >
                    {" "}
                    +{" "}
                  </button>
                </div>
              ) : (
                <button
                  className="nes-btn"
                  onClick={() => setCart((cart) => cart.concat(pokemon))}
                >
                  Agregar
                </button>
              )}
            </article>
          );
        })}
      </section>
      <aside>
        <button className="nes-btn is-primary">{`${cart.length} items`}</button>
      </aside>
    </>
  );
}

export default App;
