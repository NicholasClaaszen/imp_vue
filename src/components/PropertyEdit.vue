<template>
    <div id="inner">
        <div class="row">
            <div class="col-12">
                <h1>
                    {{ $t(`property_edit.title.${this.isNew ? 'new' : 'existing'}`) }}
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
                            :label="$t('property_edit.form.label.name')"
                            label-for="name">
                        <b-form-input
                                id="name"
                                v-model="form.name"
                                type="text"
                                required
                        />
                    </b-form-group>
                    <b-form-group
                            id="label-group"
                            :label="$t('property_edit.form.label.category')"
                            label-for="category_id"
                    >
                        <b-form-select
                                v-model="form.category"
                                id="category_id"
                                required
                        >
                            <b-form-select-option v-for="item in categories" :key="item.id" :value="item.id">
                                {{item.name}}
                            </b-form-select-option>
                        </b-form-select>
                    </b-form-group>
                    <b-form-group
                            id="label-group"
                            :label="$t('property_edit.form.label.type')"
                            label-for="type_id"
                    >
                        <b-form-select
                                v-model="form.type"
                                id="type_id"
                                :disabled="!this.isNew"
                                required
                        >
                            <b-form-select-option v-for="item in types" :key="item" :value="item">
                                {{$t(`property_edit.types.${item}`)}}
                            </b-form-select-option>
                        </b-form-select>
                    </b-form-group>

                    <b-form-group
                            v-if="form.type === 'select_one'"
                            id="drift-group"
                            :label="$t('property_edit.form.label.drift')"
                            label-for="drift">
                        <b-form-input
                                id="drift"
                                v-model="form.drift"
                                type="number"
                        />
                    </b-form-group>
                    <table class="table table-striped" v-if="['select_one','select_multiple'].includes(form.type)">
                        <thead>
                            <tr>
                                <th>
                                    {{ $t('property_edit.options.label.name') }}
                                </th>
                                <th>
                                    <b-button-group class="btn-group-sm">
                                        <b-button variant="success" v-on:click="optionAdd()"><i class="fa fa-plus"></i></b-button>
                                    </b-button-group>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(option, index) in options" :key="option.option_id">
                                <td>
                                    <b-form-input
                                            :id="`option_${index}`"
                                            v-model="option.option_name"
                                            type="text"
                                    />
                                </td>
                                <td>
                                    <b-button-group class="btn-group-sm">
                                        <b-button variant="danger" v-on:click="optionRemove(index)"><i class="fa fa-trash"></i></b-button>
                                    </b-button-group>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <b-button-group class="float-right">
                        <b-button  v-on:click="$router.push('/property')" variant="primary">{{ $t('property_edit.form.button.back') }}</b-button>
                        <b-button type="submit" variant="success">{{ $t('property_edit.form.button.submit') }}</b-button>
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
  import { propertyService, categoryService } from '../_services'

  export default {
    name: 'propertyEdit',
    data: () => {
      return {
        finished: false,
        isNew: false,
        form: {
          name: '',
          category: '',
          type: '',
          drift: 0
        },
        options: [],
        removedOptions: [],
        categories: [],
        types: ['toggle','select_one','select_multiple','free_text']
      }
    },
    async mounted() {
        categoryService.getAll().then((data) => {
            this.categories = data
        })
        await this.loadproperty()
    },
    methods: {
      async handleSubmit() {
        this.finished = false
        if(this.isNew) {
          propertyService.post(this.form.name, this.form.category, this.form.type, this.form.drift).then((data) => {
            for(const index in this.options) {
              const option = this.options[index]
              if(option.option_name.length) {
                propertyService.postOption(data.id, option.option_name, index)
              }
            }
            propertyService.activate(data.id).then(() => {
              this.$router.push('/property')
            })
          })
        } else {
          propertyService.put(this.$route.params.id, this.form.name, this.form.drift).then(() => {
            for(const index in this.options) {
              const option = this.options[index]
              if(option.option_name.length) {
                if(option.option_id.length > 10) {
                  propertyService.putOption(this.$route.params.id, option.option_id, option.option_name, index)
                } else {
                  propertyService.postOption(this.$route.params.id, option.option_name, index)
                }
              }
            }
            for(const index in this.removedOptions) {
              propertyService.removeOption(this.$route.params.id, this.removedOptions[index])
            }
            this.$router.push('/property')
          })
        }
      },
      async loadproperty() {
        if(!validator.isUUID(this.$route.params.id)) {
          if(this.$route.params.id === 'new') {
            this.isNew = true
            this.finished = true
          } else {
            await this.$router.push('/property')
          }
        } else {
          propertyService.get(this.$route.params.id).then((data) => {
            if(data.length === 0) {
              this.$router.push('/property')
            } else {
              this.form.name = data[0].name
              this.form.type = data[0].property_type
              this.form.drift = data[0].drift
              this.form.category = data[0].category_id
              this.options = data
              this.finished = true
            }
          })
        }
      },
      optionAdd() {
        this.options.push({
          option_id: this.options.length,
          option_name: ''
        })
      },
      optionRemove(index) {
        if(this.options[index].option_id.length > 10) {
          this.removedOptions.push(this.options[index].option_id)
        }
        this.options.splice(index, 1)
      }
    }
  }
</script>

<style scoped>

</style>
