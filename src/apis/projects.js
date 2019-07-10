import firebase from 'firebase';
import env from '../env';

firebase.initializeApp(env);

const db = firebase.database();
const storage = firebase.storage();

export const create = (uuid, data) => {
  console.log(`create: ${uuid}`);
  db.ref(`/projects/${uuid}`)
    .set(data)
    .then(() => console.log(`CREATE PROJECT ${uuid} COMPLETE`))
    .catch(e => console.error(`CREATE PROJECT ${uuid} ERROR: ${e}`));
};

export const getAll = () => {
  return db
    .ref(`/projects`)
    .orderByChild('timestamp')
    .once('value')
    .then(data => data.val())
    .catch(e => console.error('GET ALL PROJECT ERROR', e));
};

export const get = uuid => {
  return db
    .ref(`/projects/${uuid}`)
    .once('value')
    .then(data => data.val())
    .catch(e => console.error(`GET PROJECT ${uuid} ERROR: ${e}`));
};

export const update = (uuid, data) => {
  db.ref(`/projects/${uuid}`)
    .update(data)
    .then(() => console.log(`UPDATE PROJECT ${uuid} COMPLETE`))
    .catch(e => console.error(`UPDATE PROJECT ${uuid} ERROR: ${e}`));
};

export const remove = uuid => {
  return db.ref(`/projects/${uuid}`)
    .remove()
    .then(() => console.log(`REMOVE PROJECT ${uuid} COMPLETE`))
    .catch(e => console.error(`REMOVE PROJECT ${uuid} ERROR: ${e}`));
};

export const uploadImg = async (imageName, file) => {
  const storageRef = await storage.ref();
  const imgFile = storageRef.child(`projects/${imageName}`);
  try {
    const image = await imgFile.put(file);
    const imageURL = await storageRef
      .child(`projects/${imageName}`)
      .getDownloadURL();
    return { image, imageURL };
  } catch (e) {
    throw e;
  }
};

export const removeImg = async imageName => {
  const storageRef = await storage.ref();
  const imgFile = storageRef.child(`projects/${imageName}`);
  // Delete the file
  imgFile
    .delete()
    .then(() => {
      // File deleted successfully
      console.log(`PROJECT DELETE FILE ${imageName} FROM SERVER COMPLETE`);
    })
    .catch((error) => {
      console.log(`PROJECT DELETE FILE ${imageName} FROM SERVER ERROR: ${error}`);
    });
};
