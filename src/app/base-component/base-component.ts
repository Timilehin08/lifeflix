import { Subscription, TeardownLogic } from 'rxjs';


export class BaseComponent {
  public subscription = new Subscription();

  addSubscription(logic: TeardownLogic): void {
    this.subscription.add(logic);
  }

  unsubscribe(): void {
    this.subscription.unsubscribe();
  }

}
