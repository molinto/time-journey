import { create } from "zustand";

interface IRegisterStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useRegisterStore = create<IRegisterStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRegisterStore;
