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
   tabId: Math.random().toString(36).substring(7),
};

const getNextPlayer = (players, currentTurn) => {
   const currentPlayerIndex = players.findIndex(
      (player) => player.id === currentTurn
   );
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
            state = { ...initialState };

            return state;
         }),
      setPlayer: (player) =>
         set((state) => {
            if (
               !state.players.find(
                  (playerToLook) => playerToLook.name === player
               )
            ) {
               const newPlayer = {
                  name: player,
                  id: Math.random().toString(36).substring(7),
                  tabId: state.tabId,
               };
               state.players.push(newPlayer);
            }
         }),
      removePlayer: (playerId) =>
         set((state) => {
            state.players = state.players.filter((p) => p.id !== playerId);
            if (state.currentTurn === playerId) {
               state.currentTurn = getNextPlayer(
                  state.players,
                  state.currentTurn
               );
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
      setState: (receivedState) =>
         set((state) => {
            state.players = receivedState.players;
            state.sentences = receivedState.sentences;
            state.gameStatus = receivedState.gameStatus;
            state.currentTurn = receivedState.currentTurn;
            state.gameResult = receivedState.gameResult;
            state.currentPlayerInput = receivedState.currentPlayerInput;
         }),
   }))
);
