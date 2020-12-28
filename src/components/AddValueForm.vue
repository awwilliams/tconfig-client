<template>
  <b-modal ref="addValueForm"
           id="add-value-form"
           title="Add a new value"
           hide-footer>
    <b-form @submit="onSubmitAddValue" @reset="onResetAddValue">
      <b-form-group id="form-add-value-name-group"
                    label="Name:"
                    label-for="form-add-value-name-input">
        <b-form-input id="form-add-value-name-input"
                      type="text"
                      v-model="addValueForm.name"
                      required
                      placeholder="Enter value name">
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
      addValueForm: {
        name: '',
      },
      parameter: {},
    };
  },
  methods: {
    initForm() {
      this.addValueForm.name = '';
    },
    setParameter(parameter) {
      this.parameter = parameter;
    },
    onSubmitAddValue(evt) {
      evt.preventDefault();
      this.$refs.addValueForm.hide();
      // Next line function in 'apiMixin'
      this.apiAddValue(this.parameter, this.addValueForm.name);
      this.initForm();
    },
    onResetAddValue(evt) {
      evt.preventDefault();
      this.$refs.addValueForm.hide();
      this.initForm();
    },
  },
  created() {
    this.initForm();
  },
};

</script>
