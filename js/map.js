let map;
let markers = [];
let infoWindow;
let selectedIndexes = [];

function initMap() {
  const center = { lat: 39.8283, lng: -98.5795 };
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: center
  });

  infoWindow = new google.maps.InfoWindow();
  addMarkers();

  google.charts.load("current", { packages: ["corechart", "bar"] });
google.charts.setOnLoadCallback(drawChart);
}

function addMarkers() {
  locations.forEach((loc, index) => {
    const marker = new google.maps.Marker({
      position: { lat: loc.lat, lng: loc.lng },
      map: map,
      title: loc.city
    });

    marker.addListener("click", () => {
      toggleSelection(index);
      showInfoWindow(marker, loc);
    });

    markers.push(marker);
  });
}

function toggleSelection(index) {
  const selected = selectedIndexes.includes(index);
  if (selected) {
    selectedIndexes = selectedIndexes.filter(i => i !== index);
    markers[index].setIcon(null);
  } else {
    selectedIndexes.push(index);
    markers[index].setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
  }
  drawSelectedChart();
}

function showInfoWindow(marker, loc) {
  infoWindow.setContent(`<strong>${loc.city}</strong><br>GDP: $${loc.gdp}B`);
  infoWindow.open(map, marker);
}

function resetView() {
  map.setZoom(4);
  map.setCenter({ lat: 39.8283, lng: -98.5795 });
  infoWindow.close();
  selectedIndexes = [];
  markers.forEach(marker => marker.setIcon(null));
  drawChart();
}
