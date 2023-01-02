export const LoadingReducer = (
    preState = {
      isLoading: false,
    },
    action
  ) => {
    const { type } = action
    switch (type) {
      case 'change_loading':
        // console.log("change_loading",preState)
        return {
          ...preState,
          isLoading:!preState.isLoading
        }
      default:
        return preState
    }
  }
  