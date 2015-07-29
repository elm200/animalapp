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

    var input;
    if (this.state.isEditing) {
      input =
        <DogForm
          className="edit"
          onSave={this._onSave}
          dog={dog}
        />;
    }

    return (
      <li
        className={cx({
          'editing': this.state.isEditing
        })}
        key={dog.id}>
        <div className="view">
          <label onDoubleClick={this._onDoubleClick}>
            {dog.name}({dog.weight})
          </label>
          <button className="destroy" onClick={this._onDestroyClick} >Destroy</button>
        </div>
        {input}
      </li>
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
