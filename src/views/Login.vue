<template>
    <v-app id="inspire">
        <v-container
            class="fill-height"
            fluid
        >
            <v-row
                align="center"
                justify="center"
                style="max-width: initial"
            >
                <v-col
                    cols="12"
                    sm="8"
                    md="4"
                    class="px-6"
                    style="max-width: 480px"
                >
                    <v-card class="elevation-12">
                        <v-toolbar
                            color="primary"
                            dark
                            flat
                        >
                            <v-toolbar-title>Tingstar Console 로그인</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-form
                                ref="form"
                                lazy-validation
                                @keyup.native.enter="submit"
                            >
                                <v-text-field
                                    v-model="email"
                                    label="ID"
                                    prepend-icon="email"
                                    :rules="emailRules"
                                    color="primary"
                                    required
                                />

                                <v-text-field
                                    v-model="password"
                                    label="Password"
                                    type="password"
                                    prepend-icon="lock"
                                    :rules="passwordRules"
                                    color="primary"
                                    required
                                />
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer/>
                            <v-btn color="primary" text @click="submit">로그인</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import {mapGetters, mapActions} from 'vuex'

export default {
    data() {
        return {
            email: '',
            emailRules: [
                v => !!v || '아이디를 입력해 주세요.',
            ],
            password: '',
            passwordRules: [
                v => !!v || '비밀번호를 입력해 주세요.',
            ],
            token: '',
            grant_type: 'password',
            client_id: '93fff73e-62d6-44c8-82a3-da3e2f5275b8',
            client_secret: 'OsDF2iplB0PbXNm3nvcJpcZdaYJN0tj4A4pqicl5',
            scope: '*'
        }
    },
    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated',
        }),
        form() {
            return {
                username: this.email,
                password: this.password,
                grant_type: this.grant_type,
                client_id: this.client_id,
                client_secret: this.client_secret,
                scope: this.scope
            }
        },
    },

    methods: {
        ...mapActions({
            login: 'auth/login',
        }),

        submit() {
            if (this.$refs.form.validate()) {
                this.login(this.form).then(() => {
                    if (this.authenticated) {
                        this.$router.replace({
                            name: 'Home'
                        })
                    } else {
                        alert('아이디나 비밀번호를 확인해주세요.')
                    }
                })
            }
        }
    }
}
</script>
