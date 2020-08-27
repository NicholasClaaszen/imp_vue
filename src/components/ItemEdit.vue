<template>
    <div id="inner">
        <div class="row">
            <div class="col-12">
                <h1>
                    {{ $t(`item_edit.title.${this.isNew ? 'new' : 'existing'}`) }}
                </h1>
            </div>
        </div>
        <div class="row" v-if="finished">
            <div class="col-12 spacer">

            </div>
            <div class="col-12 text-center">
                <b-img
                        v-if="form.image_url.length"
                        :src="form.image_url"
                ></b-img>
            </div>
            <div class="text-center col-12 col-sm-6 offset-sm-3 col-md-4 offset-md-4">
                <b-button
                        v-on:click="webcamModal()"
                        variant="primary"
                        squared
                        block
                        size="sm"
                >
                    {{ $t('item_edit.form.button.startwebcam') }}
                </b-button>
            </div>
            <div class="col-12 spacer">

            </div>
            <div class="col-12">
                <b-form @submit.prevent="handleSubmit">
                    <b-form-group
                            id="image_placeholder-group"
                            :label="$t('item_edit.form.label.image_placeholder')"
                            label-for="image_placeholder">
                            <b-form-file
                                    v-model="form.image_placeholder"
                                    :state="Boolean(form.image_placeholder)"
                                    :placeholder="$t('item_edit.form.label.image_placeholder')"
                                    :drop-placeholder="$t('item_edit.form.label.image_placeholder')"
                            ></b-form-file>
                    </b-form-group>
                    <b-form-group
                            id="name-group"
                            :label="$t('item_edit.form.label.name')"
                            label-for="name">
                        <b-form-input
                                id="name"
                                v-model="form.name"
                                type="text"
                                required
                        />
                    </b-form-group>
                    <b-form-group
                            id="tag_number-group"
                            :label="$t('item_edit.form.label.tag_number')"
                            label-for="tag_number">
                        <b-form-input
                                id="tag_number"
                                v-model="form.tag_number"
                                type="text"
                        />
                    </b-form-group>
                    <b-form-group
                            id="label-group"
                            :label="$t('item_edit.form.label.category')"
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

                    <b-row>
                        <b-form-group
                                id="label-group"
                                :label="$t('item_edit.form.label.in_use')"
                                label-for="in_use"
                                class="col-12 col-md-4"
                        >
                            <b-form-checkbox
                                    v-model="form.in_use"
                                    size="lg"
                                    switch
                            >
                            </b-form-checkbox>
                        </b-form-group>
                        <b-form-group
                                id="label-group"
                                :label="$t('item_edit.form.label.broken')"
                                label-for="in_use"
                                class="col-12 col-md-4"
                        >
                            <b-form-checkbox
                                    v-model="form.broken"
                                    size="lg"
                                    switch
                            >
                            </b-form-checkbox>
                        </b-form-group>
                        <b-form-group
                                id="label-group"
                                :label="$t('item_edit.form.label.dirty')"
                                label-for="in_use"
                                class="col-12 col-md-4"
                        >
                            <b-form-checkbox
                                    v-model="form.dirty"
                                    size="lg"
                                    switch
                            >
                            </b-form-checkbox>
                        </b-form-group>
                    </b-row>

                    <b-form-group
                            id="label-group"
                            :label="$t('item_edit.form.label.container')"
                            label-for="container_id"
                    >
                        <b-form-select
                                v-model="form.container"
                                id="container_id"
                                required
                        >
                            <b-form-select-option-group
                                    v-for="location in locations"
                                    :key="location.location_id"
                                    :label="location.location_name"
                            >
                                <template v-for="container in containers">
                                    <b-form-select-option
                                            v-if="container.location_id === location.location_id"
                                            :key="container.id"
                                            :value="container.id"
                                    >
                                        {{container.name}}
                                    </b-form-select-option>
                                </template>
                            </b-form-select-option-group>

                        </b-form-select>
                    </b-form-group>

                    <b-form-group
                            v-for="prop in props"
                            :key="prop.id"
                            id="label-group"
                            :label="prop.name"
                            :label-for="prop.id"
                    >
                        <b-form-select
                                v-if="['select_one','select_multiple'].includes(prop.type)"
                                v-model="form.options[prop.id]"
                                :id="prop.id"
                                :multiple="prop.type === 'select_multiple'"
                                required
                        >
                            <template v-for="option in prop_options" >
                                <b-form-select-option
                                        v-if="option.id === prop.id"
                                        :value="option.option_id"
                                        :key="option.option_id"
                                >
                                    {{option.option_name}}
                                </b-form-select-option>
                            </template>
                        </b-form-select>

                        <b-form-checkbox
                                v-else-if="prop.type === 'toggle'"
                                v-model="form.options[prop.id]"
                                :id="prop.id"
                                size="lg"
                                switch
                        >
                        </b-form-checkbox>

                        <b-form-textarea
                                v-else-if="prop.type === 'free_text'"
                                id="textarea-default"
                                placeholder="Default textarea"
                        ></b-form-textarea>

                    </b-form-group>

                    <b-button-group class="float-right">
                        <b-button  v-on:click="$router.push('/item')" variant="primary">{{ $t('item_edit.form.button.back') }}</b-button>
                        <b-button  v-on:click="handleSubmit('/item/new')" variant="primary">{{ $t('item_edit.form.button.next') }}</b-button>
                        <b-button v-on:click="handleSubmit('/')" variant="success">{{ $t('item_edit.form.button.submit') }}</b-button>
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
        <b-modal
                id="webcamModal"
                :title="$t('item_edit.modal.webcam.title')"
                :ok-title="$t('item_edit.modal.webcam.ok')"
                :cancel-title="$t('item_edit.modal.webcam.cancel')"
                size="xl"
                @ok="webcamCapture()"
                @hide="webcamStop()"
                @shown="webcamStart()"
        >
            <div class="text-center">
                <video ref="video" id="video" width="640" height="480" autoplay></video>
                <canvas ref="canvas" id="canvas" width="640" height="480"></canvas>
            </div>
        </b-modal>
    </div>
</template>



<script>
  import validator from "validator/es";
  import { itemService, categoryService, storageContainerService, uploadService } from '../_services'

  export default {
    name: 'itemEdit',
    data: () => {
      return {
        finished: false,
        isNew: false,
        webcam: {
          video: {},
          canvas: {}
        },
        form: {
          name: '',
          category: '',
          container: '',
          dirty: false,
          broken: false,
          in_use: false,
          tag_number: '',
          image_url: '',
          image_placeholder: null,
          image_blob: null,
          options: {},
          processed_options: []
        },
        categories: [],
        containers: [],
        locations: [],
        props: [],
        prop_options: [],
        loaded_options: []
      }
    },
    async mounted() {
      categoryService.getAll().then((data) => {
        this.categories = data
      })
      storageContainerService.getAll().then((data) => {
        this.containers = data
        for(const container of this.containers) {
          if(this.locations.filter((v) => { return v.location_id === container.location_id}).length === 0) {
            this.locations.push({
              location_id: container.location_id,
              location_name: container.location_name
            })
          }
        }
      })
      await this.loaditem()
    },
    watch: {
        "form.image_placeholder": function(val) {
          this.form.image_url = URL.createObjectURL(val)
        },
        "form.category": function(val) {
          this.form.options = {}
          categoryService.getProperties(val).then((data) => {
            this.props = []
            this.prop_options = data
            for(const prop of this.prop_options) {
              if(this.props.filter((v) => { return v.id === prop.id}).length === 0) {
                switch(prop.property_type) {
                  case 'toggle': {
                    this.form.options[prop.id] = false
                    for(const opt of this.loaded_options) {
                      if(opt.prop_property_id === prop.id) {
                        this.form.options[prop.id] = opt.prop_val
                      }
                    }
                    break;
                  }
                  case 'select_multiple': {
                    this.form.options[prop.id] = []
                    for(const opt of this.loaded_options) {
                      if(opt.prop_property_id === prop.id) {
                        this.form.options[prop.id].push(opt.prop_option_id)
                      }
                    }
                    break;
                  }
                  default: {
                    this.form.options[prop.id] = ''
                    for(const opt of this.loaded_options) {
                      if(opt.prop_property_id === prop.id) {
                        if(opt.prop_option_id === null) {
                          this.form.options[prop.id] = opt.prop_val
                        } else {
                          this.form.options[prop.id] = opt.prop_option_id
                        }
                      }
                    }
                  }
                }
                this.props.push({
                  id: prop.id,
                  name: prop.name,
                  type: prop.property_type
                })
              }
            }
          })
        }
    },
    methods: {
      async handleSubmit(path) {
        this.finished = false
        if(this.form.image_placeholder !== null) {
          await uploadService.postImage(this.form.image_placeholder).then((data) => {
            this.form.image_url = data.url
          })
        } else if(this.form.image_blob !== null) {
          await uploadService.postImage(this.form.image_blob).then((data) => {
            this.form.image_url = data.url
          })
        } else if(this.isNew) {
          alert('image required')
        }
        this.processOptions()
        if(this.isNew) {
          itemService.post(this.form.name, this.form.category, this.form.container, this.form.dirty, this.form.broken,
            this.form.in_use, this.form.tag_number, this.form.image_url, this.form.processed_options
          ).then(() => {
            this.$router.push(path)
          })
        } else {
          itemService.put(this.$route.params.id, this.form.name, this.form.category, this.form.container,
            this.form.dirty, this.form.broken, this.form.in_use, this.form.tag_number, this.form.image_url,
            this.form.processed_options
          ).then(() => {
            this.$router.push(path)
          })
        }
      },
      async loaditem() {
        if(!validator.isUUID(this.$route.params.id)) {
          if(this.$route.params.id === 'new') {
            this.isNew = true
            this.finished = true
          } else {
            await this.$router.push('/item')
          }
        } else {
          itemService.get(this.$route.params.id).then((data) => {
            if(data.length === 0) {
              this.$router.push('/item')
            } else {
              this.form.name = data[0].name
              this.form.category = data[0].category_id
              this.form.container = data[0].storage_container_id
              this.form.dirty = data[0].dirty
              this.form.broken = data[0].broken
              this.form.in_use = data[0].in_use
              this.form.tag_number = data[0].tag_number
              this.form.image_url = data[0].image_url
              this.loaded_options = data

              this.finished = true
            }
          })
        }
      },
      webcamModal() {
        this.$bvModal.show('webcamModal')
      },
      webcamStart() {
        this.webcam.video = this.$refs.video;
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
            this.webcam.video.srcObject = stream;
            this.webcam.video.play();
          });
        }
      },
      webcamStop() {
        this.$bvModal.hide('webcamModal')
        this.webcam.video.srcObject.getTracks().forEach(function(track) {
          track.stop();
        });
      },
      webcamCapture() {
        this.webcam.canvas = this.$refs.canvas;
        this.webcam.canvas.getContext("2d").drawImage(this.webcam.video, 0, 0, 640, 480);
        this.$bvModal.hide('webcamModal')
        this.form.image_url = this.webcam.canvas.toDataURL("image/png")
        this.webcam.canvas.toBlob((blob) => {
          this.form.image_blob = blob
        })
      },
      processOptions() {
        this.form.processed_options = [];
        for(const key of Object.keys(this.form.options)) {
          if(Array.isArray(this.form.options[key])) {
            for (const opt in this.form.options[key]) {
              this.form.processed_options.push({
                propertyId: key,
                optionId: this.form.options[key][opt],
                freetext: null
              })
            }
          } else if(typeof this.form.options[key] === 'boolean') {
            this.form.processed_options.push({
              propertyId: key,
              optionId: null,
              freetext: this.form.options[key]
            })
          } else if(validator.isUUID(this.form.options[key])) {
            this.form.processed_options.push({
              propertyId: key,
              optionId: this.form.options[key],
              freetext: null
            })
          } else {
            this.form.processed_options.push({
              propertyId: key,
              optionId: null,
              freetext: this.form.options[key]
            })
          }
        }
      }
    }
  }
</script>

<style scoped>
    canvas {
        display: none;
    }
</style>
