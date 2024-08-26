<template>
    <div class="px-6">
        <!-- Header -->
        <div class="mb-4">
            <h1 class="text-2xl font-bold text-gray-800">Dashboard • {{ representanteSelecionado }}</h1>
        </div>

        <!-- Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <SparkLineRepresentante :codigo="representanteSelecionado" />
        </div>

        <!-- Charts -->
        <div class="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div class="bg-white p-4 rounded-lg shadow">
                <h2 class="text-lg font-semibold text-gray-700">Vendas diárias + previsão</h2>
                <PrevisaoVendaRepresentante :codigo="representanteSelecionado" />
            </div>
            <div class="bg-white p-4 rounded-lg shadow">
                <h2 class="text-lg font-semibold text-gray-700">Clientes ativo e inativos</h2>
                <AtivosInativosRepresentante :codigo="representanteSelecionado" />
            </div>
        </div>

        <!-- Charts -->
        <div class="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div class="bg-white p-4 rounded-lg shadow">
                <h2 class="text-lg font-semibold text-gray-700">Venda anual</h2>
                <small class="font-semibold text-gray-700">Evolução detalhada</small>
                <LineAdwordsRepresentante :codigo="representanteSelecionado" />
            </div>
            <div class="bg-white p-4 rounded-lg shadow">
                <h2 class="text-lg font-semibold text-gray-700">Estados últimos 30 dias</h2>
                <TreeMapRepresentante :codigo="representanteSelecionado" />
            </div>
        </div>

        <!-- Charts -->
        <div class="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div class="bg-white p-4 rounded-lg shadow">
                <h2 class="text-lg font-semibold text-gray-700">Top 10 Grupos</h2>
                <Top10GruposRepresentante :codigo="representanteSelecionado" />
            </div>
            <div class="bg-white p-4 rounded-lg shadow">
                <h2 class="text-lg font-semibold text-gray-700">Top 10 Famílias</h2>
                <Top10FamiliasRepresentante :codigo="representanteSelecionado" />
            </div>
        </div>

    </div>
</template>

<script>
import { defineComponent } from 'vue';
import ApexChart from 'vue3-apexcharts';
import SparkLineRepresentante from '@/components/cards/SparkLineRepresentante.vue';
import PrevisaoVendaRepresentante from '@/components/cards/PrevisaoVendaRepresentante.vue';
import AtivosInativosRepresentante from '@/components/cards/AtivosInativosRepresentante.vue';

import LineAdwordsRepresentante from '@/components/cards/LineAdwordsRepresentante.vue';
import TreeMapRepresentante from '@/components/cards/TreeMapRepresentante.vue';
import Top10GruposRepresentante from '@/components/cards/Top10GruposRepresentante.vue';
import Top10FamiliasRepresentante from '@/components/cards/Top10FamiliasRepresentante.vue';

import { useRepresentanteStore } from '@/stores/representante';

export default defineComponent({
    components: {
        ApexChart,
        SparkLineRepresentante,
        PrevisaoVendaRepresentante,
        AtivosInativosRepresentante,
        LineAdwordsRepresentante,
        TreeMapRepresentante,
        Top10GruposRepresentante,
        Top10FamiliasRepresentante
    },
    computed: {
        representanteSelecionado() {
            const representanteStore = useRepresentanteStore();
            return representanteStore.getRepresentanteSelecionado;
        }
    }
});
</script>

<style>
/* Estilização customizada com TailwindCSS */
</style>