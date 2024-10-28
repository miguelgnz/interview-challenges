import type { Pokemon } from "./types";
import { memo } from "react";

type PokemonCardProps = {
  pokemon: Pokemon;
  onAdd: (pokemon: Pokemon) => void;
};

const PokemonCard = memo(
  function PokemonCard({ pokemon, onAdd }: PokemonCardProps) {
    return (
      <article key={pokemon.id}>
        <img className="nes-container" src={pokemon.image} />
        <div>
          <p>{pokemon.name}</p>
          <p>{pokemon.description}</p>
        </div>
        <button className="nes-btn" onClick={() => onAdd(pokemon)}>
          Agregar
        </button>
      </article>
    );
  },
  (prevProps, props) => prevProps.onAdd === props.onAdd
);

export default PokemonCard;
