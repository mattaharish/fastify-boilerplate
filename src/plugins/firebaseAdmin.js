'use strict';

const fp = require('fastify-plugin');
const firebaseAdmin = require('firebase-admin');

async function firebase(fastify, options) {
  const { name = 'default', databaseURL, cert, storageBucket } = options;
  const appConfig = {
    databaseURL,
    storageBucket,
    credential: cert
      ? firebaseAdmin.credential.cert(cert)
      : firebaseAdmin.credential.applicationDefault()
  };
  if (fastify?.firebase?.[name]) throw new Error(`fastify-firebase ${name} already registered`);
  const firebaseApp = firebaseAdmin.initializeApp(appConfig, name);
  if (!fastify.firebase) fastify.decorate('firebaseAdmin', firebaseApp);
  // eslint-disable-next-line no-param-reassign
  fastify.firebaseAdmin[name] = firebaseApp;
  return firebaseApp;
}

module.exports = fp(firebase, {
  fastify: '>=3.0.0',
  name: 'fastify-firebase-admin'
});
