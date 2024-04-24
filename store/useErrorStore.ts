import { create } from 'zustand'

const useErrorStore = create((set) => ({
  error: null,
  clearError: () => set({ error: null }),
  setError: (message: string) => set({ error: message }),
}))

export default useErrorStore;