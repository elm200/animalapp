var React = require('react');
var ReactPropTypes = React.PropTypes;
var CatActions = require('../actions/CatActions');
var CatItem = require('./CatItem.react');

var Router = require('react-router');

var CatList = React.createClass({

  propTypes: {
    cats: ReactPropTypes.object.isRequired,
  },

  render: function() {
    if (Object.keys(this.props.cats).length < 1) {
      // return <p className="text-muted">記録が存在しません</p>;
      return null;
    }

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
      <Router.Link to="cats_new">新規作成</Router.Link>
      </div>
    );
  },
});

module.exports = CatList;
