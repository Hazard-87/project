<template>
  <div>
    <div class="container">
      <table>
        <caption>
          Detail ready
        </caption>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>status</th>
          <th>stage</th>
          <th>moduleID</th>
        </tr>
        <tr v-for="item in orders" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.status }}</td>
          <td>{{ item.stage }}</td>
          <td>{{ item.moduleID }}</td>
        </tr>
      </table>
      <table>
        <caption>Detail worked</caption>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>status</th>
          <th>stage</th>
          <th>moduleID</th>
        </tr>
        <tr v-for="item in worked" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.status }}</td>
          <td>{{ item.stage }}</td>
          <td>{{ item.moduleID }}</td>
        </tr>
      </table>
      <table>
        <caption>Detail finish</caption>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>status</th>
          <th>stage</th>
          <th>moduleID</th>
        </tr>
        <tr v-for="item in finish" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.status }}</td>
          <td>{{ item.stage }}</td>
          <td>{{ item.moduleID }}</td>
        </tr>
      </table>

      <!-- <div class="work">
        <h1>ready:</h1>
        <code>{{ orders }} </code>
      </div> -->
      <!-- <div class="worked">
        <h1>work:</h1>
        <code>{{ worked }} </code>
      </div>
      <div class="finish">
        <h1>finish:</h1>
        <code>{{ finish }} </code>
      </div> -->
    </div>
  </div>
</template>
<script>
const WORK = "WORK";
const READY = "READY";
const FINISH = "FINISH";

export default {
  props: ["id"],

  data() {
    return {
      time: 5000,
      intervalID: 0,
      orders: [],
      worked: [],
      finish: [],
      data: {
        id: 1,
        name: "detail",
        moduleID: 1,
        status: READY,
        stage: 1,
      },
    };
  },

  methods: {
    setWorked() {
      setTimeout(() => {
        if (this.orders.length) {
          let el = { ...this.orders.pop() };
          el.status = WORK;
          el.id = this.orders.length;
          this.worked.push(el);

          setTimeout(() => {
            let obj = { ...this.worked.shift() };
            obj.status = FINISH;
            obj.stage = 2;
            this.finish.unshift(obj);
            this.setWorked();
          }, this.time);
        } else {
          this.getNextStep();
        }
      }, 500);
    },

    getNextStep() {
      const itemOrders = this.orders.find((item) => item.moduleID === this.id);
      const itemWorked = this.worked.find((item) => item.moduleID === this.id);
      if (!itemOrders && !itemWorked) {
        console.log("Step 1 finished");
        this.$emit("onDetailCompleted", true);
      }
    },
  },

  created() {
    let orders = new Array(20).fill(this.data);
    this.orders = orders;

    this.setWorked();
  },
};
</script>

<style>
.container {
  display: flex;
  margin: 0 auto;
  align-items: flex-start;
  justify-content: space-between;
}

table {
   width: 600px;
   border-top: 3px solid grey;
    border-collapse: collapse;
    text-align: center;
    margin-right: 10px;
}

td:first-child {
   width: 30%;
}

th, td {
   width: 20%;
   padding: 10px 15px;
   border: 1px solid grey;
}

caption {
  caption-side: top;
  text-align: right;
  padding: 10px 0;
  font-size: 18px;
}
</style>