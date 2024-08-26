<template>
    <apexchart height="500" :options="chartOptions" :series="chartOptions.series" />
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
import axios from 'axios';

export default {
    components: {
        apexchart: VueApexCharts,
    },
    props: {
        codigo: {
            type: String
        }
    },
    
    watch: {
        codigo: async function () {
            this.fetchData();
        }
    },
    data() {
        return {
            chartOptions: {
                chart: {
                    height: 500,
                    type: 'bar',
                    stacked: true,
                    stackType: '100%',
                    toolbar: { show: false }, 
                    zoom: { enabled: false }
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                    }
                },
                dataLabels: {
                    enabled: true,
                    formatter: (val, opts) => {
                        const seriesIndex = opts.seriesIndex;
                        const dataIndex = opts.dataPointIndex;
                        const value = opts.w.config.series[seriesIndex].data[dataIndex];
                        return value; // Mostrar o valor real
                    }
                },
                title: {
                    text: '',
                    align: 'left',
                    offsetY: 10,
                    offsetX: 0
                },
                series: [
                    {
                        name: 'Ativos',
                        data: []
                    },
                    {
                        name: 'Inativos',
                        data: []
                    }
                ],
                xaxis: {
                    categories: []
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return val;
                        }
                    }
                },
                yaxis: {
                    labels: {
                        formatter: function (val) {
                            return val.toFixed(0) + "%";
                        }
                    }
                }
            }
        };
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            try {
                const response = await axios.get(`/api/representantes/ativosinativos/${this.codigo}`);
                const data = response.data;

                const categories = data.map((item) => item.uf);
                const ativos = data.map((item) => parseInt(item.ativos));
                const inativos = data.map((item) => parseInt(item.inativos));

                this.updateChartOptions(ativos, inativos, categories);
            } catch (error) {
                console.error('Erro ao obter dados da API:', error);
            }
        },
        updateChartOptions(ativos, inativos, categories) {
            this.chartOptions = {
                ...this.chartOptions,
                series: [
                    { name: 'Ativos', data: ativos },
                    { name: 'Inativos', data: inativos }
                ],
                xaxis: { categories: categories }
            };
        }
    }
};
</script>
