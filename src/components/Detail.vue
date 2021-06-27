<template>
  <div class="box">
    <div class="box-top">
      <span>Details</span>
      <Form @addTask="addTask" />
    </div>
    <RowHeader listID="moduleID" />
    <RowItem
      v-for="detail in Details"
      :key="detail.id"
      :list="detail"
      @onClick="toggleStatus(detail.id)"
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
const PAUSE = "PAUSE";
const FINISH = "FINISH";

export default {
  name: "Detail",

  components: {
    RowItem,
    RowHeader,
    Form,
  },

  data() {
    return {
      time: 5000,
    };
  },

  methods: {
    ...mapActions(["moduleStepAction"]),

    toggleStatus(id) {
      this.Details.forEach((detail) => {
        if (detail.id === id && detail.status === READY) {
          detail.status = PAUSE;
        } else if (detail.id === id && detail.status === PAUSE) {
          detail.status = READY;

          let isWork = false;

          this.Details.forEach((obj) => {
            if (obj.status === WORK) {
              isWork = true;
            }
          });

          if (!isWork) {
            this.setWorked();
          }
        }
      });
    },

    addTask(payload) {
      this.Details.push({
        id: this.Details.length + 1,
        name: payload.name,
        moduleID: payload.listID,
        status: READY,
        stage: 1,
      });
    },

    setWorked() {
      if (this.Details) {
        let obj = this.Details.find((item) => item.status === READY);
        if (obj) {
          obj.status = WORK;
          setTimeout(() => {
            obj.status = FINISH;
            this.getNextStep(obj.moduleID);
            this.setWorked();
          }, this.time);
        }
      }
    },

    getNextStep(id) {
      let isNextStep = true;
      let currentStage = null;

      let arr = this.Details.filter((detail) => detail.moduleID === id);
      arr.forEach((obj) => {
        currentStage = obj.stage + 1;
        if (obj.status === READY || obj.status === WORK || obj.status === PAUSE) {
          isNextStep = false;
        }
      });

      if (isNextStep) {
        this.moduleStepAction({
          id,
          stage: currentStage,
        });
        arr.forEach((obj) => {
          obj.stage = currentStage;
        });
      }
    },
  },

  computed: {
    ...mapGetters(["Details"]),

    changeDetailCompleted() {
      let isWork = false;

      this.Details.forEach((obj) => {
        if (obj.status === WORK) {
          isWork = true;
        }
      });

      if (!isWork) {
        this.setWorked();
      }

      return this.Details;
    },
  },

  watch: {
    changeDetailCompleted() {
    },
  },

};
</script>

<style>

</style>