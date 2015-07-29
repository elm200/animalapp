var AppDispatcher = require('../dispatcher/AppDispatcher');
var AnimalConstants = require('../constants/AnimalConstants');

var DogActions = {
  create: function(params) {
    AppDispatcher.dispatch({
      actionType: AnimalConstants.DOG_CREATE,
      params: params
    });
  },

  update: function(id, params) {
    AppDispatcher.dispatch({
      actionType: AnimalConstants.DOG_UPDATE,
      id: id,
      params: params
    });
  },

  destroy: function(id) {
    AppDispatcher.dispatch({
      actionType: AnimalConstants.DOG_DESTROY,
      id: id
    });
  },
};

module.exports = DogActions;
