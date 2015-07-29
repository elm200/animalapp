//var Footer = require('./Footer.react');
var Header = require('./Header.react');

var CatList = require('./CatList.react');
var CatStore = require('../stores/CatStore');

var DogList = require('./DogList.react');
var DogStore = require('../stores/DogStore');

var React = require('react');

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
    switch(this.state.current) {
      case 'cats':
        list = <CatList cats={this.state.cats} />;
        break;
      case 'dogs':
        list = <DogList dogs={this.state.dogs} />;
        break;
      default:
        // no ops
    }

  	return (
      <div>
        <Header
          onMenuChange={this._onMenuChange}
          current={this.state.current}
        />
        {list}
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
  }
});

module.exports = AnimalApp;
