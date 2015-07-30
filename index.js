var request = require('request');
var makeUrl = require('make-url');
var xtend = require('xtend');
var Q = require('q');
var log = require('debug')('nzbapi::log');

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

    request({url: url, json: true}, function(err, response, body) {
      var deferred = Q.defer()
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(body);
      }
      return deferred.promise.nodeify(callback);
    });
  }
}

NZBApi.prototype.getCapabilities = function(callback) {
  return this._request('caps', callback);
}

NZBApi.prototype.registerAccount = function(emailAddress, callback) {
  return this._request('register', {email: emailAddress}, callback);
}

NZBApi.prototype.searchAll = function(query, callback) {
  return this._request('search', {q: name}, callback);
}

NZBApi.prototype.searchTv = function(name, returnExtended, season, episode, callback) {
  var args = Array.prototype.slice.call(arguments, 0);
  callback = args.pop();

  var params = {
    q: query,
    season: season,
    ep: episode
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

NZBApi.prototype.getNzbDetails = function(nzbId, callback) {
  return this._request('details', {id: nzbId}, callback);
}

NZBApi.prototype.downloadNzb = function(nzbId, callback) {
  return this._request('get', {id: nzbId}, callback);
}

module.exports = NZBApi;
