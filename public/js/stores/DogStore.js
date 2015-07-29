var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AnimalConstants = require('../constants/AnimalConstants');
var assign = require('object-assign');
var Utils = require('../lib/Utils');
var jQuery = require('jquery');

var CHANGE_EVENT = 'change';
var NAMESPACE = 'animal_dog';

var _dogs = {};
getAll();

function create(params) {
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _dogs[id] = {
    id: id,
    name: params.name,
    weight: params.weight
  };
  DogStore.emit(CHANGE_EVENT);
  return jQuery.ajax({
    url: 'http://localhost:3000/dogs.json',
    type: 'POST',
    data: {
      dog: params
    }
  }).done(function(data, status, xhr) {
    getAll();
  }).fail(function(xhr, status, error) {
    alert('$.ajax error!(POST /dogs.json)');
  });
}

function update(id, params) {
  _dogs[id] = assign({}, _dogs[id], params);
  DogStore.emit(CHANGE_EVENT);
  return jQuery.ajax({
    url: 'http://localhost:3000/dogs/' + id + '.json',
    type: 'POST',
    data: {
      todo: updates,
      _method: 'PATCH'
    }
  }).done(function(data, status, xhr) {
    getAll();
  }).fail(function(xhr, status, error) {
    alert('$.ajax error!(PATCH /dogs/:id.json)');
  });
}

function destroy(id) {
  delete _dogs[id];
  DogStore.emit(CHANGE_EVENT);
  return jQuery.ajax({
    url: 'http://localhost:3000/dogs/' + id + '.json',
    type: 'POST',
    data: {
      _method: 'DELETE'
    }
  }).done(function(data, status, xhr) {
    getAll();
  }).fail(function(xhr, status, error) {
    alert('$.ajax error!(DELETE /dogs/:id.json)');
  });
}

function getAll() {
  return jQuery.ajax({
    url: 'http://localhost:3000/dogs.json',
  }).done(function(data, status, xhr) {
    var dogs = {};
    data.forEach(function(dog) {
      dogs[dog.id] = dog;
    });
    _dogs = dogs;
    DogStore.emit(CHANGE_EVENT);
  }).fail(function(xhr, status, error) {
    alert('$.ajax error!(GET /dogs.json)');
  });
}

var DogStore = assign({}, EventEmitter.prototype, {
  getAll: function() {
    return _dogs;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(payload) {
  switch(payload.actionType) {
    case AnimalConstants.DOG_CREATE:
      create(payload.params);
      break;

    case AnimalConstants.DOG_UPDATE:
      update(payload.id, payload.params);
      break;

    case AnimalConstants.DOG_DESTROY:
      destroy(payload.id);
      break;

    default:
      // no op
  }
});

module.exports = DogStore;
