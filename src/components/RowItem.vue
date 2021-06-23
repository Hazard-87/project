<template>
  <li>
    <div v-for="(item, index) in orders" :key="index">
      <div>{{ item.id }}</div>
      <div>{{ item.name }}</div>
      <div>{{ item.status }}</div>
      <div v-if="stage">{{ stage }}</div>
      <div v-else>{{ item.stage }}</div>
      <div>{{ listID[index] }}</div>
      <!-- <div v-if="item.status === 'READY'>
        <button @click="$emit('onClick', index)">pause</button>
      </div>
      <div v-else-if="item.status === 'PAUSE'">
        <button @click="$emit('onClick', index)">ready</button>
      </div>
      <td v-else></td> -->
    </div>
  </li>
</template>

<script>
export default {};
</script>

<style>
</style>