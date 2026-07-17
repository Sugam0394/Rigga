const listeners = new Set();

const subscribe = (
  listener
) => {

  listeners.add(
    listener
  );

  return () => {

    listeners.delete(
      listener
    );

  };

};

const notify = () => {

  listeners.forEach(
    (listener) => {

      try {

        listener();

      } catch (error) {

        console.error(
          "[Notification Runtime]",
          error
        );

      }

    }
  );

};

export default {

  subscribe,

  notify,

};