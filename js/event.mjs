// Module for events
//
// To use it for "global events", use Event.on/off/trigger
//
// To attach this functionality to the objects of a class, mix
// it into the prototype:
//
//     Event.mixin(Cls.prototype);

let Event = {
    synchronous: false,
    /*
     * Registers for the `handler` to be called when an event on the given `topic`
     * occurs. The handler will be called with `context` as its `this`.
     *
     * Note: It will allow for the same handler/context pair to register more than once.
     */
    on: function on(topic, handler, context = null) {
        // Add the handler/context pair to the list of event handlers
        getTopicObservers(this, topic)
            .push({
                handler: handler,
                context: context
            });

        return this;
    },
    /*
     * Remove the given `handler`/`context` pair from the list of observers
     * for the given `topic`.
     */
    off : function off(topic, handler, context = null) {
        var handlers, i;
        // Find the object matching the given handler/context, then remove it
        // from the handlers array.
        handlers = getTopicObservers(this, topic);
        for (i = 0; i < handlers.length; i += 1) {
            if (handlers[i].handler === handler &&
                handlers[i].context === context) {
                handlers.splice(i, 1);
                i -= 1;
            }
        }
        return this;
    },

    /*
     * Trigger the event for the given topic.
     * All parameters after the topic will be passed to the handlers.
     */
    trigger: function trigger(topic, ...args) {
        for (const observer of getTopicObservers(this, topic)) {
            callObserver(observer.handler, observer.context, args);
        }

        return this;
    }
};

/*
 * Mixes the Event functionality into an existing class, so objects of that class
 * can be observed. You must pass to this function the prototype of the class that
 * you want to have this added to. It will then add
 * the three methods on/off/trigger to this prototype.
 */
Event.mixin = function mixin(prototype) {
    prototype.on = Event.on;
    prototype.off = Event.off;
    prototype.trigger = Event.trigger;
};

/*
 * Sets up a call to the specified observer
 */
function callObserver(handler, context, args) {
    if (typeof handler !== 'function') {
        console.log('Skipping calling of non-function handler');
    }
    if (Event.synchronous) {
        handler.apply(context, args);
    } else {
        setTimeout(() => handler.apply(context, args), 1);
    }
}

// Helper method to get the events list. If necessary it creates then returns
// the obj's events array corresponding to topic. It will store these in a
// hidden variable called `_events`.
function getTopicObservers(obj, topic) {
    if (!obj._events) {
        // Properties defined via defineProperty are not enumerable.
        Object.defineProperty(obj, "_events", { value: {} });
    }
    // Create the array for this topic's events, if it does not exist yet.
    if (!obj._events[topic]) {
        obj._events[topic] = [];
    }
    return obj._events[topic];
}

export default Event;
