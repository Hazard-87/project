<template>
  <div>
    <RowItem v-for="order in Orders" :key="order.id" :list="order" />
  </div>
</template>

<script>
import RowItem from "@/components/RowItem.vue";
import { mapGetters } from "vuex";

const WORK = "WORK";
const READY = "READY";
const FINISH = "FINISH";
const WAIT = "WAIT";

export default {
  name: "Order",
  components: {
    RowItem,
  },

  data() {
    return {
      time: 30000,
    };
  },

  methods: {
    setWorked() {
      if (this.Orders) {
        let obj = this.Orders.find((item) => item.status === READY);
        if (obj) {
          obj.status = WORK;
          setTimeout(() => {
            obj.status = FINISH;
            this.getNextStep();
            this.setWorked();
          }, this.time);
        }
      }
    },

    getNextStep() {
      console.log("order finished");
    },
  },

  computed: {
    ...mapGetters(["Orders"]),

    changeSuborderCompleted() {
      let isWork = false;

      this.Orders.forEach((obj) => {
        if (obj.status === WORK) {
          isWork = true;
        }
      });

      if (!isWork) {
        this.setWorked();
        return this.Orders;
      }
    },
  },

  watch: {
    changeSuborderCompleted() {},
  },
};
</script>

<style>
</style>