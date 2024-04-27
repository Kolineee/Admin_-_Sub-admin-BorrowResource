let btn = document.querySelector("#btn");
  let sidebar = document.querySelector(".sidebar");

  btn.onclick = function(){
    sidebar.classList.toggle("active");
  }

// Create scales for x and y axes
const xScale = d3.scaleBand()
    .domain(data.map(d => d.day))
    .range([margin.left, width + margin.left])
    .padding(0.1);

const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => Math.max(d.room, d.laboratory, d.equipments, d.auditorium))])
    .nice()
    .range([height, margin.top]);

// Draw x-axis
svg.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale));

// Draw y-axis
svg.append('g')
    .attr('transform', `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(yScale));

// Draw lines for each resource
const lineRoom = d3.line()
    .x(d => xScale(d.day) + xScale.bandwidth() / 2)
    .y(d => yScale(d.room));

svg.append('path')
    .datum(data)
    .attr('class', 'chart-line line-room')
    .attr('d', lineRoom);

const lineLaboratory = d3.line()
    .x(d => xScale(d.day) + xScale.bandwidth() / 2)
    .y(d => yScale(d.laboratory));

svg.append('path')
    .datum(data)
    .attr('class', 'chart-line line-laboratory')
    .attr('d', lineLaboratory);

const lineEquipments = d3.line()
    .x(d => xScale(d.day) + xScale.bandwidth() / 2)
    .y(d => yScale(d.equipments));

svg.append('path')
    .datum(data)
    .attr('class', 'chart-line line-equipments')
    .attr('d', lineEquipments);

const lineAuditorium = d3.line()
    .x(d => xScale(d.day) + xScale.bandwidth() / 2)
    .y(d => yScale(d.auditorium));

svg.append('path')
    .datum(data)
    .attr('class', 'chart-line line-auditorium')
    .attr('d', lineAuditorium);
