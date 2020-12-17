<template>
  <div id="app">
    <div class="flex">
      <div
        class="bg-white bg-opacity-75 w-full z-10 h-15 inline-flex items-center"
      >
        <img src="./assets/quextLogo.png" class="h-16 pl-4 pt-3 pb-3" />
        <div class="text-2xl font-light pl-1">Product Performance</div>
      </div>
    </div>
    <div class="flex flex-col pt-2 pl-2">
      <div class="bg-gray-100 bg-opacity-75 w-40 z-10 p-4 rounded-lg">
        <div class="text-xl font-semibold">Filters</div>
        <div>
          <input type="checkbox" name="digitalHuman" class="checkbox" />
          <label for="digitalHuman"> Digital Human</label><br />
        </div>
        <div>
          <input type="checkbox" name="websites" />
          <label for="websites"> Wesbites</label><br />
        </div>
        <div>
          <input type="checkbox" name="propertyMgt" />
          <label for="propertyMgt"> Property Mgt.</label><br />
        </div>
        <div>
          <input type="checkbox" name="connect" />
          <label for="connect"> Connect</label><br />
        </div>
        <div>
          <input type="checkbox" name="iot" />
          <label for="iot"> IoT</label><br />
        </div>
      </div>
      <button
        @click="geocode"
        class="bg-gray-100 bg-opacity-75 hover:bg-opacity-100 w-40 z-10 p-4 rounded-lg mt-2 text-xl font-semibold"
      >
        Communities
      </button>
    </div>
    <BaseMap :locations="this.locations" />
    <!--

    <div class="inline-flex">
      <div class="">
        <div class="bg-white shadow-lg h-16 w-400">
          <img src="./assets/quextLogo.png" class="h-16 pl-4 pt-3 pb-3 pr-10" />
        </div>
        <div
          id="filters"
          class="m-2 bg-gray-200 bg-opacity-75 rounded-lg shadow-xl"
        >
          <div class="flex flex-inline pt-3 pl-3">
            <div class="pr-2 pt-1">
              <svg
                width="20"
                height="20"
                viewBox="0 0 15 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.05025 4.05025C7.78392 1.31658 12.2161 1.31658 14.9497 4.05025C17.6834 6.78392 17.6834 11.2161 14.9497 13.9497L10 18.8995L5.05025 13.9497C2.31658 11.2161 2.31658 6.78392 5.05025 4.05025ZM10 11C11.1046 11 12 10.1046 12 9C12 7.89543 11.1046 7 10 7C8.89543 7 8 7.89543 8 9C8 10.1046 8.89543 11 10 11Z"
                  fill="#000000"
                />
              </svg>
            </div>
            <div id="title" class="font-semibold text-xl pb-1">FILTERS</div>
          </div>

          <ul class="flex flex-col pr-4 pl-4">
            <div id="digital human" class="pb-1">
              <input
                type="checkbox"
                name="digitalHuman"
                value="Digital Human"
              />
              <label for="digitalHuman" class="pl-2">Digital Human</label>
            </div>
            <div id="Property Mgt." class="pb-1">
              <input type="checkbox" name="propertyMgt" value="Property Mgt." />
              <label for="propertyMgt" class="pl-2">Property Mgt.</label>
            </div>
            <div id="websites" class="pb-1">
              <input type="checkbox" name="websites" value="Websites" />
              <label for="websites" class="pl-2">Websites</label>
            </div>
            <div id="Connect" class="pb-1">
              <input type="checkbox" name="connect" value="Connect" />
              <label for="connect" class="pl-2">Connect</label>
            </div>
            <div id="IoT" class="pb-1">
              <input type="checkbox" name="Iot" value="Iot" />
              <label for="Iot" class="pl-2">Iot</label>
            </div>
          </ul>
        </div>
        <div
          id="communities"
          class="m-2 p-4 bg-gray-200 bg-opacity-75 rounded-lg shadow-xl flex flex-inline"
        >
          <button class="font-semibold text-xl">COMMUNITIES</button>
        </div>
       
      </div>
      -->
  </div>
</template>

<script>
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const geocodingClient = mbxGeocoding({
  accessToken:
    "pk.eyJ1IjoiYnJlbmRhbm0xMjM0IiwiYSI6ImNraGdpOHFrcDAzNmMzNHB0cWd5N3lybWgifQ.pbNyNcQG6kNyESAo20P6nQ",
});

import axios from "axios";

import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import BaseMap from "./components/BaseMap.vue";

//import SideBar from "./components/SideBar";

export default {
  components: { BaseMap },
  data() {
    return {
      locations: [],
      customers: [],
      allCommunities: [
        {
          name: "Madera Residential",
          coords: { lat: -90, lng: 45 },
        },
        {
          name: "Menlo Park",
          coords: { lat: -89, lng: 40 },
        },
        {
          name: "Menlo Park",
          coords: { lat: -80, lng: 37 },
        },
      ],
      allProducts: [
        { lat: -90, lng: 45 },
        { lat: -89, lng: 40 },
        { lat: -80, lng: 37 },
      ],
    };
  },

  methods: {
    fetchAllProducts() {
      this.locations = this.allProducts;
      axios.post(
        "https://api.mapbox.com/geocoding/v5/mapbox.places/Washington.json?limit=2&access_token=pk.eyJ1IjoiYnJlbmRhbm0xMjM0IiwiYSI6ImNraGdpOHFrcDAzNmMzNHB0cWd5N3lybWgifQ.pbNyNcQG6kNyESAo20P6nQ"
      );
    },
    fetchWebsites() {
      this.locations = this.allProducts;
      console.log("got all websites");
    },
    fetchDigitalHuman() {
      this.locations = this.allProducts;
      console.log("got all digital humans");
    },

    // geocodes every customer headquarters address
    geocode() {
      this.customers.forEach(element => {
        const addressString = element.address.address + ", " + element.address.city + ", " + element.address.state;
        geocodingClient
        .forwardGeocode({
          query: addressString
        })
        .send()
        .then((response) => {
          const match = response.body;
         // console.log(addressString);
          //console.log(match.features[0].center);
          this.locations.push(match.features[0].center);
        });
        console.log(this.locations);
      });

      // geocodingClient
      //   .forwardGeocode({
      //     query: this.customers[0].address.address + ", " + this.customers[0].address.city + ", " + this.customers[0].address.state,
      //   })
      //   .send()
      //   .then((response) => {
      //     const match = response.body;
      //     console.log(this.customers[0].address.address + ", " + this.customers[0].address.city + ", " + this.customers[0].address.state);
      //     console.log(match.features[0].center);
      //     this.locations = match.features[0].center;
      //   });
    },
    async getCustomers() {
      const res = await axios.get("http://localhost:3000/api/customer");
      this.customers = res.data;
      console.log(res.data);
      // console.log(this.customers[1].address.address + ", " + this.customers[1].address.city + ", " + this.customers[1].address.state)
    },
  },
  created() {
    this.getCustomers();
  },
};
</script>
<style lang="css">
#checkbox {
  color: black;
  background-color: rgba(0, 0, 0, 0.08);
}
</style>


 <!--
        <ul class="pt-3 flex flex-col">
          <div class="pb-3 pt-3 pl-4 hover:bg-gray-200">
            <button
              @click="fetchAllProducts"
              class="focus:outline-none text-xl font-semibold"
            >
              PRODUCTS
            </button>
          </div>
          <div class="pb-3 pt-3 pl-4 hover:bg-gray-200">
            <button @click="fetchWebsites" class="focus:outline-none text-xl">
              Websites
            </button>
          </div>
          <div class="pb-3 pt-3 pl-4 hover:bg-gray-200">
            <button
              @click="fetchDigitalHuman"
              class="focus:outline-none text-xl"
            >
              Digital Human
            </button>
          </div>
        </ul>
        -->