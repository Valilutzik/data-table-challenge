var React = require('react')
var ReactPivot = require('react-pivot')
var createReactClass = require('create-react-class')
var rows = require('./data.json')

module.exports = createReactClass({
  render () {
    var dimensions = [
      {value: 'date', title: 'Date'},
      {value: 'host', title: 'Host'}
    ]

    var reduce = function (row, memo) {
      if (row.type === 'impression') {
        memo.impressionTotal = (memo.impressionTotal || 0) + 1
      } else if (row.type === 'load') {
        memo.loadTotal = (memo.loadTotal || 0) + 1
      } else if (row.type === 'display') {
        memo.displayTotal = (memo.displayTotal || 0) + 1
      }
      memo.loadRate = ((memo.loadTotal || 0) / memo.impressionTotal) * 100
      memo.displayRate = ((memo.displayTotal || 0) / memo.loadTotal) * 100
      return memo
    }

    var calculations = [
      {title: 'Impressions', value: 'impressionTotal'},
      {title: 'Loads', value: 'loadTotal'},
      {title: 'Displays', value: 'displayTotal'},
      {title: 'Load Rate',
        value: 'loadRate',
        template: function (val, row) {
          return isFinite(val) ? val.toFixed(1) + '%' : val
        }
      },
      {title: 'Display Rate',
        value: 'displayRate',
        template: function (val, row) {
          return isFinite(val) ? val.toFixed(1) + '%' : val
        }
      }
    ]

    return <div>
      <ReactPivot rows={rows}
        dimensions={dimensions}
        reduce={reduce}
        calculations={calculations}
        />
    </div>
  }
})
