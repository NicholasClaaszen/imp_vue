<template>
  <div id="inner">
    <div class="row">
      <div class="col-12 text-center">
        <table class="table table-striped text-left">
            <thead>
                <tr>
                    <th colspan="4">
                        <b-form-select
                                v-model="box"
                                :options="storageBoxes"
                                @input="loadItem"
                        >
                        </b-form-select>
                    </th>
                    <th class="btn-group-sm">
                        <button
                                v-on:click="$router.push('/item/new')"
                                v-b-tooltip.hover
                                :title="$t('item.table.actions.new')"
                                class="btn btn-success btn-sm float-right"
                        >
                            <i class="fa fa-plus"></i>
                        </button>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in items" :key="item.id">
                    <td>
                        <img class="item-icon" :src="item.image_url"/>
                    </td>
                    <td>
                        {{item.name}}
                    </td>
                    <td>
                        {{item.category_name}}
                    </td>
                    <td>
                        {{item.container_name}} ({{item.storage_name}})
                    </td>
                    <td>
                        <div class="btn-group btn-group-sm float-right">
                            <button
                                    v-b-tooltip.hover
                                    :title="$t('item.table.actions.delete')"
                                    class="btn btn-danger"
                                    v-on:click="removeModal(item.id, item.name)"
                            >
                                <i class="fa fa-trash"></i>
                            </button>
                            <button
                                    v-on:click="$router.push(`/item/${item.id}`)"
                                    v-b-tooltip.hover
                                    :title="$t('item.table.actions.edit')"
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

  <b-modal
          id="modal_confirm_delete"
          size="lg"
          :title="$t('item.modal.confirm_delete.title')"
          :ok-title="$t('item.modal.confirm_delete.buttons.ok')"
          :cancel-title="$t('item.modal.confirm_delete.buttons.cancel')"
          @ok="removeItem"
  >
      <div v-html="$t('item.modal.confirm_delete.text', [this.remove.name])"></div>
  </b-modal>
  </div>
</template>

<script>
  import { itemService, storageContainerService } from '../_services'

  export default {
    data: () => {
      return {
        box: '',
        storageBoxes: '',
        items: [],
        remove: {
          id: '',
          name: ''
        }
      }
    },
    name: 'Home',
    mounted() {
      storageContainerService.getAll().then((data) => {
        let holder = {}
        data.forEach((element) => {
          if(holder[element.location_name] === undefined) {
            holder[element.location_name] = []
          }
          holder[element.location_name].push({
            text: element.name + (element.description.length > 0 ? ' (' + element.description + ')' : ''),
            value: element.id
          })
        })
        this.storageBoxes = []
        for(const [key, arr] of Object.entries(holder)) {
          this.storageBoxes.push({
            label: key,
            options: arr
          })
        }
      })
    },
    methods: {
      async loadItem() {
        if(this.box.length > 0) {
          itemService.getForBox().then((data) => {
            this.items = data
            this.finished = true
          })
        }
      },
      async removeItem() {
        itemService.remove(this.remove.id).then(() => {
          this.loadItem()
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item-icon {
    width: 100px;
}
</style>
