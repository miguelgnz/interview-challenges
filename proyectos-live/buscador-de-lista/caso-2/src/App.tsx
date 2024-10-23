import type { Product } from "./types";

import { useEffect, useState, memo } from "react";

import api from "./api";

const Recommended = memo(function Recommended() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api.search().then(setProducts);
  }, []);

  return (
    <main>
      <h1>Productos recomendados</h1>
      <ul>
        {[...products]
          .sort(() => (Math.random() > 0.5 ? 1 : -1))
          .slice(0, 2)
          .map((product) => (
            <li key={product.id}>
              <h4>{product.title}</h4>
              <p>{product.description}</p>
              <span>$ {product.price}</span>
            </li>
          ))}
      </ul>
    </main>
  );
});

//Custom useDebounce hook
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [delay, value]);

  return debouncedValue;
};

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>(() => {
    const localStrg = localStorage.getItem("products");

    if (localStrg) {
      return JSON.parse(localStrg);
    }

    return [];
  });

  const [query, setQuery] = useState<string>("");

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (favoriteProducts.length > 0) {
      setProducts(favoriteProducts);
    } else {
      api.search(debouncedQuery).then((products) => {
        setProducts(products);
      });
    }
  }, [debouncedQuery, favoriteProducts]);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(favoriteProducts));
  }, [favoriteProducts]);

  const handleOnClickProduct = (id: number) => {
    setProducts((prevProducts) => {
      return prevProducts.map((prod) => {
        if (prod.id === id) {
          return {
            ...prod,
            favorite: !prod.favorite,
          };
        }

        return prod;
      });
    });

    setFavoriteProducts(products);
  };

  return (
    <main>
      <h1>Tienda digitaloncy</h1>
      <input
        name="text"
        placeholder="tv"
        type="text"
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {products.map((product) => (
          <li
            key={product.id}
            className={product.favorite ? "fav" : ""}
            onClick={() => {
              handleOnClickProduct(product.id);
            }}
          >
            <h4>{product.title}</h4>
            <p>{product.description}</p>
            <span>$ {product.price}</span>
          </li>
        ))}
      </ul>
      <hr />
      <Recommended />
    </main>
  );
}

export default App;
