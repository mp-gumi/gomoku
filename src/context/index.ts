import React, { createContext, Dispatch, SetStateAction } from "react";

type SquareNumberContext = {
  squareNumber: string;
  setSquareNumber: Dispatch<SetStateAction<string>>;
};

type QuoteContext = {
  quote: string;
  setQuote: Dispatch<SetStateAction<string>>;
};

type FirstPlayerContext = {
  firstPlayer: string;
  setFirstPlayer: Dispatch<SetStateAction<string>>;
};

type SecondPlayerContext = {
  secondPlayer: string;
  setSecondPlayer: Dispatch<SetStateAction<string>>;
};

export const SquareNumberContext = createContext({} as SquareNumberContext);
export const QuoteContext = createContext({} as QuoteContext);
export const FirstPlayerContext = createContext({} as FirstPlayerContext);
export const SecondPlayerContext = createContext({} as SecondPlayerContext);
