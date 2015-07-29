/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react');
var CatActions = require('../actions/CatActions');
var CatForm = require('./CatForm.react');
var DogActions = require('../actions/DogActions');
var DogForm = require('./DogForm.react');

var Header = React.createClass({
  render: function() {
    var form;
    switch(this.props.current) {
      case 'cats':
        form = (
          <CatForm
            id="new-cat"
            onSave={this._onSave}
          />
        );
        break;
      case 'dogs':
        form = (
          <DogForm
            id="new-dog"
            onSave={this._onSave}
          />
        );
        break;
      default:
        // no ops
    }

    return (
      <header id="header">
        <div>
          <button onClick={this.props.onMenuChange.bind(null, 'cats')} >Cats</button>
          |
          <button onClick={this.props.onMenuChange.bind(null, 'dogs')} >Dogs</button>
        </div>
        <h1>{this.props.current}</h1>
        {form}
      </header>
    );
  },

  _onSave: function(params) {
    switch(this.props.current) {
      case 'cats':
        CatActions.create(params);
        break;
      case 'dogs':
        DogActions.create(params);
        break;
      default:
        // no ops
    }
  }

});

module.exports = Header;
