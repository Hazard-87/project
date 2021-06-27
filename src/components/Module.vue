<template>
  <div class="box">
    <div class="box-top">
      <span>Modules</span>
      <Form @addTask="addTask"/>
    </div>
    <RowHeader listID="suborderID"/>
    <RowItem
        v-for="module in Modules"
        :key="module.id"
        :list="module"
        @onClick="toggleStatus(module.id)"
    />
  </div>
</template>

<script>
import RowItem from "@/components/RowItem.vue";
import RowHeader from "@/components/RowHeader.vue";
import Form from "@/components/Form.vue";
import {mapGetters, mapActions} from "vuex";

const WORK = "WORK";
const READY = "READY";
const FINISH = "FINISH";
const WAIT = "WAIT";
const PAUSE = "PAUSE";

export default {
  name: "Module",

  components: {
    RowItem,
    RowHeader,
    Form,
  },

  data() {
    return {
      time: 15000,
    };
  },

  methods: {
    ...mapActions(["suborderStepAction"]),

    runWorked() {
      let isWork = false;

      this.Modules.forEach((obj) => {
        if (obj.status === WORK) {
          isWork = true;
        }
      });

      if (!isWork) {
        this.setWorked();
      }
    },

    toggleStatus(id) {
      this.Modules.forEach((module) => {
        if (module.id === id && (module.status === READY || module.status === WAIT)) {
          module.status = PAUSE;
          this.Details.forEach(detail => {
            if (detail.moduleID === module.id && (detail.status === READY || detail.status === WAIT)) {
              detail.status = PAUSE
            }
          })
        } else if (module.id === id && module.status === PAUSE) {
          let isReady = this.Details.find(detail => detail.moduleID === module.id && (detail.status === PAUSE || detail.status === WORK))
          if (isReady) {
            module.status = WAIT
          } else {
            module.status = READY
          }
          this.Details.forEach(detail => {
            if (detail.moduleID === module.id && detail.status === PAUSE) {
              detail.status = READY
            }
          })

          this.runWorked()
        }
      });
    },

    addTask(payload) {
      this.Modules.push({
        id: this.Modules.length + 1,
        name: payload.name,
        suborderID: payload.listID,
        status: WAIT,
        stage: 1,
      });
    },

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

      let arr = this.Modules.filter((module) => module.suborderID === id);
      arr.forEach((obj) => {
        currentStage = obj.stage + 1;
        if (
            obj.status === READY ||
            obj.status === WORK ||
            obj.status === WAIT ||
            obj.status === PAUSE
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
            if (detail.moduleID === obj.id) {
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
      this.runWorked()
    },
  },

  watch: {
    changeDetailCompleted() {
      return this.Modules;
    },
  },
};
</script>

<style>
</style>