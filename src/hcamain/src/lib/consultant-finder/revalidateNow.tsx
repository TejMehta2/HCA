class RevalidationMashall {
  private static _instance: RevalidationMashall;
  private _revalidateNow: boolean = false;

  public setRevalidateNow(value: boolean) {
    this._revalidateNow = value;
  }

  public now(): boolean {
    return this._revalidateNow;
  }

  private constructor() {
    //...
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }
}

export const revalidate = RevalidationMashall.Instance;
