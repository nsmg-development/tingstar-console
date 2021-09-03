<template>
    <v-breadcrumbs :items="breadcrumbs">
        <template v-slot:divider>
            <v-icon>mdi-forward</v-icon>
        </template>
    </v-breadcrumbs>
</template>

<script>
export default {
    props: {
        breadcrumbs: [],
    }
}
</script>

<style scoped>

</style>