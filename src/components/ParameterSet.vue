<template>
  <b-container>
    <add-parameter-form ref="addParameterForm"></add-parameter-form>
    <edit-parameter-form ref="editParameterForm"></edit-parameter-form>
    <add-value-form ref="addValueForm"></add-value-form>
    <edit-value-form ref="editValueForm"></edit-value-form>
    <h6 class="text-left">Parameters:</h6>
    <draggable v-model="parameterList" group="parameters" item-key="uid"
               @start="drag=true" @end="drag=false" @change="onDragChange($event)">
      <parameter-card :key="parameter.uid"
                      v-for="(parameter,pindex) in parameterList" role="tablist"
                      :parameter="parameter"
                      :index="pindex"
                      :editParameterForm="$refs.editParameterForm"
                      :addValueForm="$refs.addValueForm"
                      :editValueForm="$refs.editValueForm">
      </parameter-card>
    </draggable>
  </b-container>
</template>

<script>
import draggable from 'vuedraggable';
import apiMixin from '../mixins/rest_api';

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
  mixins: [apiMixin],
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
    onDragChange(eventInfo) {
      if ('moved' in eventInfo) {
        const { oldIndex, newIndex } = eventInfo.moved;
        const movedParameter = this.parameterList[newIndex];
        // Next line function in 'apiMixin'
        this.apiMoveParameter(movedParameter.name, oldIndex, newIndex);
      }
    },
  },
};

</script>
