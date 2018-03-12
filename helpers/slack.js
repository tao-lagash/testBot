
const rp = require('request-promise');

const url = 'https://slack.com/api/users.info?token=xoxp-97232753751-99561987654-322687351701-e8004e08255f83df13cff32a407f1748&user=';

function getUserInfo(user) {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      uri: `${url}${user}`,
      json: true
    };
    return rp(options)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
}

function getListUsers() {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      uri: 'https://slack.com/api/users.list?token=xoxb-318010281104-4BysoBEYolh9qwAiq3poWVQn',
      json: true
    };
    return rp(options)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
}

function getChannel(user) {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      uri: `https://slack.com/api/im.open?token=xoxb-318010281104-4BysoBEYolh9qwAiq3poWVQn&user=${user}`,
      json: true
    };
    return rp(options)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
}

function sendMessage(channel, message) {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      uri: `https://slack.com/api/chat.postMessage?token=xoxb-318010281104-4BysoBEYolh9qwAiq3poWVQn&channel=${channel}&text=${message}`,
      json: true
    };
    return rp(options)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
}


exports.getUserInfo = getUserInfo;
exports.getListUsers = getListUsers;
exports.getChannel = getChannel;
exports.sendMessage = sendMessage;
