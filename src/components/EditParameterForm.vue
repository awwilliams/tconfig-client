<template>
  <b-modal ref="editParameterForm"
           id="edit-parameter-form"
           title="Edit parameter"
           hide-footer>
    <b-form @submit="onSubmitEditParameter" @reset="onResetEditParameter" class="w-100">
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
import axios from 'axios';
import Config from './config';

export default {
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
    alertMessage(message) {
      this.$emit('alert-message', message);
    },
    reloadParameterSet() {
      this.$emit('reload-parameter-set');
    },
    onEditParameter(parameter) {
      this.form = parameter;
      this.oldParameterName = parameter.name;
    },
    onSubmitEditParameter(evt) {
      evt.preventDefault();
      this.$refs.editParameterForm.hide();
      this.editParameter(this.form);
      this.initForm();
    },
    onResetEditParameter(evt) {
      evt.preventDefault();
      this.$refs.editParameterForm.hide();
      this.initForm();
      this.oldParameterName = '';
      this.reloadParameterSet();
    },
    editParameter(parameter) {
      const path = Config.apiPrefix.concat('parameters/').concat(parameter.uid);
      const payload = {
        name: parameter.name,
      };
      axios.patch(path, payload)
        .then(() => {
          this.reloadParameterSet();
          const message = `Parameter renamed from "${this.oldParameterName}" to "${payload.name}"`;
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
    this.oldParameterName = '';
  },
};

</script>
