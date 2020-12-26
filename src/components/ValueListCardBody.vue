<template>
  <b-card-body>
    <b-row align-h="start">
      <b-col cols="1">
        <p>Values</p>
      </b-col>
      <b-col cols="6">
        <b-button pill variant="success" size="sm"
                  v-b-modal.add-value-form
                  @click="onAddValue">
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
                    @edit-value="onEditValue($event)"
                    @reload-parameter-set="onReloadParameterSet"
                    @alert-message="onAlertMessage($event)">
        </value-item>
      </draggable>
    </b-list-group>
  </b-card-body>
</template>

<script>
import draggable from 'vuedraggable';
import axios from 'axios';
import Config from './config';

import ValueItem from './ValueItem.vue';

export default {
  props: {
    parameter: Object,
  },
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
    onDragChange(eventInfo) {
      if ('moved' in eventInfo) {
        const { oldIndex, newIndex } = eventInfo.moved;
        const movedValue = this.valueList[newIndex];
        this.moveValue(this.parameter, movedValue.name, oldIndex, newIndex);
      }
    },
    onMoveValue(eventInfo) {
      this.moveValue(eventInfo.parameter, eventInfo.name, eventInfo.oldIndex, eventInfo.newIndex);
    },
    moveValue(parameter, name, oldIndex, newIndex) {
      const path = Config.apiPrefix.concat(`parameters/${parameter.uid}/values/`);
      const payload = {
        oldIndex,
        newIndex,
      };
      axios.put(path, payload)
        .then(() => {
          this.onReloadParameterSet();
          let message = `Value "${name}" moved from position ${oldIndex} to ${newIndex}`;
          message = message.concat(` within parameter "${parameter.name}"`);
          this.onAlertMessage(message);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
          this.onReloadParameterSet();
        });
    },
  },
  created() {
    this.valueList = [...this.parameter.values];
  },
};

</script>
