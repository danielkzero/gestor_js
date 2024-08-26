<template>
    <Menubar :model="items">
        <template #item="{ item, props, hasSubmenu, root }">
            <a v-ripple class="flex align-items-center" v-bind="props.action">
                <span :class="item.icon" />
                <span class="ml-2">{{ item.label }}</span>
                <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
                <span v-if="item.shortcut"
                    class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{{ item.shortcut
                    }}</span>
                <i v-if="hasSubmenu"
                    :class="['pi pi-angle-down', { 'pi-angle-down ml-2': root, 'pi-angle-right ml-auto': !root }]"></i>
            </a>
        </template>
        <template #end>
            <div class="flex align-items-center gap-4">
                <Avatar :icon="`dark:text-white pi ${iconClass}`" shape="circle" @click="onThemeToggler"></Avatar>
            </div>
        </template>
    </Menubar>
</template>


<script>
import Aura from '@primevue/themes/aura';
const presets = { Aura };

export default {
    data() {
        return {
            iconClass: 'pi-moon',
            presets: Object.keys(presets),
            selectedPrimaryColor: 'noir',
            selectedSurfaceColor: null,
            items: [
                {
                    label: 'Novo',
                    icon: 'pi pi-plus'
                },
                {
                    label: 'Ações',
                    icon: 'pi pi-cog',
                    items: [
                        {
                            label: 'Exportar excel',
                            icon: 'pi pi-file-excel'
                        },
                        {
                            label: 'Exportar csv',
                            icon: 'pi pi-file'
                        },
                        {
                            label: 'Compartilhar',
                            icon: 'pi pi-send'
                        },
                        {
                            separator: true
                        },
                        {
                            label: 'Lixeira',
                            icon: 'pi pi-trash'
                        }
                    ]
                }
            ]
        };
    },
    methods: {
        onThemeToggler() {
            const root = document.getElementsByTagName('html')[0];

            root.classList.toggle('p-dark');
            this.iconClass = this.iconClass === 'pi-moon' ? 'pi-sun' : 'pi-moon';
        }
    }
};
</script>