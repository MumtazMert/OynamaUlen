import { useStore } from '../store/store';

export const broadcast = new BroadcastChannel('game');

const boradcastActionTypes = {
   setPlayer: 'setPlayer',
   startGame: 'startGame',
   setInputValue: 'setInputValue',
   setSentences: 'setSentences',
   restartGame: 'restartGame',
   initializeTab: 'initializeTab',
   getState: 'getState',
};

export const broadcastActions = {
   setPlayer: (player) => {
      useStore.getState().setPlayer(player);
      broadcast.postMessage({
         type: boradcastActionTypes.setPlayer,
         payload: player,
      });
   },
   startGame: () => {
      useStore.getState().startGame();
      broadcast.postMessage({ type: boradcastActionTypes.startGame });
   },
   setInputValue: (input) => {
      useStore.getState().setInputValue(input);
      broadcast.postMessage({
         type: boradcastActionTypes.setInputValue,
         payload: input,
      });
   },
   setSentences: (sentence) => {
      useStore.getState().setSentences(sentence);
      broadcast.postMessage({
         type: boradcastActionTypes.setSentences,
         payload: sentence,
      });
   },
   restartGame: () => {
      useStore.getState().restartGame();
      broadcast.postMessage({ type: boradcastActionTypes.restartGame });
   },
   getState: () => {
      const store = useStore.getState();
      broadcast.postMessage({
         type: boradcastActionTypes.getState,
         payload: {
            players: store.players,
            gameResult: store.gameResult,
            gameStatus: store.gameStatus,
            currentTurn: store.currentTurn,
            currentPlayerInput: store.currentPlayerInput,
            sentences: store.sentences,
         },
      });
   },
   initializeTab: () => {
      broadcast.postMessage({ type: boradcastActionTypes.initializeTab });
   },
};

const broadcastReducer = (type, payload) => {
   console.log(type, payload);
   switch (type) {
      case boradcastActionTypes.setPlayer:
         useStore.getState().setPlayer(payload);
         break;
      case boradcastActionTypes.startGame:
         useStore.getState().startGame();

         break;
      case boradcastActionTypes.setInputValue:
         useStore.getState().setInputValue(payload);

         break;
      case boradcastActionTypes.setSentences:
         useStore.getState().setSentences(payload);

         break;
      case boradcastActionTypes.restartGame:
         useStore.getState().restartGame();

         break;
      case boradcastActionTypes.getState: {
         const tabId = payload.tabId;

         if (tabId !== useStore.getState().tabId) {
            useStore.getState().setState(payload);
         }
         break;
      }
      case boradcastActionTypes.initializeTab:
         broadcastActions.getState();

         break;
      default:
         break;
   }
};

broadcast.onmessage = (event) => {
   broadcastReducer(event.data.type, event.data.payload);
};
