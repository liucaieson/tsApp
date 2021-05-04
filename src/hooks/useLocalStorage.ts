import { useState, useCallback } from 'react';
import useUpdateEffect from './useUpdateEffect';

export interface IFuncUpdater<T> {
  (previousState?: T): T;
}

export interface IFuncStorage {
  (): Storage;
}

export type StorageStateResult<T> = [T | undefined, (value?: T | IFuncUpdater<T>) => void];

// 工具函数
function isFunction<T>(obj: any): obj is T {
  return typeof obj === 'function';
}

export function createUseStorageState(nullishStorage: Storage | null) {
  // key 为设置的key
  function useStorageState<T>(
    key: string,
    defaultValue?: T | IFuncUpdater<T>,
  ): StorageStateResult<T> {
    const storage = nullishStorage as Storage;
    // state为函数
    const [state, setState] = useState<T | undefined>(() => getStoredValue());
    useUpdateEffect(() => {
      setState(getStoredValue());
    }, [key]);

    // 获取值
    function getStoredValue() {
      const raw = storage.getItem(key);
      // 错误处理
      if (raw) {
        try {
          return JSON.parse(raw);
        } catch (e) {}
      }
      if (isFunction<IFuncUpdater<T>>(defaultValue)) {
        return defaultValue();
      }
      return defaultValue;
    }

    // 更新
    const updateState = useCallback(
      // 什么不传，删除key
      (value?: T | IFuncUpdater<T>) => {
        if (typeof value === 'undefined') {
          storage.removeItem(key);
          setState(undefined);
        } else if (isFunction<IFuncUpdater<T>>(value)) {
          // 传入一个函数
          // 获取之前的状态
          const previousState = getStoredValue();
          // 通过函数处理
          const currentState = value(previousState);
          storage.setItem(key, JSON.stringify(currentState));
          setState(currentState);
        } else {
          // 正常保存
          storage.setItem(key, JSON.stringify(value));
          setState(value);
        }
      },
      [key],
    );

    return [state, updateState];
  }

  // 这个是传null的情况
  if (!nullishStorage) {
    return function (_: string, defaultValue: any) {
      return [
        isFunction<IFuncUpdater<any>>(defaultValue) ? defaultValue() : defaultValue,
        () => {},
      ];
    } as typeof useStorageState;
  }
  return useStorageState;
}

const useLocalStorageState = createUseStorageState(
  typeof window === 'object' ? window.localStorage : null,
);

export default useLocalStorageState;
