import { create } from "zustand";

interface ILoginStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useLoginStore = create<ILoginStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useLoginStore;
