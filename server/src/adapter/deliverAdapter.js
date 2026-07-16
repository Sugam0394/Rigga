 import channelSelector
  from "./channelSelector.js";

import inAppAdapter
  from "./inAppAdapter.js";

import pushAdapter
  from "./pushAdapter.js";

const send = async (
  notification,
  runtimeContext = {
    appState: "ACTIVE",
  }
) => {

  const selectedChannel =
    channelSelector.selectChannel({
      notification,
      runtimeContext,
    });

  switch (
    selectedChannel
  ) {

    case "IN_APP":

      return inAppAdapter.send(
        notification
      );

    case "PUSH":

      return pushAdapter.send(
        notification
      );

    default:

      throw new Error(
        "Unsupported delivery channel."
      );

  }

};

export default {
  send,
};