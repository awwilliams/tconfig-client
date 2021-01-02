<template>
  <b-card-body>
    <b-row align-h="start">
      <b-col>
        <p>Values</p>
      </b-col>
      <b-col>
        <b-button pill variant="success" size="sm"
                  v-b-modal.add-value-form
                  @click="addValueForm.setParameter(parameter)">
          <b-icon icon="plus-square-fill" aria-hidden="true" font-scale="1.5">
          </b-icon>
          Add Value
        </b-button>
      </b-col>
    </b-row>
    <hr>
    <b-list-group flush>
      <draggable v-model="valueList" group="values" item-key="uid"
                 @start="drag=true" @end="drag=false" @change="onDragChange($event)">
        <value-item :key="value.uid"
                    v-for="(value,vindex) in valueList"
                    role="tablist"
                    :parameter="parameter"
                    :value="value"
                    :index="vindex"
                    :editValueForm="editValueForm">
        </value-item>
      </draggable>
    </b-list-group>
  </b-card-body>
</template>

<script>
import draggable from 'vuedraggable';
import apiMixin from '../mixins/rest_api';

import ValueItem from './ValueItem.vue';

export default {
  props: {
    parameter: Object,
    addValueForm: Object,
    editValueForm: Object,
  },
  mixins: [apiMixin],
  components: {
    draggable,
    'value-item': ValueItem,
  },
  // Take a copy of the list of values to set up drag and
  // drop for re-ordering parameters - mutating a prop directly
  // is a Vue anti-pattern, and deprecated.
  watch: {
    parameter(newVal) {
      if ('values' in newVal) {
        this.valueList = [...newVal.values];
      } else {
        this.ValueList = [];
      }
    },
  },
  data() {
    return {
      valueList: [],
    };
  },
  methods: {
    onDragChange(eventInfo) {
      if ('moved' in eventInfo) {
        const { oldIndex, newIndex } = eventInfo.moved;
        const movedValue = this.valueList[newIndex];
        // Next line function in 'apiMixin'
        this.apiMoveValue(this.parameter, movedValue.name, oldIndex, newIndex);
      }
    },
  },
  created() {
    this.valueList = [...this.parameter.values];
  },
};

</script>
