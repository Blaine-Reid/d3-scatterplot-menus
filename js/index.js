//part 2 covers making a scatter plot in which both x and y axis represent quantitaive data
import { dropdownMenu } from './dropdownMenu.js'
import { scatterPlot } from './scatterPlot.js'

const height = document.body.clientHeight
const width = document.body.clientWidth

const svg = d3.select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

let data;
let xColumn;
let yColumn
const onXColumnClicked = column => {
  xColumn = column;
  render()
}
const onYColumnClicked = column => {
  yColumn = column;
  render()
}


const render = () => {

  d3.select('#x-menu')
    .call(
      dropdownMenu, {
      options: data.columns,
      onOptionClicked: onXColumnClicked,
      selectedOption: xColumn
    })

  d3.select('#y-menu')
    .call(
      dropdownMenu, {
      options: data.columns,
      onOptionClicked: onYColumnClicked,
      selectedOption: yColumn
    })

  svg.call(scatterPlot, {
    // title: `Cars: ${xColumn} vs ${yColumn}`,
    width,
    height,
    xValue: d => d[xColumn],
    xAxisLabel: xColumn,
    yValue: d => d[yColumn],
    yAxisLabel: yColumn,
    radius: 6,
    margin: {
      top: 50,
      bottom: 160,
      left: 140,
      right: 20
    },
    data
  })

  // d.acceleration = +d.acceleration
  // d.cylinders = +d.cylinders
  // d.displacement = +d.displacement
  // d.horsepower = +d.horsepower
  // d.mpg = +d.mpg
  // d.weight = +d.weight
  // d.year = +d.year

};



d3.csv('./resources/auto-mpg.csv').then(loadedData => {

  data = loadedData;
  loadedData.forEach(d => {
    d.acceleration = +d.acceleration
    d.cylinders = +d.cylinders
    d.displacement = +d.displacement
    d.horsepower = +d.horsepower
    d.mpg = +d.mpg
    d.weight = +d.weight
    d.year = +d.year
  });

  xColumn = data.columns[4]
  yColumn = data.columns[0]
  render();
})