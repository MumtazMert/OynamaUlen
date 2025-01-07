import { broadcastActions } from '../services/broadcast';
import { useStore } from '../store/store';
import { SentenceSubmitButton } from '../components/SentenceSubmitButton';

export const PlayerInput = () => {
   const { currentPlayerInput } = useStore();

   return (
      <div className="flex flex-row ticky w-full bg-white pb-14 space-x-4">
         <input
            type="text"
            value={currentPlayerInput}
            onChange={(e) => broadcastActions.setInputValue(e.target.value)}
            className="w-[95%] border-black border-solid rounded-lg border-2 px-3 py-4 font-medium"
         />
         <SentenceSubmitButton
            onClick={(e) => broadcastActions.setInputValue(e.target.value)}
         />
      </div>
   );
};
