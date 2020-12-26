<template>
  <b-modal
      ref="generateConfigurationsForm"
      id="generate_configurations-form"
      title="Generate Configurations"
      hide-footer>
    <b-form @submit="onSubmitGenerateForm" @reset="onResetGenerateForm">
      <b-form-group id="form-generate-configs-algorithm-group"
                    label="Generation algorithm:"
                    label-for="form-generate-configs-algorithm-input">
        <b-form-radio v-model="form.algorithmName" name="alg-radios"
                      value="recursive" @change="onRecursiveAlgorithm">Recursive block method
        </b-form-radio>
        <b-form-radio v-model="form.algorithmName" name="alg-radios"
                      value="ipo">In-parameter order method
        </b-form-radio>
      </b-form-group>
      <b-form-group id="form-generate-configs-degree-group"
                    label="Coverage degree:"
                    label-for="form-generate-configs-degree-input">
        <b-form-select v-model="form.coverageDegree"
                       :options="coverageDegreeOptions"
                       :disabled="form.algorithmName=='recursive'">
        </b-form-select>
      </b-form-group>
      <b-button-group>
        <b-button type="submit" variant="primary">Generate</b-button>
        <b-button type="reset" variant="danger">Cancel</b-button>
      </b-button-group>
    </b-form>
  </b-modal>
</template>

<script>
import axios from 'axios';
import Config from './config';

export default {
  props: {
    parameterSet: Object,
  },
  data() {
    return {
      coverageDegreeOptions: [2, 3, 4, 5, 6],
      form: {
        algorithmName: 'recursive',
        coverageDegree: 2,
      },
    };
  },
  methods: {
    initForm() {
      this.form.algorithmName = 'recursive';
      this.form.coverageDegree = 2;
    },
    onRecursiveAlgorithm() {
      this.form.coverageDegree = 2;
    },
    onSubmitGenerateForm(evt) {
      evt.preventDefault();
      this.$refs.generateConfigurationsForm.hide();
      this.generateConfigurations();
      this.initForm();
    },
    onResetGenerateForm(evt) {
      evt.preventDefault();
      this.$refs.generateConfigurationsForm.hide();
      this.initForm();
    },
    generateConfigurations() {
      const path = Config.apiPrefix.concat('generate/');
      const payload = {
        algorithm_name: this.form.algorithmName,
        coverage_degree: this.form.coverageDegree,
        parameter_set: this.parameterSet,
        existing_configurations: [],
      };
      axios.post(path, payload)
        .then((response) => {
          const configurationSet = response.data.configuration_set;
          const numConfigs = configurationSet.configurations.length;
          const message = `${numConfigs} configurations generated`;
          this.$emit('alert-message', message);
          this.$emit('configurations-generated', configurationSet);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
  },
  created() {
    this.initForm();
    this.numConfigurations = 0;
  },
};
</script>
