import type { Item } from "./types";

import { useEffect, useState } from "react";

import styles from "./App.module.scss";
import api from "./api";

function App() {
  const [items, setItems] = useState<Item[] | null>(null);

  useEffect(() => {
    api.list().then(setItems);
  }, []);

  const handleDeleteItem = (id: number) => {
    if (items) {
      const newArray = items.filter((i) => {
        return i.id !== id;
      });

      setItems(newArray);
    }
  };

  return (
    <main className={styles.main}>
      <h1>Supermarket list</h1>
      <form>
        <input autoFocus name="text" type="text" />
        <button>Add</button>
      </form>
      {items ? (
        <ul>
          {items.map((item) => (
            <li
              key={item.id}
              className={item.completed ? styles.completed : ""}
            >
              {item.text}{" "}
              <button
                onClick={() => {
                  handleDeleteItem(item.id);
                }}
              >
                [X]
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No items to show</p>
      )}
    </main>
  );
}

export default App;
