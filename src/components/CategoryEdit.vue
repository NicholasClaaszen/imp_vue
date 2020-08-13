<template>
    <div id="inner">
        <div class="row">
            <div class="col-12">
                <h1>
                    {{ $t(`category_edit.title.${this.isNew ? 'new' : 'existing'}`) }}
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
                            :label="$t('category_edit.form.label.name')"
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
                            :label="$t('category_edit.form.label.icon')"
                            label-for="icon">
                        <b-form-input
                                id="icon"
                                v-model="form.icon"
                                type="text"
                        />
                    </b-form-group>
                    <b-button-group class="float-right">
                        <b-button  v-on:click="$router.push('/categories')" variant="primary">{{ $t('category_edit.form.button.back') }}</b-button>
                        <b-button type="submit" variant="success">{{ $t('category_edit.form.button.submit') }}</b-button>
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
  import { categoryService } from '../_services'

  export default {
    name: 'CategoryEdit',
    data: () => {
      return {
        finished: false,
        isNew: false,
        form: {
          name: '',
          icon: ''
        }
      }
    },
    async mounted() {
        await this.loadCategory()
    },
    methods: {
      handleSubmit() {
        if(this.isNew) {
          categoryService.post(this.form.name, this.form.icon).then(() => {
            this.$router.push('/categories')
          })
        } else {
          categoryService.put(this.$route.params.id, this.form.name, this.form.icon).then(() => {
            this.$router.push('/categories')
          })
        }
      },
      async loadCategory() {
        if(!validator.isUUID(this.$route.params.id)) {
          if(this.$route.params.id === 'new') {
            this.isNew = true
            this.finished = true
          } else {
            this.$router.push('/categories')
          }
        } else {
          categoryService.get(this.$route.params.id).then((data) => {
            if(data.id.length === 0) {
              this.$router.push('/categories')
            } else {
              this.form.name = data.name
              this.form.icon = data.icon
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
