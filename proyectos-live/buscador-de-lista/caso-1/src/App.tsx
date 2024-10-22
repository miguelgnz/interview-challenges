import type { Product } from "./types";

import { useEffect, useMemo, useState } from "react";

import api from "./api";

function App() {
  const FILTERS = {
    ALPHABETICAL: "ALPHABETICAL",
    PRICE: "PRICE",
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>(localStorage.getItem("query") || "");
  const [filter, setFilter] = useState<string>(
    localStorage.getItem("filter") || FILTERS.ALPHABETICAL
  );

  useEffect(() => {
    api.search(query).then(setProducts);
  }, [query]);

  useEffect(() => {
    localStorage.setItem("filter", filter);
  }, [filter]);

  useEffect(() => {
    localStorage.setItem("query", query);
  }, [query]);

  const sortedProducts = useMemo(() => {
    if (filter === FILTERS.PRICE) {
      const orderedProducts = [...products].sort((a, b) => {
        if (a.price < b.price) {
          return -1;
        }
        if (a.price > b.price) {
          return 1;
        }

        return 0;
      });

      return orderedProducts;
    }

    if (filter === FILTERS.ALPHABETICAL) {
      const orderedProducts = [...products].sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }

        return 0;
      });

      return orderedProducts;
    }

    return products;
  }, [filter, products]);

  return (
    <main>
      <h1>Tienda digitaloncy</h1>
      <input
        name="text"
        placeholder="tv"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <select
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
        }}
      >
        <option value={FILTERS.ALPHABETICAL}>Name</option>
        <option value={FILTERS.PRICE}>Price</option>
      </select>
      <ul>
        {sortedProducts.map((product) => (
          <li key={product.id}>
            <h4>{product.title}</h4>
            <p>{product.description}</p>
            <span>
              {new Intl.NumberFormat("es-GT", {
                style: "currency",
                currency: "GTQ",
              }).format(product.price)}
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
