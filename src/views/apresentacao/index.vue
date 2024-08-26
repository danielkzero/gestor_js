<template>
    <div class="hero min-h-screen"
        style="background-image: url(https://besthqwallpapers.com/Uploads/21-5-2018/53309/rio-de-janeiro-city-panorama-bay-coast-ocean.jpg);">
        <div class="hero-overlay bg-opacity-70">

            asdsadassa
        </div>
        <div class="hero-content">
            <div class="card">
                <div class="card-body">
                    <div class="card-title">
                        <div class="m-auto">
                            <logoGestor G="rgb(255,255,255)" ESTOR="rgb(255,255,255)" />
                        </div>

                    </div>
                    <div class="pt-5 text-center text-white">
                        Seja bem-vindo ao novo sistema de gestão empresarial!
                    </div>
                    <div class="card-actions py-5 m-auto">
                        <router-link class="btn btn-primary" to="/login">
                            Entrar no sistema
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import logoGestor from '@/components/logo/index.vue';
export default {
    name: 'apresentacao',
    components: {
        logoGestor
    }
}
</script>
<style scoped>
.hero {
    width: 100%;
    place-items: center;
    background-size: cover;
    background-position: center;
}

.min-h-screen {
    min-height: 100vh;
}
.hero-overlay {
    grid-column-start: 1;
    grid-row-start: 1;
    height: 100%;
    width: 100%;
    background-color: oklch(0.46 0.02 255.88 / 0.7);;
    --tw-bg-opacity: .5;
}
.bg-opacity-70 {
    --tw-bg-opacity: .7;
}
</style>