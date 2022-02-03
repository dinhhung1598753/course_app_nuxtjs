export const getters = {
  loggedIn(state) {
      return state.auth.loggedIn; // auth object as default will be added in vuex state, when you initialize nuxt auth
    },
    loggedInUser(state) {
      return state.auth.user
    },
    getUserInfo(state) {
      return state.auth.user;
    },
    isManager(state) {
      return state.auth.user.role === 'MANAGER';
    },
    isTeacher(state) {
        return state.auth.user.role === 'TEACHER';
      },
    isStudent(state) {
        return state.auth.user.role === 'STUDENT';
      }
  };
  
  // export const state = () => ({
  //   selectedTour: {}
  // })
  
  // export const mutations = {
  //   setSelectedTour(state, selectedTour) {
  //     state.selectedTour = selectedTour;
  //   }
  // }
  
  // export const actions = {
  //   setSelectedTour({ commit }, selectedTour) {
  //     commit('setSelectedTour', selectedTour);
  //   }
  // }