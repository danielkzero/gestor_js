<template>
    
        <div class="bg-white p-4 rounded-lg shadow">
            <h2 class="text-lg font-semibold text-gray-700">{{ titulo }}</h2>
            <p class="text-3xl font-bold text-gray-800">
                {{ quantidade }}
                <apexchart height="100" type="line" :options="sparklines.options" :series="series" />
            </p>
            <small class="stat-desc" v-html="subtitulo"></small>
        </div>
</template>

<script>
import ApexCharts from 'vue3-apexcharts';


export default {
    components: {
        apexchart: ApexCharts
    },
    props: {
        series: {
            type: Array,
            default: []
        },
        cor: {
            type: String,
            default: 'text-primary'
        },
        titulo: {
            type: String,
            default: 'Vendas'
        },
        quantidade: {
            type: Number,
            default: 0
        },
        subtitulo: {
            type: String,
            default: 'Este mês'
        },
    },
    data() {

        const createSparklineOptions = () => ({
            chart: {
                foreColor: '#ccc',
                type: 'line',
                sparkline: {
                    enabled: true
                },
            },
            series: [],
            stroke: {
                curve: 'smooth'
            },
            markers: {
                size: 0
            },
            colors: ['#ff9d00'],
            xaxis: {
                crosshairs: {
                    width: 1
                },
            },
            tooltip: {
                x: {
                    show: false
                },
                y: {
                    title: {
                        formatter: function formatter() {
                            return '';
                        }
                    }
                }
            }
        });

        return {
            sparklines:
            {
                options: createSparklineOptions(),
            },
        };
    }
};
</script>

<style>
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
