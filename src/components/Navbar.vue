<template>
    <div class="row">
        <div class="col-12" v-if="this.$store.state.authentication.status.loggedIn">
            <b-navbar toggleable="lg">
                <b-navbar-brand v-on:click="$router.push('/')">
                    <img id="branding" src="../assets/img/logo-white.svg"/>
                </b-navbar-brand>
                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav class="ml-auto">
                        <b-nav-item v-on:click="$router.push('/')" right>{{ $t('navbar.label.home') }}</b-nav-item>
                        <b-nav-item-dropdown
                                id="organisation-doprown"
                                v-bind:text="$t('navbar.label.settings')"
                                toggle-class="nav-link-custom"
                                right v-if="this.$store.state.authentication.user.user.roles.includes('organisation')"
                        >
                            <b-dropdown-item v-on:click="$router.push('/contacts')">{{ $t('navbar.label.contacts') }}</b-dropdown-item>
                            <b-dropdown-item v-on:click="$router.push('/storage/containers')">{{ $t('navbar.label.storage_containers') }}</b-dropdown-item>
                            <b-dropdown-item v-on:click="$router.push('/storage/locations')">{{ $t('navbar.label.storage_locations') }}</b-dropdown-item>
                            <b-dropdown-item v-on:click="$router.push('/categories')">{{ $t('navbar.label.categories') }}</b-dropdown-item>
                            <b-dropdown-item v-on:click="$router.push('/organisations')">{{ $t('navbar.label.organisations') }}</b-dropdown-item>
                        </b-nav-item-dropdown>
                        <b-nav-item v-on:click = "$bvModal.show('password_modal')" right>{{ $t('navbar.label.password') }}</b-nav-item>
                        <b-nav-item href="/login" right>{{ $t('navbar.label.logout') }}</b-nav-item>
                        <b-nav-item-dropdown
                                id="locale-doprown"
                                v-bind:text="$t('navbar.label.locale')"
                                toggle-class="nav-link-custom"
                        >
                            <b-dropdown-item v-on:click="changeLocale('en')">English</b-dropdown-item>
                            <b-dropdown-item v-on:click="changeLocale('nl')">Nederlands</b-dropdown-item>
                        </b-nav-item-dropdown>
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
                v-bind:title="$t('navbar.modal.password.title')"
                @ok="changePassword"
        >
            <p>
                {{ $t('navbar.modal.password.text') }}
            </p>
            <ul class="pass_list">
                <li v-bind:class="{ is_valid: contains_eight_characters, pass_check: true}">{{$t('navbar.modal.password.requirements.count')}}</li>
                <li v-bind:class="{ is_valid: contains_number, pass_check: true }">{{$t('navbar.modal.password.requirements.number')}}</li>
                <li v-bind:class="{ is_valid: contains_uppercase, pass_check: true }">{{$t('navbar.modal.password.requirements.capital')}}</li>
                <li v-bind:class="{ is_valid: contains_special_character, pass_check: true }">{{$t('navbar.modal.password.requirements.punctuation')}}</li>
                <li v-bind:class="{ is_valid: password_match, pass_check: true }">{{$t('navbar.modal.password.requirements.match')}}</li>
            </ul>
            <b-form-group
                          id="password_new-group"
                          v-bind:label="$t('navbar.modal.password.form.label.password')"
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
                    v-bind:label="$t('navbar.modal.password.form.label.repeat')"
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
                v-bind:title="$t('navbar.modal.password.title')"
                @ok="$bvModal.hide('password_result_modal')"
                ok-only
        >
            <p>
                {{ $t(`navbar.modal.password.result.${password_result}`)}}
            </p>
        </b-modal>
    </div>
</template>

<script>
    import {accountService} from "@/_services";
    import { authService } from '../_services'

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
                password_result: 'waiting'
            }
        },
        mounted() {
            if(this.$store.state.authentication.status.loggedIn) {
                authService.refresh()
            }
        },
        methods: {
            changeLocale(locale) {
              this.$root.$i18n.locale = locale
            },
            changePassword(e) {
                if(this.valid_password) {
                    accountService.changePassword(this.password_new).then(() => {
                        this.password_result = 'ok';
                        this.$bvModal.show('password_result_modal');
                        this.password_new = '';
                        this.password_repeat = '';
                        this.checkPassword();
                    })
                } else {
                    e.preventDefault();
                    this.password_result = 'badrequirements';
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