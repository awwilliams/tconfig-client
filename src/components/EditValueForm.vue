<template>
  <b-modal ref="editValueForm"
           id="edit-value-form"
           title="Edit value"
           hide-footer>
    <b-form @submit="onSubmitEditValue" @reset="onResetEditValue">
      <b-form-group id="form-edit-value-name-group"
                    label="Name:"
                    label-for="form-edit-value-name-input">
        <b-form-input id="form-edit-value-name-input"
                      type="text"
                      v-model="form.name"
                      required
                      placeholder="Enter value name">
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
      parameter: {},
    };
  },
  methods: {
    initForm() {
      this.form.uid = '';
      this.form.name = '';
    },
    onEditValue(value) {
      this.form = value;
      this.oldValueName = value.name;
    },
    onSubmitEditValue(evt) {
      evt.preventDefault();
      this.$refs.editValueForm.hide();
      // Next line function in 'apiMixin'
      this.apiEditValue(this.form, this.oldValueName);
      this.initForm();
    },
    onResetEditValue(evt) {
      evt.preventDefault();
      this.$refs.editValueForm.hide();
      this.initForm();
      this.oldValueName = '';
      this.reloadParameterSet();
    },
  },
  created() {
    this.initForm();
    this.oldValueName = '';
  },
};

</script>
