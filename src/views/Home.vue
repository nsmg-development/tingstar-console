<template>
    <v-container fluid>
        <Breadcrumbs :breadcrumbs="breadcrumbs"/>
        <v-row>
            <v-col>
        <MediaSelectBox @medias="(mediaId)=>{
            this.mediaId = mediaId;
            this.page = 1;
            this.per_page = 36;
            this.platform = '';
            this.type = '';
            this.state = '';
            this.search = '';
            this.dateRanges[0] = '';
            this.dateRanges[1] = '';
            moveToPage();
        }"
        />
            </v-col>
        <v-icon class="mr-2 mb-6" @click="refresh">mdi-refresh</v-icon>
        </v-row>
        <div>
            <div>
                <v-row>
                    <v-col>
                        <v-menu
                            v-model="datepicker"
                        >
                            <template v-slot:activator="{ on }">
                                <v-btn
                                    v-on="on"
                                >
                                    <v-icon class="mr-1">mdi-calendar</v-icon>
                                    {{ dateRanges[0] }}
                                </v-btn>
                            </template>
                            <v-date-picker
                                v-model="dateRanges[0]"
                                no-title
                                locale="ko-kr"
                                changeMonth="true"
                            />
                        </v-menu>
                        ~
                        <v-menu
                            v-model="end_datepicker"
                        >
                            <template v-slot:activator="{ on }">
                                <v-btn
                                    v-on="on"
                                >
                                    <v-icon class="mr-1">mdi-calendar</v-icon>
                                    {{ dateRanges[1] }}
                                </v-btn>
                            </template>
                            <v-date-picker
                                v-model="dateRanges[1]"
                                no-title
                                locale="ko-kr"
                                changeMonth="true"
                            />
                        </v-menu>
                        <v-btn class="white--text ml-2" color="#0A0C0C" @click="date_search()"> 검색 </v-btn>
                    </v-col>
                    <v-select
                        :items="platform_items"
                        v-model="platform"
                        label="플랫폼"
                        item-text="platform"
                        item-value="value"
                        @change="platformChange(platform)"
                        style="width: 200px"
                    ></v-select>
                    <v-select
                        :items="type_items"
                        v-model="type"
                        label="타입"
                        item-text="type"
                        item-value="value"
                        @change="typeChange(type)"
                        style="width: 200px"
                        class="mr-3"
                    ></v-select>
                </v-row>
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
                        ></v-switch>
                    </v-col>
                    <v-select
                        :items="state_items"
                        v-model="article_state"
                        label="노출상태"
                        item-text="state"
                        item-value="value"
                        @change="stateChange(article_state)"
                        style="width: 200px"
                    ></v-select>
                    <v-text-field
                        label="검색"
                        append-icon="search"
                        v-model="search"
                        @keyup.native.enter="data_search()"
                        class="mr-3"
                        style="width: 200px"
                    ></v-text-field>
                </v-row>
            </div>
            <v-row
                v-if="this.items.length === 0"
                justify="center" align="center"
            >
                데이터가 존재하지 않습니다.
            </v-row>
            <v-row v-else>
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
            platform_items: [
                {platform: '전체', value: ''},
                {platform: '인스타그램', value: 'instagram'},
                {platform: '유튜브', value: 'youtube'},
                {platform: '네이버블로그', value: 'naver-blog'},
                {platform: '트위터', value: 'twitter'},
            ],
            type_items: [
                {type: '전체', value: ''},
                {type: '키워드', value: 'keyword'},
                {type: '채널', value: 'channel'},
            ],
            state_items: [
                {state: '전체', value: ''},
                {state: '게시', value: 1},
                {state: '미게시', value: 0},
            ],
            page: 1,
            per_page: 36,
            last_page: 1,
            color: '',
            selected: false,
            checked: [],
            count: 0,
            search: '',
            mediaId: null,
            state: 0,
            platform: '',
            type: '',
            article_state: '',
            datepicker: false,
            end_datepicker: false,
            date: '',
            end_date: '',
            dateRanges: [],
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
        dateRanges: {
            handler() {
                if (this.dateRanges[0] > this.dateRanges[1]) {
                    this.dateRanges.reverse()
                }
            }
        }
    },
    mounted() {
        this.checkPage();
        this.checkMedia();
        if (this.$route.query.search) {
            this.search = this.$route.query.search;
        }
        if (this.$route.query.state) {
            this.article_state = parseInt(this.$route.query.state);
        }
        if (this.$route.query.platform) {
            this.platform = this.$route.query.platform;
        }
        if (this.$route.query.type) {
            this.type = this.$route.query.type;
        }

        if(this.$route.query.start_date || this.$route.query.end_date) {
            this.dateRanges[0] = this.$route.query.start_date;
            this.dateRanges[1] = this.$route.query.end_date;
        }

        this.getData();
        console.log(this.$route.query);
    },
    methods: {
        checkPage() {
            const page = this.$route.query?.page || null;
            if (page) {
                this.page = parseInt(page);
            } else {
                this.page = 1;
                this.moveToPage();
            }
        },
        checkMedia() {
            const mediaId = this.$route.query?.media_id || null;
            if (mediaId) {
                this.mediaId = parseInt(mediaId);
            } else {
                this.mediaId = 1;
                this.moveToPage();
            }
        },
        moveToPage() {
            window.location.href = `?page=${this.page}&per_page=${this.per_page}&media_id=${this.mediaId}&state=${this.article_state}&platform=${this.platform}&type=${this.type}&search=${this.search}&start_date=${this.dateRanges[0] ?? ''}&end_date=${this.dateRanges[1] ?? ''}`;
        },
        getData() {
            let result = [];
            let img = '';
            let url = 'https://chuncheon.blob.core.windows.net/chuncheon/';
            this.loading = true
            this.axios.get('api/v1/admin/articles', {
                params: {
                    'page': this.page,
                    'per_page': this.per_page,
                    'media_id': this.mediaId,
                    'state': this.article_state ?? '',
                    'type': this.type ? this.type : '',
                    'search': this.search ? '#' + this.search : '',
                    'platform': this.platform ? '#' + this.platform : '',
                    'start_date': this.dateRanges ?  this.dateRanges[0] : '',
                    'end_date': this.dateRanges ? this.dateRanges[1] : '',
                }
            })
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
                    if (Number.isInteger(res.data.data.totalCount / this.per_page) == false) {
                        this.last_page = Math.floor(res.data.data.totalCount / this.per_page) + 1;
                    } else {
                        this.last_page = res.data.data.totalCount / this.per_page
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
                    if (this.items.length === 0) {
                        this.state = 0;
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
            this.moveToPage();
        },
        platformChange() {
            this.page = 1;
            this.moveToPage()
        },
        typeChange() {
            this.page = 1;
            this.moveToPage();
        },
        stateChange() {
            this.page = 1;
            this.moveToPage();
        },
        refresh() {
            this.mediaId = 1;
            this.page = 1;
            this.per_page = 36;
            this.platform = '';
            this.type = '';
            this.state = '';
            this.search = '';
            this.dateRanges[0] = '';
            this.dateRanges[1] = '';
            this.moveToPage();
        },
        date_search() {
            this.moveToPage();
        }
    }
}
</script>

<style scoped>
.row-pointer :hover {
    cursor: pointer;
}
</style>