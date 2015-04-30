'use strict';

var $ = require('jquery');
var Shariff = require('shariff');

var $elem = $('<div class="shariff">');
$elem.appendTo($('body'));

$elem.shariff = new Shariff($elem, {
    services: ['twitter', 'pinterest'],
    orientation: 'vertical'
});
