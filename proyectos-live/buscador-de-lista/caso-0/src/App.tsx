import type {Product} from "./types";

import {useEffect, useState} from "react";

import api from "./api";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const productsData = await api.search(query);

      setProducts(productsData);
      setLoading(false);
    };

    fetchProducts();
  }, [query]);

  return (
    <main>
      <h1>Tienda digitaloncy</h1>
      <input name="text" placeholder="tv" type="text" onChange={(e) => setQuery(e.target.value)} />
      <ul>
        {loading ? (
          <h2>Loading products</h2>
        ) : (
          <>
            {products.map((product) => (
              <li key={product.id} className={product.price < 100 ? "sale" : ""}>
                <h4>{product.title}</h4>
                <p>{product.description}</p>
                <span>$ {product.price}</span>
              </li>
            ))}
          </>
        )}
      </ul>
    </main>
  );
}

export default App;
