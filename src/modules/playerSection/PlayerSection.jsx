import { playerSectionClasses } from './constants/playerSectionStyles';

const PlayerSection = ({ player }) => {
   return (
      <div
         className={playerSectionClasses}
         style={{ backgroundColor: player.color }}
      >
         <h1 className="py-4 pl-10">{player.name}</h1>
      </div>
   );
};

export default PlayerSection;
