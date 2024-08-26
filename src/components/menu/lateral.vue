<template>
    <div class="flex">
      <Sidebar v-model:visible="drawerVisible" class="min-w-[250px]">
        <Menu :model="menuItems" />
      </Sidebar>
      <div class="flex-1 p-5">
        <Button icon="pi pi-bars" @click="toggleDrawer" class="p-button-rounded p-button-text" />
        <router-view />
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import Sidebar from 'primevue/sidebar';
  import Menu from 'primevue/menu';
  import Button from 'primevue/button';
  
  export default {
    components: {
      Sidebar,
      Menu,
      Button,
    },
    setup() {
      const drawerVisible = ref(false);
      const menuItems = ref([
        {
          label: 'Dashboard',
          icon: 'pi pi-fw pi-home',
          command: () => { /* Navegar para a dashboard */ }
        },
        {
          label: 'Configurações',
          icon: 'pi pi-fw pi-cog',
          command: () => { /* Navegar para as configurações */ }
        },
        // Outros itens do menu
      ]);
  
      const toggleDrawer = () => {
        drawerVisible.value = !drawerVisible.value;
      };
  
      return { drawerVisible, menuItems, toggleDrawer };
    },
  };
  </script>
  
  <style scoped>
  /* Personalize ainda mais o estilo usando TailwindCSS aqui */
  </style>
  