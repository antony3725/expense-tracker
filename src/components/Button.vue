<template>
    <Button :label=lable v-bind="$attrs" v-on="$attrs" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from 'primevue/button';

export default defineComponent({
    components: {
        Button,
    },
    props: {
        lable: {
            readonly: false,
            type: String,
            default: "",
        },
    },
});
</script>