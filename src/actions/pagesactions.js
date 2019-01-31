import  LejuhubAction from './action_types';

export default {
  JumpTo:(url) =>{
    return {
      type: LejuhubAction.Jump,
      url
    }
  },
  UploadToken:(value)=>{
    return {
      type: LejuhubAction.UploadToken,
      value
    }
  }
}

