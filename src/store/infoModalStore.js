import { create } from 'zustand';

const useInfoModalStore = create((set) => ({
  isInfoModalOpen: false,
  openInfoModal: () => set({ isInfoModalOpen: true }),
  closeInfoModal: () => set({ isInfoModalOpen: false }),
}));

export default useInfoModalStore;
