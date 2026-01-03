import { create } from 'zustand';

type StateType = {
  activeDir?: string | any;
  activeMode?: string; // light o dark
  activeTheme?: string; // BLUE_THEME, GREEN_THEME, BLACK_THEME, PURPLE_THEME, ORANGE_THEME
  SidebarWidth?: number;
  MiniSidebarWidth?: number;
  TopbarHeight?: number;
  isCollapse?: boolean;
  isLayout?: string;
  isSidebarHover?: boolean;
  isMobileSidebar?: boolean;
  isHorizontal?: boolean;
  isLanguage?: string;
  isCardShadow?: boolean;
  borderRadius?: number | any;
  //
  fontFamily: string;
  isOpenMenuItem: string[];
  isOpen: string[];
  opened: boolean;
};

type CustomizationType = {
  borderRadius: string;
  fontFamily: string;
  isOpenMenuItem: string[];
  isOpen: string[];
  opened: boolean;
};

interface UiState {
  ///* state
  isOpenSideNav: boolean;
  openPopover: boolean;
  openMenus: { [level: number]: string | null };

  ///* customizations
  customization: CustomizationType;
  state: StateType;

  ///* actions
  setIsOpenSideNav: (isOpen: boolean) => void;

  ///* top nav
  setOpenNav: (value: boolean) => void;
  setOpenPopover: (value: boolean) => void;
  setOpenMenu: (level: number, menuId: string | null) => void;

  ///* customizations
  setCustomization: (customization: CustomizationType) => void;

  ///* loaders
  isGlobalLoading: boolean;
  setIsGlobalLoading: (isLoading: boolean) => void;

  // acciones adicionales

  setTheme: (theme: string) => void;
  setDarkMode: (mode: string) => void;
  setDir: (dir: string) => void;
  setLanguage: (language: string) => void;
  setCardShadow: (cardShadow: boolean) => void;

  toggleSidebar: (isCollapse: boolean) => void;

  hoverSidebar: (isSidebarHover: boolean) => void;

  toggleMobileSidebar: (isMobileSidebar: boolean) => void;

  toggleLayout: (isLayout: string) => void;

  toggleHorizontal: (isHorizontal: boolean) => void;

  setBorderRadius: (borderRadius: number) => void;
}

export const useUiStore = create<UiState>((set) => ({
  ///* initial state
  state: {
    activeDir: 'ltr',
    activeMode: 'light',
    activeTheme: 'PURPLE_THEME',
    SidebarWidth: 270,
    MiniSidebarWidth: 87,
    TopbarHeight: 70,
    isLayout: 'boxed',
    isCollapse: false,
    isSidebarHover: false,
    isMobileSidebar: false,
    isHorizontal: false,
    isLanguage: 'en',
    isCardShadow: true,
    borderRadius: 7,
    fontFamily: 'Roboto, sans-serif',
    isOpenMenuItem: [],
    isOpen: [],
    opened: true,
  },

  isOpenSideNav: true,
  openPopover: false,
  openMenus: {},
  customization: {
    borderRadius: '12',
    fontFamily: 'Roboto, sans-serif',
    isOpenMenuItem: [],
    isOpen: [],
    opened: true,
  },
  isGlobalLoading: false,

  ///* actions
  setIsOpenSideNav: (isOpen) => set({ isOpenSideNav: isOpen }),

  setOpenNav: (value) => set({ isOpenSideNav: value }),
  setOpenPopover: (value) => set({ openPopover: value }),
  setOpenMenu: (level, menuId) =>
    set((state) => ({
      openMenus: { ...state.openMenus, [level]: menuId },
    })),

  setCustomization: (customization) => set({ customization }),

  setIsGlobalLoading: (isLoading) => set({ isGlobalLoading: isLoading }),

  setTheme: (theme) =>
    set((state) => ({
      state: {
        ...state.state,
        activeTheme: theme,
      },
    })),
  setDarkMode: (mode) =>
    set((state) => ({
      state: {
        ...state.state,
        activeMode: mode,
      },
    })),

  setDir: (dir) =>
    set((state) => ({
      state: {
        ...state.state,
        activeDir: dir,
      },
    })),

  setLanguage: (language) =>
    set((state) => ({
      state: {
        ...state.state,
        isLanguage: language,
      },
    })),

  setCardShadow: (cardShadow) =>
    set((state) => ({
      state: {
        ...state.state,
        isCardShadow: cardShadow,
      },
    })),

  toggleSidebar: (isCollapse) =>
    set((state) => ({
      state: {
        ...state.state,
        isCollapse,
      },
    })),

  hoverSidebar: (isSidebarHover) =>
    set((state) => ({
      state: {
        ...state.state,
        isSidebarHover,
      },
    })),

  toggleMobileSidebar: (isMobileSidebar) =>
    set((state) => ({
      state: {
        ...state.state,
        isMobileSidebar,
      },
    })),

  toggleLayout: (isLayout) =>
    set((state) => ({
      state: {
        ...state.state,
        isLayout,
      },
    })),

  toggleHorizontal: (isHorizontal) =>
    set((state) => ({
      state: {
        ...state.state,
        isHorizontal,
      },
    })),

  setBorderRadius: (borderRadius) =>
    set((state) => ({
      state: {
        ...state.state,
        borderRadius,
      },
    })),
}));
