import * as types from './mutation-types'
import { vuexfireMutations } from 'vuexfire'


export default {
  UPDATE_USER (state, user) {
    state.user = user
  },
  USER_TRUE (state) {
    state.gotUser = true
  },
  USER_FALSE (state) {
    state.gotUser = false
  },
  ...vuexfireMutations,
}
