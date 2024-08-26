// stores/representante.js
import { defineStore } from 'pinia';

export const useRepresentanteStore = defineStore('representante', {
  state: () => ({
    representanteSelecionado: '000111',
  }),
  actions: {
    setRepresentanteSelecionado(representante) {
      this.representanteSelecionado = representante;
    }
  },
  getters: {
    getRepresentanteSelecionado: (state) => state.representanteSelecionado,
  }
});
