<template>
    <v-container fluid>
        <Breadcrumbs :breadcrumbs="breadcrumbs"/>
        <v-card-title>
            <v-row>
                <v-col>
                    <v-text-field
                        v-model="keyword"
                        label="키워드"
                        readonly
                    ></v-text-field>
                    <v-text-field
                        v-model="channel"
                        label="채널"
                        readonly
                    ></v-text-field>
                </v-col>
                <v-col>
                    <v-text-field
                        label="카테고리"
                        placeholder="카테고리"
                        readonly
                    ></v-text-field>
                    <v-text-field
                        label="메모"
                        placeholder="메모"
                        readonly
                    ></v-text-field>
                </v-col>
            </v-row>
        </v-card-title>
<!--        <Datatable-->
<!--            :headers="headers"-->
<!--            :items="items"-->
<!--            :loading="loading"-->
<!--        ></Datatable>-->
    </v-container>
</template>

<script>
import Breadcrumbs from "../../components/Breadcrumbs";
// import Datatable from "../../components/Datatable";

export default {
    components: {
        Breadcrumbs,
        // Datatable
    },
    data() {
        return {
        loading: false,
        breadcrumbs: [
            {
                text: '수집정보 리스트',
                disabled: false,
                href: '/',
            },
            {
                text: '수집정보 상세보기',
                disabled: false,
                href: '/' + this.$route.params.id,
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
        keyword: '',
        channel: '',
    }},
    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            let result = [];
            this.loading = true
            this.axios.get('api/v1/articles/' + this.$route.params.id)
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
                    this.keyword = res.data.data.keyword;
                    this.channel = res.data.data.channel;
                    this.loading = false
                })
                .catch(err => {
                    console.error(err);
                });
        },
    }
}
</script>

<style scoped>

</style>