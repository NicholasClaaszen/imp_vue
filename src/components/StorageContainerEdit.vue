<template>
    <div id="inner">
        <div class="row">
            <div class="col-12">
                <h1>
                    {{ $t(`storage_container_edit.title.${this.isNew ? 'new' : 'existing'}`) }}
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
                            :label="$t('storage_container_edit.form.label.name')"
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
                            :label="$t('storage_container_edit.form.label.description')"
                            label-for="description">
                        <b-form-input
                                id="description"
                                v-model="form.description"
                                type="text"
                        />
                    </b-form-group>
                    <b-form-group
                            id="label-group"
                            :label="$t('storage_container_edit.form.label.location')"
                            label-for="location_id"
                    >
                        <b-form-select
                                v-model="form.location_id"
                                id="location_id"
                                required
                        >
                            <b-form-select-option v-for="item in locations" :key="item.id" :value="item.id">
                                {{item.name}}
                            </b-form-select-option>
                        </b-form-select>
                    </b-form-group>
                    <b-button-group class="float-right">
                        <b-button  v-on:click="$router.push('/storage/containers')" variant="primary">{{ $t('storage_container_edit.form.button.back') }}</b-button>
                        <b-button type="submit" variant="success">{{ $t('storage_container_edit.form.button.submit') }}</b-button>
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
  import { storageContainerService, storageLocationService } from '../_services'

  export default {
    name: 'storageContainerEdit',
    data: () => {
      return {
        finished: false,
        isNew: false,
        locations: [],
        form: {
          name: '',
          description: '',
          location_id: ''
        }
      }
    },
    async mounted() {
      storageLocationService.getAll().then((data) => {
        this.locations = data
      })
      await this.loadStorage_container()
    },
    methods: {
      handleSubmit() {
        if(this.isNew) {
          storageContainerService.post(this.form.name, this.form.description, this.form.location_id).then(() => {
            this.$router.push('/storage/containers')
          })
        } else {
          storageContainerService.put(this.$route.params.id, this.form.name, this.form.description, this.form.location_id).then(() => {
            this.$router.push('/storage/containers')
          })
        }
      },
      async loadStorage_container() {
        if(!validator.isUUID(this.$route.params.id)) {
          if(this.$route.params.id === 'new') {
            this.isNew = true
            this.finished = true
          } else {
            this.$router.push('/storage/containers')
          }
        } else {
          storageContainerService.get(this.$route.params.id).then((data) => {
            if(data.id.length === 0) {
              this.$router.push('/storage/containers')
            } else {
              this.form.name = data.name
              this.form.description = data.description
              this.form.location_id = data.location_id
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
