import  LejuhubAction from './action_types';

export default {
  JumpTo:(url) =>{
    return {
      type: LejuhubAction.Jump,
      url
    }
  }
}

