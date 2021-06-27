<template>
  <div class="box">
    <div class="box-top">
      <span>Orders</span>
      <Form @addTask="addTask"/>
    </div>
    <RowHeader/>
    <RowItem
        v-for="order in Orders"
        :key="order.id"
        :list="order"
        @onClick="toggleStatus(order.id)"
    />
  </div>
</template>

<script>
import RowItem from "@/components/RowItem.vue";
import RowHeader from "@/components/RowHeader.vue";
import Form from "@/components/Form.vue";
import {mapGetters} from "vuex";

const WORK = "WORK";
const READY = "READY";
const FINISH = "FINISH";
const WAIT = "WAIT";
const PAUSE = "PAUSE";
const SUCCESS = "SUCCESS"

export default {
  name: "Order",
  components: {
    RowItem,
    RowHeader,
    Form,
  },

  data() {
    return {
      time: 105000,
    };
  },

  methods: {
    toggleStatus(id) {
      this.Orders.forEach((order) => {
        if (order.id === id && (order.status === READY || order.status === WAIT)) {
          order.status = PAUSE;
          this.Suborders.forEach(suborder => {
            if (suborder.orderID === order.id && (suborder.status === READY || suborder.status === WAIT)) {
              suborder.status = PAUSE
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
            }
          })
        } else if (order.id === id && order.status === PAUSE) {
          let isReady = this.Suborders.find(suborder => suborder.orderID === order.id && (suborder.status === PAUSE || suborder.status === WORK))
          if (isReady) {
            order.status = WAIT
          } else {
            order.status = READY
          }
          this.Suborders.forEach(suborder => {
            if (suborder.orderID === order.id && suborder.status === PAUSE) {
              let isReady = this.Modules.find(module => module.suborderID === suborder.id && (module.status === PAUSE || module.status === WORK || module.status === READY))
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
            }
          })

          let isWork = false;

          this.Orders.forEach((obj) => {
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
      this.Orders.push({
        id: this.Orders.length + 1,
        name: payload.name,
        status: WAIT,
        stage: 1,
      });
    },

    setWorked() {
      if (this.Orders) {
        let obj = this.Orders.find((item) => item.status === READY);
        if (obj) {
          obj.status = WORK;
          setTimeout(() => {
            obj.status = FINISH;
            obj.stage = SUCCESS;
            this.getNextStep(obj.id);
            this.setWorked();
          }, this.time);
        }
      }
    },

    getNextStep(id) {
      console.log("order finished");
      let currentStage = SUCCESS;

      this.Suborders.forEach((suborder) => {
        if (suborder.orderID === id) {
          suborder.stage = currentStage;

          this.Modules.forEach((module) => {
            if (module.suborderID === suborder.id) {
              module.stage = currentStage;

              this.Details.forEach((detail) => {
                if (detail.moduleID === module.id) {
                  detail.stage = currentStage;
                }
              });
            }
          });
        }
      });
    },
  },

  computed: {
    ...mapGetters(["Orders", "Suborders", "Modules", "Details"]),

    changeSuborderCompleted() {
      let isWork = false;

      this.Orders.forEach((obj) => {
        if (obj.status === WORK) {
          isWork = true;
        }
      });

      if (!isWork) {
        this.setWorked();
        return this.Orders;
      }
    },
  },

  watch: {
    changeSuborderCompleted() {
    },
  },
};
</script>

<style>
</style>