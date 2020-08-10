<template>
    <div id="block-login">
        <div class="row">
            <div class="col-12 text-center d-block d-sm-none">
                <img class="i-regular" src="../assets/img/logo-grey.svg"/>
            </div>
            <div class="col-12 text-center d-none d-sm-block">
                <img class="i-small" src="../assets/img/logo-grey.svg"/>
            </div>
        </div>

        <div class="row" v-if="alert.message">
            <div class="col-12 col-sm-4 offset-sm-4">
                <div :class="`alert ${alert.type}`">{{alert.message}}</div>
            </div>
        </div>

        <div class="row">
            <div class="col-12 col-sm-4 offset-sm-4">
                <b-form @submit.prevent="handleSubmit">
                    <b-form-group
                        id="email-group"
                        label="E-mail adres"
                        label-for="email"
                    >
                        <b-form-input
                            id="email"
                            v-model="email"
                            type="email"
                            required>
                        </b-form-input>
                    </b-form-group>
                    <b-form-group
                            id="password-group"
                            label="Wachtwoord"
                            label-for="password"
                    >
                        <b-form-input
                                id="password"
                                v-model="password"
                                type="password"
                                required>
                        </b-form-input>
                    </b-form-group>
                    <b-button class="float-right" type="submit" variant="primary">Inloggen</b-button>
                </b-form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data: () => {
            return {
                email: '',
                password: '',
                submitted: false
            }
        },
        computed:  {
            loggingIn () {
                return this.$store.state.authentication.status.loggingIn
            },
            alert () {
                return this.$store.state.alert
            }
        },
        created () {
          if(this.$store.state.authentication.user !== null) {
            this.$store.dispatch('authentication/logout')
          }
        },
        methods: {
            checkBundle() {
                if(this.$route.query.bundle !== undefined) {
                    const { dispatch } = this.$store
                    let token = this.$route.query.bundle
                    dispatch('authentication/bundle', {token})
                }
            },
            handleSubmit() {
                this.submitted = true
                const { email, password } = this
                const { dispatch } = this.$store
                if(email && password) {
                    dispatch('authentication/login', { email, password})
                }
            }
        },
        async mounted() {
            this.checkBundle()
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #block-login {
        padding-top: 70px;
    }
    img.i-regular {
        width: 100%;
        margin-bottom: 50px;
    }
    img.i-small {
        width: 50%;
        margin-bottom: 40px;
    }
</style>
