var React = require('react');
var ReactPropTypes = React.PropTypes;
var CatActions = require('../actions/CatActions');
var CatForm = require('./CatForm.react');

var cx = require('react/lib/cx');

var Router = require('react-router');
var Navigation = Router.Navigation;

var CatItem = React.createClass({
  mixins: [ Navigation ],

  propTypes: {
   cat: ReactPropTypes.object.isRequired
  },

  render: function() {
    var cat = this.props.cat;

    return (
      <tr key={cat.id}>
        <td>{cat.name}</td>
        <td>{cat.weight}</td>
        <td><a onClick={this._onEditClick}>編集</a></td>
        <td><a onClick={this._onDestroyClick}>削除</a></td>
      </tr>
    );
  },

  _onSave: function(params) {
    CatActions.update(params.id, params);
  },

  _onDestroyClick: function() {
    CatActions.destroy(this.props.cat.id);
  },

  _onEditClick: function() {
    this.transitionTo('cats_edit', {id: this.props.cat.id});
  },
});

module.exports = CatItem;
