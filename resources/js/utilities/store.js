import create from 'zustand';

const useStore = create(set => ({
  logged_in: null, 
  data: 0,
  setLoggedIn: () => set(state => ({logged_in: true})), 
  setData: (data) => set(state => ({data: data}))
}))

export { useStore };