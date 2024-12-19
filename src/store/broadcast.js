import { useStore } from './store';

export const broadcast = new BroadcastChannel('game');

broadcast.onmessage = (event) => {
   const {
      players,
      gameStatus,
      currentTurn,
      sentences,
      gameResult,
      currentPlayerInput,
   } = event.data;
   useStore.setState((state) => {
      if (players) state.players = players;
      if (gameStatus) state.gameStatus = gameStatus;
      if (currentTurn) state.currentTurn = currentTurn;
      if (sentences) state.sentences = sentences;
      if (gameResult) state.gameResult = gameResult;
      if (currentPlayerInput) state.currentPlayerInput = currentPlayerInput;
   });
};
