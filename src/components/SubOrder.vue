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
import { mapGetters, mapActions } from "vuex";

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
    ...mapActions(["orderStepAction"]),

    setWorked() {
      if (this.Suborders) {
        let obj = this.Suborders.find((item) => item.status === READY);
        if (obj) {
          obj.status = WORK;
          setTimeout(() => {
            obj.status = FINISH;
            this.getNextStep(obj.orderID);
            this.setWorked();
          }, this.time);
        }
      }
    },

    getNextStep(id) {
      let isNextStep = true;

      let arr = this.Suborders.filter((suborder) => suborder.orderID == id);
      arr.forEach((obj) => {
        if (
          obj.status === READY ||
          obj.status === WORK ||
          obj.status === WAIT
        ) {
          isNextStep = false;
        }
      });

      if (isNextStep) {
        this.orderStepAction({
          id,
          stage: 4,
        });
        arr.forEach((obj) => {
          obj.stage = 4;

          this.Modules.forEach((module) => {
            if (module.suborderID == obj.id) {
              module.stage = 4;

              this.Details.forEach((detail) => {
                if (detail.moduleID == module.id) {
                  detail.stage = 4;
                }
              });
            }
          });
        });
      }
    },
  },

  computed: {
    ...mapGetters(["Suborders", "Modules", "Details"]),

    changeModuleCompleted() {
      let isWork = false;

      this.Suborders.forEach((obj) => {
        if (obj.status === WORK) {
          isWork = true;
        }
      });

      if (!isWork) {
        this.setWorked();
        return this.Suborders;
      }
    },
  },

  watch: {
    changeModuleCompleted() {},
  },
};
</script>

<style>
</style>