<template>
  <div class="box">
    <div class="box-top">
      <span>Suborders</span>
      <Form @addTask="addTask" />
    </div>
    <RowHeader listID="orderID" />
    <RowItem
      v-for="suborder in Suborders"
      :key="suborder.id"
      :list="suborder"
    />
  </div>
</template>

<script>
import RowItem from "@/components/RowItem.vue";
import RowHeader from "@/components/RowHeader.vue";
import Form from "@/components/Form.vue";
import { mapGetters, mapActions } from "vuex";

const WORK = "WORK";
const READY = "READY";
const FINISH = "FINISH";
const WAIT = "WAIT";

export default {
  name: "SubOrder",
  components: {
    RowItem,
    RowHeader,
    Form
  },

  data() {
    return {
      time: 15000,
    };
  },

  methods: {
    ...mapActions(["orderStepAction"]),

    addTask(payload) {
      this.Suborders.push({
        id: this.Suborders.length + 1,
        name: payload.name,
        orderID: payload.listID,
        status: WAIT,
        stage: 1,
      });
    },

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
      let currentStage = null;

      let arr = this.Suborders.filter((suborder) => suborder.orderID == id);
      arr.forEach((obj) => {
        currentStage = obj.stage + 1;
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
          stage: currentStage,
        });
        arr.forEach((obj) => {
          obj.stage = currentStage;

          this.Modules.forEach((module) => {
            if (module.suborderID == obj.id) {
              module.stage = currentStage;

              this.Details.forEach((detail) => {
                if (detail.moduleID == module.id) {
                  detail.stage = currentStage;
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