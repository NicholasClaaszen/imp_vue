<template>
    <div id="inner">
        <div class="row">
            <div class="col-12">
                <h1>
                    {{ $t('category.title') }}
                </h1>
            </div>
        </div>
        <div class="row" v-if="finished">
            <div class="col-12">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                {{ $t('category.table.header.name') }}
                            </th>
                            <th>
                                {{ $t('category.table.header.icon') }}
                            </th>
                            <th class="btn-group-sm">
                                <button
                                        v-on:click="$router.push('/categories/new')"
                                        v-b-tooltip.hover
                                        :title="$t('category.table.actions.new')"
                                        class="btn btn-success btn-sm float-right"
                                >
                                    <i class="fa fa-plus"></i>
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in categories" :key="item.id">
                            <td>
                                {{ item.name }}
                            </td>
                            <td>
                                {{ item.icon }}
                            </td>
                            <td>
                                <div class="btn-group btn-group-sm float-right">
                                    <button
                                            v-b-tooltip.hover
                                            :title="$t('category.table.actions.delete')"
                                            class="btn btn-danger"
                                            v-on:click="removeModal(item.id, item.name)"
                                    >
                                        <i class="fa fa-trash"></i>
                                    </button>
                                    <button
                                            v-on:click="$router.push(`/categories/${item.id}`)"
                                            v-b-tooltip.hover
                                            :title="$t('category.table.actions.edit')"
                                            class="btn btn-success"
                                    >
                                        <i class="fa fa-pencil"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
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
                :title="$t('category.modal.confirm_delete.title')"
                :ok-title="$t('category.modal.confirm_delete.buttons.ok')"
                :cancel-title="$t('category.modal.confirm_delete.buttons.cancel')"
                @ok="removeCategory"
        >
            <div v-html="$t('category.modal.confirm_delete.text', [this.remove.name])"></div>
        </b-modal>
    </div>
</template>



<script>
  import { categoryService } from '../_services'

  export default {
    name: 'Category_view',
    data: () => {
      return {
        finished: false,
        categories: [],
        remove: {
          id: '',
          name: ''
        }
      }
    },
    mounted() {
        this.loadCategory()
    },
    methods: {
      async loadCategory() {
        categoryService.getAll().then((data) => {
          this.categories = data
          this.finished = true
        })
      },
      async removeCategory() {
        categoryService.remove(this.remove.id).then((data) => {
            this.loadCategory()
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
