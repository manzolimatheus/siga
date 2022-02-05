import { createStore } from "vuex";

export default createStore({
  state: {
    isLogged: false,
    isModalVisible: false,
    modalContent: {}
  },
  mutations: {
    setIsLogged(state, payload) {
      state.isLogged = payload;
    },
    setIsModalVisible(state, payload) {
      state.isModalVisible = payload;
    },
    setModalContent(state, payload) {
      state.modalContent = payload;
    }
  },
  actions: {},
  modules: {},
});
