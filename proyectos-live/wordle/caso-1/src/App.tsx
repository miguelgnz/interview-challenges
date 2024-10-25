import { useCallback, useEffect, useState } from "react";
import api from "./api";

function App() {
  // const answer = "RIGHT";

  const [answer, setAnswer] = useState("");
  const [turn, setTurn] = useState<number>(0);
  const [status, setStatus] = useState<"playing" | "finished">("playing");
  const [words, setWords] = useState<string[][]>(() =>
    Array.from({ length: 6 }, () => new Array(5).fill(""))
  );

  useEffect(() => {
    api.word.random().then((data) => {
      setAnswer(data);
    });
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (status === "playing") {
        switch (event.key) {
          case "Enter": {
            if (words[turn].some((letter) => letter === "")) {
              return;
            }

            if (words[turn].join("") === answer) {
              setStatus("finished");
              // return;
            }

            setTurn((turn) => turn + 1);

            return;
          }
          case "Backspace": {
            let firstEmptyIndex = words[turn].findIndex(
              (letter) => letter === ""
            );

            if (firstEmptyIndex === -1) {
              firstEmptyIndex = words[turn].length;
            }

            words[turn][firstEmptyIndex - 1] = "";

            setWords(words.slice());

            return;
          }
          default: {
            if (event.key.length === 1 && event.key.match(/[a-z]/i)) {
              const firstEmptyIndex = words[turn].findIndex(
                (letter) => letter === ""
              );

              if (firstEmptyIndex === -1) return;

              words[turn][firstEmptyIndex] = event.key.toUpperCase();

              setWords(words.slice());

              return;
            }
          }
        }
      } else if (event.key === "Enter" && status === "finished") {
        setWords(Array.from({ length: 6 }, () => new Array(5).fill("")));
        setTurn(0);
        setStatus("playing");
      }
    },
    [status, turn, words, answer]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <main className="board">
      {words.map((word, wordIndex) => (
        <section className="word">
          {word.map((letter, letterIndex) => {
            const isCorrect =
              letter && wordIndex < turn && letter === answer[letterIndex];

            const isPresent =
              letter &&
              wordIndex < turn &&
              letter !== answer[letterIndex] &&
              answer.includes(letter);

            return (
              <article
                className={`letter ${isCorrect && "correct"} ${
                  isPresent && "present"
                }`}
              >
                {letter}
              </article>
            );
          })}
        </section>
      ))}
    </main>
  );
}

export default App;
