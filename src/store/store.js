import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

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
         }),
      restartGame: () =>
         set((state) => {
            Object.assign(state, initialState);
         }),
      setPlayer: (player) =>
         set((state) => {
            if (!state.players.includes(player)) {
               state.players.push(player);
            }
         }),
      setInputValue: (input) =>
         set((state) => {
            state.currentPlayerInput = input;
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
            } else {
               state.sentences.push(sentence);
               state.currentTurn = nextPlayer;
               state.currentPlayerInput = '';
            }
         }),
      setGameStatus: (status) =>
         set((state) => {
            state.gameStatus = status;
            if (status === gameStatuses.ongoing) {
               state.currentTurn = state.players[0];
            }
         }),
   }))
);
