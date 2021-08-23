<template>
    <v-data-table
        :headers="headers"
        :items="items"
        item-key="id"
        class="row-pointer"
        :loading="loading"
        @click:row="handleClick"
        loading-text="로딩중 기다려주세요."
        v-model="selected"
    >
    </v-data-table>
</template>

<script>
export default {
    props: {
        loading: Boolean,
        headers: [],
        items: [],
        selected: [],
    },
    methods: {
        handleClick(value) {
            this.$emit('handleClick', value)
        }
    }
}
</script>

<style scoped>

</style>