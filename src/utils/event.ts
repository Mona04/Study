type Handler<E> = (event: E) => void;

export class EventDisposer<E> {
  constructor(private owner : Event<E>, private event : Handler<E>)
  {
    
  }
  dispose()
  {
    this.owner.unSubscribe(this.event);
  }
}

export class Event<E> { 
  private handlers: Set<Handler<E>> = new Set<Handler<E>>();
  invoke(args: E) { 
    for(var event of this.handlers)
    {
      event(args);
    }
  }
  subscribe(handler: Handler<E>) { 
    this.handlers.add(handler);
    return new EventDisposer(this, handler);
  }
  unSubscribe(handler: Handler<E>){
    this.handlers.delete(handler);
  }
  count() : number {
    return this.handlers.size;
  }
}