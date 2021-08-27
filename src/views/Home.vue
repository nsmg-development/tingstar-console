<template>
    <v-container fluid>
        <Breadcrumbs :breadcrumbs="breadcrumbs"/>
        <v-data-table
            :headers="headers"
            :items="items"
            :loading="loading"
            sort-by="calories"
            class="elevation-1"
            @click:row="handleClick"
        >
            <template v-slot:item.state="{ item }">
                <v-select
                    v-model="item.state"
                    :items="state_items"
                    item-text="state"
                    item-value="value"
                    color="#E00051"
                    @change="changeState(item.id)"
                    v-on:click.stop
                ></v-select>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
import Breadcrumbs from "../components/Breadcrumbs";

export default {
    components: {
        Breadcrumbs,
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
            state_items: [
                {state: '미설정', value: 0},
                {state: '게시', value: 1},
                {state: '미게시', value: 2},
            ],
        }
    },
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
            console.log(value.id);
            this.$router.push({name: 'ArticleShow', params: {id: value.id}});
        },
        changeState(id) {
            console.log(id);
            const item = this.items.filter(item => item.id === id)[0];
            const data = {
                state: item.state
            };
            this.axios.put('api/v1/articles/' + id + '/state', data).then(res => {
                this.getData();
                console.log(res);
            }).catch(err => {
                console.error(err);
            });
        },
    }
}
</script>

<style scoped>
.v-data-table__wrapper > table > tbody > tr:hover {
    cursor: pointer;
}
</style>