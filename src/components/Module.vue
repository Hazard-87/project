<template>
  <div>
    <RowItem v-for="module in Modules" :key="module.id" :list="module" />
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
  name: "Module",

  components: {
    RowItem,
  },

  data() {
    return {
      time: 10000,
    };
  },

  methods: {
    ...mapActions(['suborderStepAction']),
    // addTask(payload) {
    //   this.suborder.modules.push({
    //     id: Date.now(),
    //     name: payload.name,
    //     suborderID: payload.listID,
    //     status: READY,
    //   });
    // },

    setWorked() {
      let isReady = this.Modules.find((item) => item.status === READY);
      if (isReady) {
        setTimeout(() => {
          let el = { ...this.Modules.pop() };
          el.status = WORK;
          this.Modules.unshift(el);

          setTimeout(() => {
            let obj = { ...this.Modules.shift() };
            obj.status = FINISH;
            this.Modules.unshift(obj);
            this.getNextStep();
            this.setWorked();
          }, this.time);
        }, 500);
      }
    },

    getNextStep() {
      let isNextStep = true;
      let id = null;

      this.Suborders.forEach((suborder) => {
        this.Modules.forEach((item) => {
          if (item.suborderID == suborder.id) {
            id = item.suborderID;
            if (item.status === READY || item.status === WORK) {
              isNextStep = false;
            }
          }
        });
      });

      if (isNextStep) {
        console.log("Step 2 finished");
        this.suborderStepAction(id);
        // this.$emit("onSetStage", this.order.id);
      }
    },

    //   setStage(id) {
    //     this.$emit("onSetStage", id);
    //   },
  },

  computed: {
    ...mapGetters(["Modules", "Suborders"]),

    changeDetailCompleted() {
      this.setWorked();
      console.log("Step 2 started");
      return this.Modules;
    },
  },

  watch: {
    changeDetailCompleted() {}
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