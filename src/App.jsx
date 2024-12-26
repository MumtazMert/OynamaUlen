import SentenceList from './modules/SentenceList';
import { useStore, gameStatuses } from './store/store';
import PlayerSection from './modules/PlayerSection';
import StartPage from './modules/StartPage';
import { PlayerInput } from './modules/PlayerInput';
import { usePlayerColors } from './store/hooks/usePlayerColors';
import { CurrentTurn } from './components/CurrentTurn';

const App = () => {
   const { gameStatus, players, sentences, currentTurn } = useStore();
   const playerColors = usePlayerColors(players);

   return (
      <>
         {gameStatus === gameStatuses.waiting ? (
            <StartPage />
         ) : (
            <div className="grid border-black border-4 rounded-3xl mx-[3%] my-[3%] box-border  overflow-hidden">
               <div className="grid grid-cols-2 space-x-14 items-center px-10 py-10 box-border">
                  <CurrentTurn currentTurn={currentTurn} />
                  <section className="grid col-end-1 w-[338px] max-h-[720px] border-black border-4 rounded-2xl py-10 pr-10 overflow-auto">
                     {players.map((player) => (
                        <PlayerSection
                           key={player}
                           player={player}
                           color={playerColors[player]}
                        />
                     ))}
                  </section>
                  <section className="grid grid-rows-[1fr_auto] box-border col-start-1 w-[170%] h-[720px] border-black border-4 rounded-2xl px-10 overflow-auto">
                     <SentenceList
                        sentences={sentences}
                        playerColors={playerColors}
                     />
                     <PlayerInput />
                  </section>
               </div>
            </div>
         )}
      </>
   );
};

export default App;
