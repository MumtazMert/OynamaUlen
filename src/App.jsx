import SentenceList from './components/SentenceList';
import GameStatus from './components/GameStatus';
import { useStore, gameStatuses } from './store/store';
import PlayerSection from './components/PlayerSection';
import StartPage from './components/StartPage';

const App = () => {
   const { gameStatus, players, sentences } = useStore();

   return (
      <>
         {gameStatus === gameStatuses.waiting ? (
            <StartPage />
         ) : (
            <div>
               <div className="flex flex-row place-content-between">
                  {players.map((player) => {
                     return <PlayerSection key={player} player={player} />;
                  })}
               </div>
               <SentenceList sentences={sentences} />
               {gameStatus === gameStatuses.ongoing && (
                  <GameStatus gameStatus={gameStatus} />
               )}
            </div>
         )}
      </>
   );
};

export default App;
