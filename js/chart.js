function drawChart() {
  const data = new google.visualization.DataTable();
  data.addColumn("string", "City");
  data.addColumn("number", "GDP");
  locations.forEach(loc => data.addRow([loc.city, loc.gdp]));

  const pieOptions = {
    title: "GDP Distribution by City",
    pieHole: 0.4,
    chartArea: { width: "90%", height: "80%" },
    legend: { position: 'right' }
  };

  const barOptions = {
    title: "GDP Comparison by City",
    chartArea: { width: '60%' },
    hAxis: { title: 'GDP (in Billions USD)', minValue: 0 },
    vAxis: { title: 'City' },
    legend: { position: 'none' }
  };

  pieChart = new google.visualization.PieChart(document.getElementById("piechart"));
  barChart = new google.visualization.BarChart(document.getElementById("barchart"));
  pieChart.draw(data, pieOptions);
  barChart.draw(data, barOptions);
}

function drawSelectedChart() {
  if (selectedIndexes.length === 0) {
    document.getElementById("piechart").innerHTML = "<p><em>No cities selected.</em></p>";
    document.getElementById("barchart").innerHTML = "";
    return;
  }

  const data = new google.visualization.DataTable();
  data.addColumn("string", "City");
  data.addColumn("number", "GDP");
  selectedIndexes.forEach(index => {
    const loc = locations[index];
    data.addRow([loc.city, loc.gdp]);
  });

  const pieOptions = {
    title: "Selected City GDP",
    pieHole: 0.4,
    chartArea: { width: "90%", height: "80%" },
    legend: { position: 'right' }
  };

  const barOptions = {
    title: "Selected City GDP Comparison",
    chartArea: { width: '60%' },
    hAxis: { title: 'GDP (in Billions USD)', minValue: 0 },
    vAxis: { title: 'City' },
    legend: { position: 'none' }
  };

  pieChart = new google.visualization.PieChart(document.getElementById("piechart"));
  barChart = new google.visualization.BarChart(document.getElementById("barchart"));
  pieChart.draw(data, pieOptions);
  barChart.draw(data, barOptions);
}