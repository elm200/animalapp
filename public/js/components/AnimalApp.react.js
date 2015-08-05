var CatList = require('./CatList.react');
var CatStore = require('../stores/CatStore');
var CatForm = require('./CatForm.react');

var DogList = require('./DogList.react');
var DogStore = require('../stores/DogStore');
var DogForm = require('./DogForm.react');

var React = require('react/addons');
var cx = require('react/lib/cx');

var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Redirect = Router.Redirect;

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

function getState() {
  return {
    cats: CatStore.getAll(),
    dogs: DogStore.getAll(),
  };
}

var AnimalApp = React.createClass({
  mixins: [ Router.State ],

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
    var title;
    var link;
    var breadcrumb, breadcrumb2;
    switch(this.getPathname()) {
      case '/cats':
        title = "猫一覧";
        breadcrumb = <li><Link to="cats">{title}</Link></li>;
        break;
      case '/cats/new':
        title = "猫新規登録";
        breadcrumb = <li><Link to="cats">猫一覧</Link></li>;
        breadcrumb2 = <li><Link to="cats_new">{title}</Link></li>;
        break;
      case '/cats/edit':
        title = "猫編集";
        breadcrumb = <li><Link to="cats">猫一覧</Link></li>;
        breadcrumb2 = <li><Link to="cats_edit">{title}</Link></li>;
        break;
      case '/dogs':
        title = "犬一覧";
        breadcrumb = <li><Link to="dogs">{title}</Link></li>;
        break;
      case '/dogs/new':
        title = "犬新規登録";
        breadcrumb = <li><Link to="dogs">犬一覧</Link></li>;
        breadcrumb2 = <li><Link to="dogs_new">{title}</Link></li>;
        break;
      default:
        // no ops
    }

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
          <Link to="cats" className={this.menuClass("/cats")}>猫</Link>
          <Link to="dogs" className={this.menuClass("/dogs")}>犬</Link>
        </ul>
      </div>
      <div className="col-md-10">
        <div className="page-header">
          <h1>{title}</h1>
        </div>
        <ol className="breadcrumb">
          <li><Link to="app">メイン</Link></li>
          {breadcrumb}
          {breadcrumb2}
        </ol>
        <ReactCSSTransitionGroup transitionName="example">
          <div key="route_handler">
          <RouteHandler cats={this.state.cats} dogs={this.state.dogs} />
          </div>
        </ReactCSSTransitionGroup>
      </div>
  </section>
  <footer id="info">
    <p className="text-muted text-center">Created by Eiji Sakai</p>
  </footer>
  </div>
  );
  },

  _onChange: function() {
    this.setState(getState());
  },

  isActiveLink: function(path) {
    return this.getPathname().match(new RegExp("^" + path));
  },

  menuClass: function(path) {
    return cx({"list-group-item":true, "active":this.isActiveLink(path)});
  },

});

var routes = (
  <Route name="app" path="/" handler={AnimalApp}>
    <Route name="cats" path="cats" handler={CatList}/>
    <Route name="cats_new" path="/cats/new" handler={CatForm}/>
    <Route name="cats_edit" path="/cats/:id/edit" handler={CatForm}/>
    <Route name="dogs" path="dogs" handler={DogList}/>
    <Route name="dogs_new" path="/dogs/new" handler={DogForm}/>
    <Redirect from="/" to="/cats" />
  </Route>
);

AnimalApp.run = function() {
  Router.run(routes, function(Handler) {
    React.render(<Handler/>, document.body);
  });
};

module.exports = AnimalApp;
