<template>
  <b-modal ref="editParameterForm"
           id="edit-parameter-form"
           title="Edit parameter"
           hide-footer>
    <b-form @submit="onSubmitEditParameter" @reset="onResetEditParameter">
      <b-form-group id="form-edit-parameter-name-group"
                    label="Name:"
                    label-for="form-edit-parameter-name-input">
        <b-form-input id="form-edit-parameter-name-input"
                      type="text"
                      v-model="form.name"
                      required
                      placeholder="Enter parameter name">
        </b-form-input>
      </b-form-group>
      <b-button-group>
        <b-button type="submit" variant="primary">Update</b-button>
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
      form: {
        uid: '',
        name: '',
      },
    };
  },
  methods: {
    initForm() {
      this.form.uid = '';
      this.form.name = '';
    },
    onEditParameter(parameter) {
      this.form = parameter;
      this.oldParameterName = parameter.name;
    },
    onSubmitEditParameter(evt) {
      evt.preventDefault();
      this.$refs.editParameterForm.hide();
      // Next line function in 'apiMixin'
      this.apiEditParameter(this.form, this.oldParameterName);
      this.initForm();
    },
    onResetEditParameter(evt) {
      evt.preventDefault();
      this.$refs.editParameterForm.hide();
      this.initForm();
      this.oldParameterName = '';
      this.reloadParameterSet();
    },
  },
  created() {
    this.initForm();
    this.oldParameterName = '';
  },
};

</script>
