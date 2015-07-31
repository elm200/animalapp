//var Footer = require('./Footer.react');
var Header = require('./Header.react');

var CatList = require('./CatList.react');
var CatStore = require('../stores/CatStore');
var CatActions = require('../actions/CatActions');
var CatForm = require('./CatForm.react');

var DogList = require('./DogList.react');
var DogStore = require('../stores/DogStore');
var DogActions = require('../actions/DogActions');
var DogForm = require('./DogForm.react');

var React = require('react');
var cx = require('react/lib/cx');

var _current = 'cats';

function getState() {
  return {
    cats: CatStore.getAll(),
    dogs: DogStore.getAll(),
    current: _current
  };
}

var AnimalApp = React.createClass({

  getInitialState: function() {
    return getState();
  },

  componentDidMount: function() {
    CatStore.addChangeListener(this._onChange);
    DogStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    CatStore.removeChangeListener(this._onChange);
    DogStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var list;
    var form;
    var current_ja;
    switch(this.state.current) {
      case 'cats':
        list = <CatList cats={this.state.cats} />;
        form = <CatForm id="new-cat" onSave={this._onSave} />;
        current_ja = "猫";
        break;
      case 'dogs':
        list = <DogList dogs={this.state.dogs} />;
        form = <DogForm id="new-dog" onSave={this._onSave} />;
        current_ja = "犬";
        break;
      default:
        // no ops
    }

  	// return (
    //   <div>
    //     <Header
    //       onMenuChange={this._onMenuChange}
    //       current={this.state.current}
    //     />
    //     {list}
    //   </div>
  	// );
    return (
    <div>
    <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div className="container">
        <div className="navbar-header">
          <a className="navbar-brand">動物管理システム</a>
        </div>
        <ul className="nav navbar-nav navbar-right">
          <li className="dropdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
              アカウント情報<span className="caret"></span>
            </a>
            <ul className="dropdown-menu">
              <li><a href="#">パスワード変更</a></li>
              <li className="divider"></li>
              <li><a href="#">ログアウト</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
    <section className="container">
      <div className="col-md-2">
        <h4>メニュー</h4>
        <ul className="list-group">
          <a className={cx({"list-group-item":true, "active": this.state.current === 'cats'})} href="#" onClick={this._onMenuChange.bind(null, 'cats')}>猫</a>
          <a className={cx({"list-group-item":true, "active": this.state.current === 'dogs'})} href="#" onClick={this._onMenuChange.bind(null, 'dogs')}>犬</a>
        </ul>
      </div>
      <div className="col-md-10">
        <div className="page-header">
          <h1>{current_ja}一覧</h1>
        </div>
        <ol className="breadcrumb">
          <li><a href="#">メイン</a></li>
          <li><a href="#">{current_ja}一覧</a></li>
        </ol>
        {list}
        {form}
      </div>
  </section>
  <footer id="info">
    <p className="text-muted text-center">Created by Eiji Sakai</p>
  </footer>
  </div>
  );
  },

  /**
   * Event handler for 'change' events coming from the CatStore
   */
  _onChange: function() {
    this.setState(getState());
  },

  _onMenuChange: function(current) {
    _current = current;
    this.setState(getState());
  },

  _onSave: function(params) {
    switch(this.state.current) {
      case 'cats':
        CatActions.create(params);
        break;
      case 'dogs':
        DogActions.create(params);
        break;
      default:
        // no ops
    }
  },
});

module.exports = AnimalApp;
