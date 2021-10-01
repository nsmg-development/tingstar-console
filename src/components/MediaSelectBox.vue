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
    async mounted() {
        await this.getData()
        const media_id = this.$route.query.media_id || null;
        if(media_id) {
            this.media = parseInt(media_id)
        } else {
            this.media = 1
        }
    },
    methods: {
        getData() {
            this.loading = true
            return this.axios.get('api/v1/medias')
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