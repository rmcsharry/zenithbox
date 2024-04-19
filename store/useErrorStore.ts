import { create } from 'zustand'

const useErrorStore = create((set) => ({
  error: '',
  clearError: () => set({ error: '' }),
  setError: (message: string) => set({ error: message }),
}))

export default useErrorStore;