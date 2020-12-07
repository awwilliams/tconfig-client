<template>
  <div class="container">
    <div class="col-sm-10">
      <b-row>
        <b-col>
          <label>Number of configurations per page</label>
        </b-col>
        <b-col>
          <b-form-select class="w-10" v-model="perPage"
                         :options="options">
          </b-form-select>
        </b-col>
      </b-row>
    </div>
    <p></p>
    <b-table size="sm" striped hover :items="configurations"
             :current-page="currentPage" :per-page="perPage">
    </b-table>
    <div class="justify-content-center row my-1">
      <b-pagination size="md" :total-rows="configurations.length"
                    :per-page="perPage" v-model="currentPage"/>
    </div>
    <generate-configurations-form ref="generateConfigurationsForm"
                                  :parameterSet="parameterSet"
                                  @configurations-generated="configurationsGenerated($event)"
                                  @alert-message="alertMessage($event)">
    </generate-configurations-form>
  </div>
</template>

<script>
import GenerateConfigurationsForm from './GenerateConfigurationsForm.vue';

export default {
  props: {
    parameterSet: Object,
  },
  data() {
    return {
      configurations: [],
      configurationSet: {},
      perPage: 5,
      currentPage: 1,
      options: [
        { text: '5', value: 5 },
        { text: '10', value: 10 },
        { text: '25', value: 25 },
        { text: 'All', value: 0 },
      ],
    };
  },
  components: {
    'generate-configurations-form': GenerateConfigurationsForm,
  },
  methods: {
    alertMessage(message) {
      this.$emit('alert-message', message);
    },
    configurationsGenerated(configurationSet) {
      this.configurationSet = configurationSet;
      this.convertConfigurationsForDisplay();
    },
    convertConfigurationsForDisplay() {
      this.configurations = [];
      this.configurationSet.configurations.forEach((config) => {
        const displayConfig = {};
        Object.entries(config).forEach(([key, value]) => {
          displayConfig[key] = value.name;
        });
        this.configurations.push(displayConfig);
      });
    },
  },
};

</script>
