export const CollapsedReducer = (
  preState = {
    isCollapsed: false,
  },
  action
) => {
  const { type } = action
  switch (type) {
    case 'change_collapsed':
      return {
        ...preState,
        isCollapsed:!preState.isCollapsed
      }
    default:
      return preState
  }
}
