import { unstable_cache } from 'next/cache';

class RevalidationMashall {
  private static _instance: RevalidationMashall;
  private _revalidateNow: boolean = false;
  private _noCache: boolean = false;
  private _isCacheAvailable: boolean = true;

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

  public isCacheAvailable(): boolean {
    return this._isCacheAvailable;
  }

  private cacheFunc = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  private testCachedAvailable = unstable_cache(
    async () => this.cacheFunc(1),
    undefined,
    { tags: ['testCache'] }
  );

  private constructor() {
    try {
      this.testCachedAvailable()
        .then(() => {
          this._isCacheAvailable = true;
          //console.log('unstable_cache is available');
        })
        .catch(() => {
          //console.log('unstable_cache is not available 1');
          this._isCacheAvailable = false;
        });
    } catch {
      this._isCacheAvailable = false;
      //console.log('unstable_cache is not available 2');
    }
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }
}

export const revalidate = RevalidationMashall.Instance;
