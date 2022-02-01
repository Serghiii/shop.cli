import { AuthAction } from './types'

type Action = {
  type: AuthAction,
  payload: any
}

const initialState = {
  message: "",
}

const autherrorreducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case AuthAction.LoginFail:
      return { message: action.payload };
    case AuthAction.LogoutFail:
      return { message: action.payload };
    case AuthAction.RegisterFail:
      return { message: action.payload };
    case AuthAction.UpdateFail:
      return { message: action.payload };
    default:
      return state;
  }
};

export default autherrorreducer;
