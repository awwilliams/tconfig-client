<template>
  <b-card-header header-tag="header" class="p-1" role="tab">
    <b-row>
      <b-col cols="6">
        <b-button size="sm" block href="#" v-b-toggle="'accordion-' + index"
                  variant="outline-secondary">{{parameter.name}} -
          {{parameter.values.length}} values
        </b-button>
      </b-col>
      <b-col>
        <b-button pill variant="outline-dark" size="sm">
          <b-icon icon="arrow-down-up" aria-hidden="true"></b-icon> Drag to reorder
        </b-button>
      </b-col>
      <b-col>
        <b-button-group>
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
        </b-button-group>
      </b-col>
    </b-row>
  </b-card-header>
</template>

<script>
import apiMixin from '../mixins/rest_api';
import dialogConfigMixin from '../mixins/confirm_dialog_options';

export default {
  props: {
    parameter: Object,
    index: Number,
  },
  mixins: [apiMixin, dialogConfigMixin],
  methods: {
    onEditParameter() {
      this.$emit('edit-parameter', this.parameter);
    },
    onDeleteParameter() {
      this.$bvModal.msgBoxConfirm(
        `Please confirm that you want to delete parameter "${this.parameter.name}".`,
        this.confirmDialogOptions,
      )
        .then((confirmed) => {
          if (confirmed) {
            // Next line function in 'apiMixin'
            this.apiDeleteParameter(this.parameter);
          } else {
            const message = 'Cancelled parameter delete';
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
