<template>
  <div>
    <div class="container">
      <Table :orders="modules" :stage="order.stage" title="Module" />
    </div>
    <div>
      <Detail
        v-for="module in modules"
        :key="module.id"
        :details="module.details"
        :id="module.id"
        :order="order"
        @onDetailCompleted="onDetailCompleted"
        @onSetStage="setStage"
      />
    </div>
  </div>
</template>

<script>
import Detail from "@/components/Detail.vue";
import Table from "@/components/Table.vue";

const WORK = "WORK";
const READY = "READY";
const FINISH = "FINISH";
const WAIT = "WAIT";

export default {
  name: "Module",
  components: {
    Detail,
    Table,
  },

  props: ["modules", "id", "order"],

  data() {
    return {
      time: 10000,
      // intervalID: 0,
      // isDetailCompleted: false,
      // orders: [],
      // worked: [],
      // finish: [],
      // modulesData: {
      //   id: 1,
      //   name: "Module",
      //   listID: 1,
      //   status: WAIT,
      //   stage: 1,
      // },
    };
  },

  // computed: {
  //   changeDetailCompleted() {
  //     return this.orders;
  //   },
  // },

  // watch: {
  //   changeDetailCompleted() {
  //     console.log('1111')
  //     // if (this.orders.status === READY) {
  //     // if (this.isDetailCompleted) {
  //       this.setWorked();
  //     // }
  //   },
  // },
  methods: {
    onDetailCompleted(id) {
      let obj = this.modules.find((item) => {
        if (item.id === id) {
          item.status = READY;
          return 1;
        }
      });
      if (obj) {
        this.setWorked();
        console.log("Step 2 started");
      }
    },

    setWorked() {
      let isReady = this.modules.find((item) => item.status === READY);
      if (isReady) {
        setTimeout(() => {
          let el = { ...this.modules.pop() };
          el.status = WORK;
          this.modules.unshift(el);

          setTimeout(() => {
            let obj = { ...this.modules.shift() };
            obj.status = FINISH;
            this.modules.unshift(obj);
            this.getNextStep();
            this.setWorked();
          }, this.time);
        }, 500);
      }
    },

    getNextStep() {
      const isFinished = this.modules.find(
        (item) =>
          item.suborderID === this.id &&
          (item.status === READY || item.status === WORK)
      );
      if (!isFinished) {
        console.log("Step 2 finished");
        this.$emit("onModuleCompleted", this.id);
        this.$emit("onSetStage", this.order.id);
      }
    },

    setStage(id) {
      this.$emit("onSetStage", id);
    },
  },

  computed: {
    
  },

  // created() {
  //   let modules = new Array(10).fill(this.data).map((order, index) => {
  //     return {
  //       id: index + 1,
  //       name: order.name,
  //       listID: order.listID,
  //       status: order.status,
  //       stage: order.stage,
  //     };
  //   });
  //   this.orders = orders;
  // },
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