var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AnimalConstants = require('../constants/AnimalConstants');
var assign = require('object-assign');
var Utils = require('../lib/Utils');
var jQuery = require('jquery');

var CHANGE_EVENT = 'change';
var NAMESPACE = 'animal_cat';

var _cats = {};
getAll();

function create(params) {
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _cats[id] = {
    id: id,
    name: params.name,
    weight: params.weight
  };
  CatStore.emit(CHANGE_EVENT);
  return jQuery.ajax({
    url: 'http://localhost:3000/cats.json',
    type: 'POST',
    data: {
      cat: params
    }
  }).done(function(data, status, xhr) {
    getAll();
  }).fail(function(xhr, status, error) {
    // alert('$.ajax error!(POST /cats.json)');
    alert(xhr.responseText);
    getAll();
  });
}

function update(id, params) {
  _cats[id] = assign({}, _cats[id], params);
  CatStore.emit(CHANGE_EVENT);
  return jQuery.ajax({
    url: 'http://localhost:3000/cats/' + id + '.json',
    type: 'POST',
    data: {
      cat: params,
      _method: 'PATCH'
    }
  }).done(function(data, status, xhr) {
    getAll();
  }).fail(function(xhr, status, error) {
    // alert('$.ajax error!(PATCH /cats/:id.json)');
    alert(xhr.responseText);
    getAll();
  });
}

function destroy(id) {
  delete _cats[id];
  CatStore.emit(CHANGE_EVENT);
  return jQuery.ajax({
    url: 'http://localhost:3000/cats/' + id + '.json',
    type: 'POST',
    data: {
      _method: 'DELETE'
    }
  }).done(function(data, status, xhr) {
    getAll();
  }).fail(function(xhr, status, error) {
    // alert('$.ajax error!(DELETE /cats/:id.json)');
    alert(xhr.responseText);
    getAll();
  });
}

function getAll() {
  return jQuery.ajax({
    url: 'http://localhost:3000/cats.json',
  }).done(function(data, status, xhr) {
    var cats = {};
    data.forEach(function(cat) {
      cats[cat.id] = cat;
    });
    _cats = cats;
    CatStore.emit(CHANGE_EVENT);
  }).fail(function(xhr, status, error) {
    alert('$.ajax error!(GET /cats.json)');
  });
}

var CatStore = assign({}, EventEmitter.prototype, {
  getAll: function() {
    return _cats;
  },

  find: function(id) {
    return _cats[id];
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(payload) {
  switch(payload.actionType) {
    case AnimalConstants.CAT_CREATE:
      create(payload.params);
      break;

    case AnimalConstants.CAT_UPDATE:
      update(payload.id, payload.params);
      break;

    case AnimalConstants.CAT_DESTROY:
      destroy(payload.id);
      break;

    default:
      // no op
  }
});

module.exports = CatStore;
