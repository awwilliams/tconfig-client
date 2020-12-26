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
import axios from 'axios';
import Config from './config';

export default {
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
    alertMessage(message) {
      this.$emit('alert-message', message);
    },
    reloadParameterSet() {
      this.$emit('reload-parameter-set');
    },
    onSubmitAddParameter(evt) {
      evt.preventDefault();
      this.$refs.addParameterForm.hide();
      this.addParameter(this.addParameterForm.name);
      this.initForm();
    },
    onResetAddParameter(evt) {
      evt.preventDefault();
      this.$refs.addParameterForm.hide();
      this.initForm();
    },
    addParameter(newName) {
      const path = Config.apiPrefix.concat('parameters/');
      const payload = {
        name: newName,
      };
      axios.post(path, payload)
        .then(() => {
          const message = `Parameter "${newName}" added`;
          this.alertMessage(message);
          this.reloadParameterSet();
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
          this.reloadParameterSet();
        });
    },
  },
  created() {
    this.initForm();
  },
};

</script>
