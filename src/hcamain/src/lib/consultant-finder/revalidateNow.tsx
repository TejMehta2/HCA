class RevalidationMashall {
  private static _instance: RevalidationMashall;
  private _revalidateNow: boolean = false;
  private _noCache: boolean = false;

  public setRevalidateNow(value: boolean) {
    this._revalidateNow = value;
  }

  public setNoCache(value: boolean) {
    this._noCache = value;
  }

  public now(): boolean {
    return this._revalidateNow;
  }

  public noCache(): boolean {
    return this._noCache;
  }

  private constructor() {
    //...
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }
}

export const revalidate = RevalidationMashall.Instance;
