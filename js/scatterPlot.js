export const scatterPlot = (selection, props) => {
  const {
    // title,
    width,
    height,
    xValue,
    xAxisLabel,
    yValue,
    yAxisLabel,
    radius,
    margin,
    data
  } = props;



  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  const xScale = d3.scaleLinear()
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth])
    .nice()

  const yScale = d3.scaleLinear()
    .domain(d3.extent(data, yValue))
    .range([innerHeight,0])
    .nice()


  const yAxis = d3.axisLeft(yScale)
    .tickSize(-innerWidth)
    //tickPadding allows us to padd our tick labels
    .tickPadding(10)


  const xAxis = d3.axisBottom(xScale)
    .tickSize(-innerHeight)
    //tickPadding allows us to padd our tick labels
    .tickPadding(10)

  const g = selection.selectAll('.container').data([null]);

  const gEnter = g.enter().append('g').attr('class', 'container')

  gEnter
    .merge(g)
    .attr('transform', `translate(${margin.left},${margin.top})`)


  const yAxisGroup = g.select('.y-axis');

  const yAxisGEnter = gEnter.append('g')
    .attr('class', 'y-axis');

  yAxisGroup
  .merge(yAxisGEnter)
  .call(yAxis)
  .selectAll('.domain, .tick lines').remove()

  const yAxisLabelText = yAxisGEnter
    .append('text')
    .attr('class', 'axis-label')
    //text-anchor changes where text is calulated to original from
    .attr('text-anchor', 'middle')
    .attr('y', -80)
    .attr('transform', `rotate(-90)`)
    .attr('fill', 'black')
    .merge(yAxisGroup.select('.axis-label'))
    .attr('x', -innerHeight / 2)
    .text(yAxisLabel)


  const xAxisGroup = g.select('.x-axis');

  const xAxisGEnter = gEnter.append('g')
    .attr('class', 'x-axis');

  xAxisGroup
    .merge(xAxisGEnter)
    .attr('transform', `translate(0,${innerHeight})`)
    .call(xAxis)
    .selectAll('.domain').remove()


  const xAxisLabelText = xAxisGEnter
    .append('text')
    .attr('class', 'axis-label')
    .attr('y', 75)
    .attr('fill', 'black')
    .merge(xAxisGroup.select('.axis-label'))
    .attr('x', innerWidth / 2)
    .text(xAxisLabel)


  const circles = g.merge(gEnter).selectAll('circle').data(data)

  circles
    .enter()
    .append('circle')
    //sets where data points animate from and starting size
    .attr('cx',innerWidth/2)
    .attr('cy',innerHeight/2)
    .attr('r',0)
    .merge(circles)
    //adds animation
    .transition().duration(1500)
    //delays appearence of elements
    .delay((d,i)=>i*100)
    .attr('cy', d => yScale(yValue(d)))
    .attr('cx', d => xScale(xValue(d)))
    .attr('r', radius)


  // const mainTitleG = g.select('.title')

  // mainTitleEnter = gEnter.append('text')
  //   .attr('class', 'title');

  // mainTitleG
  // .merge(mainTitleEnter)
  // .append('text')
  //   .text(title)


}
