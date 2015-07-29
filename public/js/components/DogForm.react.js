var React = require('react');
var ReactPropTypes = React.PropTypes;

var ENTER_KEY_CODE = 13;

var DogForm = React.createClass({

  propTypes: {
    className: ReactPropTypes.string,
    id: ReactPropTypes.string,
    onSave: ReactPropTypes.func.isRequired,
    dog: ReactPropTypes.object
  },

  getInitialState: function() {
    return {dog: (this.props.dog || {name: '', weight: ''})};
  },

  render: function() {
    return (
      <div
        className={this.props.className}
        id={this.props.id}
     >
        Name:
        <input
          ref='name'
          value={this.state.dog.name}
          placeholder='name'
          autoFocus={true}
          onKeyDown={this._onKeyDown}
          onChange={this._onChange}
        />
        Weight:
        <input
          ref='weight'
          value={this.state.dog.weight}
          placeholder='weight'
          onKeyDown={this._onKeyDown}
          onChange={this._onChange}
        />
        <button className="Save" onClick={this._save}>
          Save
        </button>
      </div>
    );
  },

  _save: function() {
    this.props.onSave(this.state.dog);
    this.setState({
      dog:
        {
          id: null,
          name: '',
          weight: ''
        }
    });
  },

  _onChange: function(event) {
    this.setState({
      dog:
        {
          id: this.state.dog.id,
          name: this.refs.name.getDOMNode().value,
          weight: this.refs.weight.getDOMNode().value
        }
    });
  },

  _onKeyDown: function(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      this._save();
    }
  }

});

module.exports = DogForm;
