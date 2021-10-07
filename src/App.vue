<template>
    <v-app style="background-color:rgba(244,244,244,1)">
        <v-navigation-drawer
            v-model="drawer"
            color="primary"
            dark
            app
            clipped
            v-if="authenticated"
        >
            <v-list
                nav
                dense
            >
                <v-list-item-group>
                    <v-list subheader>
                        <template
                            v-for="(item) in items"
                        >
                            <v-list-item
                                v-for="(menu) in item.menus"
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
                                    <v-list-item-title>{{ menu.text }}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </template>
                    </v-list>
                </v-list-item-group>
                <ListGroup :items="settings"></ListGroup>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar
            color="primary"
            app
            clipped-left
            dark
            v-if="authenticated"
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
            <v-toolbar-title>
                TingStar Console
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
<!--                                {{ user.name.slice(0, 2) }}-->
                                관리
                            </span>
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <!--                            <v-list-item-title class="title">{{ user.name }} 님</v-list-item-title>-->
                            <v-list-item-title class="title">{{ name }}님</v-list-item-title>
                            <!--                            <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>-->
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

import ListGroup from "./components/ListGroup";
import {mapGetters, mapActions} from 'vuex'

export default {
    components: {
        ListGroup
    },
    data() {
        return {
            name: '',
            state: '',
            email: '',
            drawer: null,
            items: [
                {
                    subheader: '관리',
                    menus: [
                        {icon: "mdi-view-dashboard", text: "수집 정보 리스트", link: "/", params: {
                                'page': this.page,
                                'per_page': this.per_page,
                                'media_id': this.mediaId,
                                'state': 1,
                                'type': this.type ? this.type : '',
                                'search': this.search ? '#' + this.search : '',
                                'platform': this.platform ? '#' + this.platform : '',
                                'start_date': this.dateRanges ? this.dateRanges[0] : '',
                                'end_date': this.dateRanges ? this.dateRanges[1] : '',
                            }},
                        {icon: "mdi-format-list-bulleted", text: "게시 정보 리스트", link: "/article"},
                    ]
                },
            ],
            settings: [
                {
                    action: 'mdi-cog',
                    item: [
                        {title: '플랫폼 관리', link: "/platform"},
                        {title: '키워드 및 채널 관리', link: "/media"},
                    ],
                    title: '설정',
                },
            ],
            menu: [],
        }
    },
    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated',
            errors: 'errors',
        }),
    },
    mounted() {
        this.token = localStorage.getItem('token');
    },
    methods: {
        ...mapActions({
            logoutAction: 'auth/logout'
        }),
        logout() {
            this.logoutAction().then(() => {
                this.$router.replace({
                    name: 'Login'
                })
            })
        },
    }
}
</script>

