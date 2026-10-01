// OpenAI Agents SDK version

import { Agent, run, tool } from "@openai/agents";
import { z } from "zod";

const inspectDrink = tool({
  name: "inspect_drink",
  description: "Inspect a drink before making a recommendation.",
  parameters: z.object({
    drink: z.enum(["tea", "coffee"]),
  }),

  async execute({ drink }) {
    console.log(`\n🔎 Inspecting ${drink}...`);
    await new Promise((resolve) => setTimeout(resolve, 700));

    const findings = {
      tea: {
        energy: "gentle and steady",
        caffeine: "usually lower",
        downside: "may not provide a strong boost",
      },
      coffee: {
        energy: "strong and immediate",
        caffeine: "usually higher",
        downside: "may interfere more with sleep",
      },
    };

    console.log(`✓ Finished inspecting ${drink}`);
    return findings[drink];
  },
});

const agent = new Agent({
  name: "Decision analyst",
  model: "gpt-5.6-luna",
  instructions: `
    Help the user choose between tea and coffee.

    Follow this process:
    1. Inspect tea using inspect_drink.
    2. Inspect coffee using inspect_drink.
    3. Compare both options against the user's situation.
    4. Give a recommendation with one reason and one tradeoff.

    Call the tools one at a time. Do not decide before inspecting both.
  `,
  tools: [inspectDrink],
});

console.log("Starting decision process...");

const result = await run(
  agent,
  "It is 3 PM. I need to focus, but I want to sleep by 11 PM.",
);

console.log("\n☕ Recommendation\n");
console.log(result.finalOutput);
