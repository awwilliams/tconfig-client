const mutations = {
  setParameterSet(state, newParmSet) {
    state.parameterSet = newParmSet;
  },
  setConfigurationSet(state, newConfigSet) {
    state.configurationSet = newConfigSet;
  },
  setStatus(state, status) {
    state.status = status;
  },
};

export default mutations;
