import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Button, View, StyleSheet } from "react-native";
import { Table, Rows } from "react-native-table-component";
import { Dimensions } from "react-native";
import Box from "./Box";
import GameStatusText from "./GameStatusText";
import { SquareNumberContext, QuoteContext } from "../../context";

export type BoardValueType = -1 | 0 | 1;
type JudgementType = -1 | 0 | 1 | undefined;
type JudgeWinnerMessageType =
  | "〇の勝利です"
  | "✕の勝利です"
  | "引き分けです"
  | undefined;
const windowWidth = Dimensions.get("window").width;

function GomokuTop() {
  const { squareNumber } = useContext(SquareNumberContext);
  const { quote } = useContext(QuoteContext);
  const parsedSquareNumber = useMemo(
    () =>
      !isNaN(parseInt(squareNumber, 10)) || parseInt(squareNumber, 10) > 0
        ? parseInt(squareNumber, 10)
        : 9,
    [squareNumber]
  );
  const parsedQuote = useMemo(
    () =>
      !isNaN(parseInt(quote, 10)) || parseInt(quote, 10) > 0
        ? parseInt(quote, 10)
        : 5,
    [quote]
  );
  const squareWidth = useMemo(
    () => (windowWidth - 40) / parsedSquareNumber,
    [windowWidth, parsedSquareNumber]
  );
  const [isFirstMove, setIsFirstMove] = useState<boolean>(true);
  const [turnNumber, setTurnNumber] = useState<number>(1);
  const [boardValuesArray, setBoardValuesArray] = useState<BoardValueType[][]>(
    Array(parsedSquareNumber)
      .fill(0)
      .map(() => Array(parsedSquareNumber).fill(0))
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

  const resetBoard = useCallback(() => {
    setBoardValuesArray(
      Array(parsedSquareNumber)
        .fill(0)
        .map(() => Array(parsedSquareNumber).fill(0))
    );
    setIsFirstMove(true);
    setTurnNumber(1);
  }, [parsedSquareNumber]);

  const squares = useMemo(
    () =>
      Array(boardValuesArray.length)
        .fill(0)
        .map((_, Ycoordinate) =>
          Array(boardValuesArray.length)
            .fill(0)
            .map((_, Xcoordinate) => (
              <Box
                squareWidth={squareWidth}
                Xcoordinate={Xcoordinate}
                Ycoordinate={Ycoordinate}
                boardValuesArray={boardValuesArray}
                handlePressSquare={handlePressSquare}
              />
            ))
        ),
    [parsedSquareNumber, boardValuesArray, handlePressSquare]
  );

  const judgeFinish = useCallback(
    (
      parsedQuote: number,
      parsedSquareNumber: number,
      turnNumber: number,
      boardValuesArray: BoardValueType[][]
    ): JudgementType => {
      if (parsedSquareNumber !== boardValuesArray.length) return;
      for (let i = 0; i < parsedSquareNumber; i++) {
        for (let j = 0; j < parsedSquareNumber; j++) {
          if (boardValuesArray[i][j] === 1) {
            for (let k = 1; k < parsedQuote; k++) {
              if (boardValuesArray[i][j + k] !== 1) break;
              if (k === parsedQuote - 1) return 1;
            }
            if (i <= parsedSquareNumber - parsedQuote) {
              for (let k = 1; k < parsedQuote; k++) {
                if (boardValuesArray[i + k][j] !== 1) break;
                if (k === parsedQuote - 1) return 1;
              }
              for (let k = 1; k < parsedQuote; k++) {
                if (boardValuesArray[i + k][j + k] !== 1) break;
                if (k === parsedQuote - 1) return 1;
              }
              for (let k = 1; k < parsedQuote; k++) {
                if (boardValuesArray[i + k][j - k] !== 1) break;
                if (k === parsedQuote - 1) return 1;
              }
            }
          }
          if (boardValuesArray[i][j] === -1) {
            for (let k = 1; k < parsedQuote; k++) {
              if (boardValuesArray[i][j + k] !== -1) break;
              if (k === parsedQuote - 1) return -1;
            }
            if (i <= parsedSquareNumber - parsedQuote) {
              for (let k = 1; k < parsedQuote; k++) {
                if (boardValuesArray[i + k][j] !== -1) break;
                if (k === parsedQuote - 1) return -1;
              }
              for (let k = 1; k < parsedQuote; k++) {
                if (boardValuesArray[i + k][j + k] !== -1) break;
                if (k === parsedQuote - 1) return -1;
              }
              for (let k = 1; k < parsedQuote; k++) {
                if (boardValuesArray[i + k][j - k] !== -1) break;
                if (k === parsedQuote - 1) return -1;
              }
            }
          }
        }
      }
      if (turnNumber === Math.pow(parsedSquareNumber, 2) + 1) return 0;
      return;
    },
    [parsedQuote, parsedSquareNumber, turnNumber, boardValuesArray]
  );

  const judgeWinnerMessage = useCallback((): JudgeWinnerMessageType => {
    switch (
      judgeFinish(parsedQuote, parsedSquareNumber, turnNumber, boardValuesArray)
    ) {
      case 1:
        return "〇の勝利です";
      case -1:
        return "✕の勝利です";
      case 0:
        return "引き分けです";
    }
    return;
  }, [judgeFinish]);

  const isGameFinished = useCallback((): boolean => {
    const judge = judgeFinish(
      parsedQuote,
      parsedSquareNumber,
      turnNumber,
      boardValuesArray
    );
    if (judge === 1 || judge === -1 || judge === 0) return true;
    return false;
  }, [judgeFinish]);

  useEffect(() => {
    setBoardValuesArray(
      Array(parsedSquareNumber)
        .fill(0)
        .map(() => Array(parsedSquareNumber).fill(0))
    );
    setIsFirstMove(true);
    setTurnNumber(1);
  }, [parsedSquareNumber, parsedQuote]);

  return (
    <View>
      <GameStatusText
        isFirstMove={isFirstMove}
        judgeWinnerMessage={judgeWinnerMessage}
        turnNumber={turnNumber}
        parsedQuote={parsedQuote}
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
