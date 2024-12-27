import { playerSectionClasses } from './constants/playerSectionStyles';

const PlayerSection = ({ player, color }) => {
   return (
      <div className={playerSectionClasses} style={{ backgroundColor: color }}>
         <h1 className="py-4 pl-10">{player}</h1>
      </div>
   );
};

export default PlayerSection;
