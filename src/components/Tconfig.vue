<template>
  <b-container class="col-sm-12">
    <h4>Test Configuration Generator</h4>
    <alert size="sm" show :message=message v-if="showMessage"></alert>
    <b-row>
      <b-col cols="6">
        <b-button pill variant="success" size="sm" v-b-modal.add-parameter-form>
          <b-icon icon="plus-square-fill" aria-hidden="true" font-scale="1.5">
          </b-icon>
          Add Parameter
        </b-button>
      </b-col>
      <b-col cols="5">
        <b-button pill variant="info" size="sm" v-b-modal.generate_configurations-form>
          <b-icon icon="play-fill" aria-hidden="true" font-scale="1.5">
          </b-icon>
          Generate Configurations
        </b-button>
      </b-col>
    </b-row>
    <hr>
    <parameter-set :parameterSet="parameterSet"
                   @alert-message="onAlertMessage($event)"
                   @reload-parameter-set="getParameterSet($event)">
    </parameter-set>
    <hr>
    <configurations :parameterSet="parameterSet"
                    @alert-message="onAlertMessage($event)">
    </configurations>
  </b-container>
</template>

<script>
import axios from 'axios';
import Config from './config';
import Alert from './Alert.vue';
import ParameterSet from './ParameterSet.vue';
import Configurations from './Configurations.vue';

export default {
  data() {
    return {
      parameterSet: {},
      message: '',
      showMessage: false,
    };
  },
  components: {
    alert: Alert,
    'parameter-set': ParameterSet,
    configurations: Configurations,
  },
  methods: {
    getParameterSet() {
      const path = Config.apiPrefix.concat('parameterset/');
      axios.get(path)
        .then((res) => {
          this.parameterSet = res.data.parameter_set;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    onAlertMessage(message) {
      this.message = message;
      this.showMessage = true;
    },
  },
  created() {
    this.getParameterSet();
  },
};

</script>
