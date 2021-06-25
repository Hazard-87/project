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
    ...mapActions(["moduleStepAction"]),

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

      let arr = this.Details.filter((detail) => detail.moduleID == id);
      arr.forEach((obj) => {
        if (obj.status === READY || obj.status === WORK) {
          isNextStep = false;
        }
      });

      if (isNextStep) {
        this.moduleStepAction({
          id,
          stage: 2,
        });
        arr.forEach((obj) => {
          obj.stage = 2;
        });
      }
    },
  },

  computed: {
    ...mapGetters(["Details"]),
  },

  created() {
    this.setWorked();
  },
};
</script>

<style>
</style>