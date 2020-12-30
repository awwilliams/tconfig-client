<template>
  <div>
    <b-alert :variant="status.variant" show>{{ status.message }}</b-alert>
    <br>
  </div>
</template>

<script>
export default {
  props: ['status'],
};
</script>
