<template>
  <div class="box">
    <div class="box-top">
      <span>Modules</span>
      <Form />
    </div>
    <RowHeader listID="suborderID" />
    <RowItem v-for="module in Modules" :key="module.id" :list="module" />
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
  name: "Module",

  components: {
    RowItem,
    RowHeader,
    Form
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
      let currentStage = null;

      let arr = this.Modules.filter((module) => module.suborderID == id);
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
        this.suborderStepAction({
          id,
          stage: currentStage,
        });
        arr.forEach((obj) => {
          obj.stage = currentStage;

          this.Details.forEach((detail) => {
            if (detail.moduleID == obj.id) {
              detail.stage = currentStage;
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