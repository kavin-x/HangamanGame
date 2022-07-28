import React, { useState, useEffect } from "react";
import "./Letters.css";

function Letters() {
  const [wordStatus, setwordStatus] = useState(null);
  const [guessedWord, setguessedWord] = useState([]);
  const [answer, setAnswer] = useState("");

  const guessedLetters = (letter) => {
    guessedWord.push(letter.target.value);

    check();
  };

  useEffect(() => {
    fetch("https://random-word-api.herokuapp.com/word").then((word) => {
      word.json().then((data) => {
        setAnswer(data.toString().toUpperCase());
        check();
      });
    });
  }, []);

  const check = () => {
    let a = answer
      .split("")
      .map((letter) => {
        return guessedWord.indexOf(letter) >= 0 ? letter : " _ ";
      })
      .join(" ");

    setwordStatus(a);
  };

  let Letter_array = [];
  for (let i = 65; i <= 90; i++) {
    Letter_array.push(String.fromCharCode(i));
  }
  const arr = Letter_array.map((letter, i) => {
    return (
      <button
        className="button"
        value={letter}
        key={i}
        onClick={(event) => {
          guessedLetters(event);
        }}
      >
        {letter}
      </button>
    );
  });

  return (
    <div className="letters_container">
      <h1>{wordStatus}</h1>
      {arr}
    </div>
  );
}

export default Letters;
