import create from 'zustand';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

type Store = {
    lastDoc: QueryDocumentSnapshot<DocumentData> | undefined;
    setLastDoc: (doc: QueryDocumentSnapshot<DocumentData>) => void;
};

const useStore = create<Store>()(set => ({
    lastDoc: undefined,
    setLastDoc: doc => set({ lastDoc: doc }),
}));

export default useStore;
