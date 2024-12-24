const PlayerSection = ({ player }) => {
   return (
      <>
         <div>
            <h1 className="flex flex-col w-[40%] border-black border-4 p-4">
               {player}
            </h1>
         </div>
      </>
   );
};

export default PlayerSection;
