import React, { useState } from "react";
import Routes from "./src/routes";
import {
  SquareNumberContext,
  QuoteContext,
  FirstPlayerContext,
  SecondPlayerContext,
} from "./src/context";

export default function App() {
  const [firstPlayer, setFirstPlayer] = useState("A");
  const [secondPlayer, setSecondPlayer] = useState("B");
  const [squareNumber, setSquareNumber] = useState("9");
  const [quote, setQuote] = useState("5");

  return (
    <FirstPlayerContext.Provider value={{ firstPlayer, setFirstPlayer }}>
      <SecondPlayerContext.Provider value={{ secondPlayer, setSecondPlayer }}>
        <SquareNumberContext.Provider value={{ squareNumber, setSquareNumber }}>
          <QuoteContext.Provider value={{ quote, setQuote }}>
            <Routes />
          </QuoteContext.Provider>
        </SquareNumberContext.Provider>
      </SecondPlayerContext.Provider>
    </FirstPlayerContext.Provider>
  );
}
