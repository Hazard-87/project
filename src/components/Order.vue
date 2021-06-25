<template>
  <div class="box">
    <div class="box-top">
      <span>Orders</span>
      <Form />
    </div>
    <RowHeader />
    <RowItem v-for="order in Orders" :key="order.id" :list="order" />
  </div>
</template>

<script>
import RowItem from "@/components/RowItem.vue";
import RowHeader from "@/components/RowHeader.vue";
import Form from "@/components/Form.vue";
import { mapGetters } from "vuex";

const WORK = "WORK";
const READY = "READY";
const FINISH = "FINISH";
const WAIT = "WAIT";

export default {
  name: "Order",
  components: {
    RowItem,
    RowHeader,
    Form
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
            obj.stage = "SUCCESS";
            this.getNextStep(obj.id);
            this.setWorked();
          }, this.time);
        }
      }
    },

    getNextStep(id) {
      console.log("order finished");
      let currentStage = "SUCCESS";

      this.Suborders.forEach((suborder) => {
        if (suborder.orderID == id) {
          suborder.stage = currentStage;

          this.Modules.forEach((module) => {
            if (module.suborderID == suborder.id) {
              module.stage = currentStage;

              this.Details.forEach((detail) => {
                if (detail.moduleID == module.id) {
                  detail.stage = currentStage;
                }
              });
            }
          });
        }
      });
    },
  },

  computed: {
    ...mapGetters(["Orders", "Suborders", "Modules", "Details"]),

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