import { set, toggle, unset, when, wait } from "cerebral/operators";

export const submitLogin = ({ state, hash, form, path }) => {
  const loginForm = form.get(`forms.login`);
  const { name, pass } = loginForm;
  const users = state.get(`users`);
  const storedUser = users[name.value];
  const approved = storedUser && hash.sha1(pass.value) === storedUser.pass;
  if (approved) {
    state.set('user', storedUser);
    state.set(`visibleForms.login`, false);
    state.set(`loginError`, false);
    path && path.success();
  } else {
    state.set('user', null);
    state.set(`loginError`, true);
    path && path.denied();
  }
};
