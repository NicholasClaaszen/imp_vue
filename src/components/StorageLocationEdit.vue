<template>
    <div id="inner">
        <div class="row">
            <div class="col-12">
                <h1>
                    {{ $t(`storage_location_edit.title.${this.isNew ? 'new' : 'existing'}`) }}
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
                            :label="$t('storage_location_edit.form.label.name')"
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
                            :label="$t('storage_location_edit.form.label.address')"
                            label-for="address">
                        <b-form-input
                                id="address"
                                v-model="form.address"
                                type="text"
                        />
                    </b-form-group>
                    <b-form-group
                            id="label-group"
                            :label="$t('storage_location_edit.form.label.contact')"
                            label-for="contact_id"
                    >
                        <b-form-select
                                v-model="form.contact_id"
                                id="contact_id"
                                required
                        >
                            <b-form-select-option v-for="item in contacts" :key="item.id" :value="item.id">
                                {{item.name}}
                            </b-form-select-option>
                        </b-form-select>
                    </b-form-group>
                    <b-button-group class="float-right">
                        <b-button  v-on:click="$router.push('/storage/locations')" variant="primary">{{ $t('storage_location_edit.form.button.back') }}</b-button>
                        <b-button type="submit" variant="success">{{ $t('storage_location_edit.form.button.submit') }}</b-button>
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
  import { contactService, storageLocationService } from '../_services'

  export default {
    name: 'storageLocationEdit',
    data: () => {
      return {
        finished: false,
        isNew: false,
        contacts: [],
        form: {
          name: '',
          address: '',
          contact_id: ''
        }
      }
    },
    async mounted() {
      contactService.getAll().then((data) => {
        this.contacts = data
      })
      await this.loadStorage_location()
    },
    methods: {
      handleSubmit() {
        if(this.isNew) {
          storageLocationService.post(this.form.name, this.form.address, this.form.contact_id).then(() => {
            this.$router.push('/storage/locations')
          })
        } else {
          storageLocationService.put(this.$route.params.id, this.form.name, this.form.address, this.form.contact_id).then(() => {
            this.$router.push('/storage/locations')
          })
        }
      },
      async loadStorage_location() {
        if(!validator.isUUID(this.$route.params.id)) {
          if(this.$route.params.id === 'new') {
            this.isNew = true
            this.finished = true
          } else {
            this.$router.push('/storage/locations')
          }
        } else {
          storageLocationService.get(this.$route.params.id).then((data) => {
            if(data.id.length === 0) {
              this.$router.push('/storage/locations')
            } else {
              this.form.name = data.name
              this.form.address = data.address
              this.form.contact_id = data.contact_id
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
