import axios from 'axios';

const API_PREFIX = 'http://localhost:5000/tconfig/api/v1/';
const PARAMETER_SET_URL = API_PREFIX.concat('parameterset/');
const PARAMETER_URL = API_PREFIX.concat('parameters/');
const VALUE_URL = API_PREFIX.concat('values/');
const GENERATE_URL = API_PREFIX.concat('generate/');
const PARAMETER_SET_UPDATED_EVENT = 'parameter-set-updated';
const ALERT_EVENT = 'alert-message';
const GENERATE_EVENT = 'configurations-generated';

export default {
  data() {
    return {
    };
  },
  methods: {
    axiosError(error) {
      // eslint-disable-next-line
      console.error(error);
    },
    apiGetParameterSet(local = false) {
      axios.get(PARAMETER_SET_URL)
        .then((response) => {
          if (local) {
            this.parameterSet = response.data.parameter_set;
          } else {
            this.$emit(PARAMETER_SET_UPDATED_EVENT, response.data.parameter_set);
          }
        })
        .catch((error) => {
          this.axiosError(error);
        });
    },
    axiosDataError(error) {
      this.axiosError(error);
      this.apiGetParameterSet();
    },
    apiAddParameter(newName) {
      const payload = {
        name: newName,
      };
      axios.post(PARAMETER_URL, payload)
        .then(() => {
          this.apiGetParameterSet();
          const message = `Parameter "${newName}" added`;
          this.$emit(ALERT_EVENT, message);
        })
        .catch((error) => {
          this.axiosDataError(error);
        });
    },
    apiEditParameter(parameter, oldName) {
      const payload = {
        name: parameter.name,
      };
      axios.patch(PARAMETER_URL.concat(parameter.uid), payload)
        .then(() => {
          this.apiGetParameterSet();
          const message = `Parameter renamed from "${oldName}" to "${payload.name}"`;
          this.$emit(ALERT_EVENT, message);
        })
        .catch((error) => {
          this.axiosDataError(error);
        });
    },
    apiMoveParameter(name, oldIndex, newIndex) {
      const payload = {
        oldIndex,
        newIndex,
      };
      axios.put(PARAMETER_URL, payload)
        .then(() => {
          this.apiGetParameterSet();
          const message = `Parameter "${name}" moved from position ${oldIndex} to ${newIndex}`;
          this.$emit(ALERT_EVENT, message);
        })
        .catch((error) => {
          this.axiosDataError(error);
        });
    },
    apiDeleteParameter(parameter) {
      axios.delete(PARAMETER_URL.concat(parameter.uid))
        .then(() => {
          this.apiGetParameterSet();
          const message = `Parameter "${parameter.name}" removed`;
          this.$emit(ALERT_EVENT, message);
        })
        .catch((error) => {
          this.axiosDataError(error);
        });
    },
    apiAddValue(parameter, newName) {
      const path = PARAMETER_URL.concat(`${parameter.uid}/values/`);
      const payload = {
        name: newName,
      };
      axios.post(path, payload)
        .then(() => {
          this.apiGetParameterSet();
          const message = `Value "${newName}" added to parameter "${parameter.name}"`;
          this.$emit(ALERT_EVENT, message);
        })
        .catch((error) => {
          this.axiosDataError(error);
        });
    },
    apiEditValue(value, oldName) {
      const payload = {
        name: value.name,
      };
      axios.patch(VALUE_URL.concat(value.uid), payload)
        .then(() => {
          this.apiGetParameterSet();
          const message = `Value renamed from "${oldName}" to "${payload.name}"`;
          this.$emit(ALERT_EVENT, message);
        })
        .catch((error) => {
          this.axiosDataError(error);
        });
    },
    apiMoveValue(parameter, name, oldIndex, newIndex) {
      const path = PARAMETER_URL.concat(`${parameter.uid}/values/`);
      const payload = {
        oldIndex,
        newIndex,
      };
      axios.put(path, payload)
        .then(() => {
          this.apiGetParameterSet();
          let message = `Value "${name}" moved from position ${oldIndex} to ${newIndex}`;
          message = message.concat(` within parameter "${parameter.name}"`);
          this.$emit(ALERT_EVENT, message);
        })
        .catch((error) => {
          this.axiosDataError(error);
        });
    },
    apiDeleteValue(parameter, value) {
      axios.delete(VALUE_URL.concat(value.uid))
        .then(() => {
          this.apiGetParameterSet();
          let message = `Value "${value.name}" removed from `;
          message = message.concat(`parameter "${parameter.name}"`);
          this.$emit(ALERT_EVENT, message);
        })
        .catch((error) => {
          this.axiosDataError(error);
        });
    },
    apiGenerateConfigurations(parameterSet, algorithmName, coverageDegree) {
      const payload = {
        algorithm_name: algorithmName,
        coverage_degree: coverageDegree,
        parameter_set: parameterSet,
        existing_configurations: [],
      };
      axios.post(GENERATE_URL, payload)
        .then((response) => {
          const configurationSet = response.data.configuration_set;
          const numConfigs = configurationSet.configurations.length;
          const message = `${numConfigs} configurations generated`;
          this.$emit(ALERT_EVENT, message);
          this.$emit(GENERATE_EVENT, configurationSet);
        })
        .catch((error) => {
          this.axiosError(error);
        });
    },
  },
};
