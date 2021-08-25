<template>
    <v-container fluid>
        <Breadcrumbs :breadcrumbs="breadcrumbs"/>
        <v-card class="mb-5">
            <v-icon large color="#E00051">mdi-clipboard-text</v-icon>
            <v-card-title>
                <v-row>
                    <v-col>
                        <v-text-field
                            v-model="type"
                            label="키워드/채널"
                            readonly
                            persistent-hint
                            filled
                        ></v-text-field>
                        <v-text-field
                            v-model="keyword"
                            label="키워드"
                            readonly
                            persistent-hint
                            filled
                        ></v-text-field>
                        <v-text-field
                            v-model="title"
                            label="제목"
                            readonly
                            persistent-hint
                            filled
                        ></v-text-field>
                        <v-textarea
                            :value="contents"
                            label="내용"
                            height="142"
                            rows="4"
                            readonly
                            persistent-hint
                            filled
                        ></v-textarea>
                        <v-text-field
                            v-model="date"
                            label="게시 날짜"
                            readonly
                            persistent-hint
                            filled
                        ></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field
                            v-model="platform"
                            label="플랫폼"
                            readonly
                            persistent-hint
                            filled
                        ></v-text-field>
                        <v-text-field
                            v-model="channel"
                            label="채널"
                            readonly
                            persistent-hint
                            filled
                        ></v-text-field>
                        <v-text-field
                            v-model="url"
                            label="원본 URL"
                            readonly
                            persistent-hint
                            filled
                        ></v-text-field>
                        <v-text-field
                            v-model="thumbnail"
                            label="원본 썸네일 URL"
                            readonly
                            persistent-hint
                            filled
                        ></v-text-field>
                        <v-text-field
                            v-model="storage_thumbnail"
                            label="스토리지 썸네일 URL"
                            readonly
                            persistent-hint
                            filled
                        ></v-text-field>
                        <v-row no-gutters>
                            <v-text-field
                                v-model="width"
                                label="썸네일 넓이"
                                readonly
                                persistent-hint
                                filled
                            ></v-text-field>
                            <v-text-field
                                v-model="height"
                                label="썸네일 높이"
                                readonly
                                persistent-hint
                                filled
                            ></v-text-field>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card-title>
        </v-card>
        <v-card class="mb-5">
            <v-data-table
                :headers="owner_headers"
                :items="owners"
                sort-by="calories"
                class="elevation-1"
            >
                <template v-slot:top>
                    <v-toolbar
                        flat
                    >
                        <v-toolbar-title><v-icon large color="#E00051">mdi-account</v-icon></v-toolbar-title>
                        <v-divider
                            class="mx-4"
                            inset
                            vertical
                        ></v-divider>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                </template>
            </v-data-table>
        </v-card>
        <v-card class="mb-5">
            <v-data-table
                :headers="media_headers"
                :items="medias"
                sort-by="calories"
                class="elevation-1"
            >
                <template v-slot:top>
                    <v-toolbar
                        flat
                    >
                        <v-toolbar-title><v-icon large color="#E00051">mdi-file</v-icon></v-toolbar-title>
                        <v-divider
                            class="mx-4"
                            inset
                            vertical
                        ></v-divider>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                </template>
            </v-data-table>
        </v-card>
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
            owner_headers: [
                {text: '플랫폼', value: 'platform', sortable: false},
                {text: '타입', value: 'type', sortable: false},
                {text: '키워드', value: 'keyword', sortable: false},
                {text: '채널', value: 'channel', sortable: false},
                {text: '원본 URL', value: 'url', sortable: false},
                {text: '게시 날짜', value: 'date', sortable: false},
            ],
            media_headers: [
                {text: '타입', value: 'type', sortable: false},
                {text: '원본 URL', value: 'url', sortable: false},
                {text: '스토리지 URL', value: 'storage_url', sortable: false},
                {text: '넓이', value: 'width', sortable: false},
                {text: '높이', value: 'height', sortable: false},
            ],
            owners: [],
            medias: [],
            keyword: '',
            channel: '',
            title: '',
            contents: '',
            platform: '',
            type: '',
            url: '',
            date: '',
            thumbnail: '',
            storage_thumbnail: '',
            width: 0,
            height: 0,
        }
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            let result = [];
            this.loading = true
            this.axios.get('api/v1/articles/' + this.$route.params.id)
                .then(res => {
                    if (res.data.data.article_medias.length > 0) {
                        res.data.data.article_medias.map((item, index) => {
                            result.push({
                                no: index + 1,
                                id: item.id,
                                type: item.type,
                                url: item.url,
                                storage_url: item.storage_url,
                                width: item.width,
                                height: item.height
                            })
                        })
                    }
                    this.medias = result;
                    this.keyword = res.data.data.keyword;
                    this.channel = res.data.data.channel;
                    this.title = res.data.data.title;
                    this.contents = res.data.data.contents;
                    this.platform = res.data.data.platform;
                    this.type = res.data.data.type;
                    this.url = res.data.data.url;
                    this.date = res.data.data.date;
                    this.thumbnail = res.data.data.thumbnail_url;
                    this.storage_thumbnail = res.data.data.storage_thumbnail_url;
                    this.width = res.data.data.thumbnail_width;
                    this.height = res.data.data.thumbnail_height;
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