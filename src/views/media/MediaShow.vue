<template>
    <v-container fluid>
        <Breadcrumbs :breadcrumbs="breadcrumbs"/>
        <MediaSelectBox @medias="medias"/>
        <v-row>
            <v-col>
                <v-data-table
                    :headers="keyword_headers"
                    :items="keywords"
                    sort-by="calories"
                    class="elevation-1"
                >

                    <template v-slot:item.state="{ item }">
                        <v-switch
                            v-model="item.state"
                            :true-value=1
                            :false-value=0
                            color="#E00051"
                            @change="changeState(item.id)"
                        ></v-switch>
                    </template>
                    <template v-slot:top>
                        <v-toolbar
                            flat
                        >
                            <v-toolbar-title>키워드</v-toolbar-title>
                            <v-divider
                                class="mx-4"
                                inset
                                vertical
                            ></v-divider>
                            <v-spacer></v-spacer>
                            <v-dialog
                                v-model="dialog"
                                max-width="500px"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                        color="primary"
                                        dark
                                        class="mb-2"
                                        v-bind="attrs"
                                        v-on="on"
                                    >
                                        키워드 추가
                                    </v-btn>
                                </template>
                                <v-card>
                                    <v-card-title>
                                        <span class="text-h5">{{ formTitle }}</span>
                                    </v-card-title>

                                    <v-card-text>
                                        <v-container>
                                            <v-row>
                                                <v-col
                                                >
                                                    <v-text-field
                                                        v-model="media_id"
                                                        label="미디어 아이디"
                                                        readonly
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col
                                                >
                                                    <v-text-field
                                                        v-model="editedItem.platform"
                                                        label="플랫폼"
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col
                                                >
                                                    <v-text-field
                                                        v-model="editedItem.keyword"
                                                        label="키워드"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col
                                                >
                                                    <v-text-field
                                                        v-model="editedItem.state"
                                                        label="사용여부(1:사용, 0:미사용)"
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-card-text>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn
                                            color="blue darken-1"
                                            text
                                            @click="close"
                                        >
                                            취소
                                        </v-btn>
                                        <v-btn
                                            color="blue darken-1"
                                            text
                                            @click="save"
                                        >
                                            저장
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                            <v-dialog v-model="dialogDelete" max-width="500px">
                                <v-card>
                                    <v-card-title class="text-h5">삭제 하시겠습니까?</v-card-title>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="blue darken-1" text @click="closeDelete">취소</v-btn>
                                        <v-btn color="blue darken-1" text @click="deleteItemConfirm">삭제</v-btn>
                                        <v-spacer></v-spacer>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-toolbar>
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <v-icon
                            small
                            class="mr-2"
                            @click="editItem(item)"
                        >
                            mdi-pencil
                        </v-icon>
                        <v-icon
                            small
                            @click="deleteItem(item)"
                        >
                            mdi-delete
                        </v-icon>
                    </template>
                </v-data-table>
            </v-col>
            <v-col>
                <v-data-table
                    :headers="channel_headers"
                    :items="channels"
                    sort-by="calories"
                    class="elevation-1"
                >
                    <template v-slot:item.state="{ item }">
                        <v-switch
                            v-model="item.state"
                            :true-value=1
                            :false-value=0
                            color="#E00051"
                            @change="changeChannelState(item.id)"
                        ></v-switch>
                    </template>
                    <template v-slot:top>
                        <v-toolbar
                            flat
                        >
                            <v-toolbar-title>채널</v-toolbar-title>
                            <v-divider
                                class="mx-4"
                                inset
                                vertical
                            ></v-divider>
                            <v-spacer></v-spacer>
                            <v-dialog
                                v-model="channelDialog"
                                max-width="500px"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                        color="primary"
                                        dark
                                        class="mb-2"
                                        v-bind="attrs"
                                        v-on="on"
                                    >
                                        채널 추가
                                    </v-btn>
                                </template>
                                <v-card>
                                    <v-card-title>
                                        <span class="text-h5">{{ channelFormTitle }}</span>
                                    </v-card-title>

                                    <v-card-text>
                                        <v-container>
                                            <v-row>
                                                <v-col
                                                >
                                                    <v-text-field
                                                        v-model="media_id"
                                                        label="미디어 아이디"
                                                        readonly
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col
                                                >
                                                    <v-text-field
                                                        v-model="channelEditedItem.platform"
                                                        label="플랫폼"
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col
                                                >
                                                    <v-text-field
                                                        v-model="channelEditedItem.channel"
                                                        label="채널"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col
                                                >
                                                    <v-text-field
                                                        v-model="channelEditedItem.name"
                                                        label="채널명"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col
                                                >
                                                    <v-text-field
                                                        v-model="channelEditedItem.state"
                                                        label="사용여부(1:사용, 0:미사용)"
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-card-text>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn
                                            color="blue darken-1"
                                            text
                                            @click="channelClose"
                                        >
                                            취소
                                        </v-btn>
                                        <v-btn
                                            color="blue darken-1"
                                            text
                                            @click="channelSave"
                                        >
                                            저장
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                            <v-dialog v-model="channelDialogDelete" max-width="500px">
                                <v-card>
                                    <v-card-title class="text-h5">삭제 하시겠습니까?</v-card-title>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="blue darken-1" text @click="channelCloseDelete">취소</v-btn>
                                        <v-btn color="blue darken-1" text @click="channelDeleteItemConfirm">삭제</v-btn>
                                        <v-spacer></v-spacer>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-toolbar>
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <v-icon
                            small
                            class="mr-2"
                            @click="channelEditItem(item)"
                        >
                            mdi-pencil
                        </v-icon>
                        <v-icon
                            small
                            @click="channelDeleteItem(item)"
                        >
                            mdi-delete
                        </v-icon>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import Breadcrumbs from "../../components/Breadcrumbs";
import MediaSelectBox from "../../components/MediaSelectBox";

export default {
    components: {
        Breadcrumbs,
        MediaSelectBox
    },
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? '키워드 추가' : '키워드 수정'
        },
        channelFormTitle() {
            return this.channelEditedIndex === -1 ? '채널 추가' : '채널 수정'
        }
    },
    watch: {
        dialog(val) {
            val || this.close()
        },
        channelDialog(val) {
            val || this.channelClose()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
        channelDialogDelete(val) {
            val || this.channelCloseDelete()
        },
    },
    data: () => ({
        loading: false,
        breadcrumbs: [
            {
                text: '키워드 및 채널 관리',
                disabled: false,
                href: '/',
            },
        ],
        dialog: false,
        channelDialog: false,
        dialogDelete: false,
        channelDialogDelete: false,
        editedIndex: -1,
        channelEditedIndex: -1,
        editedItem: {
            media_id: 0,
            platform: '',
            keyword: '',
            state: '',
        },
        defaultItem: {
            media_id: '',
            platform: '',
            keyword: '',
            state: '',
        },
        channelEditedItem: {
            media_id: 0,
            platform: '',
            channel: '',
            name: '',
            state: '',
        },
        channelDefaultItem: {
            media_id: '',
            platform: '',
            channel: '',
            name: '',
            state: '',
        },
        keyword_headers: [
            {text: 'NO.', value: 'no', filterable: false, sortable: false},
            {text: '플랫폼', value: 'platform', sortable: false},
            {text: '키워드', value: 'keyword', sortable: false},
            {text: '사용여부', value: 'state', sortable: false},
            {text: '수정', value: 'actions', sortable: false},

        ],
        channel_headers: [
            {text: 'NO.', value: 'no', filterable: false, sortable: false},
            {text: '플랫폼', value: 'platform', sortable: false},
            {text: '채널', value: 'channel', sortable: false},
            {text: '이름', value: 'name', sortable: false},
            {text: '사용여부', value: 'state', sortable: false},
            {text: '수정', value: 'actions', sortable: false},
        ],
        keywords: [],
        channels: [],
        items: [],
        media_id: 1,
    }),
    mounted() {
        this.medias();
    },
    methods: {
        getData(media) {
            let media_id = 1;
            if (typeof media === "undefined") {
                media_id = 1;
            } else {
                media_id = media
            }
            let keywords = [];
            let channels = [];
            this.loading = true
            this.axios.get('api/v1/medias/' + media_id)
                .then(res => {
                    console.log(res.data.data.channels);
                    if (res.data.data.keywords.length > 0) {
                        res.data.data.keywords.map((item, index) => {
                            keywords.push({
                                no: index + 1,
                                id: item.id,
                                media_id: item.media_id,
                                platform: item.platform,
                                keyword: item.keyword,
                                state: item.state,
                            })
                        })
                    }
                    if (res.data.data.channels.length > 0) {
                        res.data.data.channels.map((item, index) => {
                            channels.push({
                                no: index + 1,
                                id: item.id,
                                media_id: item.media_id,
                                platform: item.platform,
                                channel: item.channel,
                                name: item.name,
                                state: item.state,
                            })
                        })
                    }
                    this.keywords = keywords;
                    this.channels = channels;
                    this.media_id = media_id;
                    this.loading = false;
                })
                .catch(err => {
                    console.error(err);
                });
        },

        editItem(item) {
            this.editedIndex = this.keywords.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        channelEditItem(item) {
            this.channelEditedIndex = this.channels.indexOf(item)
            this.channelEditedItem = Object.assign({}, item)
            this.channelDialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.keywords.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        channelDeleteItem(item) {
            this.channelEditedIndex = this.channels.indexOf(item)
            this.channelEditedItem = Object.assign({}, item)
            this.channelDialogDelete = true
        },

        deleteItemConfirm() {
            this.keywords.splice(this.editedIndex, 1)
            this.closeDelete()
        },

        channelDeleteItemConfirm() {
            this.channels.splice(this.channelEditedIndex, 1)
            this.channelCloseDelete()
        },

        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        channelClose() {
            this.channelDialog = false
            this.$nextTick(() => {
                this.channelEditedItem = Object.assign({}, this.channelDefaultItem)
                this.channelEditedIndex = -1
            })
        },

        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        channelCloseDelete() {
            this.channelDialogDelete = false
            this.$nextTick(() => {
                this.channelEditedItem = Object.assign({}, this.channelDefaultItem)
                this.channelEditedIndex = -1
            })
        },

        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.keywords[this.editedIndex], this.editedItem)
                const data = {
                    media_id: this.media_id,
                    platform: this.editedItem.platform,
                    keyword: this.editedItem.keyword,
                    state: this.editedItem.state
                };
                this.axios.put('api/v1/keywords/' + this.editedItem.id, data).then(res => {
                    this.medias(res.data.data.media_id);
                }).catch(err => {
                    console.error(err);
                });
            } else {
                this.keywords.push(this.editedItem)
                const data = {
                    media_id: this.media_id,
                    platform: this.editedItem.platform,
                    keyword: this.editedItem.keyword,
                    state: this.editedItem.state
                };
                this.axios.post('api/v1/keywords', data).then(res => {
                    this.medias(res.data.data.media_id);
                }).catch(err => {
                    console.error(err);
                });
            }
            this.close()
        },
        channelSave() {
            if (this.channelEditedIndex > -1) {
                Object.assign(this.channels[this.channelEditedIndex], this.channelEditedItem)
                const data = {
                    media_id: this.media_id,
                    platform: this.channelEditedItem.platform,
                    channel: this.channelEditedItem.channel,
                    name: this.channelEditedItem.name,
                    state: this.channelEditedItem.state
                };
                this.axios.put('api/v1/channels/' + this.channelEditedItem.id, data).then(res => {
                    this.medias(res.data.data.media_id);
                }).catch(err => {
                    console.error(err);
                });
            } else {
                this.channels.push(this.channelEditedItem)
                const data = {
                    media_id: this.media_id,
                    platform: this.channelEditedItem.platform,
                    channel: this.channelEditedItem.channel,
                    name: this.channelEditedItem.name,
                    state: this.channelEditedItem.state
                };
                this.axios.post('api/v1/channels', data).then(res => {
                    this.medias(res.data.data.media_id);
                }).catch(err => {
                    console.error(err);
                });
            }
            this.channelClose();
        },
        medias(media) {
            this.getData(media);
        },
        changeState(id) {
            const item = this.keywords.filter(item => item.id === id)[0];
            const data = {
                media_id: item.media_id,
                platform: item.platform,
                keyword: item.keyword,
                state: item.state
            };
            this.axios.put('api/v1/keywords/' + id, data).then(res => {
                this.medias(res.data.data.media_id);
            }).catch(err => {
                console.error(err);
            });
        },
        changeChannelState(id) {
            const item = this.channels.filter(item => item.id === id)[0];
            const data = {
                media_id: item.media_id,
                platform: item.platform,
                channel: item.channel,
                name: item.name,
                state: item.state
            };
            this.axios.put('api/v1/channels/' + id, data).then(res => {
                this.medias(res.data.data.media_id);
            }).catch(err => {
                console.error(err);
            });
        }
    }
}
</script>

<style scoped>

</style>


