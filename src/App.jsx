import SentenceList from './modules/SentenceList';
import GameStatus from './modules/GameStatus';
import { useStore, gameStatuses } from './store/store';
import PlayerSection from './modules/PlayerSection';
import StartPage from './modules/StartPage';
import { PlayerInput } from './modules/PlayerInput';

const App = () => {
   const { gameStatus, players, sentences } = useStore();

   return (
      <>
         {gameStatus === gameStatuses.waiting ? (
            <StartPage />
         ) : (
            <>
               {players.map((player) => {
                  return <PlayerSection key={player} player={player} />;
               })}
               <PlayerInput />
               <SentenceList sentences={sentences} />
               {gameStatus === gameStatuses.ongoing && (
                  <GameStatus gameStatus={gameStatus} />
               )}
            </>
         )}
      </>
   );
};

export default App;
