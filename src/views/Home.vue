<template>
    <v-container fluid>
        <Breadcrumbs :breadcrumbs="breadcrumbs"/>
        <Datatable
            :headers="headers"
            :items="items"
            :loading="loading"
            @handleClick="handleClick"
        ></Datatable>
    </v-container>
</template>

<script>
import Breadcrumbs from "../components/Breadcrumbs";
import Datatable from "../components/Datatable";

export default {
    components: {
        Breadcrumbs,
        Datatable
    },
    data: () => ({
        loading: false,
        breadcrumbs: [
            {
                text: '수집정보 리스트',
                disabled: false,
                href: '/media-article-list',
            },
        ],
        headers: [
            {text: 'NO.', value: 'no', filterable: false},
            {text: '플랫폼', value: 'platform', sortable: false},
            {text: '타입', value: 'type', sortable: false},
            {text: '키워드', value: 'keyword', sortable: false},
            {text: '채널', value: 'channel', sortable: false},
            {text: '원본 URL', value: 'url', sortable: false},
            {text: '게시 날짜', value: 'date', sortable: false},
        ],
        items: [],
    }),
    mounted() {
        // this.getData();
    },
    methods: {
        getData() {
            let result = [];
            this.loading = true
            this.axios.get('v1/articles?page=1&per_page=10&media_idx=1000')
                .then(res => {
                    console.log(res.data);
                    // if (res.data.data.platforms.length > 0) {
                    //     res.data.data.platforms.map((item, index) => {
                    //         result.push({
                    //             no: index + 1,
                    //             id: item.id,
                    //             platform: item.platform,
                    //         })
                    //     })
                    // }
                    this.items = result;
                    this.loading = false
                })
                .catch(err => {
                    console.error(err);
                });
        },
        handleClick(value) {
            this.$router.push({name: 'PlatformShow', params: {id: value.id}});
        }
    }
}
</script>

<style scoped>

</style>