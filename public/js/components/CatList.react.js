var React = require('react');
var ReactPropTypes = React.PropTypes;
var CatActions = require('../actions/CatActions');
var CatItem = require('./CatItem.react');

var CatList = React.createClass({

  propTypes: {
    cats: ReactPropTypes.object.isRequired,
  },

  /**
   * @return {object}
   */
  render: function() {
    // This section should be hidden by default
    // and shown when there are cats.
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
    );
  },
});

module.exports = CatList;
