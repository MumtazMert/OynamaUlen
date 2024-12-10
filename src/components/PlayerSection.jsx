import { useStore } from '../store/store';
import { useEffect, useRef, useCallback } from 'react';

const PlayerSection = ({ player }) => {
   const inputRef = useRef(null);
   const {
      currentTurn,
      gameStatus,
      setInputValue,
      currentPlayerInput,
      setSentences,
   } = useStore();

   const isPlayerPlaying = currentTurn === player;
   const isTurnDisabled = !isPlayerPlaying || gameStatus !== 'ongoing';

   const handleKeyDown = useCallback(
      (e) => {
         if (e.key === 'Enter') {
            setSentences({ sentence: e.target.value, user: player });
         }
      },
      [player, setSentences]
   );

   useEffect(() => {
      if (isTurnDisabled) {
         inputRef.current.blur();
         inputRef.current.value = '';
      } else {
         inputRef.current.focus();
      }
   }, [isTurnDisabled]);

   return (
      <section>
         <h1>{player}</h1>
         <input
            type="text"
            value={isPlayerPlaying ? currentPlayerInput : ''}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isTurnDisabled}
            ref={inputRef}
            className="border-black border-solid border-[4px]"
         />
      </section>
   );
};

export default PlayerSection;
