<template>
        <SparkLineTopo :series="seriesVendas" cor="text-success" :titulo="tituloVendas" :quantidade="quantidadeVendas"
            :subtitulo="subtituloVendas" />
        <SparkLineTopo :series="seriesPedidos" cor="text-warning" :titulo="tituloPedidos"
            :quantidade="quantidadePedidos" :subtitulo="subtituloPedidos" />
        <SparkLineTopo :series="seriesAtivos" cor="text-primary" :titulo="tituloAtivos" :quantidade="quantidadeAtivos"
            :subtitulo="subtituloAtivos" />
        <SparkLineTopo :series="seriesResgates" cor="text-secondary" :titulo="tituloResgates"
            :quantidade="quantidadeResgates" :subtitulo="subtituloResgates" />
</template>

<script>
import SparkLineTopo from './SparkLineTopo.vue';
import axios from 'axios';
import { MoedaFormatada } from '@/funcoes/conversoes';

export default {
    name: 'SparklineCharts',
    components: {
        SparkLineTopo
    },
    props: {
        codigo: {
            type: String
        },
    },
    
    watch: {
        codigo: async function () {
            this.fetchData();
        }
    },
    data() {
        return {
            seriesAtivos: [],
            tituloAtivos: '',
            quantidadeAtivos: 0,
            subtituloAtivos: '',

            seriesPedidos: [],
            tituloPedidos: '',
            quantidadePedidos: 0,
            subtituloPedidos: '',

            seriesVendas: [],
            tituloVendas: '',
            quantidadeVendas: 0,
            subtituloVendas: '',

            seriesResgates: [],
            tituloResgates: '',
            quantidadeResgates: 0,
            subtituloResgates: '',
        };
    },
    methods: {
        async fetchData() {
            try {
                const responseAtivo = await axios.get(`/api/representantes/clientesativos/${this.codigo}`);
                const dataAtivo = responseAtivo.data;

                const ativoData = dataAtivo.map((item) => parseInt(item.pedidos));
                const ativoTotalData = dataAtivo.map((item) => parseFloat(item.total));

                this.tituloAtivos = 'Clientes ativos';
                this.seriesAtivos = [{ name: 'Ativos', data: ativoData }];
                this.quantidadeAtivos = parseInt(dataAtivo[0].clientes);
                this.subtituloAtivos = `<strong>${MoedaFormatada(ativoTotalData.reduce((a, b) => a + b, 0))}</strong> nos últimos 6 meses`;

                //total em pedido
                const responsePedido = await axios.get(`/api/representantes/totalpedido/${this.codigo}`);
                const dataPedido = responsePedido.data;

                const pedidosData = dataPedido.map((item) => parseInt(item.pedidos));
                const pedidoTotalData = dataPedido.map((item) => parseFloat(item.total));

                this.tituloPedidos = 'Pedidos';
                this.seriesPedidos = [{ name: 'Pedidos', data: pedidosData }];
                this.quantidadePedidos = pedidosData.reduce((a, b) => a + b, 0);
                this.subtituloPedidos = `<strong>${MoedaFormatada(pedidoTotalData.reduce((a, b) => a + b, 0))}</strong> nos últimos 15 dias`;

                //total em vendas
                const responseVendido = await axios.get(`/api/representantes/totalvendido/${this.codigo}`);
                const dataVendido = responseVendido.data;

                const vendidosData = dataVendido.map((item) => parseInt(item.pedidos));
                const vendidosTotalData = dataVendido.map((item) => parseFloat(item.total));

                this.tituloVendas = 'Vendas';
                this.seriesVendas = [{ name: 'Vendas', data: vendidosData }];
                this.quantidadeVendas = vendidosData.reduce((a, b) => a + b, 0);
                this.subtituloVendas = `<strong>${MoedaFormatada(vendidosTotalData.reduce((a, b) => a + b, 0))}</strong> nos últimos 15 dias`;

                //total em vendas
                const responseResgate = await axios.get(`/api/representantes/clientesresgate/${this.codigo}`);
                const dataResgate = responseResgate.data;

                const ResgateData = dataResgate.map((item) => parseInt(item.clientes));
                const ResgateTotalData = dataResgate.map((item) => parseFloat(item.total));

                this.tituloResgates = 'Clientes reativados';
                this.seriesResgates = [{ name: 'Clientes reativas', data: ResgateData }];
                this.quantidadeResgates = ResgateData.reduce((a, b) => a + b, 0);
                this.subtituloResgates = `<strong>${MoedaFormatada(ResgateTotalData.reduce((a, b) => a + b, 0))}</strong> nos últimos 6 meses`;
            } catch (error) {
                console.error('Erro ao buscar dados da API:', error);
            }
        }
    },
    mounted() {
        this.fetchData();
    }
};
</script>

<style scoped>
.stats {
    display: flex;
    justify-content: space-between;
}

.stat {
    flex: 1;
    margin-right: 10px;
}
</style>