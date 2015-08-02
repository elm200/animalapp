var React = require('react');
var ReactPropTypes = React.PropTypes;
var DogActions = require('../actions/DogActions');
var DogForm = require('./DogForm.react');

var cx = require('react/lib/cx');

var DogItem = React.createClass({

  propTypes: {
   dog: ReactPropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      isEditing: false
    };
  },

  /**
   * @return {object}
   */
  render: function() {
    var dog = this.props.dog;

    return (
      <tr key={dog.id}>
        <td>{dog.name}</td>
        <td>{dog.weight}</td>
        <td><a onClick={this._onDestroyClick}>削除</a></td>
      </tr>
    );
  },

  _onDoubleClick: function() {
    this.setState({isEditing: true});
  },

  _onSave: function(params) {
    DogActions.update(params.id, params);
    this.setState({isEditing: false});
  },

  _onDestroyClick: function() {
    DogActions.destroy(this.props.dog.id);
  }

});

module.exports = DogItem;
