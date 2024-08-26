// stores/cidade.js
import { defineStore } from 'pinia';

export const useCidadeStore = defineStore('cidade', {
  state: () => ({
    cidades: []
  }),
  actions: {
    carregarCidadesComVenda(vendas) {
      this.cidades = vendas;
    }
  },
  getters: {
    getCidadesComVenda: (state) => state.cidades
  }
});
