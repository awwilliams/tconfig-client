<template>
  <b-modal ref="addValueForm"
           id="add-value-form"
           title="Add a new value"
           hide-footer>
    <b-form @submit="onSubmitAddValue" @reset="onResetAddValue" class="w-100">
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
import axios from 'axios';
import Config from './config';

export default {
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
    alertMessage(message) {
      this.$emit('alert-message', message);
    },
    reloadParameterSet() {
      this.$emit('reload-parameter-set');
    },
    setParameter(parameter) {
      this.parameter = parameter;
    },
    onSubmitAddValue(evt) {
      evt.preventDefault();
      this.$refs.addValueForm.hide();
      this.addValue(this.parameter, this.addValueForm.name);
      this.initForm();
    },
    onResetAddValue(evt) {
      evt.preventDefault();
      this.$refs.addValueForm.hide();
      this.initForm();
    },
    addValue(parameter, newName) {
      const path = Config.apiPrefix.concat(`parameters/${parameter.uid}/values/`);
      const payload = {
        name: newName,
      };
      axios.post(path, payload)
        .then(() => {
          this.reloadParameterSet();
          const message = `Value "${newName}" added to parameter "${parameter.name}"`;
          this.alertMessage(message);
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
