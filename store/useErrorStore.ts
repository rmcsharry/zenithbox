import { create } from 'zustand'

const useErrorStore = create((set) => ({
  error: null,
  clearError: () => {
    setInterval(() => {
      set({ error: null })
    }, 4000);
  },
  setError: (message: string) => set({ error: message }),
}))

export default useErrorStore;