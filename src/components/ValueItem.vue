<template>
  <b-list-group-item>
    <b-row size="sm">
      <b-col>{{value.name}}</b-col>
      <b-col>
        <b-button pill variant="outline-dark" size="sm">
          <b-icon icon="arrow-down-up" aria-hidden="true"></b-icon>
        </b-button>
      </b-col>
      <b-col>
        <b-button-group>
          <b-button pill variant="warning" size="sm" class="mr-2"
                    v-b-modal.edit-value-form
                    @click="onEditValue">
            <b-icon icon="pencil" aria-hidden="true"></b-icon>
          </b-button>
          <b-button pill variant="danger" size="sm" class="mr-2"
                    @click="onDeleteValue(parameter, value)">
            <b-icon icon="trash" aria-hidden="true"></b-icon>
          </b-button>
        </b-button-group>
      </b-col>
    </b-row>
  </b-list-group-item>
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
  },
};

</script>
