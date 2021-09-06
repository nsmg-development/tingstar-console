<template>
    <v-container fluid>
        <Breadcrumbs :breadcrumbs="breadcrumbs"/>
        <div>
            <div>
                <v-row>
                    <v-col>
                    <span class="checkbox"
                          style="display:inline-block; padding: 15px 15px 10px 5px; margin-top: 7px; float: left">
                        <input type="checkbox" id="allcheck" v-model="selected" @click="selectAll()"/>
                    </span>
                        <v-switch
                            :true-value=1
                            :false-value=0
                            color="#E00051"
                            @change="changeAllState()"
                        ></v-switch>
                    </v-col>
                    <v-col>
                        <v-text-field
                            label="검색"
                            append-icon="search"
                            v-model="search"
                            @keyup.native.enter="data_search"
                        ></v-text-field>
                    </v-col>
                </v-row>
            </div>
            <v-row>
                <v-col
                    cols="12" sm="6" md="4" lg="3"
                    v-for="(item, i) in items" :key="i"
                >
                    <v-card>
                        <input type="checkbox" class="checked" v-model="checked[i]"/>
                        <v-img
                            class="row-pointer"
                            height="200px"
                            :src="item.storage_thumbnail_url"
                            @click="handleClick(item)"
                        >
                        </v-img>
                        <v-card-title>
                            {{ item.keyword }}
                        </v-card-title>
                        <v-card-subtitle>
                            {{ item.platform }}
                            <v-switch
                                v-model="item.state"
                                :true-value=1
                                :false-value=0
                                color="#E00051"
                                @change="changeState(item.id)"
                            ></v-switch>
                        </v-card-subtitle>
                    </v-card>
                </v-col>
            </v-row>
        </div>
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
            items: [],
            state_items: [
                {state: '미설정', value: 0},
                {state: '게시', value: 1},
                {state: '미게시', value: 2},
            ],
            page: 1,
            last_page: 1,
            color: '',
            selected: false,
            checked: [],
            count: 0,
            search: '',
        }
    },
    watch: {
        checked(v) {
            let result = true;

            v.forEach((selected) => {
                if (!selected) {
                    result = false
                }
            })
            this.selected = result
        },
        page() {
            this.getData()
            this.selected = false;
            this.checked = [];
        },
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            let result = [];
            let media = '';
            let axios_url = '';
            let url = 'https://chuncheon.blob.core.windows.net/chuncheon/';
            this.loading = true
            if (this.search) {
                axios_url = 'api/v1/articles?page=' + this.page + '&per_page=10&media_id=1&search=%23' + this.search;
            } else {
                axios_url = 'api/v1/articles?page=' + this.page + '&per_page=10&media_id=1';
            }
            this.axios.get(axios_url)
                .then(res => {
                    if (res.data.data.articles.length > 0) {
                        res.data.data.articles.map((item, index) => {
                            if (item.has_media == true) {
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
                                storage_thumbnail_url: url + item.storage_thumbnail_url,
                            })
                        })
                    }
                    this.items = result;
                    this.count = this.items.length;
                    if (Number.isInteger(res.data.data.totalCount / 10) == false) {
                        this.last_page = Math.floor(res.data.data.totalCount / 10) + 1;
                    } else {
                        this.last_page = res.data.data.totalCount / 10
                    }
                    this.loading = false
                    for (let i = 0; i < this.count; i++) {
                        this.$set(this.checked, i, false)
                    }
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
        selectAll() {
            for (const i in this.checked) {
                this.checked[i] = !this.selected
            }
        },
        changeAllState() {
            // if (!confirm("상태를 변경하시겠습니까?")) return false
            this.items.forEach(function (event) {
                const data = {
                    state: event.state
                };
                this.axios.put('api/v1/articles/' + event.id + '/state', data).then(res => {
                    this.getData();
                    console.log(res);
                }).catch(err => {
                    console.error(err);
                });
            });
        },
        data_search() {
            this.getData();
            this.page = 1;
        }
    }
}
</script>

<style scoped>
.row-pointer :hover {
    cursor: pointer;
}
</style>