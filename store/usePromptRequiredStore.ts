import { create } from 'zustand'

const usePromptRequiredStore = create((set) => ({
  isRequired: false,
  setIsRequired: (message: boolean) => set({ isRequired: message }),
}))

export default usePromptRequiredStore;