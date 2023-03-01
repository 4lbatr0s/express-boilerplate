import events from "events";
const eventEmitter = new events.EventEmitter();

//INFO: HOW TO USE EVENTS
/**
 * TWO IMPORTANT POINTS:
 * 1.Event on should come before event emit.
 * 2.In order to listen to event emitter, event on and event emit should come from the same instance of the EventEmitter class. 
 */

export default eventEmitter;