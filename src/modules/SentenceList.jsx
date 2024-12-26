import { useStore } from '../store/store';

const SentenceList = ({ playerColors }) => {
   const { sentences } = useStore();

   return (
      <section className="grid grid-cols-1 gap-4 overflow-auto">
         <ul className="w-full py-10 space-y-6">
            {sentences.map((sentence, index) => (
               <li
                  key={index}
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: playerColors[sentence.user] }}
               >
                  <strong>{sentence.user}:</strong> {sentence.sentence}
               </li>
            ))}
         </ul>
      </section>
   );
};

export default SentenceList;
