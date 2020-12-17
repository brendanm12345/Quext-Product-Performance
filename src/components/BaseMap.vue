<template>
  <div ref="map" id="mapContainer" class="basemap"></div>
</template>

<script>
import mapboxgl from "mapbox-gl";

import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

export default {
  name: "BaseMap",
  props: ["locations"],
  data() {
    return {
      accessToken:
        "pk.eyJ1IjoiYnJlbmRhbm0xMjM0IiwiYSI6ImNraGdpOHFrcDAzNmMzNHB0cWd5N3lybWgifQ.pbNyNcQG6kNyESAo20P6nQ",
      map: null,
    };
  },

  mounted() {
    mapboxgl.accessToken = this.accessToken;

    this.map = new mapboxgl.Map({
      container: "mapContainer",
      style: "mapbox://styles/mapbox/light-v10",
      center: [-95, 37],
      zoom: 3.7,
    });
  
    this.map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      }),
      "top-right"
    );

    const nav = new mapboxgl.NavigationControl();
    this.map.addControl(nav, "top-right");
    console.log("hi," + this.locations);
    // this.locations.forEach(location => new mapboxgl.Marker()
    //   .setLngLat([location.lng, location.lat])
    //   .addTo(map));
  },

  watch: {
    // locations: function (newVal) {
    //   // watch it
    //   newVal.forEach((location) =>
    //     new mapboxgl.Marker()
    //       .setLngLat([location.lat, location.lng])
    //       .addTo(this.map)
    //   );
    // },
    locations: function (newVal) {
      // watch it
      newVal.forEach((location) => {
        new mapboxgl.Marker({
          color: 'black'
        })
        .setLngLat(location)
        .addTo(this.map)
      });
      
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
</style>