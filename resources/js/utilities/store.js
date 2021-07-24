import create from 'zustand';

const useStore = create(set => ({
  /**
   * Required by Geo Location API
   */
  provinces: [
    'ACEH',
    'SUMATERA BARAT',
    'SUMATERA UTARA',
    'RIAU',
    'JAMBI',
    'SUMATERA SELATAN',
    'BENGKULU',
    'LAMPUNG',
    'KEPULAUAN BANGKA BELITUNG',
    'KEPULAUAN RIAU',
    'DKI JAKARTA',
    'JAWA BARAT',
    'JAWA TENGAH',
    'DI YOGYAKARTA',
    'JAWA TIMUR',
    'BANTEN',
    'BALI',
    'NUSA TENGGARA BARAT',
    'NUSA TENGGARA TIMUR',
    'KALIMANTAN BARAT',
    'KALIMANTAN TENGAH',
    'KALIMANTAN SELATAN',
    'KALIMANTAN TIMUR',
    'KALIMANTAN UTARA',
    'SULAWESI UTARA',
    'SULAWESI TENGAH',
    'SULAWESI SELATAN',
    'SULAWESI TENGGARA',
    'GORONTALO',
    'SULAWESI BARAT',
    'MALUKU',
    'MALUKU UTARA',
    'PAPUA BARAT',
    'PAPUA'
  ],
  /** End of Geo Location APIs */
  /**
   * Current User Data
   */
    currentUserID: null,
    setCurrentUserID: id => set(() => ({currentUserID: id})),
  /** End of Current User Data */
  /**
   * Address Component
   */
  addressDropdown: false,
  setAddressDropdown: v => set(() => ({addressDropdown: v})),
  defaultCoordinate: false,
  setDefaultCoordinate: b => set(() => ({defaultCoordinate: b})),
  /** End of Address Component */

  /**
   * Header Component
   */
  notification: null,
  setNotification: v => set(state => (state.notification = v)),
  /** End Of Header Component */

  /**
   * Required by Chat App
   */
  /**
   * Click State
   */
  clicked: false,
  chatUser: null,
  setChatUser: user => set(() => ({chatUser: user})),
  /** End of Click State */
  /**
   * Global Messages
   */
  messages: null,
  setMessages: messages => set(() => ({messages: messages})),
  messageLoading: true,
  setMessageLoading: bool => set(() => ({messageLoading: bool})),
  /** End of Chat App */
}))

export { useStore };