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
import apiMixin from '../mixins/rest_api';
import dialogConfigMixin from '../mixins/confirm_dialog_options';

export default {
  props: {
    parameter: Object,
    value: Object,
    index: Number,
  },
  mixins: [apiMixin, dialogConfigMixin],
  methods: {
    onEditValue() {
      this.$emit('edit-value', this.value);
    },
    onDeleteValue() {
      this.$bvModal.msgBoxConfirm(
        `Please confirm that you want to delete value "${this.value.name}".`,
        this.confirmDialogOptions,
      )
        .then((confirmed) => {
          if (confirmed) {
            // Next line function in 'apiMixin'
            this.apiDeleteValue(this.parameter, this.value);
          } else {
            const message = 'Cancelled value delete';
            this.$emit('alert-message', message);
          }
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
  },
};

</script>
