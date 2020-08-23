<template>
    <div id="inner">
        <div class="row">
            <div class="col-12">
                <h1>
                    {{ $t('property.title') }}
                </h1>
            </div>
        </div>
        <div class="row" v-if="finished">
            <div class="col-12">
                <table class="table table-striped">
                    <thead>
                        <tr>

                            <th class="btn-group-sm" colspan="100%">
                                <button
                                        v-on:click="$router.push('/property/new')"
                                        v-b-tooltip.hover
                                        :title="$t('property.table.actions.new')"
                                        class="btn btn-success btn-sm float-right"
                                >
                                    <i class="fa fa-plus"></i>
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="category in categories">
                            <tr class="table-dark" :key="category.category_id">
                                <td colspan="100%">
                                    <strong>
                                        {{ category.category_name }}
                                    </strong>
                                </td>
                            </tr>
                            <template v-for="item in props">
                                <tr :key="item.id" v-if="item.category_id === category.category_id">
                                    <td>
                                        <span v-b-tooltip.hover :title="item.description">
                                            {{ item.name }}
                                        </span>
                                    </td>
                                    <td>
                                        <div class="btn-group btn-group-sm float-right">
                                            <button
                                                    v-b-tooltip.hover
                                                    :title="$t('property.table.actions.delete')"
                                                    class="btn btn-danger"
                                                    v-on:click="removeModal(item.id, item.name)"
                                            >
                                                <i class="fa fa-trash"></i>
                                            </button>
                                            <button
                                                    v-on:click="$router.push(`/property/${item.id}`)"
                                                    v-b-tooltip.hover
                                                    :title="$t('property.table.actions.edit')"
                                                    class="btn btn-success"
                                            >
                                                <i class="fa fa-pencil"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </template>
                        </template>
                    </tbody>
                </table>
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

        <b-modal
                id="modal_confirm_delete"
                size="lg"
                :title="$t('property.modal.confirm_delete.title')"
                :ok-title="$t('property.modal.confirm_delete.buttons.ok')"
                :cancel-title="$t('property.modal.confirm_delete.buttons.cancel')"
                @ok="removeProperty"
        >
            <div v-html="$t('property.modal.confirm_delete.text', [this.remove.name])"></div>
        </b-modal>
    </div>
</template>



<script>
  import { propertyService } from '../_services'

  export default {
    name: 'propertyView',
    data: () => {
      return {
        finished: false,
        props: [],
        categories: [],
        remove: {
          id: '',
          name: ''
        }
      }
    },
    mounted() {
        this.loadProperty()
    },
    methods: {
      async loadProperty() {
        propertyService.getAll().then((data) => {
          this.categories = []
          this.props = data
          for(const container of this.props) {
            if(this.categories.filter((v) => { return v.category_id === container.category_id}).length === 0) {
              this.categories.push({
                category_id: container.category_id,
                category_name: container.category_name
              })
            }
          }
          this.finished = true
        })
      },
      async removeProperty() {
        propertyService.remove(this.remove.id).then(() => {
            this.loadProperty()
        })
      },
      removeModal(id, name) {
        this.remove.id = id
        this.remove.name = name
        this.$bvModal.show('modal_confirm_delete')
      }
    }
  }
</script>

<style scoped>

</style>
