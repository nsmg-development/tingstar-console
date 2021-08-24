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
                href: '/',
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
            {text: '게시 여부', value: 'state', sortable: false},
        ],
        items: [],
    }),
    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            let result = [];
            this.loading = true
            this.axios.get('api/v1/articles?page=1&per_page=10&media_id=1')
                .then(res => {
                    if (res.data.data.articles.length > 0) {
                        res.data.data.articles.map((item, index) => {
                            result.push({
                                no: index + 1,
                                id: item.id,
                                platform: item.platform,
                                type: item.type,
                                keyword: item.keyword,
                                channel: item.channel,
                                url: item.url,
                                date: item.date,
                                state: item.state
                            })
                        })
                    }
                    this.items = result;
                    this.loading = false
                })
                .catch(err => {
                    console.error(err);
                });
        },
        handleClick(value) {
            this.$router.push({name: 'ArticleShow', params: {id: value.id}});
        }
    }
}
</script>

<style scoped>
.row-pointer >>> tbody tr :hover {
    cursor: pointer;
}
</style>