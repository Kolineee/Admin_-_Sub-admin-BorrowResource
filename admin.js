let btn = document.querySelector("#btn");
let sidebar = document.querySelector(".sidebar");

btn.onclick = function(){
    sidebar.classList.toggle("active");
}
/*responsive nav*/


// Sample data for the chart (you can replace this with your actual data)
const data = [
    { day: 'Mon', room: 10, laboratory: 5, equipments: 8, auditorium: 1 },
    { day: 'Tue', room: 12, laboratory: 7, equipments: 9, auditorium: 2 },
    { day: 'Wed', room: 11, laboratory: 6, equipments: 10, auditorium: 0 },
    { day: 'Thu', room: 9, laboratory: 8, equipments: 7, auditorium: 1 },
    { day: 'Fri', room: 10, laboratory: 5, equipments: 8, auditorium: 0 },
    { day: 'Sat', room: 8, laboratory: 4, equipments: 7, auditorium: 0 },
];

// Set up SVG dimensions
const svgWidth = 500;
const svgHeight = 250;
const margin = { top: 20, right: 20, bottom: 30, left: 50 };
const width = svgWidth - margin.left - margin.right;
const height = svgHeight - margin.top - margin.bottom;

// Append SVG to the chart container
const svg = d3.select('.chart')
    .attr('width', svgWidth)
    .attr('height', svgHeight);

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

/* 2nd chart */

// Sample data for the second chart
const data2 = [
    { day: 'Mon', value: 15 },
    { day: 'Tue', value: 18 },
    { day: 'Wed', value: 20 },
    { day: 'Thu', value: 14 },
    { day: 'Fri', value: 17 },
    { day: 'Sat', value: 12 },
];

// Set up SVG dimensions for the second chart
const svgWidth2 = 500;
const svgHeight2 = 250;
const margin2 = { top: 20, right: 20, bottom: 30, left: 50 };
const width2 = svgWidth2 - margin2.left - margin2.right;
const height2 = svgHeight2 - margin2.top - margin2.bottom;

// Append SVG to the second chart container
const svg2 = d3.select('.chart2')
    .attr('width', svgWidth2)
    .attr('height', svgHeight2);

// Create scales for x and y axes for the second chart
const xScale2 = d3.scaleBand()
    .domain(data2.map(d => d.day))
    .range([margin2.left, width2 + margin2.left])
    .padding(0.1);

const yScale2 = d3.scaleLinear()
    .domain([0, d3.max(data2, d => d.value)])
    .nice()
    .range([height2, margin2.top]);

// Draw x-axis for the second chart
svg2.append('g')
    .attr('transform', `translate(0, ${height2})`)
    .call(d3.axisBottom(xScale2));

// Draw y-axis for the second chart
svg2.append('g')
    .attr('transform', `translate(${margin2.left}, 0)`)
    .call(d3.axisLeft(yScale2));

// Draw line for the second chart
const line2 = d3.line()
    .x(d => xScale2(d.day) + xScale2.bandwidth() / 2)
    .y(d => yScale2(d.value));

svg2.append('path')
    .datum(data2)
    .attr('class', 'chart-line')
    .attr('d', line2);

    /* drop down*/
    function toggleDropdown() {
        var dropdownMenu = document.getElementById("user-type-dropdown");
        dropdownMenu.classList.toggle("active");
      }
      

      /* for account deletion*/
      function deleteAccount(name) {
        // Show notification
        showNotification(name);
      
        // Other logic for deleting the account...
      }
      
      function showNotification(name) {
        // Get the notification element
        var notification = document.getElementById("notification");
      
        // Set the deleted user info in the notification
        var deletedInfo = document.getElementById("deleted-info");
        deletedInfo.textContent = "Name: " + name;
      
        // Show the notification
        notification.style.display = "block";
      
        // Hide the notification after 3 seconds (3000 milliseconds)
        setTimeout(function() {
          notification.style.display = "none";
        }, 2000);
      }
      