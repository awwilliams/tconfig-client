<template>
  <b-modal
      ref="generateConfigurationsForm"
      id="generate-configurations-form"
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
import apiMixin from '../mixins/rest_api';

export default {
  mixins: [apiMixin],
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
      // Next line function in 'apiMixin'
      this.apiGenerateConfigurations(this.$store.getters.parameterSet,
        this.form.algorithmName,
        this.form.coverageDegree);
      this.initForm();
    },
    onResetGenerateForm(evt) {
      evt.preventDefault();
      this.$refs.generateConfigurationsForm.hide();
      this.initForm();
    },
  },
  created() {
    this.initForm();
    this.numConfigurations = 0;
  },
};
</script>
