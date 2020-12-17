<template>
  <div>
    <draggable v-model="parameterSet.parameters" group="parameters"
               @start="drag=true" @end="drag=false" @change="onDragChange($event)">
      <div :key="pindex"
           v-for="(parameter,pindex) in parameterSet.parameters" role="tablist">
        <parameter-card :parameterSet="parameterSet"
                        :parameter="parameter"
                        :index="pindex"
                        @edit-parameter="$refs.editParameterForm.onEditParameter(parameter)"
                        @add-value="$refs.addValueForm.setParameter($event)"
                        @edit-value="$refs.editValueForm.onEditValue($event)"
                        @reload-parameter-set="onReloadParameterSet"
                        @alert-message="onAlertMessage($event)">
        </parameter-card>
      </div>
    </draggable>
    <add-parameter-form ref="addParameterForm"
                        @alert-message="onAlertMessage($event)"
                        @reload-parameter-set="onReloadParameterSet">
    </add-parameter-form>
    <edit-parameter-form ref="editParameterForm"
                         @alert-message="onAlertMessage($event)"
                         @reload-parameter-set="onReloadParameterSet">
    </edit-parameter-form>
    <add-value-form ref="addValueForm"
                    @alert-message="onAlertMessage($event)"
                    @reload-parameter-set="onReloadParameterSet">
    </add-value-form>
    <edit-value-form ref="editValueForm"
                     @alert-message="onAlertMessage($event)"
                     @reload-parameter-set="onReloadParameterSet">
    </edit-value-form>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import axios from 'axios';
import Config from './config';

import ParameterCard from './ParameterCard.vue';
import AddParameterForm from './AddParameterForm.vue';
import EditParameterForm from './EditParameterForm.vue';
import AddValueForm from './AddValueForm.vue';
import EditValueForm from './EditValueForm.vue';

export default {
  props: {
    parameterSet: Object,
  },
  components: {
    draggable,
    'parameter-card': ParameterCard,
    'add-parameter-form': AddParameterForm,
    'edit-parameter-form': EditParameterForm,
    'add-value-form': AddValueForm,
    'edit-value-form': EditValueForm,
  },
  methods: {
    onAlertMessage(message) {
      this.$emit('alert-message', message);
    },
    onReloadParameterSet() {
      this.$emit('reload-parameter-set');
    },
    onDragChange(eventInfo) {
      if ('moved' in eventInfo) {
        const { oldIndex, newIndex } = eventInfo.moved;
        const movedParameter = this.parameterSet.parameters[newIndex];
        this.moveParameter(movedParameter.name, oldIndex, newIndex);
      }
    },
    moveParameter(name, oldIndex, newIndex) {
      const path = Config.apiPrefix.concat('parameters/');
      const payload = {
        oldIndex,
        newIndex,
      };
      axios.put(path, payload)
        .then(() => {
          this.onReloadParameterSet();
          const message = `Parameter "${name}" moved from position ${oldIndex} to ${newIndex}`;
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
