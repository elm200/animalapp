var React = require('react');
var ReactPropTypes = React.PropTypes;
var CatActions = require('../actions/CatActions');
var Router = require('react-router');
var Navigation = Router.Navigation;

var ENTER_KEY_CODE = 13;

var CatForm = React.createClass({
  mixins: [ Navigation ],

  propTypes: {
    cat: ReactPropTypes.object
  },

  getInitialState: function() {
    return {cat: (this.props.cat || {name: '', weight: ''})};
  },

  render: function() {
    return (
      <section>
      <h2>新規登録</h2>
      <div className="col-md-8">
        <div id="new-cat" className="form-horizontal">
          <div className="form-group">
            <label htmlFor="name">名前</label>
            <input className="form-control" id="name" ref="name" autoFocus={true} onChange={this._onChange} value={this.state.cat.name} placeholder="名前" />
            <span className="help-block">名前は最低3文字以上を設定してください</span>
          </div>
          <div className="form-group">
            <label htmlFor="weight">体重</label>
            <input className="form-control" id="weight" ref="weight" onChange={this._onChange} value={this.state.cat.weight} placeholder="体重" />
          </div>
          <div className="form-group">
            <button className="btn btn-lg btn-primary" onClick={this._save}>保存する</button>
          </div>
        </div>
      </div>
      </section>
    );
  },

  _save: function() {
    CatActions.create(this.state.cat);
    this.setState({
      cat:
        {
          id: null,
          name: '',
          weight: ''
        }
    });
    this.transitionTo('cats');
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
