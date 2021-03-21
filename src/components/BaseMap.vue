<template>
  <div ref="map" id="mapContainer" class="basemap"></div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

export default {
  name: "BaseMap",
  props: [
    "locations",
    "digitalHumanChecked",
    "websitesChecked",
    "propertyMgtChecked",
    "connectChecked",
    "iotChecked",
    "selectedCustomerId",
  ],
  data() {
    return {
      yellow: [],
      blue: [],
      accessToken:
        "pk.eyJ1IjoiYnJlbmRhbm0xMjM0IiwiYSI6ImNraGdpOHFrcDAzNmMzNHB0cWd5N3lybWgifQ.pbNyNcQG6kNyESAo20P6nQ",
      productsChecked: {
        digitalHuman: "#35c4e7",
        propertyMgt: "#ff6f48",
        websites: "#b383ff",
        connect: "#3bd4ae",
        iot: "#94c127",
      },
      // map: null,
    };
  },

  created() {
    setTimeout(this.addMarkers, 2000);
  },
  methods: {
    addMarkers(selectedCustomer) {
      console.log("trying to add");
      mapboxgl.accessToken = this.accessToken;
      var places = {
        type: "FeatureCollection",
        features: [],
      };

      this.locations.forEach((location) => {
        places.features.push({
          type: "Feature",
          properties: {
            color: location[1],
            offset: location[2],
            checkbox: location[3],
            id: location[4],
            owner: location[5],
            name: location[6],
          },
          geometry: {
            type: "Point",
            coordinates: location[0],
          },
        });
      });

      var map = new mapboxgl.Map({
        container: "mapContainer",
        style: "mapbox://styles/brendanm1234/ckmf7s74mawq417lemga2ka6n",
        center: [-95, 37],
        zoom: 3.7,
      });

      map.on("load", function () {
        map.addSource("places", {
          type: "geojson",
          data: places,
        });

        places.features.forEach(function (feature) {
          var color = feature.properties["color"];
          var offset = feature.properties["offset"];
          var layerID = "poi-" + color;
          var checkboxId = feature.properties["id"];

          // Add a layer for this symbol type if it hasn't been added already.
          if (!map.getLayer(layerID)) {
            map.addLayer({
              id: layerID,
              type: "circle",
              source: "places",
              layout: {
                // make layer visible by default
                visibility: "visible",
              },
              filter: ["==", "color", color],
              paint: {
                "circle-radius": 8,
                "circle-color": color,
                "circle-stroke-color": color,
                "circle-stroke-width": 0,
                "circle-opacity": 0.8,
                "circle-translate": offset,
              },
            });
            if (selectedCustomer != "all") {
              map.setFilter("poi-" + color, [
                "all",
                ["==", ["get", "owner"], selectedCustomer],
                ["==", ["get", "color"], color],
              ]);
            }
          }
          let box = document.getElementById(checkboxId);
          box.addEventListener("click", function (e) {
            console.log("changed");
            map.setLayoutProperty(
              layerID,
              "visibility",
              e.target.checked ? "visible" : "none"
            );
          });

          map.on("mouseenter", layerID, function (e) {
            var coordinates = e.features[0].geometry.coordinates.slice();
            var content =
              "<strong>" +
              e.features[0].properties.name +
              "</strong><p>" +
              e.features[0].properties.owner +
              "</p>";

            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
              coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            let popup = new mapboxgl.Popup()
              .setLngLat(coordinates)
              .setHTML(content)
              .addTo(map);
            map.on("mouseleave", layerID, function () {
              map.getCanvas().style.cursor = "";
              popup.remove();
            });
          });
        });

        // pop up not working

        // var popup = new mapboxgl.Popup({
        //   closeButton: false,
        //   closeOnClick: false,
        // });

        // map.on("mouseenter", "places", function (e) {
        //   console.log("mouse");
        //   // Change the cursor style as a UI indicator.
        //   map.getCanvas().style.cursor = "pointer";

        //   var coordinates = e.features[0].geometry.coordinates.slice();
        //   var description = e.features[0].properties.owner;

        //   // Ensure that if the map is zoomed out such that multiple
        //   // copies of the feature are visible, the popup appears
        //   // over the copy being pointed to.
        //   while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        //     coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        //   }

        //   // Populate the popup and set its coordinates
        //   // based on the feature found.
        //   popup.setLngLat(coordinates).setHTML(description).addTo(map);
        // });

        // map.on("mouseleave", "places", function () {
        //   map.getCanvas().style.cursor = "";
        //   popup.remove();
        // });
      });
    },
  },

  watch: {
    selectedCustomerId: function (newVal) {
      let checkboxes = document.getElementsByName("checkbox");
      checkboxes.forEach(function (checkbox) {
        checkbox.checked = true;
      });
      console.log("hi" + checkboxes);
      this.addMarkers(newVal);
    },
  },
};
</script>

<style lang="scss" scoped>
.basemap {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0px;
  right: 0px;
}
.marker {
  display: block;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  padding: 0;
}
.mapboxgl-popup {
  max-width: 400px;
  font: 12px/20px "Helvetica Neue", Arial, Helvetica, sans-serif;
}
</style>