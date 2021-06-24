<template>
  <div>
    <RowItem
      v-for="suborder in Suborders"
      :key="suborder.id"
      :list="suborder"
    />
  </div>
</template>

<script>
import RowItem from "@/components/RowItem.vue";
import { mapGetters, mapActions } from 'vuex';

const WORK = "WORK";
const READY = "READY";
const FINISH = "FINISH";
const WAIT = "WAIT";

export default {
  name: "SubOrder",
  components: {
    RowItem,
  },

  data() {
    return {
      time: 15000,
    };
  },

  methods: {
     ...mapActions(['orderStepAction']),
  //   onModuleCompleted(id) {
  //     let obj = this.order.suborders.find((item) => {
  //       if (item.id === id) {
  //         item.status = READY;
  //         return 1;
  //       }
  //     });
  //     if (obj) {
  //       this.setWorked();
  //       console.log("Step 3 started");
  //     }
    // },

    setWorked() {
      let isReady = this.Suborders.find((item) => item.status === READY);
      if (isReady) {
        setTimeout(() => {
          let el = { ...this.Suborders.pop() };
          el.status = WORK;
          this.Suborders.unshift(el);

          setTimeout(() => {
            let obj = { ...this.Suborders.shift() };
            obj.status = FINISH;
            this.Suborders.unshift(obj);
            this.getNextStep();
            this.setWorked();
          }, this.time);
        }, 500);
      }
    },

    getNextStep() {
      let isNextStep = true;
      let id = null;

      this.Orders.forEach((order) => {
        this.Suborders.forEach((item) => {
          if (item.orderID == order.id) {
            id = item.orderID;
            if (item.status === READY || item.status === WORK) {
              isNextStep = false;
            }
          }
        });
      });
      if (isNextStep) {
        console.log("Step 3 finished");
        this.orderStepAction(id);
        // this.$emit("onSetStage", this.order.id);
      }
    },

  //   setStage(id) {
  //     this.$emit("onSetStage", id);
  //   },
  },

  computed: {
    ...mapGetters(['Suborders', 'Orders']),

   changeModuleCompleted() {
      this.setWorked();
      console.log("Step 3 started");
      return this.Suborders;
    },
  },

  watch: {
    changeModuleCompleted() {}
  }
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