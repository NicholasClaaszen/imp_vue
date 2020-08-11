<template>
    <div id="inner">
        <div class="row">
            <div class="col-12">
                <h1>
                    {{ $t('storage_location.title') }}
                </h1>
            </div>
        </div>
        <div class="row" v-if="finished">
            <div class="col-12">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                {{ $t('storage_location.table.header.name') }}
                            </th>
                            <th>
                                {{ $t('storage_location.table.header.address') }}
                            </th>
                            <th>
                                {{ $t('storage_location.table.header.organisation') }}
                            </th>
                            <th>
                                {{ $t('storage_location.table.header.contact') }}
                            </th>
                            <th class="btn-group-sm">
                                <button
                                        v-on:click="$router.push('/storage/locations/new')"
                                        v-b-tooltip.hover
                                        :title="$t('storage_location.table.actions.new')"
                                        class="btn btn-success btn-sm float-right"
                                >
                                    <i class="fa fa-plus"></i>
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in locations" :key="item.id">
                            <td>
                                {{ item.name }}
                            </td>
                            <td>
                                {{ item.address }}
                            </td>
                            <td>
                                {{ item.organisation_name }}
                            </td>
                            <td>
                                {{ item.contact_name }}<br/>
                                {{ item.contact_phone }}<br/>
                                <a :href="`mailto:${item.contact_email}`" target="_blank">{{ item.contact_email }}</a>
                            </td>
                            <td>
                                <div class="btn-group btn-group-sm float-right">
                                    <button
                                            v-b-tooltip.hover
                                            :title="$t('storage_location.table.actions.delete')"
                                            class="btn btn-danger"
                                            v-on:click="removeModal(item.id, item.name)"
                                    >
                                        <i class="fa fa-trash"></i>
                                    </button>
                                    <button
                                            v-on:click="$router.push(`/storage/locations/${item.id}`)"
                                            v-b-tooltip.hover
                                            :title="$t('storage_location.table.actions.edit')"
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
                :title="$t('storage_location.modal.confirm_delete.title')"
                :ok-title="$t('storage_location.modal.confirm_delete.buttons.ok')"
                :cancel-title="$t('storage_location.modal.confirm_delete.buttons.cancel')"
                @ok="removestorage_location"
        >
            <div v-html="$t('storage_location.modal.confirm_delete.text', [this.remove.name])"></div>
        </b-modal>
    </div>
</template>



<script>
  import { storage_locationService } from '../_services'

  export default {
    name: 'storage_location_view',
    data: () => {
      return {
        finished: false,
        locations: [],
        remove: {
          id: '',
          name: ''
        }
      }
    },
    mounted() {
        this.loadstorage_location()
    },
    methods: {
      async loadstorage_location() {
        storage_locationService.getAll().then((data) => {
          this.locations = data
          this.finished = true
        })
      },
      async removestorage_location() {
        storage_locationService.remove(this.remove.id).then((data) => {
            this.loadstorage_location()
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
