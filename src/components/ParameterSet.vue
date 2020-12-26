<template>
  <b-container>
    <h6 class="text-left">Parameters:</h6>
    <draggable v-model="parameterList" group="parameters" item-key="uid"
               @start="drag=true" @end="drag=false" @change="onDragChange($event)">
      <parameter-card :key="parameter.uid"
                      v-for="(parameter,pindex) in parameterList" role="tablist"
                      :parameter="parameter"
                      :index="pindex"
                      @edit-parameter="$refs.editParameterForm.onEditParameter(parameter)"
                      @add-value="$refs.addValueForm.setParameter($event)"
                      @edit-value="$refs.editValueForm.onEditValue($event)"
                      @reload-parameter-set="onReloadParameterSet"
                      @alert-message="onAlertMessage($event)">
      </parameter-card>
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
  </b-container>
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
  // Take a copy of the list of parameters to set up drag and
  // drop for re-ordering parameters - mutating a prop directly
  // is a Vue anti-pattern, and deprecated.
  watch: {
    parameterSet(newVal) {
      if ('parameters' in newVal) {
        this.parameterList = [...newVal.parameters];
      } else {
        this.parameterList = [];
      }
    },
  },
  data() {
    return {
      parameterList: [],
    };
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
        const movedParameter = this.parameterList[newIndex];
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
  created() {
    this.parameterList = [...this.parameterSet.parameters];
  },
};

</script>
