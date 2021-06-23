<template>
  <div>
    <!-- <div class="wrapper">
      <span>{{ title }}</span>
      <Form />
    </div> -->
    <table>
      <!-- <caption>
      {{
        title
      }}
    </caption> -->

      <tr>
        <th>id</th>
        <th>name</th>
        <th>status</th>
        <th>stage</th>
        <th v-if="orders[0].orderID">orderID</th>
        <th v-else-if="orders[0].suborderID">suborderID</th>
        <th v-else-if="orders[0].moduleID">moduleID</th>
        <th v-else></th>
        <th>pause</th>
      </tr>
      <template>
        <tr v-for="(item, index) in orders" :key="index">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.status }}</td>
          <td v-if="stage">{{ stage }}</td>
          <td v-else>{{ item.stage }}</td>
          <td>{{ listID[index] }}</td>
          <td v-if="item.status === 'READY'">
            <button @click="$emit('onClick', index)">pause</button>
          </td>
          <td v-else-if="item.status === 'PAUSE'">
            <button @click="$emit('onClick', index)">ready</button>
          </td>
          <td v-else></td>
        </tr>
      </template>
    </table>
  </div>
</template>


<script>
import Form from "@/components/Form.vue";

export default {
  name: "Table",

  components: {
    Form,
  },

  props: ["orders", "title", "stage"],

  computed: {
    listID() {
      return this.orders.map(
        (order) => order.orderID || order.suborderID || order.moduleID
      );
    },
  },
};
</script>


<style>
.wrapper {
  display: flex;
}

table {
  width: 600px;
  border-top: 3px solid grey;
  border-collapse: collapse;
  text-align: center;
  margin-right: 10px;
  margin-bottom: 20px;
  margin-top: 5px;
}

th,
td {
  width: 20%;
  padding: 10px 15px;
  border: 1px solid grey;
}

caption {
  text-align: right;
  padding: 5px 0;
  font-size: 18px;
}
</style>