import { useStore } from "../store/store";

const SentenceList = () => {
  const { sentences } = useStore();

  return (
    <section className="flex flex-col items-center mr-[10%]">
      <h2>Sentences</h2>
      <ul>
        {sentences.map((sentence, index) => (
          <li key={index}>
            {sentence.user}: {sentence.sentence}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SentenceList;
