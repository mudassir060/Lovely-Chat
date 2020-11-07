const INITIAL_STATE = {
    users: [],
    create_user: {}

}
export default (state = INITIAL_STATE, action) => {
    // console.log("action===>",action)
    switch(action.type){
        case"SETUSER":
        return ({
            ...state,
            create_user:action.payload
        })  
        case"SETFIERBASEUASERS":
        return ({
            ...state,
            users:action.payload
        })  
        default:
            return state;      
    }
   
}