<template>
    <v-container fluid>
        <Breadcrumbs :breadcrumbs="breadcrumbs"/>
        <v-card-title>
            <v-row>
                <v-col>
                    <v-text-field
                        v-model="name"
                        prepend-icon="mdi-view-list"
                        readonly
                    ></v-text-field>
                </v-col>
            </v-row>
        </v-card-title>
        <v-data-table
            :headers="headers"
            :items="items"
            sort-by="calories"
            class="elevation-1"
        >
            <template v-slot:item.state="{ item }">
                <v-switch
                    v-model="item.state"
                    :true-value=1
                    :false-value=0
                    @change="changeState(item.id)"
                ></v-switch>
            </template>
            <template v-slot:top>
                <v-toolbar
                    flat
                >
                    <v-toolbar-title>플랫폼 계정정보</v-toolbar-title>
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
                                플랫폼 계정 추가
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
                                                v-model="editedItem.login_id"
                                                label="아이디"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col
                                        >
                                            <v-text-field
                                                v-model="editedItem.login_password"
                                                label="비밀번호"
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col
                                        >
                                            <v-text-field
                                                v-model="platform_id"
                                                label="플랫폼 아이디"
                                                readonly
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
    </v-container>
</template>

<script>
import Breadcrumbs from "../../components/Breadcrumbs";
export default {
    components: {
        Breadcrumbs
    },
    data() {
        return {
            loading: false,
            breadcrumbs: [
                {
                    text: '플랫폼 관리',
                    disabled: false,
                    href: '/platform',
                },
                {
                    text: '플랫폼 상세보기',
                    disabled: false,
                    href: '/platform/' + this.$route.params.id,
                },
            ],
            headers: [
                {text: 'NO.', value: 'no', filterable: false, sortable: false},
                {text: '아이디', value: 'login_id', sortable: false},
                {text: '비밀번호', value: 'login_password', sortable: false},
                {text: '사용여부', value: 'state', sortable: false, filterable: false},
                {text: '수정/삭제', value: 'actions', sortable: false},

            ],
            items: [],
            name: '',
            selected: [],
            dialog: false,
            dialogDelete: false,
            editedIndex: -1,
            editedItem: {
                platform_id: 0,
                login_id: '',
                login_password: '',
                state: 0,
            },
            defaultItem: {
                platform_id: 0,
                login_id: '',
                login_password: '',
                state: 0,
            },
            platform_id: '',
        }
    },

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? '플랫폼 추가' : '플랫폼 수정'
        },
    },

    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },

    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            let result = [];
            this.loading = true
            this.axios.get('api/v1/platforms/' + this.$route.params.id)
                .then(res => {
                    if (res.data.data.platform_accounts.length > 0) {
                        res.data.data.platform_accounts.map((item, index) => {
                            result.push({
                                no: index + 1,
                                id: item.id,
                                platform_id: item.platform_id,
                                login_id: item.login_id,
                                login_password: item.login_password,
                                state: item.state,
                            })
                        })
                    }
                    this.name = res.data.data.platform;
                    this.platform_id = res.data.data.id;
                    this.items = result;
                    this.loading = false
                })
                .catch(err => {
                    console.error(err);
                });
        },

        getColor(calories) {
            if (calories == 'OFF') return 'grey'
            if (calories == 'ON') return 'blue'
            else return 'green'
        },

        editItem(item) {
            this.editedIndex = this.items.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.items.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            this.items.splice(this.editedIndex, 1)
            this.closeDelete()
        },

        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.items[this.editedIndex], this.editedItem)
                const data = {
                    platform_id: this.platform_id,
                    login_id: this.editedItem.login_id,
                    login_password: this.editedItem.login_password,
                    state: this.editedItem.state
                };
                this.axios.put('api/v1/platform-accounts/' + this.editedItem.id, data).then(res => {
                    console.log(res);
                }).catch(err => {
                    console.error(err);
                });
            } else {
                this.items.push(this.editedItem)
                const data = {
                    platform_id: this.platform_id,
                    login_id: this.editedItem.login_id,
                    login_password: this.editedItem.login_password,
                    state: this.editedItem.state
                };
                this.axios.post('api/v1/platform-accounts', data).then(res => {
                    console.log(res);
                }).catch(err => {
                    console.error(err);
                });
            }
            this.getData();
            this.close()
        },
        changeState(id) {
            const item = this.items.filter(item => item.id === id)[0];
            const data = {
                platform_id: item.platform_id,
                login_id: item.login_id,
                login_password: item.login_password,
                state: item.state
            };
            this.axios.put('api/v1/platform-accounts/' + id, data).then(res => {
                console.log(res.data);
                this.getData();
            }).catch(err => {
                console.error(err);
            });
        },
    }
}
</script>

<style scoped>

</style>