import { create } from 'zustand';

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  customization?: string;
}

export interface TableBooking {
  tableId: string;
  tableName: string;
  zone: string;
  date: string;
  timeSlot: string;
  guests: number;
  guestName: string;
  phone: string;
}

interface SceneState {
  scrollProgress: number; // 0-1 overall page scroll
  activeSection: 'hero' | 'menu' | 'custom-brew' | 'reserve' | 'journey' | 'gallery' | 'order' | 'footer';
  activeMenuIndex: number;
  cursorVelocity: number;
  cursorPosition: { x: number; y: number };
  isReducedMotion: boolean;
  isLowPower: boolean;
  isWebGLAvailable: boolean;
  isOrderDrawerOpen: boolean;
  isAIBaristaOpen: boolean;
  isARModalOpen: boolean;
  orderItems: OrderItem[];
  currentBooking: TableBooking | null;

  // Actions
  setScrollProgress: (v: number) => void;
  setActiveSection: (s: SceneState['activeSection']) => void;
  setActiveMenuIndex: (i: number) => void;
  setCursorVelocity: (v: number) => void;
  setCursorPosition: (pos: { x: number; y: number }) => void;
  setReducedMotion: (v: boolean) => void;
  setLowPower: (v: boolean) => void;
  setWebGLAvailable: (v: boolean) => void;
  toggleOrderDrawer: () => void;
  toggleAIBarista: () => void;
  toggleARModal: () => void;
  addOrderItem: (item: { id: string; name: string; price: number; customization?: string }) => void;
  removeOrderItem: (id: string) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
  clearOrder: () => void;
  setBooking: (booking: TableBooking | null) => void;
  orderTotal: () => number;
}

export const useSceneStore = create<SceneState>((set, get) => ({
  scrollProgress: 0,
  activeSection: 'hero',
  activeMenuIndex: 0,
  cursorVelocity: 0,
  cursorPosition: { x: 0, y: 0 },
  isReducedMotion: false,
  isLowPower: false,
  isWebGLAvailable: true,
  isOrderDrawerOpen: false,
  isAIBaristaOpen: false,
  isARModalOpen: false,
  orderItems: [],
  currentBooking: null,

  setScrollProgress: (v) => set({ scrollProgress: v }),
  setActiveSection: (s) => set({ activeSection: s }),
  setActiveMenuIndex: (i) => set({ activeMenuIndex: i }),
  setCursorVelocity: (v) => set({ cursorVelocity: v }),
  setCursorPosition: (pos) => set({ cursorPosition: pos }),
  setReducedMotion: (v) => set({ isReducedMotion: v }),
  setLowPower: (v) => set({ isLowPower: v }),
  setWebGLAvailable: (v) => set({ isWebGLAvailable: v }),
  toggleOrderDrawer: () => set((state) => ({ isOrderDrawerOpen: !state.isOrderDrawerOpen })),
  toggleAIBarista: () => set((state) => ({ isAIBaristaOpen: !state.isAIBaristaOpen })),
  toggleARModal: () => set((state) => ({ isARModalOpen: !state.isARModalOpen })),

  addOrderItem: (item) => set((state) => {
    // Generate unique key if customized
    const itemKey = item.customization ? `${item.id}-${item.customization}` : item.id;
    const existing = state.orderItems.find((i) => (i.customization ? `${i.id}-${i.customization}` : i.id) === itemKey);
    if (existing) {
      return {
        orderItems: state.orderItems.map((i) =>
          (i.customization ? `${i.id}-${i.customization}` : i.id) === itemKey
            ? { ...i, quantity: i.quantity + 1 }
            : i
        ),
      };
    }
    return { orderItems: [...state.orderItems, { ...item, id: itemKey, quantity: 1 }] };
  }),

  removeOrderItem: (id) => set((state) => ({
    orderItems: state.orderItems.filter((i) => i.id !== id),
  })),

  updateItemQuantity: (id, quantity) => set((state) => ({
    orderItems: state.orderItems.map((i) =>
      i.id === id ? { ...i, quantity } : i
    ),
  })),

  clearOrder: () => set({ orderItems: [] }),
  setBooking: (booking) => set({ currentBooking: booking }),

  orderTotal: () => {
    return get().orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
  },
}));
