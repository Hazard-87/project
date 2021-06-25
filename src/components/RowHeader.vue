<template>
    <div class="row-header">
      <div class="row-item">ID</div>
      <div class="row-item">Name</div>
      <div class="row-item">Status</div>
      <div class="row-item">Stage</div>
      <div v-if="listID" class="row-item">{{ listID }}</div>
      <div v-else class="row-item"></div>
    </div>
</template>
<script>
export default {
    name: 'RowHeader',

    props: ['listID'],
}
</script>
<style>
    .row-header {
  display: flex;
  border: 1px solid grey;
}
.row-item {
  width: 20%;
  padding: 10px;
  border-right: 1px solid grey;
}
</style>