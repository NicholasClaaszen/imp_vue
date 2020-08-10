<template>
    <div class="row">
        <div class="col-12" v-if="this.$store.state.authentication.status.loggedIn">
            <b-navbar >
                <b-navbar-brand href="#"><img id="branding" src="../assets/img/logo-white.svg"/></b-navbar-brand>
                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav class="ml-auto">
                        <b-nav-item href="/" right>Home</b-nav-item>
                        <b-nav-item v-on:click = "$bvModal.show('password_modal')" right>Wachtwoord</b-nav-item>
                        <b-nav-item href="/login" right>Uitloggen</b-nav-item>
                    </b-navbar-nav>
                </b-collapse>
            </b-navbar>
        </div>
        <div class="col-12" v-else>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
        <b-modal
                id="password_modal"
                title="Wachtwoord Aanpassen"
                @ok="changePassword"
        >
            <p>
                Voor een nieuw wachtwoord in:
            </p>
            <ul class="pass_list">
                <li v-bind:class="{ is_valid: contains_eight_characters, pass_check: true}">Minimaal 8 tekens</li>
                <li v-bind:class="{ is_valid: contains_number, pass_check: true }">Bevat een nummer</li>
                <li v-bind:class="{ is_valid: contains_uppercase, pass_check: true }">Bevat een hoofdletter</li>
                <li v-bind:class="{ is_valid: contains_special_character, pass_check: true }">Bevat een leesteken</li>
                <li v-bind:class="{ is_valid: password_match, pass_check: true }">Wachtwoorden komen overeen</li>
            </ul>
            <b-form-group
                          id="password_new-group"
                          label="Wachtwoord"
                          label-for="password_new"
            >
                <b-form-input
                        id="password_new"
                        v-model="password_new"
                        type="password"
                        minlength="8"
                        autocomplete="off"
                        @input="checkPassword"
                        required>
                </b-form-input>
            </b-form-group>
            <b-form-group
                    id="password_repeat-group"
                    label="Wachtwoord Herhalen"
                    label-for="password_repeat"
            >
                <b-form-input
                        id="password_repeat"
                        v-model="password_repeat"
                        type="password"
                        minlength="8"
                        autocomplete="off"
                        @input="checkPassword"
                        required>
                </b-form-input>
            </b-form-group>
        </b-modal>
        <b-modal
                id="password_result_modal"
                title="Wachtwoord Aanpassen"
                @ok="$bvModal.hide('password_result_modal')"
                ok-only
        >
            <p>
                {{password_result}}
            </p>
        </b-modal>
    </div>
</template>

<script>
    import {accountService} from "@/_services";

    export default {
        name: 'navbar',
        data: () => {
            return {
                manager: 0,
                corporation: 0,
                password_new: '',
                password_repeat: '',
                password_length: 0,
                contains_eight_characters: false,
                contains_number: false,
                contains_uppercase: false,
                contains_special_character: false,
                password_match: false,
                valid_password: false,
                password_result: ''
            }
        },
        mounted() {
            if(this.$store.state.authentication.status.loggedIn) {
                this.manager = this.$store.state.authentication.user.manager;
                this.corporation = this.$store.state.authentication.user.corporation;
            }
        },
        methods: {
            changePassword(e) {
                if(this.valid_password) {
                    accountService.changePassword(this.password_new).then(() => {
                        this.password_result = 'Uw wachtwoord is aangepast';
                        this.$bvModal.show('password_result_modal');
                        this.password_new = '';
                        this.password_repeat = '';
                        this.checkPassword();
                    })
                } else {
                    e.preventDefault();
                    this.password_result = 'Uw wachtwoord voldoet niet aan alle eisen';
                    this.$bvModal.show('password_result_modal');
                }

            },
            checkPassword() {
                this.password_length = this.password_new.length;
                const format = /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

                if (this.password_length > 8) {
                    this.contains_eight_characters = true;
                } else {
                    this.contains_eight_characters = false;
                }

                this.contains_number = /\d/.test(this.password_new);
                this.contains_uppercase = /[A-Z]/.test(this.password_new);
                this.contains_special_character = format.test(this.password_new);
                this.password_match = this.password_new.length > 0 && (this.password_new === this.password_repeat);

                if (this.contains_eight_characters === true &&
                    this.contains_special_character === true &&
                    this.contains_uppercase === true &&
                    this.password_match === true &&
                    this.contains_number === true) {
                    this.valid_password = true;
                } else {
                    this.valid_password = false;
                }
            }
        }
    }
</script>

<style>
    ul.pass_list {
        padding-left: 20px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .pass_check {
        margin-bottom: 8px;
        position: relative;
    }
    .pass_check:before {
        content: "";
        width: 0%; height: 2px;
        background: #2ecc71;
        position: absolute;
        left: 0; top: 50%;
        display: block;
        transition: all .6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .is_valid { color: rgba(136, 152, 170, 0.8); }
    .is_valid:before { width: 100%; }

    @keyframes draw {
        to { stroke-dashoffset: 0; }
    }
</style>