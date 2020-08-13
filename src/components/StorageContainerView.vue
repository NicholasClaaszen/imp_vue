<template>
    <div id="inner">
        <div class="row">
            <div class="col-12">
                <h1>
                    {{ $t('storage_container.title') }}
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
                                        v-on:click="$router.push('/storage/containers/new')"
                                        v-b-tooltip.hover
                                        :title="$t('storage_container.table.actions.new')"
                                        class="btn btn-success btn-sm float-right"
                                >
                                    <i class="fa fa-plus"></i>
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="location in locations">
                            <tr class="table-dark" :key="location.location_id">
                                <td>
                                    <strong>
                                        <span v-b-tooltip.hover :title="location.location_address">
                                        {{ location.location_name }}
                                    </span>
                                    </strong>
                                </td>
                                <td colspan="2">
                                    <strong>
                                        {{ location.contact_name }} /
                                        {{ location.contact_phone }} /
                                        <a :href="`mailto:${location.contact_email}`" target="_blank">{{ location.contact_email }}</a>
                                    </strong>
                                </td>
                            </tr>
                            <template v-for="item in containers">
                                <tr :key="item.id" v-if="item.location_id === location.location_id">
                                    <td>
                                        <span v-b-tooltip.hover :title="item.description">
                                            {{ item.name }}
                                        </span>
                                    </td>
                                    <td>
                                        {{ item.description }}
                                    </td>
                                    <td>
                                        <div class="btn-group btn-group-sm float-right">
                                            <button
                                                    v-b-tooltip.hover
                                                    :title="$t('storage_container.table.actions.delete')"
                                                    class="btn btn-danger"
                                                    v-on:click="removeModal(item.id, item.name)"
                                            >
                                                <i class="fa fa-trash"></i>
                                            </button>
                                            <button
                                                    v-on:click="$router.push(`/storage/containers/${item.id}`)"
                                                    v-b-tooltip.hover
                                                    :title="$t('storage_container.table.actions.edit')"
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
                :title="$t('storage_container.modal.confirm_delete.title')"
                :ok-title="$t('storage_container.modal.confirm_delete.buttons.ok')"
                :cancel-title="$t('storage_container.modal.confirm_delete.buttons.cancel')"
                @ok="removestorage_container"
        >
            <div v-html="$t('storage_container.modal.confirm_delete.text', [this.remove.name])"></div>
        </b-modal>
    </div>
</template>



<script>
  import { storageContainerService } from '../_services'

  export default {
    name: 'storageContainerView',
    data: () => {
      return {
        finished: false,
        containers: [],
        locations: [],
        remove: {
          id: '',
          name: ''
        }
      }
    },
    mounted() {
        this.loadstorage_container()
    },
    methods: {
      async loadstorage_container() {
        storageContainerService.getAll().then((data) => {
          this.locations = []
          this.containers = data
          for(const container of this.containers) {
            if(this.locations.filter((v) => { return v.location_id === container.location_id}).length === 0) {
              this.locations.push({
                location_id: container.location_id,
                location_name: container.location_name,
                location_address: container.location_address,
                contact_name: container.contact_name,
                contact_phone: container.contact_phone,
                contact_email: container.contact_email
              })
            }
          }
          this.finished = true
        })
      },
      async removestorage_container() {
        storageContainerService.remove(this.remove.id).then(() => {
            this.loadstorage_container()
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
