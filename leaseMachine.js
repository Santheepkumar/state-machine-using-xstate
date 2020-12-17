const { Machine, interpret } = require("xstate");

const leaseMachine = Machine({
  id: "lease",
  initial: "init",
  states: {
    init: {
      on: {
        SAVE: "init",
        SUBMIT: "firstApprove",
      },
    },
    firstApprove: {
      on: {
        APPROVE: "secondApprove",
        REJECT: "completed",
        REWORK: "init",
      },
    },
    secondApprove: {
      on: {
        APPROVE: "completed",
        REJECT: "completed",
        REWORK: "init",
      },
    },
    completed: {
      type: "final",
    },
  },
});

// const leaseService = interpret(leaseMachine).onTransition((state) =>
//   console.log(state.value)
// );

// leaseService.start();

// leaseService.send("SAVE");

// leaseService.send("APPROVE");
// leaseService.send("REJECT");
module.exports = leaseMachine;
