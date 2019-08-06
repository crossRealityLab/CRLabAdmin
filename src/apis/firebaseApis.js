import firebase from '../firebase';

const db = firebase.database();
const storage = firebase.storage();

export const create = (endpoint, uuid, data) => {
  return db.ref(`${endpoint}/${uuid}`)
    .set(data)
    .then(() => console.log(`CREATE ${endpoint} ${uuid} COMPLETE`))
    .catch(e => {
      console.error(`CREATE ${endpoint} ${uuid} ERROR: ${e}`);
      throw e;
    });
};

export const getAll = (endpoint) => {
  return db
    .ref(endpoint)
    .orderByChild('timestamp')
    .once('value')
    .then(data => data.val())
    .catch(e => {
      console.error(`GET ALL ${endpoint} ERROR`, e);
      throw e;
    });
};

export const get = (endpoint, uuid) => {
  const url = uuid ? `${endpoint}/${uuid}` : endpoint;
  return db
    .ref(url)
    .once('value')
    .then(data => data.val())
    .catch(e => {
      console.error(`GET ${url} ERROR: ${e}`);
      throw e;
    });
};

export const update = (endpoint, data, uuid) => {
  const url = uuid ? `${endpoint}/${uuid}` : endpoint;
  return db.ref(url)
    .update(data)
    .then(() => console.log(`UPDATE ${url} COMPLETE`))
    .catch(e => {
      console.error(`UPDATE ${url} ERROR: ${e}`);
      throw e;
    });
};

export const remove = (endpoint ,uuid) => {
  return db.ref(`${endpoint}/${uuid}`)
    .remove()
    .then(() => console.log(`REMOVE ${endpoint} ${uuid} COMPLETE`))
    .catch(e => {
      console.error(`REMOVE ${endpoint} ${uuid} ERROR: ${e}`);
      throw e;
    });
};

export const uploadImg = async (endpoint, imageName, file) => {
  const storageRef = await storage.ref();
  const imgFile = storageRef.child(`${endpoint.substr(1)}/${imageName}`);
  try {
    const image = await imgFile.put(file);
    const imageURL = await storageRef
      .child(`${endpoint.substr(1)}/${imageName}`)
      .getDownloadURL();
    return { image, imageURL };
  } catch (e) {
    throw e;
  }
};

export const removeImg = async (endpoint, imageName) => {
  const storageRef = await storage.ref();
  const imgFile = storageRef.child(`${endpoint.substr(1)}/${imageName}`);
  // Delete the file
  return imgFile
    .delete()
    .then(() => console.log(`${endpoint} DELETE FILE ${imageName} FROM SERVER COMPLETE`))
    .catch(e => {
      console.log(`${endpoint} DELETE FILE ${imageName} FROM SERVER ERROR: ${e}`);
      throw e;
    });
};
