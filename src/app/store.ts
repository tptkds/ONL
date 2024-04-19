import create from 'zustand';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

type Store = {
    lastDoc: QueryDocumentSnapshot<DocumentData> | undefined;
    setLastDoc: (doc: QueryDocumentSnapshot<DocumentData>) => void;
    selectedGenres: number[];
    selectedSorting: string;
    keyword: string;
    setKeyword: (keyword: string) => void;
    setSelectedGenres: (genres: number[]) => void;
    setSelectedSorting: (sorting: string) => void;
};

const useStore = create<Store>()(set => ({
    lastDoc: undefined,
    setLastDoc: doc => set({ lastDoc: doc }),
    selectedGenres: [],
    selectedSorting: '인기순',
    keyword: '',
    setKeyword: keyword => set({ keyword: keyword }),
    setSelectedGenres: genres => set({ selectedGenres: genres }),
    setSelectedSorting: sorting => set({ selectedSorting: sorting }),
}));

export default useStore;
