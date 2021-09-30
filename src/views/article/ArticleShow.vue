<template>
    <v-container fluid>
        <Breadcrumbs :breadcrumbs="breadcrumbs"/>
        <v-card class="mb-5">
            <v-icon large color="#E00051" class="ml-3">mdi-clipboard-text</v-icon> 상세정보
            <v-card-title>
                <v-row>
                    <v-col>
                        <v-row no-gutters>
                            <v-text-field
                                :value="detail.type"
                                label="키워드/채널"
                                readonly
                                persistent-hint
                                filled
                            ></v-text-field>
                            <v-text-field
                                v-model="detail.platform"
                                label="플랫폼"
                                readonly
                                persistent-hint
                                filled
                            ></v-text-field>
                        </v-row>
                        <v-text-field
                            v-model="detail.keyword"
                            label="키워드"
                            readonly
                            persistent-hint
                            filled
                        ></v-text-field>
                        <v-text-field
                            v-model="detail.title"
                            label="제목"
                            readonly
                            persistent-hint
                            filled
                        ></v-text-field>
                        <v-textarea
                            :value="detail.contents"
                            label="내용"
                            height="142"
                            rows="4"
                            readonly
                            persistent-hint
                            filled
                        ></v-textarea>
                        <v-text-field
                            v-model="detail.date"
                            label="게시 날짜"
                            readonly
                            persistent-hint
                            filled
                        ></v-text-field>
                    </v-col>
                    <v-col>
                        <!--                        <v-combobox-->
                        <!--                            v-model="tags"-->
                        <!--                            chips-->
                        <!--                            multiple-->
                        <!--                            filled-->
                        <!--                            readonly-->
                        <!--                            :#allow-overflow="false"-->
                        <!--                        >-->
                        <!--                            <template v-slot:selection="{ item }">-->
                        <!--                                <v-chip-->
                        <!--                                    small-->
                        <!--                                >-->
                        <!--                                    {{ item }}-->
                        <!--                                </v-chip>-->
                        <!--                            </template>-->
                        <!--                        </v-combobox>-->
                        <v-text-field
                            v-model="tags"
                            label="해시태그"
                            readonly
                            persistent-hint
                            filled
                        ></v-text-field>
                        <v-text-field
                            v-model="detail.channel"
                            label="채널"
                            readonly
                            persistent-hint
                            filled
                        ></v-text-field>
                        <v-text-field
                            v-model="detail.url"
                            label="URL"
                            readonly
                            persistent-hint
                            filled
                        ></v-text-field>
                        <v-text-field
                            v-model="detail.thumbnail_url"
                            label="썸네일 URL"
                            readonly
                            persistent-hint
                            filled
                        ></v-text-field>
                        <v-text-field
                            v-model="detail.storage_thumbnail_url"
                            label="스토리지 썸네일 URL"
                            readonly
                            persistent-hint
                            filled
                        ></v-text-field>
                        <v-row no-gutters>
                            <v-text-field
                                v-model="detail.thumbnail_width"
                                label="썸네일 넓이"
                                readonly
                                persistent-hint
                                filled
                            ></v-text-field>
                            <v-text-field
                                v-model="detail.thumbnail_height"
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
            <v-icon large color="#E00051" class="ml-3">mdi-account</v-icon> 게시자 정보
            <v-card-title>
                <v-row>
                    <v-col>
                        <v-text-field
                            v-model="owner.id"
                            label="게시자 아이디"
                            readonly
                            persistent-hint
                            filled
                        ></v-text-field>
                        <v-text-field
                            v-model="owner.url"
                            label="URL"
                            readonly
                            persistent-hint
                            filled
                        ></v-text-field>
                        <v-text-field
                            v-model="owner.thumbnail_url"
                            label="썸네일 URL"
                            readonly
                            persistent-hint
                            filled
                        ></v-text-field>
                        <v-text-field
                            v-model="owner.storage_thumbnail_url"
                            label="스토리지 썸네일 URL"
                            readonly
                            persistent-hint
                            filled
                        ></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field
                            v-model="owner.name"
                            label="게시자 이름"
                            readonly
                            persistent-hint
                            filled
                        ></v-text-field>
                        <v-text-field
                            v-model="owner.platform"
                            label="플랫폼"
                            readonly
                            persistent-hint
                            filled
                        ></v-text-field>
                        <v-text-field
                            v-model="owner.thumbnail_width"
                            label="썸네일 넓이"
                            readonly
                            persistent-hint
                            filled
                        ></v-text-field>
                        <v-text-field
                            v-model="owner.thumbnail_height"
                            label="썸네일 높이"
                            readonly
                            persistent-hint
                            filled
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-card-title>
        </v-card>
        <v-card class="mb-5">
            <v-data-table
                :headers="headers"
                :items="items"
                sort-by="calories"
                class="elevation-1"
            >
                <template v-slot:item.storage_url="{ item }">
                    <img :src="item.storage_url" style="width: 60px; height: 60px" class="mt-2" v-if="item.storage_url"/>
                </template>
                <template v-slot:top>
                    <v-toolbar
                        flat
                    >
                        <v-toolbar-title>
                            <v-icon large color="#E00051">mdi-file</v-icon> 미디어
                        </v-toolbar-title>
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

export default {
    components: {
        Breadcrumbs,
    },
    data() {
        return {
            loading: false,
            breadcrumbs: [
                {

                    text: '수집정보 리스트 (뒤로가기)',
                    disabled: false,
                    link: true,
                    exact: true,
                    to: {
                        name: 'Home',
                        params: {
                            page: this.$route.query.page,
                            search: this.$route.query.search
                        }
                    }
                },

                {
                    text: '수집정보 상세보기',
                    disabled: false,
                    href: '/' + this.$route.params.id,
                },
            ],
            headers: [
                {text: '타입', value: 'type', sortable: false},
                {text: '스토리지 이미지', value: 'storage_url', sortable: false},
                {text: 'URL', value: 'url', sortable: false},
                {text: '넓이', value: 'width', sortable: false},
                {text: '높이', value: 'height', sortable: false},
            ],
            items: [],
            detail: [],
            owner: [],
            tags: [],
        }
    },
    mounted() {
        this.getData();
        console.log(this.$route.query);
    },
    methods: {
        getData() {
            let url = 'https://chuncheon.blob.core.windows.net/chuncheon/';
            this.loading = true
            this.axios.get('api/v1/articles/' + this.$route.params.id)
                .then(res => {
                    if (res.data.data.article_medias.length > 0) {
                        this.items = res.data.data.article_medias.map((item, index) => {
                            return {
                                no: index + 1,
                                id: item.article_id,
                                type: item.type,
                                url: item.url,
                                storage_url: item.storage_url ? url + item.storage_url : '',
                                width: item.width,
                                height: item.height
                            }
                        })
                    }
                    this.detail = res.data.data;
                    this.owner = res.data.data.article_owner ?? '';
                    const str = this.detail.hashtag;
                    if (str) {
                        const arr = str.split(' ', -1);
                        this.tags = arr;
                    } else {
                        this.tags = '';
                    }

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