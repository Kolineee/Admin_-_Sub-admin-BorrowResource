let btn = document.querySelector("#btn");
  let sidebar = document.querySelector(".sidebar");

  btn.onclick = function(){
    sidebar.classList.toggle("active");
  }


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
        .domain([0, d3.max(data, d => d.room, d => d.laboratory, d => d.equipments, d => d.auditorium)])
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

//RESOURCES//
function addResource() {
    var resourceName = document.getElementById("resource").value;
    var startTime = document.getElementById("startTime").value;
    var endTime = document.getElementById("endTime").value;
    if (resourceName.trim() === "") {
        alert("Please select a resource name.");
        return;
    }
    var availableTime = formatTime(startTime) + " - " + formatTime(endTime);
    var table = document.getElementById("resource-table");
    var row = table.insertRow(0); // insert at the first position to make it the first row
    var resourceNameCell = row.insertCell(0);
    var availableTimeCell = row.insertCell(1);
    var statusCell = row.insertCell(2);
    var actionCell = row.insertCell(3);
    resourceNameCell.innerHTML = resourceName.toLowerCase(); // Convert to lowercase
    availableTimeCell.innerHTML = availableTime;
    statusCell.innerHTML = "Available";
    actionCell.innerHTML = '<button onclick="editRow(this)" class="boxicon bx bx-edit"></button><button onclick="deleteRow(this)" class="boxicon bx bx-trash"></button>';
    // Highlight the newly added row
    var highlightedRow = table.getElementsByClassName("highlight-green")[0];
    if (highlightedRow) {
        highlightedRow.classList.remove("highlight-green");
    }
    row.classList.add("highlight-green");
    // Clear input fields after adding resource
    document.getElementById("startTime").value = "";
    document.getElementById("endTime").value = "";
}

function deleteRow(btn) {
    var row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function editRow(btn) {
    var row = btn.parentNode.parentNode;
    var cells = row.getElementsByTagName("td");
    var resourceName = cells[0].innerText;
    var times = cells[1].innerText.split(" - ");
    var startTime = times[0];
    var endTime = times[1];
    document.getElementById("resource").value = resourceName;
    document.getElementById("startTime").value = startTime;
    document.getElementById("endTime").value = endTime;
    deleteRow(btn); // Delete the row after editing
}

function formatTime(time) {
    // Split time by colon to separate hours and minutes
    var parts = time.split(":");
    var hours = parseInt(parts[0]);
    var minutes = parseInt(parts[1]);
    var ampm = hours >= 12 ? "PM" : "AM"; // Determine if it's AM or PM
    hours = hours % 12; // Convert hours to 12-hour format
    hours = hours ? hours : 12; // "0" should be "12"
    minutes = minutes < 10 ? "0" + minutes : minutes; // Add leading zero to minutes if necessary
    return hours + ":" + minutes + " " + ampm;
}