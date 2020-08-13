<template>
    <div id="inner">
        <div class="row">
            <div class="col-12">
                <h1>
                    {{ $t(`contact_edit.title.${this.isNew ? 'new' : 'existing'}`) }}
                </h1>
            </div>
        </div>
        <div class="row" v-if="finished">
            <div class="col-12 spacer">

            </div>
            <div class="col-12">
                <b-form @submit.prevent="handleSubmit">
                    <b-form-group
                            id="name-group"
                            :label="$t('contact_edit.form.label.name')"
                            label-for="name">
                        <b-form-input
                                id="name"
                                v-model="form.name"
                                type="text"
                                required
                        />
                    </b-form-group>
                    <b-form-group
                            id="name-group"
                            :label="$t('contact_edit.form.label.email')"
                            label-for="email">
                        <b-form-input
                                id="email"
                                v-model="form.email"
                                type="email"
                        />
                    </b-form-group>
                    <b-form-group
                            id="name-group"
                            :label="$t('contact_edit.form.label.phone')"
                            label-for="phone">
                        <b-form-input
                                id="phone"
                                v-model="form.phone"
                                type="text"
                        />
                    </b-form-group>
                    <b-button-group class="float-right">
                        <b-button  v-on:click="$router.push('/contacts')" variant="primary">{{ $t('contact_edit.form.button.back') }}</b-button>
                        <b-button type="submit" variant="success">{{ $t('contact_edit.form.button.submit') }}</b-button>
                    </b-button-group>
                </b-form>
            </div>
        </div>
        <div class="row" v-else>
            <div class="col-12 text-center">
                <br/>
                <i class="fa fa-spinner fa-spin fa-3x"></i>
                <br/>
                <br/>
                {{ $t('general.loading') }}
            </div>
        </div>
    </div>
</template>



<script>
  import validator from "validator/es";
  import { contactService } from '../_services'

  export default {
    name: 'contactEdit',
    data: () => {
      return {
        finished: false,
        isNew: false,
        form: {
          name: '',
          phone: '',
          email: ''
        }
      }
    },
    async mounted() {
        await this.loadContact()
    },
    methods: {
      handleSubmit() {
        if(this.isNew) {
          contactService.post(this.form.name, this.form.email, this.form.phone).then(() => {
            this.$router.push('/contacts')
          })
        } else {
          contactService.put(this.$route.params.id, this.form.name, this.form.email, this.form.phone).then(() => {
            this.$router.push('/contacts')
          })
        }
      },
      async loadContact() {
        if(!validator.isUUID(this.$route.params.id)) {
          if(this.$route.params.id === 'new') {
            this.isNew = true
            this.finished = true
          } else {
            this.$router.push('/contacts')
          }
        } else {
          contactService.get(this.$route.params.id).then((data) => {
            if(data.id.length === 0) {
              this.$router.push('/contacts')
            } else {
              this.form.name = data.name
              this.form.email = data.email
              this.form.phone = data.phone
              this.finished = true
            }
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
