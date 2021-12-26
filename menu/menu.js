const svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", 600)
  .attr("height", 600);

const margin = { top: 20, right: 20, bottom: 100, left: 100 };

const graphWidth = 600 - margin.left - margin.right;

const graphHeight = 600 - margin.top - margin.bottom;

const graph = svg
  .append("g")
  .attr("width", graphWidth)
  .attr("height", graphHeight)
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

const xAxisGroup = graph
  .append("g")
  .attr("transform", `translate(0, ${graphHeight})`);

const yAxisGroup = graph.append("g");

const y = d3.scaleLinear().range([graphHeight, 0]);

const x = d3.scaleBand().range([0, 500]).paddingInner(0.2).paddingOuter(0.2);

// creat the axes
const xAxis = d3.axisBottom(x);
const yAxis = d3
  .axisLeft(y)
  .ticks(5)
  .tickFormat((d) => d + " orders");

// update x axis text
xAxisGroup
  .selectAll("text")
  .attr("fill", "white")
  .attr("text-anchor", "end")
  .attr("transform", "rotate(-45)");

// update function
const update = (data) => {
  // update scales
  y.domain([0, d3.max(data, (d) => d.orders)]);
  x.domain(data.map((d) => d.name));

  // join new data with old elements
  const rects = graph.selectAll("rects").data(data);

  // remove unwanted elements
  rects.exit().remove();

  // update old elements
  rects
    .attr("width", x.bandwidth)
    .attr("height", (d) => graphHeight - y(d.orders))
    .attr("x", (d) => x(d.name))
    .attr("y", (d) => y(d.orders))
    .attr("fill", "teal");

  // append the enter selection to the DOM
  rects
    .enter()
    .append("rect")
    .attr("width", x.bandwidth)
    .attr("height", (d) => graphHeight - y(d.orders))
    .attr("x", (d) => x(d.name))
    .attr("y", (d) => y(d.orders))
    .attr("fill", "teal");

  // call axes
  xAxisGroup.call(xAxis);
  yAxisGroup.call(yAxis);
};

db.collection("dishes")
  .get()
  .then((res) => {
    let data = [];
    res.docs.forEach((doc) => {
      data.push(doc.data());
    });
    update(data);
  });
