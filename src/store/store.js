import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { broadcast } from './broadcast';

export const gameStatuses = {
   waiting: 'waiting for players',
   ongoing: 'ongoing',
   finished: 'finished',
};

const initialState = {
   currentPlayerInput: '',
   sentences: [],
   gameStatus: gameStatuses.waiting,
   gameResult: null,
   currentTurn: null,
   players: [],
};

const getNextPlayer = (players, currentTurn) => {
   const currentPlayerIndex = players.indexOf(currentTurn);
   return players[(currentPlayerIndex + 1) % players.length];
};

const isSentenceValid = (sentence, previousLastLetter) => {
   return sentence[0].toLowerCase() === previousLastLetter.toLowerCase();
};

export const useStore = create(
   immer((set) => ({
      ...initialState,
      startGame: () =>
         set((state) => {
            state.gameStatus = gameStatuses.ongoing;
            state.currentTurn = state.players[0];
            broadcast.postMessage({
               gameStatus: state.gameStatus,
               currentTurn: state.currentTurn,
            });
         }),
      restartGame: () =>
         set((state) => {
            Object.assign(state, initialState);
            broadcast.postMessage({ ...initialState });
         }),
      setPlayer: (player) =>
         set((state) => {
            if (!state.players.includes(player)) {
               state.players.push(player);
               broadcast.postMessage({ players: [...state.players] });
            }
         }),
      setInputValue: (input) =>
         set((state) => {
            state.currentPlayerInput = input;
            broadcast.postMessage({
               currentPlayerInput: state.currentPlayerInput,
            });
         }),
      setSentences: (sentence) =>
         set((state) => {
            const previousLastLetter =
               state.sentences[state.sentences.length - 1]?.sentence.slice(-1);
            const nextPlayer = getNextPlayer(state.players, state.currentTurn);
            if (
               state.sentences.length > 0 &&
               !isSentenceValid(sentence.sentence, previousLastLetter)
            ) {
               state.currentPlayerInput = '';
               state.gameStatus = gameStatuses.finished;
               state.gameResult = {
                  looser: state.currentTurn,
               };
               broadcast.postMessage(
                  JSON.parse(
                     JSON.stringify({
                        gameStatus: state.gameStatus,
                        gameResult: state.gameResult,
                     })
                  )
               );
            } else {
               state.sentences.push(sentence);
               state.currentTurn = nextPlayer;
               state.currentPlayerInput = '';
               broadcast.postMessage(
                  JSON.parse(
                     JSON.stringify({
                        sentences: state.sentences,
                        currentTurn: state.currentTurn,
                     })
                  )
               );
            }
         }),
   }))
);
