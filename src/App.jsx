import SentenceList from './components/SentenceList';
import GameStatus from './components/GameStatus';
import { useStore, gameStatuses } from './store/store';
import PlayerSection from './components/PlayerSection';
import StartPage from './components/StartPage';
import { PlayerInput } from './components/Playerinput';

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
