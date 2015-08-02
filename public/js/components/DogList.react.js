var React = require('react');
var ReactPropTypes = React.PropTypes;
var DogActions = require('../actions/DogActions');
var DogItem = require('./DogItem.react');
var Router = require('react-router');

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
      <div>
      <table className="table table-striped table-hover" id="dog-list">
        <thead>
          <tr>
            <th>名前</th>
            <th>体重</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {dog_items}
        </tbody>
      </table>
      <Router.Link to="dogs_new">新規作成</Router.Link>
      </div>
    );
  },
});

module.exports = DogList;
