"use client";

import { useEffect, useMemo } from 'react';

export function useDisposableResource<T extends { dispose?: () => void }>(
  factory: () => T | T[],
  deps: unknown[]
): T | T[] {
  const resource = useMemo(factory, deps);

  useEffect(() => {
    return () => {
      if (Array.isArray(resource)) {
        resource.forEach((r) => r?.dispose?.());
      } else {
        resource?.dispose?.();
      }
    };
  }, [resource]);

  return resource;
}
