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
      return null;
    }

    var cats = this.props.cats;
    var cat_items = [];

    for (var key in cats) {
      cat_items.push(<CatItem key={key} cat={cats[key]} />);
    }

    return (
      <section id="main">
        <ul id="cat-list">{cat_items}</ul>
      </section>
    );
  },
});

module.exports = CatList;
