
class CustomEvent<T> extends Event {
  private _payload: T

  constructor(eventName: string, payload: T) {
    super(eventName)
    this._payload = payload
  }

  public get payload() {
    return this._payload
  }
}

type InnerHandler<T> = (event: CustomEvent<T>) => void

type Handler<T> = (v: T) => void

export class RateQueue<T> extends EventTarget {

  private _timeID?: number
  private _interval: number
  private _queue: T[] = []
  private handlerMap = new Map<Handler<T>, InnerHandler<T>>()

  constructor(interval: number) {
    super()
    this._interval = interval
  }

  private createEvent = (payload: T) => new CustomEvent<T>("dispatch", payload);

  private setup = () => {
    return window.setInterval(() => {
      this.dispatch();
    }, this._interval)
  }

  private dispatch = () => {
    if (this._queue.length > 0) {
      const v = this._queue.shift()
      const ev = this.createEvent(v!);
      this.dispatchEvent(ev)
    }
  }

  public start = () => {
    if (this._timeID) {
      clearTimeout(this._timeID)
    }
    this._timeID = this.setup();
    return this
  }

  public push = (v: T) => {
    this._queue.push(v)
    return this
  }

  public stop = () => {
    clearInterval(this._timeID)
    return this
  }

  public subscribe = (handler: Handler<T>) => {
    const innerHandler = (event: CustomEvent<T>) => {
      return handler(event.payload)
    }
    this.addEventListener("dispatch", innerHandler as any)
    this.handlerMap.set(handler, innerHandler)
  }

  public unsubscribe = (handler: Handler<T>) => {
    const innerHandler = this.handlerMap.get(handler)
    this.removeEventListener("dispatch", innerHandler as any)
    this.handlerMap.delete(handler)
  }
}