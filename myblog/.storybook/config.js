import { configure } from "@storybook/react";

// const req = require.context("../src/stories", true, /\.js$/);

function loadStories() {
  require("../src/components/stories/index.js");
  // You can require as many stories as you need.
}

configure(loadStories, module);
