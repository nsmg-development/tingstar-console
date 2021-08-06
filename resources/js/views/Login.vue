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
                            <v-toolbar-title>Curator9 로그인</v-toolbar-title>
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
            id: '',
        }
    },

    methods: {
        submit() {
            if (this.$refs.form.validate()) {

                return axios({
                    url: 'v1/login',
                    method: 'GET',
                    headers: {
                        'content-type': 'multipart/form-data'
                    },
                    params: {
                        email: this.email,
                        password: this.password,
                    },
                })
                    .then(res => {
                        this.loading = false;
                        this.token = res.data.data;
                        this.id = res.data.user_id;
                        if (this.token) {
                            localStorage.setItem('token', this.token);
                            localStorage.setItem('id', this.id);
                            location.href = '/';
                        } else {
                            alert('아이디나 비밀번호를 확인해주세요.')
                            return false;
                        }
                    })
            }
        }
    }
}
</script>

<style scoped>

</style>
