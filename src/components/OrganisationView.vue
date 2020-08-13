<template>
    <div id="inner">
        <div class="row">
            <div class="col-12">
                <h1>
                    {{ $t('organisation.title') }}
                </h1>
            </div>
        </div>
        <div class="row" v-if="finished">
            <div class="col-12">
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th>
                            {{ $t('organisation.table.header.name') }}
                        </th>
                        <th>
                            {{ $t('organisation.table.header.isDefault') }}
                        </th>
                        <th>
                            {{ $t('organisation.table.header.contact') }}
                        </th>
                        <th class="btn-group-sm">
                            &nbsp;
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in organisations" :key="item.id">
                        <td>
                            {{ item.name }}
                        </td>
                        <td>
                            {{ $t(`organisation.table.default.${item.isDefault}`) }}
                        </td>
                        <td>
                            {{ item.contact_name }}<br/>
                            {{ item.contact_phone }}<br/>
                            <a :href="`mailto:${item.contact_email}`" target="_blank">{{ item.contact_email }}</a>
                        </td>
                        <td>
                            <div class="btn-group btn-group-sm float-right">
                                <button
                                        v-if="item.isDefault"
                                        v-on:click="$router.push(`/organisations/${item.id}`)"
                                        v-b-tooltip.hover
                                        :title="$t('organisation.table.actions.edit')"
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
    </div>
</template>



<script>
  import { organisationService } from '../_services'

  export default {
    name: 'organisationView',
    data: () => {
      return {
        finished: false,
        organisations: []
      }
    },
    mounted() {
      this.loadorganisation()
    },
    methods: {
      async loadorganisation() {
        organisationService.getAll().then((data) => {
          this.organisations = data
          this.finished = true
        })
      }
    }
  }
</script>

<style scoped>

</style>
