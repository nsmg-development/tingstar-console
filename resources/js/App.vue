<template>
    <v-app>
        <v-navigation-drawer
            v-model="drawer"
            v-if="token"
            color="primary"
            dark
            app
            clipped
        >
            <v-list
                nav
                dense
            >
                <v-list-item-group>
                    <v-list subheader>
                        <template
                            v-for="(item, i) in items"
                        >
                            <v-subheader v-if="item.subheader">{{ item.subheader }}</v-subheader>
                            <v-list-item
                                v-for="(menu, i2) in item.menus"
                                :key="menu.id"
                                link
                                :to="menu.link"
                                active-class="white--text"
                                exact
                            >
                                <v-list-item-icon>
                                    <v-icon>{{ menu.icon }}</v-icon>
                                </v-list-item-icon>

                                <v-list-item-content>
                                    <v-list-item-title>{{menu.text}}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-divider/>
                        </template>
                    </v-list>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar
            v-if="token"
            color="primary"
            app
            clipped-left
            dark
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
            <v-toolbar-title @click="">
                Curator
            </v-toolbar-title>
            <v-spacer/>
            <v-menu
                offset-y
            >
                <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                        <v-icon>mdi-account</v-icon>
                    </v-btn>
                </template>

                <v-list dense>
                    <v-list-item>
                        <v-list-item-avatar color="primary" size="48">
                            <span class="white--text headline">
                                관리
                            </span>
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title class="title">{{ name }}님</v-list-item-title>
                            <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>

                    <v-divider class="my-2"/>

                    <v-list-item @click="logout">
                        <v-list-item-icon>
                            <v-icon>mdi-logout</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>로그아웃</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>
        <v-main>
            <router-view/>
        </v-main>
    </v-app>
</template>

<script>
export default {
    data() {
        return {
            token: '',
            id: '',
            name: '',
            email: '',
            drawer: null,
            items: [
                {
                    subheader: '관리',
                    menus: [
                        {icon: "mdi-instagram", text: "인스타그램", link: "/"},
                    ]
                },
                {
                    menus: [
                        {icon: "mdi-youtube", text: "유튜브", link: "/youtube"},
                    ]
                },
            ],
        }
    },
    mounted() {
        this.token = localStorage.getItem('token');
        this.id = localStorage.getItem('id');
        this.getData();
    },
    methods: {
        getData() {
            this.loading = true

            return axios({
                url: '/v1/me/' + this.id,
                method: 'GET',
            })
                .then(res => {
                    this.name = res.data.name;
                    this.email = res.data.email;
                })
        },
        logout() {
            axios({
                method: 'POST',
                url: '/v1/logout',
                headers: {
                    'Authorization': 'Bearer ' + this.token,
                },
            })
                .then(res => {
                    localStorage.removeItem('user')
                    localStorage.clear();
                    location.href = "/";
                })
        }
    }
}
</script>

<style scoped>

</style>
