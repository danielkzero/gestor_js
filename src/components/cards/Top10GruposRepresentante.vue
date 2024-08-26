<template>
    <apexchart height="500" :options="sparklines.options" :series="sparklines.series" />
</template>

<script>
import axios from 'axios';
import ApexCharts from 'vue3-apexcharts';


export default {
    components: {
        apexchart: ApexCharts
    },
    props: {
        codigo: {
            type: String,
        },
    },
    watch: {
        codigo: async function () {
            this. evolucaoDetalhada();
        }
    },
    data() {
        const createSparklineOptions = () => ({
            chart: {
                height: 328,
                type: 'bar',
                zoom: {
                    enabled: false
                },
                toolbar: { show: false }, 
                    zoom: { enabled: false }
            },
            legend: {
                show: false
            },
            plotOptions: {
                bar: {
                    distributed: true,
                    borderRadius: 4,
                    borderRadiusApplication: 'end',
                    horizontal: true,
                }
            },
            dataLabels: {
                enabled: false,
            },
            xaxis: {
                categories: [],
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return `R$ ${val.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                    }
                }
            },
        });

        return {
            sparklines: {
                options: createSparklineOptions(),
                series: [],
                categories: []
            },
        };
    },
    methods: {
        async evolucaoDetalhada() {
            const response = await axios.get(`/api/representantes/rankinggrupo/${this.codigo}`);
            const data = response.data;

            this.sparklines.series =
                [
                    {
                        name: 'Valor',
                        data: data.map((row) => row.total || 0)
                    }
                ];

            this.sparklines.options =
                {
                    xaxis: {
                        categories: data.map((row) => row.NmGrupo),
                    }
                };
        }
    },
    async mounted() {
        await this.evolucaoDetalhada();
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

.stat-figure {
    height: 100px;
}
</style>
