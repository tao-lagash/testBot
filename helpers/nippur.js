
const rp = require('request-promise');

const urlApi = 'http://localhost:3000';
// const urlApi = 'http://lagash-delivery-web-api.azurewebsites.net';

function getOPtion(url, methodType = 'GET', params = null) {
  return {
    method: methodType,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'eyJhbGciOiJIUzI1NiJ9.ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZFhObGNnLkxJNndaVHNDX2w2ZzZib1JvY1gyWVFFSnRWZDFXcU1ZNTlyendhZGoxa0E.EBSUqaNVEpea6VLaiKZQ5NfOBD-v7zo9otqwL1wh55w'
    },
    uri: `${urlApi}${url}`,
    body: params,
    json: true
  };
}

function getUserInfo(user) {
  return new Promise((resolve, reject) => rp(getOPtion(`/v1/usuario/by-usuario-email?email=${user}`))
    .then(res => resolve(res))
    .catch(err => reject(err)));
}

function getLastHourByUser(userName) {
  return new Promise((resolve, reject) => rp(getOPtion(`/v1/horas/last-by-usuario-name?userName=${userName}`))
    .then(res => resolve(res))
    .catch(err => reject(err)));
}

function getProductByUserId(userId) {
  return new Promise((resolve, reject) => rp(getOPtion(`/v1/producto/by-user-id?id=${userId}`))
    .then(res => resolve(res))
    .catch(err => reject(err)));
}

function setHoursProject(data) {
  return new Promise((resolve, reject) => rp(getOPtion('/v1/horas/set-horas-producto-usuario-id', 'POST', data))
    .then(res => resolve(res))
    .catch(err => reject(err)));
}

function getUsersNoLoadTime(data) {
  return new Promise((resolve, reject) => rp(getOPtion('/v1/usuario/get-users-noload-time'))
    .then(res => resolve(res))
    .catch(err => reject(err)));
}

function getProductById(id) {
  return new Promise((resolve, reject) => rp(getOPtion(`/v1/producto/by-producto-id?id=${id}`))
    .then(res => resolve(res))
    .catch(err => reject(err)));
}

function getUsersNoLoadHoursToday(id) {
  return new Promise((resolve, reject) => rp(getOPtion('/v1/horas/get-user-no-load-hours-today'))
    .then(res => resolve(res))
    .catch(err => reject(err)));
}


exports.getProductById = getProductById;
exports.getUserInfo = getUserInfo;
exports.getProductByUserId = getProductByUserId;
exports.setHoursProject = setHoursProject;
exports.getLastHourByUser = getLastHourByUser;
exports.getUsersNoLoadTime = getUsersNoLoadTime;
exports.getUsersNoLoadHoursToday = getUsersNoLoadHoursToday;
