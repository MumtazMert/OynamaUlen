import { useStore } from '../store/store';

const GameStatus = () => {
   const { gameStatus } = useStore();

   return (
      <section>
         <h2>{gameStatus}</h2>
      </section>
   );
};

export default GameStatus;
