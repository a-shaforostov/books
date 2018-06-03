/**
 * Actions for admin part
 * @module ActionsAdmin
 */

/**
 * Automatic login using Credentials API
 * @param state
 * @param path
 * @param props
 * @returns {*|Promise<T>}
 */
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

/**
 * Submit data from login form
 * @param state
 * @param hash - hash provider
 * @param form
 * @param path
 * @param longPromise
 */
export const submitLogin = ({ state, hash, form, path, longPromise }) => {
  const loginForm = form.get(`forms.login`);
  const { name, pass } = loginForm;
  const users = state.get(`users`);
  const storedUser = users[name.value];
  const approved = storedUser && hash.sha1(pass.value) === storedUser.pass;
  if (approved) {
    state.set('user', storedUser);
    state.set(`env.login.edit`, false);
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

/**
 * Logout
 */
export const logout = () => {
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
  setTimeout(() => document.body.removeChild(link), 0);
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

/**
 * Confirm delete item in confirmation modal
 * @param state
 * @param props
 */
export const deleteEntityConfirm = ({ state, props }) => {
  const { confirm } = props;
  if (confirm) {
    const entity = state.get(`delete.entity`);
    const id = state.get(`delete.id`);
    const items = state.get(`data.${entity}`);

    // remove selection before deleting
    state.set(`env.${entity}.selected`, null);

    // delete relations
    // delete books from library
    if (entity === 'libraries') {
      const books = state.get(`data.books`);
      state.set(`data.books`, books.filter(book => book.library !== id));
    }
    if (entity === 'published') {
      const books = state.get(`data.books`);
      state.set(`data.books`, books.filter(book => book.isbn !== id));
    }

    // delete entity itself
    state.set(`data.${entity}`, items.filter(item => item.id !== id));
  }

  state.set(`delete.entity`, null);
  state.set(`delete.id`, null);
  state.set(`delete.name`, null);
};

/**
 * Add new or update existing item
 * @param context
 */
export const postEntity = context => {
  const { state, form, props } = context;

  // Prepare data
  const formData = form.toJSON(`forms.${props.entity}`);

  const { isNew, ...data } = formData;
  if (isNew) {
    // Create entity
    data.id = data.id || String(Date.now());
    push(props.entity, data);
  } else {
    // Update entity
    update(props.entity, data);
  }

  // Hide form
  state.set(`env.${props.entity}.edit`, null);

  function push(entity, data) {
    state.push(`data.${entity}`, data);
  }

  function update(entity, data) {
    const arr = state.get(`data.${entity}`);
    state.set(`data.${entity}`, arr.map(item => item.id === data.id ? data : item));
  }
};

/**
 * Remove book from library
 * @param state
 * @param props
 */
export const removeFromLibraries = ({ state, props }) => {
  const id = props.id;
  const books = state.get('data.books');
  state.set('data.books', books.filter(book => book.isbn !== id));
};

/**
 * Put book into library
 * @param state
 * @param props
 */
export const putInLibrary = ({ state, props }) => {
  const id = Date.now();
  const isbn = props.id;
  const library = state.get('env.libraries.selected');
  state.push('data.books', {
    id,
    isbn,
    library,
    reserved: false,
  });
};
