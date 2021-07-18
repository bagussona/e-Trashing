import create from 'zustand';

const useStore = create(set => ({
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
  currentData: null,
  setCurrentData: data => set(() => ({currentData: data})),
  addressDropdown: false,
  setAddressDropdown: v => set(() => ({addressDropdown: v})),
  defaultCoordinate: false,
  setDefaultCoordinate: b => set(() => ({defaultCoordinate: b})),
  notification: null,
  setNotification: v => set(state => (state.notification = v)),
  clickedData: null,
  clicked: false,
  setClicked: (cd, c) => set(state => {
    state.clickedData = cd,
    state.clicked = true
  }),
  setUnclicked: () => set(state => {
    state.clickedData = null,
    state.clicked = false
  })
  // currentUserID: 0,
  // setCurrentUserID: id => set(() => ({currentUserID: id}))
}))

export { useStore };