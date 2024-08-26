<template>
    <TransitionRoot as="template" :show="mobileFiltersOpen">
        <Dialog class="relative z-40" @close="mobileFiltersOpen = false">
            <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0"
                enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100"
                leave-to="opacity-0">
                <div class="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>

            <div class="fixed inset-0 z-40 flex">
                <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
                    enter-from="-translate-x-full" enter-to="translate-x-0"
                    leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
                    leave-to="-translate-x-full">
                    <DialogPanel
                        class="relative mr-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-2 shadow-xl">
                        <ScrollPanel style="height: 100%">
                            <div class="flex items-center justify-between px-4">
                                <h1 class="text-4xl font-bold tracking-tight text-gray-900 mb-4">Gestor</h1>
                                <button type="button"
                                    class="-ml-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                    @click="mobileFiltersOpen = false">
                                    <span class="sr-only">Fechar menu</span>
                                    <i class="pi pi-times"></i>
                                </button>
                            </div>

                            <form class="ms-1 mr-3 mt-4 border-t border-gray-200">
                                <PanelMenu :model="menuData" class="mt-2"></PanelMenu>
                            </form>
                        </ScrollPanel>
                    </DialogPanel>
                </TransitionChild>
            </div>
        </Dialog>
    </TransitionRoot>

    <main class="mx-auto min-h-full">
        <section>
            <div class="flex justify-start gap-3">
                <div class="flex-auto">
                    <Card class="sticky top-0 z-30">
                        <template #content>
                            <div class="flex justify-start gap-4 align-middle">
                                <div class="flex items-center">
                                    <Avatar class="text-gray-400 hover:text-gray-500 cursor-pointer" size="large"
                                        @click="mobileFiltersOpen = true">
                                        <i class="pi pi-bars"></i>
                                    </Avatar>
                                </div>

                                <LogoGestor class="align-middle my-auto" G="rgb(255,157,0)" ESTOR="rgb(0,0,0)" />

                                <AutoComplete v-model="representanteSelecionado" :suggestions="representantesFiltrados"
                                    @complete="procurar" optionLabel="NomeRepresentante"
                                    placeholder="Digite o nome do representante">
                                    <template #item="slotProps">
                                        <div class="flex items-center country-item">
                                            <div>{{ slotProps.option.NomeRepresentante }}</div>
                                        </div>
                                    </template>
                                </AutoComplete>

                                <div class="flex items-center ms-auto">
                                    <OverlayBadge value="4" severity="danger" class="inline-flex">
                                        <Avatar class="text-gray-400 hover:text-gray-500 cursor-pointer" size="large">
                                            <i class="pi pi-bell"></i>
                                        </Avatar>
                                    </OverlayBadge>
                                </div>
                            </div>
                        </template>
                    </Card>
                    <div class="my-4">
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </section>
    </main>
    <RodapeSys />
</template>

<script>
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue';
import LogoGestor from '@/components/logo/index.vue';
import RodapeSys from '@/components/rodape/rodapesys.vue';
import { FilterMatchMode, FilterService } from '@primevue/core/api';
import axios from 'axios';




import { useRepresentanteStore } from '@/stores/representante';

export default {
    components: {
        Dialog,
        DialogPanel,
        TransitionChild,
        TransitionRoot,
        LogoGestor,
        RodapeSys
    },
    data() {
        return {
            mobileFiltersOpen: false,
            representantes: null,
            representanteSelecionado: null,
            representantesFiltrados: null,
            grupoRepresentante: [],
            representanteSelecionado: null
        };
    },
    watch: {
        representanteSelecionado: function () {
            if (typeof this.representanteSelecionado === 'object') {
                const representanteStore = useRepresentanteStore();
                representanteStore.setRepresentanteSelecionado(this.representanteSelecionado.IdRepresentante);
            }
        }
    },
    methods: {
        toggleMobileFilters() {
            this.mobileFiltersOpen = !this.mobileFiltersOpen;
        },
        procurar(event) {
            const query = event.query.toLowerCase();
            this.representantesFiltrados = this.representantes.filter((rep) =>
                rep.NomeRepresentante.toLowerCase().includes(query)
            );
        },

        async procurarRepresentante() {
            const response = await axios.get(`/api/representantes`);
            this.representantes = response.data;
        },
        async fetchMenuData() {
            try {
                const response = await axios.get('/api/menu');
                this.menuData = this.renderMenu(response.data);
            } catch (error) {
                console.error('Erro ao buscar dados do menu:', error);
            }
        },
        renderMenu(menuItems) {
            return menuItems.map(
                item => ({
                    label: item.menu,
                    icon: (item.titulo == '1' ? 'pi pi-fw pi-tag' : 'bx ' + item.icon),
                    class: (item.titulo == '1' ? 'panelmenu-header' : ''),
                    style: (item.titulo == '1' ?
                        {
                            fontWeight: 'bold',
                            color: '#333',
                            cursor: 'default',
                            border: 'none',
                            padding: '5px 16px',
                            background: 'transparent'
                        } : ''),
                    items: item.sub_menu.map(subItem => ({
                        label: subItem.menu,
                        url: subItem.pagina
                    }))
                })
            );
        }
    },
    async mounted() {
        this.procurarRepresentante();
        this.fetchMenuData();
    }
};
</script>
<style>
.panelmenu-header {
    font-weight: bold;
    color: #333;
    cursor: default;
    /* Cursor padrão para indicar que não é clicável */
    border: none;
    /* Remove as bordas */
    padding: 10px 16px;
    /* Ajusta o padding para um estilo mais de header */
    background: transparent;
    /* Fundo transparente */
}

.panelmenu-header .p-panelmenu-header-icon,
.panelmenu-header .p-panelmenu-submenu-icon {
    display: none;
    /* Remove o ícone de submenu */
}

.panelmenu-header .p-panelmenu-header-content,
.panelmenu-header .p-panelmenu-header-content:hover {
    background-color: transparent;
    /* Remove o efeito hover */
}

.panelmenu-header:hover {
    background-color: transparent;
    /* Remove o efeito hover */
}
</style>