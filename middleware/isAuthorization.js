
// export default function ({ store, redirect }) {
//   if (store.state.auth.user.role !== "MANAGER") {
//     Vue.notify({
//       group: 'foo',
//       title: 'No permission',
//       text: 'Must be a manager to do this action!',
//     })
//     return redirect("/ssadmin");
//   }
// }

export default function ({ store, redirect }) {
  if (!store.getters.loggedIn) {
    return redirect("/login");
  }
  else if (store.getters.isTeacher || store.getters.isManager) {

    // Vue.notify({
    //   group: 'foo',
    //   title: 'No permission',
    //   text: 'Must be a manager to do this action!',
    // })
    return redirect("/admin");
  }
  // else if (store.getters.isStudent) {
  //   return redirect("/");
  // }
}

