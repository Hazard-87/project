<template>
    <div class="row">
      <div class="row-item">{{ list.id }}</div>
      <div class="row-item">{{ list.name }}</div>
      <div class="row-item">{{ list.status }}</div>
      <!-- <div v-if="stage">{{ stage }}</div>
      <div v-else>{{ item.stage }}</div>
      <div>{{ listID[index] }}</div> -->
      <!-- <div v-if="item.status === 'READY'>
        <button @click="$emit('onClick', index)">pause</button>
      </div>
      <div v-else-if="item.status === 'PAUSE'">
        <button @click="$emit('onClick', index)">ready</button>
      </div>
      <td v-else></td> -->
    </div>
</template>

<script>
export default {
  name: 'RowItem',

  props: ['list']
};
</script>

<style>
.row {
  display: flex;
  width: 600px;
  border: 1px solid grey;
}
.row-item {
  width: 33%;
  padding: 10px;
  border-right: 1px solid grey;
}
</style>