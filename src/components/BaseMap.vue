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
  ],
  data() {
    return {
      yellow: [],
      blue: [],
      accessToken:
        "pk.eyJ1IjoiYnJlbmRhbm0xMjM0IiwiYSI6ImNraGdpOHFrcDAzNmMzNHB0cWd5N3lybWgifQ.pbNyNcQG6kNyESAo20P6nQ",
      // map: null,
    };
  },

  created() {
    setTimeout(this.addMarkers, 2000);
    // this.locations.forEach(location => new mapboxgl.Marker()
    //   .setLngLat([location.lng, location.lat])
    //   .addTo(map));
  },
  methods: {
    addMarkers() {
      console.log("trying to add");
      mapboxgl.accessToken = this.accessToken;
      var places = {
        type: "FeatureCollection",
        features: [],
      };

      // Encountering wierd bug where it works until i refresh it. maybe becasue function never stops running?
      // I think the issues is that this for-loop is not being excuted and thus data is not being added to the geojson. Could it have to do with that warming in the console?
      this.locations.forEach((location) => {
        places.features.push({
          type: "Feature",
          properties: {
            color: location[1],
            offset: location[2],
            checkbox: location[3],
            id: location[4],
          },
          geometry: {
            type: "Point",
            coordinates: location[0],
          },
        });
        console.log("for-loop ran" + places.features);
      });

      var map = new mapboxgl.Map({
        container: "mapContainer",
        style: "mapbox://styles/mapbox/light-v10",
        center: [-95, 37],
        zoom: 3.7,
      });
      console.log(places);

      map.on("load", function () {
        map.addSource("places", {
          type: "geojson",
          data: places,
        });
        places.features.forEach(function (feature) {
          var color = feature.properties["color"];
          var offset = feature.properties["offset"];
          var layerID = "poi-" + color;
          // var checkBox = feature.properties["checkbox"];
          var checkboxId = feature.properties["id"];
          console.log("HEY " + checkboxId);

          // Add a layer for this symbol type if it hasn't been added already.
          if (!map.getLayer(layerID)) {
            console.log("layer" + layerID + "added");
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
          }
          //cant addeventListener to variable. need to find a way to watch for change of variable
          let box = document.getElementById(checkboxId);
          box.addEventListener("click", function (e) {
            console.log("changed");
            map.setLayoutProperty(
              layerID,
              "visibility",
              e.target.checked ? "visible" : "none"
            );
          });
        });
      });

      // geojson.features.forEach((marker) => {
      //   // create a HTML element for each feature
      //   const el = document.createElement("div");
      //   el.className = "Map__marker";

      //   // make a marker for each feature and add to the map
      //   new mapboxgl.Marker(el)
      //     .setLngLat(marker.geometry.coordinates)
      //     .addTo(map);
      // });
    },
  },

  // watch: {
  //   locations: function (newVal) {
  //     // watch it
  //     newVal.forEach((location) => {
  //       // var el = document.createElement("div");
  //       // el.className = "marker";

  //       // new mapboxgl.Marker(el)
  //       //   .setLngLat([location[0][0], location[0][1]])
  //       //   .addTo(this.map);
  //       //   console.log(this);

  //       new mapboxgl.Marker({
  //         color: location[1],
  //         offset: [location[2], 0],
  //       })
  //         .setLngLat([location[0][0], location[0][1]])
  //         .addTo(this.map);
  //       //this.yellow.push(marker);
  //       //console.log("hi" + this.yellow);
  //     });
  //     // want to add marker element to an array based on its color then pass this array over to app.vue so it can be hidden when box
  //   },
  // },
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
</style>