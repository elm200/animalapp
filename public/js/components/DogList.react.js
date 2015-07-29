var React = require('react');
var ReactPropTypes = React.PropTypes;
var DogActions = require('../actions/DogActions');
var DogItem = require('./DogItem.react');

var DogList = React.createClass({

  propTypes: {
    dogs: ReactPropTypes.object.isRequired,
  },

  render: function() {
    // This section should be hidden by default
    // and shown when there are dogs.
    if (Object.keys(this.props.dogs).length < 1) {
      return null;
    }

    var dogs = this.props.dogs;
    var dog_items = [];

    for (var key in dogs) {
      dog_items.push(<DogItem key={key} dog={dogs[key]} />);
    }

    return (
      <section id="main">
        <ul id="dog-list">{dog_items}</ul>
      </section>
    );
  },
});

module.exports = DogList;
