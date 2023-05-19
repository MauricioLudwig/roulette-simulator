import { DussinSimulator } from "./simulators";

const run = async () => {
  const simulator = new DussinSimulator([1, 2]);
  simulator.run(4);
};

(async () => {
  await run();
})();
