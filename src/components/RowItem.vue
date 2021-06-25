<template>
    <div class="row">
      <div class="row-item">{{ list.id }}</div>
      <div class="row-item">{{ list.name }}</div>
      <div class="row-item">{{ list.status }}</div>
      <div class="row-item">{{ list.stage }}</div>
      <div class="row-item">{{ listID }}</div>
    </div>
</template>

<script>
export default {
  name: 'RowItem',

  props: ['list'],

  computed: {
    listID() {
      return this.list.moduleID || this.list.suborderID || this.list.orderID
    }
  }
};
</script>

<style>
.row {
  display: flex;
  border: 1px solid grey;
  border-top: 0;
}
.row-item {
  width: 20%;
  padding: 10px;
  border-right: 1px solid grey;
}
</style>