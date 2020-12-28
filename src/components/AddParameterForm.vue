<template>
  <b-modal ref="addParameterForm"
           id="add-parameter-form"
           title="Add a new parameter"
           hide-footer>
    <b-form @submit="onSubmitAddParameter" @reset="onResetAddParameter">
      <b-form-group id="form-add-parameter-name-group"
                    label="Name:"
                    label-for="form-add-parameter-name-input">
        <b-form-input id="form-add-parameter-name-input"
                      type="text"
                      v-model="addParameterForm.name"
                      required
                      placeholder="Enter parameter name">
        </b-form-input>
      </b-form-group>
      <b-button-group>
        <b-button type="submit" variant="primary">Add</b-button>
        <b-button type="reset" variant="danger">Cancel</b-button>
      </b-button-group>
    </b-form>
  </b-modal>
</template>

<script>
import apiMixin from '../mixins/rest_api';

export default {
  mixins: [apiMixin],
  data() {
    return {
      addParameterForm: {
        name: '',
      },
    };
  },
  methods: {
    initForm() {
      this.addParameterForm.name = '';
    },
    onSubmitAddParameter(evt) {
      evt.preventDefault();
      this.$refs.addParameterForm.hide();
      // Next line function in 'apiMixin'
      this.apiAddParameter(this.addParameterForm.name);
      this.initForm();
    },
    onResetAddParameter(evt) {
      evt.preventDefault();
      this.$refs.addParameterForm.hide();
      this.initForm();
    },
  },
  created() {
    this.initForm();
  },
};

</script>
