export function checkWebGLSupport(): { webgl2: boolean; webgl1: boolean } {
  if (typeof window === 'undefined') {
    return { webgl2: false, webgl1: false };
  }

  try {
    const canvas = document.createElement('canvas');
    return {
      webgl2: !!canvas.getContext('webgl2'),
      webgl1: !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl')),
    };
  } catch (e) {
    return { webgl2: false, webgl1: false };
  }
}

export function checkWebGLAvailable(): boolean {
  const support = checkWebGLSupport();
  return support.webgl2 || support.webgl1;
}

interface Disposable {
  dispose: () => void;
}

export function createDisposalTracker() {
  const resources = new Set<Disposable>();

  return {
    track: <T extends Disposable>(resource: T): T => {
      resources.add(resource);
      return resource;
    },
    untrack: (resource: Disposable) => {
      resources.delete(resource);
    },
    disposeAll: () => {
      resources.forEach((resource) => {
        try {
          resource.dispose();
        } catch (e) {
          console.warn('Error disposing resource', e);
        }
      });
      resources.clear();
    },
  };
}

export function dampedLerp(current: number, target: number, lambda: number, dt: number): number {
  return target + (current - target) * Math.exp(-lambda * dt);
}

export function normalizedPointerPosition(
  event: PointerEvent | MouseEvent,
  element: HTMLElement
): { x: number; y: number } {
  const rect = element.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  return {
    x: (x / rect.width) * 2 - 1,
    y: -(y / rect.height) * 2 + 1,
  };
}
