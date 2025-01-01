<template>
    <Password v-bind="$attrs" v-on="$attrs" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Password from 'primevue/password';

export default defineComponent({
    components: {
        Password,
    },
});
</script>