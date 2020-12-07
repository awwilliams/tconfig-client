<template>
  <li class="list-group-item">
    <b-row size="sm">
      <b-col>{{value.name}}</b-col>
      <b-col>
        <div class="btn-group" role="group">
          <b-button pill variant="warning" size="sm" class="mr-2"
                    v-b-modal.edit-value-form
                    @click="onEditValue">
            <b-icon icon="pencil" aria-hidden="true"></b-icon>
          </b-button>
          <b-button pill variant="danger" size="sm" class="mr-2"
                    @click="onDeleteValue(parameter, value)">
            <b-icon icon="trash" aria-hidden="true"></b-icon>
          </b-button>
          <b-button pill variant="outline-info" size="sm" class="mr-2"
                    @click="onMoveUpValue(parameter, value)"
                    :disabled="isDisableMoveUpValue()">
            <b-icon icon="caret-up-fill" aria-hidden="true"></b-icon>
          </b-button>
          <b-button pill variant="outline-info" size="sm" class="mr-2"
                    @click="onMoveDownValue(parameter, value)"
                    :disabled="isDisableMoveDownValue()">
            <b-icon icon="caret-down-fill" aria-hidden="true"></b-icon>
          </b-button>
        </div>
      </b-col>
    </b-row>
  </li>
</template>

<script>
import axios from 'axios';
import Config from './config';

export default {
  props: {
    parameter: Object,
    value: Object,
    index: Number,
  },
  methods: {
    alertMessage(message) {
      this.$emit('alert-message', message);
    },
    reloadParameterSet() {
      this.$emit('reload-parameter-set');
    },
    onEditValue() {
      this.$emit('edit-value', this.value);
    },
    onDeleteValue() {
      this.$bvModal.msgBoxConfirm(
        `Please confirm that you want to delete value "${this.value.name}".`,
        Config.confirmDialogOptions,
      )
        .then((confirmed) => {
          if (confirmed) {
            this.deleteValue(this.parameter, this.value);
          } else {
            const message = 'Cancelled value delete';
            this.alertMessage(message);
          }
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    deleteValue() {
      const path = Config.apiPrefix.concat('values/').concat(this.value.uid);
      axios.delete(path)
        .then(() => {
          this.reloadParameterSet();
          let message = `Value "${this.value.name}" removed from `;
          message = message.concat(`parameter "${this.parameter.name}"`);
          this.alertMessage(message);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
          this.reloadParameterSet();
        });
    },
    isDisableMoveUpValue() {
      return this.index === 0;
    },
    onMoveUpValue() {
      const oldIndex = parseInt(this.value.position, 10);
      const newIndex = oldIndex - 1;
      this.moveValue(this.parameter, this.value.name, oldIndex, newIndex);
    },
    isDisableMoveDownValue() {
      return this.index >= this.parameter.values.length - 1;
    },
    onMoveDownValue() {
      const oldIndex = parseInt(this.value.position, 10);
      const newIndex = oldIndex + 1;
      this.moveValue(this.parameter, this.value.name, oldIndex, newIndex);
    },
    moveValue(parameter, name, oldIndex, newIndex) {
      const path = Config.apiPrefix.concat(`parameters/${parameter.uid}/values/`);
      const payload = {
        oldIndex,
        newIndex,
      };
      axios.put(path, payload)
        .then(() => {
          this.reloadParameterSet();
          let message = `Value "${name}" moved from position ${oldIndex} to ${newIndex}`;
          message = message.concat(` within parameter "${parameter.name}"`);
          this.alertMessage(message);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
          this.reloadParameterSet();
        });
    },
  },
};

</script>
