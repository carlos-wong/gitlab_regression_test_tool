import  LejuhubAction from './action_types';

export default {
  loginWithToken:(authed) =>{
    return {
      type: LejuhubAction.Login,
      authed
    }
  }
}

