export default function ({ store, redirect }) {

  if (store.getters['auth/getUser'] == null) {

    return redirect('/signin')

  }

}
