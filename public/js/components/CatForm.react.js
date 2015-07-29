var React = require('react');
var ReactPropTypes = React.PropTypes;

var ENTER_KEY_CODE = 13;

var CatForm = React.createClass({

  propTypes: {
    className: ReactPropTypes.string,
    id: ReactPropTypes.string,
    onSave: ReactPropTypes.func.isRequired,
    cat: ReactPropTypes.object
  },

  getInitialState: function() {
    return {cat: (this.props.cat || {name: '', weight: ''})};
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
          value={this.state.cat.name}
          placeholder='name'
          autoFocus={true}
          onKeyDown={this._onKeyDown}
          onChange={this._onChange}
        />
        Weight:
        <input
          ref='weight'
          value={this.state.cat.weight}
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
    this.props.onSave(this.state.cat);
    this.setState({
      cat:
        {
          id: null,
          name: '',
          weight: ''
        }
    });
  },

  _onChange: function(event) {
    this.setState({
      cat:
        {
          id: this.state.cat.id,
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

module.exports = CatForm;
