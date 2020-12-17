<template>
  <b-card-header header-tag="header" class="p-1" role="tab">
    <b-row>
      <b-col>
        <b-button size="sm" block href="#" v-b-toggle="'accordion-' + index"
                  variant="outline-secondary">{{parameter.name}} -
          {{parameter.values.length}} values
        </b-button>
      </b-col>
      <b-col>
        <b-button pill variant="outline-dark" size="sm" class="mr-2">
          <b-icon icon="arrow-down-up" aria-hidden="true"></b-icon> Drag to reorder
        </b-button>
      </b-col>
      <b-col>
        <div class="btn-group" role="group">
          <b-button pill variant="warning" size="sm" class="mr-2"
                    v-b-modal.edit-parameter-form
                    @click="onEditParameter">
            <b-icon icon="pencil" aria-hidden="true"></b-icon>
            Update
          </b-button>
          <b-button pill variant="danger" size="sm" class="mr-2"
                    @click="onDeleteParameter">
            <b-icon icon="trash" aria-hidden="true"></b-icon>
            Delete
          </b-button>
        </div>
      </b-col>
    </b-row>
  </b-card-header>
</template>

<script>
import axios from 'axios';
import Config from './config';

export default {
  props: {
    parameterSet: Object,
    parameter: Object,
    index: Number,
  },
  methods: {
    alertMessage(message) {
      this.$emit('alert-message', message);
    },
    reloadParameterSet() {
      this.$emit('reload-parameter-set');
    },
    onEditParameter() {
      this.$emit('edit-parameter', this.parameter);
    },
    onDeleteParameter() {
      this.$bvModal.msgBoxConfirm(
        `Please confirm that you want to delete parameter "${this.parameter.name}".`,
        Config.confirmDialogOptions,
      )
        .then((confirmed) => {
          if (confirmed) {
            this.deleteParameter();
          } else {
            const message = 'Cancelled parameter delete';
            this.alertMessage(message);
          }
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    deleteParameter() {
      const path = Config.apiPrefix.concat('parameters/').concat(this.parameter.uid);
      axios.delete(path)
        .then(() => {
          this.reloadParameterSet();
          const message = `Parameter "${this.parameter.name}" removed`;
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
