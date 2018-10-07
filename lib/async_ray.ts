import * as Methods from './methods';

interface Array<T> {
  asyncFilter: Methods.Find<T>;
  asyncFind: Methods.Find<T>;
  asyncForEach: Methods.ForEach<T>;
  asyncMap: Methods.Map<T>;
  asyncReduce: Methods.Reduce<T>;
}

export function pollute(): void {
  Array.prototype.asyncFind = async (cb: Methods.)
}
