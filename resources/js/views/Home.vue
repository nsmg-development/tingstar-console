<template>
    <v-container fluid>
        <v-breadcrumbs
            :items="breadcrumbs"
        />
        <v-card class="mb-5">
            <v-card-title>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                ></v-text-field>
                <i class="mdi mdi-delete" @click="destroy()"></i>
            </v-card-title>
        </v-card>
        <v-data-table
            :headers="headers"
            :items="items"
            item-key="id"
            show-select
            class="elevation-1"
            :search="search"
            v-model="selected"
            :loading="loading"
            loading-text="로딩중 기다려주세요."
        >
            <template v-slot:item.state="{ item }">
                <v-switch
                    v-model="item.state"
                    true-value="1"
                    false-value="0"
                    @change="changeState(item.id)"
                    v-on:click.stop
                ></v-switch>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            loading: false,
            headers: [
                {text: 'NO.', value: 'no', filterable: false},
                {text: '타입', value: 'type', filterable: false},
                {text: '키워드', value: 'keyword', filterable: false},
                {text: '채널', value: 'channel', filterable: false},
                {text: '원본 URL', value: 'url', sortable: false},
                {text: '게시글 시간', value: 'date', filterable: false},
                {text: 'ON/OFF', value: 'state', filterable: false},
            ],
            breadcrumbs: [
                {
                    text: '인스타그램',
                    disabled: false,
                    href: '/',
                },
            ],
            search: '',
            selected: [],
            items: [],
        }
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            this.loading = true

            return axios({
                url: 'v1/instagram',
                method: 'GET',
            })
                .then(res => {
                    let data = [];
                    if (res.data.data.data.length > 0) {
                        res.data.data.data.map((item, index) => {
                            data.push({
                                no: index + 1,
                                id: item.id,
                                type: item.type,
                                keyword: item.keyword,
                                channel: item.channel,
                                url: item.url,
                                date: item.date,
                                state: item.state,
                            })
                        })
                    }
                    this.items = data;
                    this.count = this.items.length;
                    this.loading = false
                })
        },
        destroy() {
            if (!confirm("정말 삭제하시겠습니까?")) return false
            this.selected.forEach(function (event) {
                return axios({
                    url: 'v1/article/' + event.id,
                    method: 'DELETE',
                })
                    .then(res => {
                        location.reload();
                    })
            });
        },
        changeState(id) {
            const item = this.items.filter(item => item.id === id)[0];
            axios({
                url: `v1/state-update/${item.id}`,
                method: 'PUT',
                data: item
            })
                .then(res => {
                    this.getData();
                })
        }
    }
}
</script>

<style scoped>

</style>
