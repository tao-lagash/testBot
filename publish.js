const zipFolder = require('zip-folder');
const path = require('path');
const fs = require('fs');
const request = require('request');

const rootFolder = path.resolve('.');
const zipPath = path.resolve(rootFolder, '../lagashdelivery.zip');
const kuduApi = 'https://lagashdelivery.scm.azurewebsites.net/api/zip/site/wwwroot';
const userName = '$lagashdelivery';
const password = 'Nei3YMnomHmXzMq7fbZjnuwb4m8nmrpg5tu4J2QhKx7uHLYwuWaDnlxYvf45';

function uploadZip(callback) {
  fs.createReadStream(zipPath).pipe(request.put(kuduApi, {
    auth: {
      username: userName,
      password,
      sendImmediately: true
    },
    headers: {
      'Content-Type': 'applicaton/zip'
    }
  }))
    .on('response', (resp) => {
      if (resp.statusCode >= 200 && resp.statusCode < 300) {
        fs.unlink(zipPath);
        callback(null);
      } else if (resp.statusCode >= 400) {
        callback(resp);
      }
    })
    .on('error', (err) => {
      callback(err);
    });
}

function publish(callback) {
  zipFolder(rootFolder, zipPath, (err) => {
    if (!err) {
      uploadZip(callback);
    } else {
      callback(err);
    }
  });
}

publish((err) => {
  if (!err) {
    console.log('lagashdelivery publish');
  } else {
    console.error('failed to publish lagashdelivery', err);
  }
});
