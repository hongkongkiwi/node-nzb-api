var makeUrl = require('make-url');
var xtend = require('xtend');
var log = require('debug')('nzbapi::log');
var Q = require('q');
var request = Q.nfbind(require('request'));
var HTTPError = require('node-http-error');

var NZBApi = function(options) {
  this.options = xtend({
    apiEndPoint: '',
    apiKey: '',
  }, options);

  this._request = function(method, params, callback) {
    var args = Array.prototype.slice.call(arguments, 0);
    callback = args.pop();

    var url = makeUrl(this.options.apiEndPoint, xtend(params, {
        apikey: this.options.apiKey,
        o: 'json',
        t: method
      }));

    log(url);

    return request({url: url, json: true})
    .spread(function(response, body) {
        if (response.statusCode !== 200) throw new HTTPError(response.statusCode);
        return body;
    })
    .nodeify(callback);
  }
}

NZBApi.prototype.getCapabilities = function(callback) {
  var args = Array.prototype.slice.call(arguments, 0);
  callback = args.pop();

  return this._request('caps', callback);
}

NZBApi.prototype.registerAccount = function(emailAddress, callback) {
  var args = Array.prototype.slice.call(arguments, 0);
  callback = args.pop();

  var params = {
    email: emailAddress
  }

  return this._request('register', params, callback);
}

NZBApi.prototype.searchAll = function(name, returnExtended, callback) {
  var args = Array.prototype.slice.call(arguments, 0);
  callback = args.pop();

  var params = {
    q: name,
  }

  if (typeof returnExtended === 'boolean') {
    params.extended = returnExtended;
  }

  return this._request('search', params, callback);
}

NZBApi.prototype.searchTv = function(name, returnExtended, season, episode, callback) {
  var args = Array.prototype.slice.call(arguments, 0);
  callback = args.pop();

  var params = {
    q: name,
  }

  if (typeof season === 'number' || typeof season === 'number') {
    params.season = season;
  }
  if (typeof episode === 'number' || typeof episode === 'number') {
    params.episode = episode;
  }
  if (typeof categories === 'array') {
    params.cat = categories.join(',');
  }
  if (typeof returnExtended === 'boolean') {
    params.extended = returnExtended;
  }

  return this._request('tvsearch', params, callback);
}

NZBApi.prototype.searchMovies = function(imdbId, returnExtended, categories, callback) {
  var args = Array.prototype.slice.call(arguments, 0);
  callback = args.pop();

  var params = {
    imdbid: imdbId
  };
  if (typeof categories === 'array') {
    params.cat = categories.join(',');
  }
  if (typeof returnExtended === 'boolean') {
    params.extended = returnExtended;
  }
  return this._request('movie', params, callback);
}

NZBApi.prototype.getNzbDetails = function(id, callback) {
  var args = Array.prototype.slice.call(arguments, 0);
  callback = args.pop();

  var params = {
    id: id
  }

  return this._request('details', params, callback);
}

NZBApi.prototype.downloadNzb = function(id, callback) {
  var args = Array.prototype.slice.call(arguments, 0);
  callback = args.pop();

  var params = {
    id: id
  }

  return this._request('get', params, callback);
}

module.exports = NZBApi;
