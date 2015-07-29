var AppDispatcher = require('../dispatcher/AppDispatcher');
var AnimalConstants = require('../constants/AnimalConstants');

var CatActions = {
  create: function(params) {
    AppDispatcher.dispatch({
      actionType: AnimalConstants.CAT_CREATE,
      params: params
    });
  },

  update: function(id, params) {
    AppDispatcher.dispatch({
      actionType: AnimalConstants.CAT_UPDATE,
      id: id,
      params: params
    });
  },

  destroy: function(id) {
    AppDispatcher.dispatch({
      actionType: AnimalConstants.CAT_DESTROY,
      id: id
    });
  },
};

module.exports = CatActions;
