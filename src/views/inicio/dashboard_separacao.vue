<template>
  <Card>
    <template #content>
      <TabView v-model:activeIndex="value">
        <TabPanel header="Disponível">
            <TabelaSeparacao :dados="disponivel" />
        </TabPanel>
        <TabPanel header="Faturamento">
          <p class="m-0">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
            aperiam...
          </p>
        </TabPanel>
        <TabPanel header="Faltante">
          <p class="m-0">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
            atque corrupti quos dolores...
          </p>
        </TabPanel>
        <TabPanel header="Separação">
          <p class="m-0">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
            atque corrupti quos dolores...
          </p>
        </TabPanel>
      </TabView>
    </template>
  </Card>
  
</template>

<script>
import { ref } from 'vue';
import TabelaSeparacao from '@/components/tabela/TabelaSeparacao.vue';
import axios from 'axios';
export default {
  data() {
    return {
      disponivel: []
    }
  },
  components: {
    TabelaSeparacao
  },
  setup() {
    const value = ref(0);
    return { value };
  },
  methods: {
    async totais() {
      try {
        this.loadData = true;

        let response = await axios.get(`/api/separacao/disponivel`);
        this.disponivel = response.data;

      } catch (error) {
        console.error("Erro ao obter dados:", error);
      } finally {
        this.loadData = false;
      }
    },
  },
  mounted() {
    this.totais();
  }
}
</script>
