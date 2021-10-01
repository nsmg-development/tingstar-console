<template>
    <v-container fluid>
        <Breadcrumbs :breadcrumbs="breadcrumbs"/>
        <MediaSelectBox @medias="media_ids"/>
        <div>
            <div>
                <v-row>
                    <v-col>
                    <span class="ml-1"
                          style="display:inline-block; float: left">
                        <v-checkbox v-model="selected" @click="selectAll()"/>
                    </span>
                        <v-switch
                            :true-value=1
                            :false-value=0
                            color="#E00051"
                            @change="changeAllState()"
                            label="노출 설정"
                            v-model="state"
                            style="width: 200px"
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
                    <v-card height="100%">
                        <v-checkbox class="ml-1" v-model="checked[i]" :key="item.id" :value="item.id"/>
                        <v-img
                            v-if="item.storage_thumbnail_url"
                            class="row-pointer"
                            :src="item.storage_thumbnail_url"
                            @click="handleClick(item)"
                            height="180px"
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
                        <v-card-text>
                            {{ item.contents }}
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </div>
        <v-pagination
            class="mt-10 mb-5"
            v-model="page"
            :length="last_page"
            color="#E00051"
            prev-icon="mdi-chevron-left"
            next-icon="mdi-chevron-right"
            :total-visible="10"
            @input="moveToPage()"
        ></v-pagination>
    </v-container>
</template>

<script>
import Breadcrumbs from "../components/Breadcrumbs";
import MediaSelectBox from "../components/MediaSelectBox";

export default {
    components: {
        Breadcrumbs,
        MediaSelectBox
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
            per_page: 36,
            last_page: 1,
            color: '',
            selected: false,
            checked: [],
            count: 0,
            search: '',
            media_id: 1,
            state: 0,
        }
    },
    watch: {
        checked(v) {
            let result = true;

            v.forEach((selected) => {
                if (!selected) {
                    result = false;
                }
            })
            this.selected = result
        },
    },
    mounted() {
        const page = this.$route.query?.page || null;
        if (page) {
            this.page = parseInt(page);
        } else {
            this.moveToPage(1);
        }
        this.getData();
    },
    methods: {
        moveToPage(page = this.page){
           window.location.href = `/?page=${page}`;
        },
        getData(media) {
            let result = [];
            let axios_url = '';
            let img = '';
            let url = 'https://chuncheon.blob.core.windows.net/chuncheon/';
            let media_id = 1;
            if (typeof media === "undefined") {
                media_id = 1;
            } else {
                media_id = media
            }
            this.loading = true
            if (this.search) {
                axios_url = 'api/v1/admin/articles?page=' + this.page + '&per_page=' + this.per_page + '&media_id=' + media_id + '&search=%23' + this.search;
            } else {
                axios_url = 'api/v1/admin/articles?page=' + this.page + '&per_page=' + this.per_page + '&media_id=' + media_id;
            }
            this.axios.get(axios_url)
                .then(res => {
                    if (res.data.data.articles.length > 0) {
                        res.data.data.articles.map((item, index) => {
                            if (item.storage_thumbnail_url) {
                                img = url + item.storage_thumbnail_url;
                            } else {
                                if (item.article_medias[0]) {
                                    img = url + item.article_medias[0].storage_url;
                                } else {
                                    img = './images/no-image.png';
                                }
                            }
                            let contents = '';
                            if (item.contents.length > 50) {
                                contents = item.contents.substr(0, 50) + '...'
                            } else {
                                contents = item.contents.substr(0, 50);
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
                                storage_thumbnail_url: img,
                                contents: contents,
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
                    let hasAdmin = res.data.data.articles.some(user => user.state === 0);
                    if (hasAdmin === true) {
                        this.state = 0
                    } else {
                        this.state = 1
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        },
        handleClick(value) {
            this.$router.push({
                name: 'ArticleShow',
                params: {id: value.id},
            });
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
        changeAllState() {
            // if (!confirm("상태를 변경하시겠습니까?")) return false
            // const item = this.items.map(e=>e.id)

            const articleIds = this.checked.filter(chk => chk !== false);
            console.log(articleIds);
            if (!articleIds) {
                alert('게시물을 선택해 주세요.')
            }
            const data = {
                article_ids: articleIds,
                state: this.state
            }

            this.axios.put('api/v1/articles', data).then(res => {
                this.getData();
                console.log(res);
            }).catch(err => {
                console.error(err);
            });
        },
        selectAll() {
            if (this.selected) {
                this.checked = this.items.map(v => v.id);
            } else {
                this.checked = [];
            }
        },
        data_search() {
            this.getData(this.media_id);
            this.page = 1;
        },
        media_ids(media) {
            this.getData(media);
            this.media_id = media;
            this.page = 1;
            this.search = '';
        },
    }
}
</script>

<style scoped>
.row-pointer :hover {
    cursor: pointer;
}
</style>