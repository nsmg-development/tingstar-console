<template>
    <v-container fluid>
        <Breadcrumbs :breadcrumbs="breadcrumbs"/>
        <v-data-table
            :headers="headers"
            :items="items"
            :loading="loading"
            item-key="id"
            show-select
            class="row-pointer"
            @click:row="handleClick"
        >
            <template v-slot:item.storage_thumbnail_url="{ item }">
                <v-img
                    max-height="100"
                    max-width="200"
                    :src="item.storage_thumbnail_url"
                ></v-img>
            </template>
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
            <template v-slot:item.has_media="{ item }">
                <v-chip :color="color" class="white--text">
                    {{ item.has_media }}
                </v-chip>
            </template>
        </v-data-table>
        <v-pagination
            class="mt-5"
            v-model="page"
            :length="last_page"
            color="#E00051"
            prev-icon="mdi-chevron-left"
            next-icon="mdi-chevron-right"
            :total-visible="10"
        ></v-pagination>
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
                {text: '썸네일', value: 'storage_thumbnail_url', filterable: false},
                {text: '플랫폼', value: 'platform', sortable: false},
                {text: '타입', value: 'type', sortable: false},
                {text: '키워드', value: 'keyword', sortable: false},
                {text: '채널', value: 'channel', sortable: false},
                {text: '원본 URL', value: 'url', sortable: false},
                {text: '게시 날짜', value: 'date', sortable: false},
                {text: '게시 여부', value: 'state', sortable: false},
                {text: '미디어', value: 'has_media', sortable: false},
            ],
            items: [],
            state_items: [
                {state: '미설정', value: 0},
                {state: '게시', value: 1},
                {state: '미게시', value: 2},
            ],
            page: 1,
            last_page: 1,
            color: '',
        }
    },
    watch: {
        page() {
            this.getData()
        }
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            let result = [];
            let media = '';
            this.loading = true
            this.axios.get('api/v1/articles?page=' + this.page + '&per_page=10&media_id=1')
                .then(res => {
                    if (res.data.data.articles.length > 0) {
                        res.data.data.articles.map((item, index) => {
                            if(item.has_media == true) {
                                media = 'Y'
                                this.color = '#E00051'
                            } else {
                                media = 'N'
                                this.color = 'grey'
                            }
                            result.push({
                                no: index + 1,
                                id: item.id,
                                platform: item.platform,
                                type: item.type,
                                keyword: item.keyword,
                                channel: item.channel,
                                url: item.url,
                                date: item.date,
                                state: item.state,
                                has_media: media,
                                storage_thumbnail_url: "https://chuncheon.blob.core.windows.net/chuncheon/" + item.storage_thumbnail_url,
                            })
                        })
                    }
                    this.items = result;
                    console.log(res.data.data);
                    this.last_page = Math.floor(res.data.data.totalCount / 10) + 1;
                    this.loading = false
                })
                .catch(err => {
                    console.error(err);
                });
        },
        handleClick(value) {
            this.$router.push({name: 'ArticleShow', params: {id: value.id}});
        },
        changeState(id) {
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
.row-pointer >>> tbody tr :hover {
    cursor: pointer;
}
</style>