import { login, getInfo } from '@/api/login'
import { Message } from 'element-ui'
import router, { resetRouter } from '@/router'

const state = {
  token: localStorage.getItem('token') ? localStorage.getItem('token') : '', // 认证凭证'
  userName: '',
  roles: [],
  introduce: ''
}
const mutations = {
  SET_TOKEN(state, val) {
    state.token = val
    localStorage.setItem('token', val)
  },
  DEL_TOKEN(state) {
    state.token = ''
    state.userName = ''
    state.roles = ''
    state.introduce = ''
    localStorage.removeItem('token')
  },
  SET_ROLES(state, payload) {
    state.roles = payload
  },
  SET_NAME(state, payload) {
    state.userName = payload
  },
  SET_INTRODUCE(state, payload) {
    state.introduce = payload
  }
}
const actions = {
  // user login
  _login({ commit }, formdatas) {
    return new Promise((resolve, reject) => {
      login(formdatas)
        .then(res => {
          console.log('请求成功')
          if (res.code === 200) {
            if (res.data.success) {
              // Message.success(res.data.msg)
              commit('SET_TOKEN', res.data.token)
              commit('SET_NAME',res.data.userName)
            } else {
              // Message.error(res.data.msg)
            }
            resolve(res)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  loginOut({ commit }) {
    commit('DEL_TOKEN')
    resetRouter()
    router.push({
      path: '/login',
      query: {
        redirect: router.currentRoute.fullPath
      }
    })
  },
  // _getInfo({ commit }) {
  //   return new Promise((resolve, reject) => {
  //     getInfo()
  //       .then(res => {
  //         if (res.code === 0) {
  //           const { name, roles, introduce } = res.data
  //           commit('SET_ROLES', roles)
  //           commit('SET_NAME', name)
  //           commit('SET_INTRODUCE', introduce)
  //         } else {
  //           Message.error(res.msg)
  //         }
  //         resolve(res.data)
  //       })
  //       .catch(error => {
  //         reject(error)
  //       })
  //   })
  // }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
