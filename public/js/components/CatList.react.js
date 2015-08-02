var React = require('react');
var ReactPropTypes = React.PropTypes;
var CatActions = require('../actions/CatActions');
var CatItem = require('./CatItem.react');

var Router = require('react-router');
var Navigation = Router.Navigation;

var CatList = React.createClass({
  mixins: [ Navigation ],

  propTypes: {
    cats: ReactPropTypes.object.isRequired,
  },

  render: function() {
    var cats = this.props.cats;
    var cat_items = [];

    for (var key in cats) {
      cat_items.push(<CatItem key={key} cat={cats[key]} />);
    }
    return (
      <div>
      <table className="table table-striped table-hover" id="cat-list">
        <thead>
          <tr>
            <th>名前</th>
            <th>体重</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cat_items}
        </tbody>
      </table>
      <button className="btn btn-lg btn-primary" onClick={this.transitionTo.bind(null, 'cats_new')}>新規作成</button>
      </div>
    );
  },
});

module.exports = CatList;
