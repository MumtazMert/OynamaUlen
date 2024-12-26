const PlayerSection = ({ player, color }) => {
   return (
      <div
         className="border-black border-4 rounded-r-3xl my-7"
         style={{ backgroundColor: color }}
      >
         <h1 className="py-4 pl-10">{player}</h1>
      </div>
   );
};

export default PlayerSection;
