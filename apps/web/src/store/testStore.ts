import { create } from 'zustand';

interface TestStore {
  test: string;
  actions: {
    randomize: () => void;
  };
}

const textPhrases = [
  'Text comming from the store',
  'The cat is on the table',
  'Lets go to the beach',
  'I am a software developer',
  'Hello world',
];

const testStore = create<TestStore>((set) => ({
  test: textPhrases[0],
  actions: {
    randomize: () => {
      const randomIdx = Math.floor(Math.random() * textPhrases.length);
      set({ test: textPhrases[randomIdx] });
    },
  },
}));

export const useTestStore = testStore;

export default testStore;
