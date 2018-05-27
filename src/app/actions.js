import { set, toggle, unset, when, wait } from "cerebral/operators";

export const autologin = ({ state, path, props }) => {
  if (window.PasswordCredential) {
    const user = state.get('user');
    if (!user) {
      return navigator.credentials.get({
        password: true,
      }).then(c => {
        if (c) {
          const users = state.get(`users`);
          return users[c.id];
        } else {
          return Promise.resolve();
        }
      }).then(profile => {
        if (profile) {
          state.set('user', profile);
          return { user: profile };
        } else {
          return { notFound: true };
        }
      }).catch(error => {
        return { error };
      });
    }
  }
};

export const submitLogin = ({ state, hash, form, path, longPromise }) => {
  const loginForm = form.get(`forms.login`);
  const { name, pass } = loginForm;
  const users = state.get(`users`);
  const storedUser = users[name.value];
  const approved = storedUser && hash.sha1(pass.value) === storedUser.pass;
  if (approved) {
    state.set('user', storedUser);
    state.set(`visibleForms.login`, false);
    state.set(`loginError`, false);
    longPromise.resolvePromise();
    if (window.PasswordCredential) {
      const { id, pass: password } = storedUser;
      const c = new PasswordCredential({ id, name: storedUser.name, password, iconURL: storedUser.avatar });
      navigator.credentials.store(c)
        .catch(e => console.error(e));
    }

    path && path.success();
  } else {
    state.set('user', null);
    state.set(`loginError`, true);
    path && path.denied();
  }
};

export const logout = ({ state }) => {
  if (window.PasswordCredential) {
    navigator.credentials.preventSilentAccess();
  }
};

/**
 * Download file
 * @param props
 */
export function downloadFile({ props }) {
  const { data, filename } = props;
  const link = document.createElement("a");
  link.download = filename;
  link.href = data;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Load data file
 * @param state
 * @param props
 * @returns {Promise<void>}
 */
export async function loadFile({ state, props }) {

  function readFile(file){
    return new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = () => {
        resolve(fr.result)
      };
      fr.readAsText(file);
    });
  }

  const { filename } = props;

  let data;
  try {
    data = await readFile(filename);
  } catch(e) {
    alert('Can`t read file');
    return;
  }

  let dataObj;
  try {
    dataObj = JSON.parse(data);
  } catch(e) {
    alert('wrong file format');
    return;
  }

  state.set('data', dataObj);
}

