<template>
  <b-card-body>
    <b-button pill variant="success" size="sm"
              v-b-modal.add-value-form
              @click="onAddValue">
      <b-icon icon="plus-square-fill" aria-hidden="true" font-scale="1.5">
      </b-icon>
      Add Value
    </b-button>
    <ul class="list-group list-group-flush">
      <div :key="vindex" v-for="(value,vindex) in parameter.values" role="tablist">
        <value-item :parameter="parameter"
                    :value="value"
                    :index="vindex"
                    @edit-value="onEditValue($event)"
                    @reload-parameter-set="onReloadParameterSet"
                    @alert-message="onAlertMessage($event)">
        </value-item>
      </div>
    </ul>
  </b-card-body>
</template>

<script>
import ValueItem from './ValueItem.vue';

export default {
  props: {
    parameter: Object,
  },
  components: {
    'value-item': ValueItem,
  },
  methods: {
    onAlertMessage(message) {
      this.$emit('alert-message', message);
    },
    onReloadParameterSet() {
      this.$emit('reload-parameter-set');
    },
    onAddValue() {
      this.$emit('add-value', this.parameter);
    },
    onEditValue(value) {
      this.$emit('edit-value', value);
    },
  },
};

</script>
