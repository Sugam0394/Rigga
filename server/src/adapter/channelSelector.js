 
 
 
 
 const selectChannel = ({
  notification,
  runtimeContext,
}) => {

  /*
   * NB7.6
   *
   * Delivery Runtime Activation
   *
   * Runtime context now determines
   * the delivery channel.
   *
   * Current rules:
   *
   * ACTIVE
   *   → IN_APP
   *
   * BACKGROUND
   *   → PUSH
   *
   * Future:
   *
   * Critical Events
   *   → SMS
   *
   * User Preferences
   *   → Email / WhatsApp
   *
   * This service remains the
   * single channel decision point.
   */

  if (
    runtimeContext?.appState ===
    "BACKGROUND"
  ) {
    return "PUSH";
  }

  return "IN_APP";

};

export default {
  selectChannel,
};