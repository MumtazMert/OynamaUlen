import SentenceList from './modules/SentenceList';
import { useStore, gameStatuses } from './store/store';
import PlayerSection from './modules/playerSection/PlayerSection';
import StartPage from './modules/StartPage';
import { PlayerInput } from './modules/PlayerInput';
import { CurrentTurn } from './components/CurrentTurn';
import { broadcastActions } from './services/broadcast';
import { useEffect } from 'react';

const App = () => {
   const { gameStatus, players, sentences, currentTurn } = useStore();

   useEffect(() => {
      broadcastActions.initializeTab();
   }, []);
   return (
      <>
         {gameStatus === gameStatuses.waiting ? (
            <StartPage />
         ) : (
            <div className="grid border-black border-4 rounded-3xl mx-[3%] my-[1%] box-border  overflow-hidden">
               <div className="grid grid-cols-2 space-x-14 items-center px-10 py-10 box-border">
                  <CurrentTurn currentTurn={currentTurn} />
                  <section className="grid col-end-1 self-start w-[284px] border-black border-4 rounded-2xl py-10 pr-10 overflow-auto shadow-S-button">
                     {players.map((player) => (
                        <PlayerSection key={player.id} player={player} />
                     ))}
                  </section>
                  <section className="grid grid-rows-[1fr_auto] box-border col-start-1 w-[190%] h-[720px] border-black border-4 rounded-2xl px-10 overflow-auto shadow-S-button">
                     <SentenceList sentences={sentences} />
                     <PlayerInput />
                  </section>
               </div>
            </div>
         )}
      </>
   );
};

export default App;
