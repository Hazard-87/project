<template>
    <div class="row">
      <div class="row-item">{{ list.id }}</div>
      <div class="row-item">{{ list.name }}</div>
      <div class="row-item">{{ list.status }}</div>
      <div class="row-item">{{ list.stage }}</div>
      <div class="row-item">{{ listID }}</div>
      <button v-if="list.status==='READY' || list.status === 'WAIT'" @click="$emit('onClick')">pause</button>
      <button v-else-if="list.status==='PAUSE'" @click="$emit('onClick')">start</button>
      <div v-else class="empty"></div>
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
button {
  width: 95px;
  padding: 5px;
  background-color: #fff;
  outline: none;
  border: 1px solid grey;
  cursor: pointer;
}
.empty {
  width: 100px;
}
</style>