// import Vue from 'vue'

export default function({ store, redirect }) {
  // if (!store.state.auth.loggedIn) {
    if (!store.getters.loggedIn) {
    return redirect("/login");
  }
}
