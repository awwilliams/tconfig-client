<template>
  <b-card-body>
    <b-row class="row align-items-start">
      <b-col class="col-sm-1">
        <p>Values</p>
      </b-col>
      <b-col class="col-sm-6">
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
    <ul class="list-group list-group-flush">
    <draggable v-model="parameter.values" group="values"
               @start="drag=true" @end="drag=false" @change="onDragChange($event)">
      <div :key="vindex" v-for="(value,vindex) in parameter.values" role="tablist">
        <value-item :parameter="parameter"
                    :value="value"
                    :index="vindex"
                    @edit-value="onEditValue($event)"
                    @reload-parameter-set="onReloadParameterSet"
                    @alert-message="onAlertMessage($event)">
        </value-item>
      </div>
    </draggable>
    </ul>
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
        const movedValue = this.parameter.values[newIndex];
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
};

</script>
