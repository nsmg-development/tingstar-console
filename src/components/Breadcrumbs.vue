<template>
    <v-breadcrumbs :items="breadcrumbs">
        <template v-slot:item="{ item }">

            <v-breadcrumbs-item
                v-if="item.value === 'back'"
                style="cursor:pointer"
                @click="$router.go(-1)"
            >
                {{item.text}}
            </v-breadcrumbs-item>
            <v-breadcrumbs-item
                v-else
                :href="item.href"
                :disabled="item.disabled"
            >
                {{ item.text}}
            </v-breadcrumbs-item>
        </template>
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