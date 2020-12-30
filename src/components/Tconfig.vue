<template>
  <b-container sm>
    <h4>Test Configuration Generator</h4>
    <status size="sm" show :status=status></status>
    <b-row>
      <b-col cols="6">
        <b-button pill variant="success" size="sm" v-b-modal.add-parameter-form>
          <b-icon icon="plus-square-fill" aria-hidden="true" font-scale="1.5">
          </b-icon>
          Add Parameter
        </b-button>
      </b-col>
      <b-col cols="5">
        <b-button pill variant="info" size="sm" v-b-modal.generate-configurations-form>
          <b-icon icon="play-fill" aria-hidden="true" font-scale="1.5">
          </b-icon>
          Generate Configurations
        </b-button>
      </b-col>
    </b-row>
    <hr>
    <parameter-set :parameterSet="parameterSet">
    </parameter-set>
    <hr>
    <configurations :parameterSet="parameterSet">
    </configurations>
  </b-container>
</template>

<script>
import apiMixin from '../mixins/rest_api';

import Status from './Status.vue';
import ParameterSet from './ParameterSet.vue';
import Configurations from './Configurations.vue';

export default {
  mixins: [apiMixin],
  computed: {
    parameterSet() {
      return this.$store.getters.parameterSet;
    },
    status() {
      return this.$store.getters.status;
    },
  },
  components: {
    status: Status,
    'parameter-set': ParameterSet,
    configurations: Configurations,
  },
  created() {
    this.apiGetParameterSet();
  },
};

</script>
