export const LejuhubAction = {
  Login:"Login"
}

export default {
  loginWithTokenaddTodo:(token) =>{
    return {
      type: LejuhubAction.Login,
      token
    }
  }
}

