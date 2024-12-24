import { broadcastActions } from '../services/broadcast';
import { useStore } from '../store/store';
import { useCallback } from 'react';

export const PlayerInput = () => {
   const { currentTurn, currentPlayerInput } = useStore();

   const handleKeyDown = useCallback(
      (e) => {
         if (e.key === 'Enter') {
            broadcastActions.setSentences({
               sentence: e.target.value,
               user: currentTurn,
            });
         }
      },
      [currentTurn]
   );
   return (
      <div className="flex flex-col w-[40%] border-black border-4 p-4 ml-10">
         <input
            type="text"
            value={currentPlayerInput}
            onChange={(e) => broadcastActions.setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full border-black border-solid border-2 p-2"
         />
      </div>
   );
};
