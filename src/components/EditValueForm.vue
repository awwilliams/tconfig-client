<template>
  <b-modal ref="editValueForm"
           id="edit-value-form"
           title="Edit value"
           hide-footer>
    <b-form @submit="onSubmitEditValue" @reset="onResetEditValue" class="w-100">
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
import axios from 'axios';
import Config from './config';

export default {
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
    alertMessage(message) {
      this.$emit('alert-message', message);
    },
    reloadParameterSet() {
      this.$emit('reload-parameter-set');
    },
    onEditValue(value) {
      this.form = value;
      this.oldValueName = value.name;
    },
    onSubmitEditValue(evt) {
      evt.preventDefault();
      this.$refs.editValueForm.hide();
      this.editValue(this.form);
      this.initForm();
    },
    onResetEditValue(evt) {
      evt.preventDefault();
      this.$refs.editValueForm.hide();
      this.initForm();
      this.oldValueName = '';
      this.reloadParameterSet();
    },
    editValue(value) {
      const path = Config.apiPrefix.concat('values/').concat(value.uid);
      const payload = {
        name: value.name,
      };
      axios.patch(path, payload)
        .then(() => {
          this.reloadParameterSet();
          const message = `Value renamed from "${this.oldValueName}" to "${payload.name}"`;
          this.alertMessage(message);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
          this.reloadParameterSet();
        });
    },
  },
  created() {
    this.initForm();
    this.oldValueName = '';
  },
};

</script>
