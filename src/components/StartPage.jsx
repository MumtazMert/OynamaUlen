import { useState } from 'react';
import { useStore } from '../store/store';
import {
   containerClasses,
   addPlayerButtonClasses,
   playerNameInputClasses,
   playerListClasses,
   startGameButtonClasses,
} from '../styles/styles';

const StartPage = () => {
   const [username, setUsername] = useState('');
   const { setPlayer, startGame, players } = useStore();

   const START_GAME = 'Add user to start the game';
   const USER = 'USERNAME';
   const ADD = '+ Add User';
   const START = "Let's play";
   const PLAYER = 'PLAYERS';

   const handleAddPlayer = () => {
      if (username.trim()) {
         setPlayer(username);
         setUsername('');
      }
   };

   const hangleKeyDown = (e) => {
      if (e.key === 'Enter') {
         handleAddPlayer();
      }
   };

   return (
      <div className={containerClasses}>
         <section className="flex flex-col items-center">
            <img src="/logo.svg" alt="logo" className="h-24 w-full mt-6" />
            <h1 className="py-7 font-bold text-lg text-darkBlue-900">
               {START_GAME}
            </h1>
         </section>
         <div className="flex flex-col px-10 space-y-2.5">
            {!!players && players.length > 0 && (
               <>
                  <h1 className="text-sm font-bold ">{PLAYER}</h1>
                  <ul>
                     {players.map((player) => (
                        <li key={player} className={playerListClasses}>
                           {player}
                        </li>
                     ))}
                  </ul>
               </>
            )}
            <h2 className="text-sm font-bold">{USER}</h2>
            <input
               type="text"
               value={username}
               onChange={(e) => setUsername(e.target.value)}
               onKeyDown={hangleKeyDown}
               className={playerNameInputClasses}
            />
            <button
               onClick={handleAddPlayer}
               className={addPlayerButtonClasses}
            >
               {ADD}
            </button>
            <section className="py-8 ">
               <button
                  disabled={players.length < 2}
                  onClick={startGame}
                  className={startGameButtonClasses(players)}
               >
                  {START}
               </button>
            </section>
         </div>
      </div>
   );
};

export default StartPage;
