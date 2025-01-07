import { useStore } from '../store/store';

const SentenceList = () => {
   const { sentences } = useStore();

   return (
      <section className="grid grid-cols-1 gap-4 overflow-auto">
         <ul className="w-full py-10 space-y-6">
            {sentences.map((sentence, index) => (
               <li key={index} style={{ backgroundColor: sentence.user.color }}>
                  <strong className="text-2xl">{sentence.user.name}:</strong>{' '}
                  {sentence.sentence}
               </li>
            ))}
         </ul>
      </section>
   );
};

export default SentenceList;
