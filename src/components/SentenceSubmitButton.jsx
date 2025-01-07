import { broadcastActions } from '../services/broadcast';
import { useStore } from '../store/store';

export const SentenceSubmitButton = () => {
   const { currentPlayerInput } = useStore();

   return (
      <button
         className="sticky border-solid border-2 border-black bg-gradient-to-t from-darkBlue-500 to-lightBlue-100 text-white rounded-lg p-4 font-bold"
         type="submit"
         onClick={(e) => broadcastActions.setSentences(e.target.value)}
         value={currentPlayerInput}
      >
         Submit
      </button>
   );
};
