import { useState } from 'react';
import { useStore } from '../store/store';
import { broadcastActions } from '../services/broadcast';
import {
   containerClasses,
   addPlayerButtonClasses,
   playerNameInputClasses,
   playerListClasses,
   startGameButtonClasses,
} from '../styles/styles';
import ErrorAlert from '../components/ErrorAlert';
import IconButton from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

const StartPage = () => {
   const [username, setUsername] = useState('');
   const [alertOpen, setAlertOpen] = useState(false);
   const { players, removePlayer, tabId } = useStore();

   const START_GAME = 'Add user to start the game';
   const USER = 'USERNAME';
   const ADD = '+ Add User';
   const START = "Let's play";
   const PLAYER = 'PLAYERS';
   const MESSAGE =
      'The username you have entered is already taken. Please choose a different username.';

   const IsThereAnyUserAssignedToThisTab = players.some(
      (player) => player.tabId === tabId
   );
   console.log(IsThereAnyUserAssignedToThisTab);

   const handleAddPlayer = () => {
      if (username.trim()) {
         if (players.includes(username)) {
            setAlertOpen(true);
         } else {
            broadcastActions.setPlayer(username);
            setUsername('');
            setAlertOpen(false);
         }
      }
   };

   const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
         handleAddPlayer();
      }
   };

   return (
      <div className={containerClasses}>
         <section className="grid justify-center">
            <img src="/logo.svg" alt="logo" className="h-24 w-full mt-6" />
            <h1 className="py-7 font-bold text-lg text-darkBlue-900">
               {START_GAME}
            </h1>
         </section>
         <div className="grid grid-flow-row px-10 space-y-2.5">
            {!!players && players.length > 0 && (
               <>
                  <h1 className="text-sm font-bold ">{PLAYER}</h1>
                  <ul>
                     {players.map((player) => (
                        <li key={player.id} className={playerListClasses}>
                           {player.name}
                           <IconButton
                              aria-label="delete"
                              onClick={() => removePlayer(player.id)}
                              sx={{ color: 'black' }}
                           >
                              <DeleteIcon />
                           </IconButton>
                        </li>
                     ))}
                  </ul>
               </>
            )}
            {!IsThereAnyUserAssignedToThisTab && (
               <>
                  <h2 className="text-sm font-bold">{USER}</h2>
                  <input
                     type="text"
                     value={username}
                     onChange={(e) => setUsername(e.target.value)}
                     onKeyDown={handleKeyDown}
                     className={playerNameInputClasses}
                  />
                  <ErrorAlert open={alertOpen} message={MESSAGE} />
                  <button
                     onClick={handleAddPlayer}
                     className={addPlayerButtonClasses}
                  >
                     {ADD}
                  </button>
               </>
            )}
            <section className="py-8 ">
               <button
                  disabled={players.length < 2}
                  onClick={broadcastActions.startGame}
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
