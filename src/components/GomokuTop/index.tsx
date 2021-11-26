import React, { useContext, useState } from "react";
import { Button, View, StyleSheet } from "react-native";
import { Table, Rows } from "react-native-table-component";
import { Dimensions } from "react-native";
import GomokuBox from "./GomokuBox";
import GomokuGameStatusText from "./GomokuGameStatusText";
import { SquareNumberContext, QuoteContext } from "../../context";

export type BoardValueType = -1 | 0 | 1;
export type JudgementType = -1 | 0 | 1 | undefined;
export type JudgeWinnerMessageType =
  | "〇の勝利です"
  | "✕の勝利です"
  | "引き分けです"
  | undefined;

function GomokuTop() {
  const { squareNumber } = useContext(SquareNumberContext);
  const { quote } = useContext(QuoteContext);
  const windowWidth = Dimensions.get("window").width;
  const squareNumberValue =
    parseInt(squareNumber, 10) > 0 ? parseInt(squareNumber, 10) : 9;
  const quoteValue = parseInt(quote, 10) > 0 ? parseInt(quote, 10) : 5;
  const squareWidth = (windowWidth - 40) / squareNumberValue;
  const [isFirstMove, setIsFirstMove] = useState(true);
  const [turnNumber, setTurnNumber] = useState<number>(1);

  const [boardValuesArray, setBoardValuesArray] = useState<BoardValueType[][]>(
    Array(squareNumberValue)
      .fill(0)
      .map(() => Array(squareNumberValue).fill(0))
  );

  const handlePressSquare = (
    Xcoordinate: number,
    Ycoordinate: number
  ): void => {
    if (isGameFinished()) return;
    if (boardValuesArray[Ycoordinate][Xcoordinate] !== 0) return;
    const ox = isFirstMove ? 1 : -1;
    setBoardValuesArray((prev) =>
      prev.map((array, index) => {
        return index !== Ycoordinate
          ? array
          : array.map((value, index) => (index === Xcoordinate ? ox : value));
      })
    );
    setTurnNumber((prev) => prev + 1);
    setIsFirstMove((prev) => !prev);
  };

  const resetBoard = () => {
    setBoardValuesArray(boardValuesArray.map((array) => array.fill(0)));
    setIsFirstMove(true);
    setTurnNumber(1);
  };

  const squares = Array(squareNumberValue)
    .fill(0)
    .map((_, Ycoordinate) =>
      Array(squareNumberValue)
        .fill(0)
        .map((_, Xcoordinate) => (
          <GomokuBox
            squareWidth={squareWidth}
            Xcoordinate={Xcoordinate}
            Ycoordinate={Ycoordinate}
            boardValuesArray={boardValuesArray}
            handlePressSquare={handlePressSquare}
          />
        ))
    );

  const judgeFinish = (
    quoteValue: number,
    squareNumberValue: number,
    turnNumber: number,
    boardValuesArray: BoardValueType[][]
  ): JudgementType => {
    for (let i = 0; i < squareNumberValue; i++) {
      for (let j = 0; j < squareNumberValue; j++) {
        if (boardValuesArray[i][j] === 1) {
          for (let k = 1; k < quoteValue; k++) {
            if (boardValuesArray[i][j + k] !== 1) break;
            if (k === quoteValue - 1) return 1;
          }
          if (i <= squareNumberValue - quoteValue) {
            for (let k = 1; k < quoteValue; k++) {
              if (boardValuesArray[i + k][j] !== 1) break;
              if (k === quoteValue - 1) return 1;
            }
            for (let k = 1; k < quoteValue; k++) {
              if (boardValuesArray[i + k][j + k] !== 1) break;
              if (k === quoteValue - 1) return 1;
            }
            for (let k = 1; k < quoteValue; k++) {
              if (boardValuesArray[i + k][j - k] !== 1) break;
              if (k === quoteValue - 1) return 1;
            }
          }
        }
        if (boardValuesArray[i][j] === -1) {
          for (let k = 1; k < quoteValue; k++) {
            if (boardValuesArray[i][j + k] !== -1) break;
            if (k === quoteValue - 1) return -1;
          }
          if (i <= squareNumberValue - quoteValue) {
            for (let k = 1; k < quoteValue; k++) {
              if (boardValuesArray[i + k][j] !== -1) break;
              if (k === quoteValue - 1) return -1;
            }
            for (let k = 1; k < quoteValue; k++) {
              if (boardValuesArray[i + k][j + k] !== -1) break;
              if (k === quoteValue - 1) return -1;
            }
            for (let k = 1; k < quoteValue; k++) {
              if (boardValuesArray[i + k][j - k] !== -1) break;
              if (k === quoteValue - 1) return -1;
            }
          }
        }
      }
    }
    if (turnNumber === Math.pow(squareNumberValue, 2) + 1) return 0;
    return;
  };

  const judgeWinnerMessage = () => {
    switch (
      judgeFinish(quoteValue, squareNumberValue, turnNumber, boardValuesArray)
    ) {
      case 1:
        return "〇の勝利です";
      case -1:
        return "✕の勝利です";
      case 0:
        return "引き分けです";
    }
    return;
  };

  const isGameFinished = (): boolean => {
    const judge = judgeFinish(
      quoteValue,
      squareNumberValue,
      turnNumber,
      boardValuesArray
    );
    if (judge === 1 || judge === -1 || judge === 0) return true;
    return false;
  };

  return (
    <View>
      <GomokuGameStatusText
        isFirstMove={isFirstMove}
        judgeWinnerMessage={judgeWinnerMessage}
        turnNumber={turnNumber}
      />
      <Table>
        <Rows data={squares} />
      </Table>
      <View style={styles.button}>
        <Button onPress={resetBoard} title="はじめから" />
      </View>
    </View>
  );
}

export default GomokuTop;

const styles = StyleSheet.create({
  button: { margin: 10, padding: 10 },
});
