<template>
  <b-container sm="12">
    <b-row>
      <b-col cols="6" align-h="text-right">
        <label>Configurations per page</label>
      </b-col>
      <b-col cols="2">
        <b-form-select class="w-10" v-model="perPage"
                         :options="options">
        </b-form-select>
      </b-col>
    </b-row>
    <p></p>
    <b-row>
      <b-col>
        <b-table size="sm" striped hover bordered :items="configurations"
                 :current-page="currentPage" :per-page="perPage">
        </b-table>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <b-pagination size="sm" :total-rows="configurations.length" align="center"
                      :per-page="perPage" v-model="currentPage"/>
        </b-col>
    </b-row>
    <generate-configurations-form ref="generateConfigurationsForm">
    </generate-configurations-form>
  </b-container>
</template>

<script>
import GenerateConfigurationsForm from './GenerateConfigurationsForm.vue';

export default {
  computed: {
    configurationSet() {
      return this.$store.getters.configurationSet;
    },
  },
  watch: {
    configurationSet(newVal) {
      if ('configurations' in newVal) {
        this.convertConfigurationsForDisplay();
      } else {
        this.configurations = [];
      }
    },
  },
  data() {
    return {
      configurations: [],
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
    convertConfigurationsForDisplay() {
      this.configurations = [];
      this.configurationSet.configurations.forEach((config) => {
        const displayConfig = {};
        Object.entries(config).forEach(([key, value]) => {
          if (!value.name) {
            displayConfig[key] = '***';
          } else {
            displayConfig[key] = value.name;
          }
        });
        this.configurations.push(displayConfig);
      });
    },
  },
};

</script>
