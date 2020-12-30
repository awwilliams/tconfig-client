<template>
  <b-card no-body>
    <parameter-item :parameter="parameter"
                    :index="index"
                    :editParameterForm="editParameterForm">
    </parameter-item>
    <b-collapse :id="'accordion-' + index" accordion="my-accordion" role="tabpanel">
      <value-list :parameter="parameter"
                  :addValueForm="addValueForm"
                  :editValueForm="editValueForm">
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
    editParameterForm: Object,
    addValueForm: Object,
    editValueForm: Object,
  },
  components: {
    'parameter-item': ParameterItemCardHeader,
    'value-list': ValueListCardBody,
  },
};

</script>
