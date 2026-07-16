 import deliveryAdapter
  from "../adapter/deliverAdapter.js";

const deliverNotification = async (
  notification,
  runtimeContext = {
    appState: "ACTIVE",
  }
) => {

  return deliveryAdapter.send(
    notification,
    runtimeContext
  );

};

export default {
  deliverNotification,
};