var React = require('react');
var ReactPropTypes = React.PropTypes;
var DogActions = require('../actions/DogActions');
var DogItem = require('./DogItem.react');

var Router = require('react-router');
var Navigation = Router.Navigation;

var DogList = React.createClass({
  mixins: [ Navigation ],

  propTypes: {
    dogs: ReactPropTypes.object.isRequired,
  },

  render: function() {
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
      <button className="btn btn-lg btn-primary" onClick={this.transitionTo.bind(null, 'dogs_new')}>新規作成</button>
      </div>
    );
  },
});

module.exports = DogList;
