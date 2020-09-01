//  D:\ReactNative\TwittieAndroid\Trendy\node_modules\react-native-twitter\src\oauth\auth.js

import {Linking} from 'react-native';

import URLSearchParams from 'url-search-params';

import request from './request';
import {query} from '../util';

function getRequestToken(tokens, callbackUrl, accessType) {
  const method = 'POST';
  const url = 'https://api.twitter.com/oauth/request_token';
  const body = accessType ? {x_auth_access_type: accessType} : {};
  return request(tokens, url, {method, body}, {oauth_callback: callbackUrl})
    .then((response) => response.text())
    .then((text) => {
      var regex = /[?&]([^=#]+)=([^&#]*)/g,
        url = '&' + text,
        params = {},
        match;
      while ((match = regex.exec(url))) {
        params[match[1]] = match[2];
      }
      return {
        requestToken: params['oauth_token'],
        requestTokenSecret: params['oauth_token_secret'],
      };
    });
}

function getAccessToken(
  {consumerKey, consumerSecret, requestToken, requestTokenSecret},
  oauthVerifier,
) {
  //console.log("came to getAccessToken")
  const method = 'POST';
  const url = 'https://api.twitter.com/oauth/access_token';
  return request(
    {
      consumerKey,
      consumerSecret,
      oauthToken: requestToken,
      oauthTokenSecret: requestTokenSecret,
    },
    url,
    {method},
    {oauth_verifier: oauthVerifier},
  )
    .then((response) => response.text())
    .then((text) => {
      var regex = /[?&]([^=#]+)=([^&#]*)/g,
        url = '&' + text,
        params = {},
        match;
      while ((match = regex.exec(url))) {
        params[match[1]] = match[2];
      }
      return {
        accessToken: params['oauth_token'],
        accessTokenSecret: params['oauth_token_secret'],
        id: params['user_id'],
        name: params['screen_name'],
      };
    });
}

const verifierDeferreds = new Map();

Linking.addEventListener('url', ({url}) => {
  const params = getJsonFromUrl(url);
  if (params['oauth_token'] && verifierDeferreds.has(params['oauth_token'])) {
    //console.log("inside")
    const verifierDeferred = verifierDeferreds.get(params['oauth_token']);
    verifierDeferreds.delete(params['oauth_token']);
    if (params['oauth_verifier']) {
      verifierDeferred.resolve(params['oauth_verifier']);
    } else {
      verifierDeferred.reject(new Error('denied'));
    }
  }
});

export default async function auth(
  tokens,
  callbackUrl,
  {accessType, forSignIn = false, forceLogin = false, screenName = ''} = {},
) {
  const usePin = typeof callbackUrl.then === 'function';
  const {requestToken, requestTokenSecret} = await getRequestToken(
    tokens,
    usePin ? 'oob' : callbackUrl,
    accessType,
  );
  //console.log("came here-->", requestToken, requestTokenSecret)
  Linking.openURL(
    `https://api.twitter.com/oauth/${
      forSignIn ? 'authenticate' : 'authorize'
    }?${query({
      oauth_token: requestToken,
      force_login: forceLogin,
      screen_name: screenName,
    })}`,
  );
  return getAccessToken(
    {...tokens, requestToken, requestTokenSecret},
    await (usePin
      ? callbackUrl
      : new Promise((resolve, reject) => {
          verifierDeferreds.set(requestToken, {resolve, reject});
        })),
  );
}

function getJsonFromUrl(url) {
  if (!url) url = location.href;
  var question = url.indexOf('?');
  var hash = url.indexOf('#');
  if (hash == -1 && question == -1) return {};
  if (hash == -1) hash = url.length;
  var query =
    question == -1 || hash == question + 1
      ? url.substring(hash)
      : url.substring(question + 1, hash);
  var result = {};
  query.split('&').forEach(function (part) {
    if (!part) return;
    part = part.split('+').join(' '); // replace every + with space, regexp-free version
    var eq = part.indexOf('=');
    var key = eq > -1 ? part.substr(0, eq) : part;
    var val = eq > -1 ? decodeURIComponent(part.substr(eq + 1)) : '';
    var from = key.indexOf('[');
    if (from == -1) result[decodeURIComponent(key)] = val;
    else {
      var to = key.indexOf(']', from);
      var index = decodeURIComponent(key.substring(from + 1, to));
      key = decodeURIComponent(key.substring(0, from));
      if (!result[key]) result[key] = [];
      if (!index) result[key].push(val);
      else result[key][index] = val;
    }
  });
  return result;
}
