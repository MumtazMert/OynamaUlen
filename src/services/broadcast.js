import { useStore } from '../store/store';

export const broadcast = new BroadcastChannel('game');

const boradcastActionTypes = {
   setPlayer: 'setPlayer',
   startGame: 'startGame',
   setInputValue: 'setInputValue',
   setSentences: 'setSentences',
   restartGame: 'restartGame',
};

const store = useStore.getState();

export const broadcastActions = {
   setPlayer: (player) => {
      store.setPlayer(player);
      broadcast.postMessage({
         type: boradcastActionTypes.setPlayer,
         payload: player,
      });
   },
   startGame: () => {
      store.startGame();
      broadcast.postMessage({ type: boradcastActionTypes.startGame });
   },
   setInputValue: (input) => {
      store.setInputValue(input);
      broadcast.postMessage({
         type: boradcastActionTypes.setInputValue,
         payload: input,
      });
   },
   setSentences: (sentence) => {
      store.setSentences(sentence);
      broadcast.postMessage({
         type: boradcastActionTypes.setSentences,
         payload: sentence,
      });
   },
   restartGame: () => {
      store.restartGame();
      broadcast.postMessage({ type: boradcastActionTypes.restartGame });
   },
};

const broadcastReducer = (type, payload) => {
   switch (type) {
      case boradcastActionTypes.setPlayer:
         store.setPlayer(payload);
         break;
      case boradcastActionTypes.startGame:
         store.startGame();

         break;
      case boradcastActionTypes.setInputValue:
         store.setInputValue(payload);

         break;
      case boradcastActionTypes.setSentences:
         store.setSentences(payload);

         break;
      case boradcastActionTypes.restartGame:
         store.restartGame();

         break;
      default:
         break;
   }
};

broadcast.onmessage = (event) => {
   broadcastReducer(event.data.type, event.data.payload);
};
