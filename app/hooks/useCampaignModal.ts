import { create } from 'zustand';

interface CampaignModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useCampaignModal = create<CampaignModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useCampaignModal;
