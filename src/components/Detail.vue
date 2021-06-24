<template>
  <div>
    <RowItem v-for="detail in Details" :key="detail.id" :list="detail" />
  </div>
</template>

<script>
import RowItem from "@/components/RowItem.vue";
import Form from "@/components/Form.vue";
import { mapGetters, mapActions } from "vuex";

const WORK = "WORK";
const READY = "READY";
const PAUSE = "PAUSE";
const FINISH = "FINISH";

export default {
  name: "Detail",

  components: {
    RowItem,
    Form,
  },

  data() {
    return {
      time: 5000,
    };
  },

  methods: {
     ...mapActions(['moduleStepAction']),

    addTask(payload) {
      this.module.details.push({
        id: Date.now(),
        name: payload.name,
        moduleID: payload.listID,
        status: READY,
      });
    },

    setPause(index) {
      if (this.orders[index].status === READY) {
        this.orders[index].status = PAUSE;
      } else {
        this.orders[index].status = READY;
      }
    },

    setWorked() {
      if (this.Details) {
        let isReady = this.Details.find((item) => item.status === READY);
        if (isReady) {
          setTimeout(() => {
            let el = { ...this.Details.pop() };
            el.status = WORK;
            this.Details.unshift(el);

            setTimeout(() => {
              let obj = { ...this.Details.shift() };
              obj.status = FINISH;
              this.Details.unshift(obj);
              this.getNextStep();
              this.setWorked();
            }, this.time);
          }, 500);
        }
      }
    },

    getNextStep() {
      let isNextStep = true;
      let id = null

      this.Modules.forEach((module) => {
        this.Details.forEach((item) => {
          if (item.moduleID == module.id) {
            id = item.moduleID
            if (item.status === READY || item.status === WORK) {
              isNextStep = false;
            }
          }
        });
      });

      if (isNextStep) {
        console.log("Step 1 finished");
        this.moduleStepAction(id);
        // this.$emit("onSetStage", this.order.id);
      }
    },
  },

  computed: {
    ...mapGetters(["Details", "Modules"]),
  },

  created() {
    this.setWorked();
    console.log("Step 1 started");
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
</style>