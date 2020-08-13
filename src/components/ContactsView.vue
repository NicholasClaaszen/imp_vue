<template>
    <div id="inner">
        <div class="row">
            <div class="col-12">
                <h1>
                    {{ $t('contact.title') }}
                </h1>
            </div>
        </div>
        <div class="row" v-if="finished">
            <div class="col-12">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                {{ $t('contact.table.header.name') }}
                            </th>
                            <th>
                                {{ $t('contact.table.header.email') }}
                            </th>
                            <th>
                                {{ $t('contact.table.header.phone') }}
                            </th>
                            <th class="btn-group-sm">
                                <button
                                        v-on:click="$router.push('/contacts/new')"
                                        v-b-tooltip.hover
                                        :title="$t('contact.table.actions.new')"
                                        class="btn btn-success btn-sm float-right"
                                >
                                    <i class="fa fa-plus"></i>
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in contacts" :key="item.id">
                            <td>
                                {{ item.name }}
                            </td>
                            <td>
                                {{ item.email }}
                            </td>
                            <td>
                                {{ item.phone }}
                            </td>
                            <td>
                                <div class="btn-group btn-group-sm float-right">
                                    <button
                                            v-b-tooltip.hover
                                            :title="$t('contact.table.actions.delete')"
                                            class="btn btn-danger"
                                            v-on:click="removeModal(item.id, item.name)"
                                    >
                                        <i class="fa fa-trash"></i>
                                    </button>
                                    <button
                                            v-on:click="$router.push(`/contacts/${item.id}`)"
                                            v-b-tooltip.hover
                                            :title="$t('contact.table.actions.edit')"
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
                :title="$t('contact.modal.confirm_delete.title')"
                :ok-title="$t('contact.modal.confirm_delete.buttons.ok')"
                :cancel-title="$t('contact.modal.confirm_delete.buttons.cancel')"
                @ok="removecontact"
        >
            <div v-html="$t('contact.modal.confirm_delete.text', [this.remove.name])"></div>
        </b-modal>
    </div>
</template>



<script>
  import { contactService } from '../_services'

  export default {
    name: 'contactView',
    data: () => {
      return {
        finished: false,
        contacts: [],
        remove: {
          id: '',
          name: ''
        }
      }
    },
    mounted() {
        this.loadcontact()
    },
    methods: {
      async loadcontact() {
        contactService.getAll().then((data) => {
          this.contacts = data
          this.finished = true
        })
      },
      async removecontact() {
        contactService.remove(this.remove.id).then(() => {
            this.loadcontact()
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
