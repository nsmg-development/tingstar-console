<template>
    <v-select
        :items="items"
        solo
        v-model="media"
        label="매체"
        item-text="name"
        item-value="id"
        @change="medias"
    ></v-select>
</template>

<script>
export default {
    data() {
        return {
            items: [],
            media: 1,
        }
    },
    mounted() {
        this.getData()
    },
    methods: {
        getData() {
            this.loading = true
            this.axios.get('api/v1/medias')
                .then(res => {
                    this.items = res.data.data;
                    this.loading = false
                })
                .catch(err => {
                    console.error(err);
                });
        },
        medias() {
            this.$emit('medias', this.media)
        }
    }
}
</script>

<style scoped>

</style>