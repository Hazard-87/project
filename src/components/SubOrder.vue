<template>
  <div class="box">
    <div class="box-top">
      <span>Suborders</span>
      <Form @addTask="addTask"/>
    </div>
    <RowHeader listID="orderID"/>
    <RowItem
        v-for="suborder in Suborders"
        :key="suborder.id"
        :list="suborder"
        @onClick="toggleStatus(suborder.id)"
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
  name: "SubOrder",
  components: {
    RowItem,
    RowHeader,
    Form,
  },

  data() {
    return {
      time: 45000,
    };
  },

  methods: {
    ...mapActions(["orderStepAction"]),

    runWorked() {
      let isWork = false;

      this.Suborders.forEach((obj) => {
        if (obj.status === WORK) {
          isWork = true;
        }
      });

      if (!isWork) {
        this.setWorked();
      }
    },

    toggleStatus(id) {
      this.Suborders.forEach((suborder) => {
        if (suborder.id === id && (suborder.status === READY || suborder.status === WAIT)) {
          suborder.status = PAUSE;
          this.Modules.forEach(module => {
            if (module.suborderID === suborder.id && (module.status === READY || module.status === WAIT)) {
              module.status = PAUSE
              this.Details.forEach(detail => {
                if (detail.moduleID === module.id && (detail.status === READY || detail.status === WAIT)) {
                  detail.status = PAUSE
                }
              })
            }
          })
        } else if (suborder.id === id && suborder.status === PAUSE) {
          let isReady = this.Modules.find(module => module.suborderID === suborder.id && (module.status === PAUSE || module.status === WORK))
          if (isReady) {
            suborder.status = WAIT
          } else {
            suborder.status = READY
          }

          this.Modules.forEach(module => {
            if (module.suborderID === suborder.id && module.status === PAUSE) {
              let isReady = this.Details.find(detail => detail.moduleID === module.id && (detail.status === PAUSE || detail.status === WORK || detail.status === READY))
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
            }
          })

          this.runWorked()
        }
      });
    },

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

      let arr = this.Suborders.filter((suborder) => suborder.orderID === id);
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
        this.orderStepAction({
          id,
          stage: currentStage,
        });
        arr.forEach((obj) => {
          obj.stage = currentStage;

          this.Modules.forEach((module) => {
            if (module.suborderID === obj.id) {
              module.stage = currentStage;

              this.Details.forEach((detail) => {
                if (detail.moduleID === module.id) {
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
      this.runWorked()
    },
  },

  watch: {
    changeModuleCompleted() {
      return this.Suborders;
    },
  },
};
</script>

<style>
</style>