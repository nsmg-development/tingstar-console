<template>
    <v-container fluid>
        <Breadcrumbs :breadcrumbs="breadcrumbs"/>
        <v-card width="500">
            <Datatable
                :headers="headers"
                :items="items"
                :loading="loading"
                @handleClick="handleClick"
            ></Datatable>
        </v-card>
    </v-container>
</template>

<script>
import Breadcrumbs from "../../components/Breadcrumbs";
import Datatable from "../../components/Datatable";

export default {
    components: {
        Breadcrumbs,
        Datatable,
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
            ],
            headers: [
                {text: 'NO.', value: 'no', filterable: false},
                {text: '플랫폼', value: 'platform', sortable: false},
            ],
            items: [],
        }
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            let result = [];
            this.loading = true
            this.axios.get('api/v1/platforms')
                .then(res => {
                    if (res.data.data.platforms.length > 0) {
                        res.data.data.platforms.map((item, index) => {
                            result.push({
                                no: index + 1,
                                id: item.id,
                                platform: item.platform,
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
            this.$router.push({name: 'PlatformShow', params: {id: value.id}});
        }
    }
}
</script>

<style scoped>
.row-pointer >>> tbody tr :hover {
    cursor: pointer;
}
</style>