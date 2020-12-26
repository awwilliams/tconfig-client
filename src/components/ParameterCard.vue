<template>
  <b-card no-body>
    <parameter-item :parameter="parameter"
                    :index="index"
                    @edit-parameter="onEditParameter($event)"
                    @reload-parameter-set="onReloadParameterSet"
                    @alert-message="onAlertMessage($event)">
    </parameter-item>
    <b-collapse :id="'accordion-' + index" accordion="my-accordion" role="tabpanel">
      <value-list :parameter="parameter"
                  @add-value="onAddValue"
                  @edit-value="onEditValue($event)"
                  @reload-parameter-set="onReloadParameterSet"
                  @alert-message="onAlertMessage($event)">
      </value-list>
    </b-collapse>
  </b-card>
</template>

<script>
import ParameterItemCardHeader from './ParameterItemCardHeader.vue';
import ValueListCardBody from './ValueListCardBody.vue';

export default {
  props: {
    parameter: Object,
    index: Number,
  },
  components: {
    'parameter-item': ParameterItemCardHeader,
    'value-list': ValueListCardBody,
  },
  methods: {
    onAlertMessage(message) {
      this.$emit('alert-message', message);
    },
    onReloadParameterSet() {
      this.$emit('reload-parameter-set');
    },
    onEditParameter() {
      this.$emit('edit-parameter', this.parameter);
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
