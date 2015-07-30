var expect = require('chai').expect;
var NZBApi = require('../index');
var testLog = require('debug')('nzbapi::testlog')

describe('NZB Api Module', function() {
  this.timeout(5000);

  var nzbApi;
  before(function() {
    nzbApi = new NZBApi({
        apiEndPoint: process.env['NZB_API_APIENDPOINT'],
        apiKey: process.env['NZB_API_APIKEY']
      });
  });

  /*it('#registerAccount()', function(done) {
    nzbApi.registerAccount(emailAddress, function(err, results) {
      if (err) return done(err);
      testLog(results);
      done();
    });
  });*/

  it('#getCapabilities()', function(done) {
    nzbApi.getCapabilities(function(err, results) {
      if (err) return done(err);
      testLog(results);
      expect(results).to.exist;
      expect(results).to.be.instanceof(Object);
      done();
    });
  });

  it('#searchAll("law and order", false)', function(done) {
    nzbApi.searchAll("law and order", false, function(err, results) {
      if (err) return done(err);
      testLog(results);
      expect(results).to.exist;
      expect(results).to.be.instanceof(Array);
      expect(results).to.have.length.above(0);
      done();
    });
  });

  it('#searchAll("law and order", false)', function(done) {
    nzbApi.searchTv("law and order", false, function(err, results) {
      if (err) return done(err);
      testLog(results);
      expect(results).to.exist;
      expect(results).to.be.instanceof(Array);
      expect(results).to.have.length.above(0);
      done();
    });
  });

  // Search for lord of the rings
  it('#searchMovies("tt0120737", false)', function(done) {
    nzbApi.searchMovies("tt0120737", false, [], function(err, results) {
      if (err) return done(err);
      testLog(results);
      expect(results).to.exist;
      expect(results).to.be.instanceof(Array);
      expect(results).to.have.length.above(0);
      done();
    });
  });

  it('#searchMovies("tt0120737", true)', function(done) {
    nzbApi.searchMovies("tt0120737", true, [], function(err, results) {
      if (err) return done(err);
      testLog(results);
      expect(results).to.exist;
      expect(results).to.be.instanceof(Array);
      expect(results).to.have.length.above(0);
      done();
    });
  });

  it('#getNzbDetails()', function(done) {
    nzbApi.getNzbDetails('7b78386af43d5badb8dcab41a87c729b0ae5308e', function(err, results) {
      if (err) return done(err);
      testLog(results);
      expect(results).to.exist;
      expect(results).to.be.instanceof(Array);
      expect(results).to.have.length.above(0);
      done();
    });
  });

  it('#downloadNzb()', function(done) {
    nzbApi.downloadNzb('7b78386af43d5badb8dcab41a87c729b0ae5308e', function(err, results) {
      if (err) return done(err);
      testLog(results);
      expect(results).to.exist;
      expect(results).to.have.string('<?xml version="1.0" encoding="UTF-8"?>');
      done();
    });
  });
});
