export const useCurrentBreakpoint = () => useState<boolean>('currentBreakpoint', () => null)

export const useMenuData = () => useState<object>('globalMenuData', () => { return {} })