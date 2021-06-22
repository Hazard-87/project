<template>
  <div>
    <h3>Module</h3>
    <div class="container">
      <div class="work">
        <h1>ready:</h1>
        <code>{{ orders }} </code>
      </div>
      <div class="worked">
        <h1>work:</h1>
        <code>{{ worked }} </code>
      </div>
      <div class="finish">
        <h1>finish:</h1>
        <code>{{ finish }} </code>
      </div>
    </div>
    <div>
      <Detail :id="data.id" @onDetailCompleted="onDetailCompleted" />
    </div>
  </div>
</template>

<script>
import Detail from "@/components/Detail.vue";

const WORK = "WORK";
const READY = "READY";
const FINISH = "FINISH";

export default {
  name: "Module",
  components: {
    Detail,
  },

  props: ["id"],

  data() {
    return {
      time: 10000,
      intervalID: 0,
      isDetailCompleted: false,
      orders: [],
      worked: [],
      finish: [],
      data: {
        id: 1,
        subOrderID: 1,
        status: READY,
        stage: 2,
      },
    };
  },

  computed: {
    changeDetailCompleted() {
      return this.isDetailCompleted;
    },
  },

  watch: {
    changeDetailCompleted() {
      if (this.isDetailCompleted) {
        this.setWorked();
      }
    },
  },
  methods: {
    onDetailCompleted(payload) {
      this.isDetailCompleted = payload;
      console.log('Step 2 started')
    },

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
            obj.stage = 3;
            this.finish.push(obj);
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
        console.log("Step 2 finished");
        this.$emit("onModuleCompleted", true);
      }
    },
  },

  created() {
    let orders = new Array(10).fill(this.data);
    this.orders = orders;
  },
};
</script>

<style>
.container {
  display: flex;
}
.work {
  width: 600px;
  margin-right: 100px;
}
.worked {
  width: 600px;
  margin-right: 100px;
}
.finish {
  width: 600px;
}
</style>