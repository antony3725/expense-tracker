<template>
    <InputText v-bind="$attrs" v-on="$attrs" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import InputText from 'primevue/inputtext';

export default defineComponent({
    components: {
        InputText,
    },
});
</script>