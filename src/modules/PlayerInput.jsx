import { broadcastActions } from '../services/broadcast';
import { useStore } from '../store/store';
import { useCallback } from 'react';

export const PlayerInput = () => {
   const { currentPlayerInput } = useStore();

   const handleKeyDown = useCallback((e) => {
      if (e.key === 'Enter') {
         broadcastActions.setSentences(e.target.value);
      }
   }, []);
   return (
      <div className="sticky w-full bg-white p-4">
         <input
            type="text"
            value={currentPlayerInput}
            onChange={(e) => broadcastActions.setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-[85%] border-black border-solid rounded border-2 p-2"
         />
      </div>
   );
};
