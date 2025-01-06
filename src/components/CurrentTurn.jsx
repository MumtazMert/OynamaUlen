export const CurrentTurn = ({ currentTurn }) => {
   return (
      <section className="col-span-4 mb-4">
         <h2 className="text-[#007BFF] font-bold text-3xl text-center">
            It's {currentTurn.name}'s turn!
         </h2>
      </section>
   );
};
