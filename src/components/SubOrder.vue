<template>
  <div>
    <h3>SubOrder</h3>
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
      <Module :id="data.id" @onModuleCompleted="onModuleCompleted" />
    </div>
  </div>
</template>

<script>
import Module from "@/components/Module.vue";

const WORK = "WORK";
const READY = "READY";
const FINISH = "FINISH";

export default {
  name: "SubOrder",
  components: {
    Module,
  },

  props: ["id"],

  data() {
    return {
      time: 15000,
      intervalID: 0,
      isModuleCompleted: false,
      orders: [],
      worked: [],
      finish: [],
      data: {
        id: 1,
        subOrderID: 1,
        status: READY,
        stage: 3,
      },
    };
  },

  computed: {
    changeModuleCompleted() {
      return this.isModuleCompleted;
    },
  },

  watch: {
    changeModuleCompleted() {
      if (this.isModuleCompleted) {
        this.setWorked();
      }
    },
  },
  methods: {
    onModuleCompleted(payload) {
      this.isModuleCompleted = payload;
      console.log('Step 3 started')
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
            obj.stage = 4;
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
        console.log("Step 3 finished");
        this.$emit("onSubOrderCompleted", true);
      }
    },
  },

  created() {
    let orders = new Array(4).fill(this.data);
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