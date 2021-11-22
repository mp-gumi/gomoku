import React, { useState } from "react";
import { Button, View, StyleSheet } from "react-native";
import { Table, Rows } from "react-native-table-component";
import { Dimensions } from "react-native";
import GomokuBox from "../GomokuBox";
import GomokuGameStatusText from "../GomokuGameStatusText";

export type BoardValueType = -1 | 0 | 1;
export type JudgementType = -1 | 0 | 1;

function GomokuTop() {
  const windowWidth = Dimensions.get("window").width;
  const squareNumber = 5;
  const quote = 4;
  const squareWidth = (windowWidth - 40) / squareNumber;
  const [isFirstMove, setIsFirstMove] = useState(true);
  const [turnNumber, setTurnNumber] = useState<number>(1);

  const [boardValuesArray, setBoardValuesArray] = useState<BoardValueType[][]>(
    Array(squareNumber)
      .fill(0)
      .map(() => Array(squareNumber).fill(0))
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

  const squares = Array(squareNumber)
    .fill(0)
    .map((_, Ycoordinate) =>
      Array(squareNumber)
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
    quote: number,
    boardValuesArray: BoardValueType[][]
  ): JudgementType => {
    for (let i = 0; i < squareNumber; i++) {
      for (let j = 0; j < squareNumber; j++) {
        if (boardValuesArray[i][j] === 1) {
          for (let k = 1; k < quote; k++) {
            if (boardValuesArray[i][j + k] !== 1) break;
            if (k === quote - 1) return 1;
          }
          for (let k = 1; k < quote; k++) {
            if (boardValuesArray[i + k][j] !== 1) break;
            if (k === quote - 1) return 1;
          }
          for (let k = 1; k < quote; k++) {
            if (boardValuesArray[i + k][j + k] !== 1) break;
            if (k === quote - 1) return 1;
          }
          for (let k = 1; k < quote; k++) {
            if (boardValuesArray[i + k][j - k] !== 1) break;
            if (k === quote - 1) return 1;
          }
        }
        if (boardValuesArray[i][j] === -1) {
          for (let k = 1; k < quote; k++) {
            if (boardValuesArray[i][j + k] !== -1) break;
            if (k === quote - 1) return -1;
          }
          for (let k = 1; k < quote; k++) {
            if (boardValuesArray[i + k][j] !== -1) break;
            if (k === quote - 1) return -1;
          }
          for (let k = 1; k < quote; k++) {
            if (boardValuesArray[i + k][j + k] !== -1) break;
            if (k === quote - 1) return -1;
          }
          for (let k = 1; k < quote; k++) {
            if (boardValuesArray[i + k][j - k] !== -1) break;
            if (k === quote - 1) return -1;
          }
        }
      }
    }
    return 0;
  };

  const judgeWinnerMessage = () => {
    if (judgeFinish(quote, boardValuesArray) === 1) {
      return "〇の勝利です";
    }
    if (judgeFinish(quote, boardValuesArray) === -1) {
      return "✕の勝利です";
    }
  };

  const isGameFinished = () => {
    if (judgeFinish(quote, boardValuesArray) === 0) return false;
    return true;
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
