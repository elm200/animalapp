var React = require('react');
var ReactPropTypes = React.PropTypes;
var CatActions = require('../actions/CatActions');
var CatForm = require('./CatForm.react');

var cx = require('react/lib/cx');

var CatItem = React.createClass({

  propTypes: {
   cat: ReactPropTypes.object.isRequired
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
    var cat = this.props.cat;

    var input;
    if (this.state.isEditing) {
      input =
        <CatForm
          className="edit"
          onSave={this._onSave}
          cat={cat}
        />;
    }

    return (
      <li
        className={cx({
          'editing': this.state.isEditing
        })}
        key={cat.id}>
        <div className="view">
          <label onDoubleClick={this._onDoubleClick}>
            {cat.name}({cat.weight})
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
    CatActions.update(params.id, params);
    this.setState({isEditing: false});
  },

  _onDestroyClick: function() {
    CatActions.destroy(this.props.cat.id);
  }

});

module.exports = CatItem;
