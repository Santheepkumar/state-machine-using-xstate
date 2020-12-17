const express = require("express");
const app = express();
const port = 7777;
const { Machine, interpret } = require("xstate");
const leaseMachine = require("./leaseMachine");
let alert = require("alert");

const leaseService = interpret(leaseMachine).onTransition((state) => {
  alert(`Lease state is in ${state.value}`);
});
leaseService.start();

app.get("/", (req, res) => {
  res.json({ "Hello World!": "hello" });
});

app.get("/action/:action", (req, res) => {
  const { action } = req.params;
  leaseService.send(action);
  res.json(leaseService.state.value);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
