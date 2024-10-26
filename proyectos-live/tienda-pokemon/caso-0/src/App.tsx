import { useEffect, useState } from "react";

import api from "./api";
import { Pokemon } from "./types";

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<Pokemon[]>([]);

  useEffect(() => {
    api.list().then((pokemons) => {
      setPokemons(pokemons);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return "Cargando...";
  }

  return (
    <>
      <section>
        {pokemons.map((pokemon) => (
          <article key={pokemon.id}>
            <img className="nes-container" src={pokemon.image} />
            <div>
              <p>{`${pokemon.name} $${pokemon.price}`}</p>
              <p>{pokemon.description}</p>
            </div>
            <button
              className="nes-btn"
              onClick={() => {
                if (cart.length < 3) {
                  setCart(cart.concat(pokemon));
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
        <button className="nes-btn is-primary">{`${cart.length} items`}</button>
      </aside>
    </>
  );
}

export default App;
