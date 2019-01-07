// "Basic Javascript PubSub Pattern" example [1] was pretty useful.

// Event(): Event;
class Event {
  constructor() {
    this.events = new Map();
  }

  // Adds "fn" named function to the set of the relative event.
  // on(eventName: string, fn: Function): void;
  on(eventName, fn) {
    if (!fn.name)
      return console.error(`"fn" argument must be named function`);

    const event = this.events[eventName] = this.events[eventName] || new Set();
    event.add(fn);
    // The cool thing about sets, they don't keep duplicate items.
  }

  // Removes "fn" function from the set of the relative event and returns
  // "true" (if the function's not been found, returns "false").
  // off(eventName: string, fn: Function): boolean; 
  off(eventName, fn) {
    const event = this.events[eventName];

    return (event && event.has(fn)) ?
      event.delete(fn) : false;
  }

  // Calls all the functions of the relative event providing them with "data".
  // emit(eventName: string, data: any): void;
  emit(eventName, data) {
    const event = this.events[eventName];

    if (event)
      event.forEach(eventFn => eventFn(data));
  }
}

// [1]: https://gist.github.com/learncodeacademy/777349747d8382bfb722
