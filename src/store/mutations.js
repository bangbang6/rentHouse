import * as types from "./mutation_type"


let mutations = {
    [types.CHANGECUSTOMINFO](state,info){
        state.customInfo = info
    },
    [types.CHANGEADMININFO](state,info){
        state.adminInfo = info
    },
    [types.CHANGERENTINFOS](state,rentinfos){
        state.rentinfos = rentinfos
    },
  

}
export default mutations