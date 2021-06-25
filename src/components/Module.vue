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
    ...mapActions(["suborderStepAction"]),

    setWorked() {
      if (this.Modules) {
        let obj = this.Modules.find((item) => item.status === READY);
        if (obj) {
          obj.status = WORK;
          setTimeout(() => {
            obj.status = FINISH;
            this.getNextStep(obj.suborderID);
            this.setWorked();
          }, this.time);
        }
      }
    },

    getNextStep(id) {
      let isNextStep = true;

      let arr = this.Modules.filter((module) => module.suborderID == id);
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
        this.suborderStepAction({
          id,
          stage: 3,
        });
        arr.forEach((obj) => {
          obj.stage = 3;

          this.Details.forEach((detail) => {
            if (detail.moduleID == obj.id) {
              detail.stage = 3;
            }
          });
        });
      }
    },
  },

  computed: {
    ...mapGetters(["Modules", "Details"]),

    changeDetailCompleted() {
      let isWork = false;

      this.Modules.forEach((obj) => {
        if (obj.status === WORK) {
          isWork = true;
        }
      });

      if (!isWork) {
        this.setWorked();
      }

      return this.Modules;
    },
  },

  watch: {
    changeDetailCompleted() {},
  },
};
</script>

<style>
</style>