export class OrderStartedEvent {
  public user_id: number;
  constructor(user_id: number) {
    this.user_id = user_id;
  }
}
