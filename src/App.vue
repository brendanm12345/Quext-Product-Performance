<template>
  <div id="app">
    <CustomerPage v-if="showCustomerPage == true"/>
    <div class="flex">
      <div
        id="nav"
        class="bg-white w-full shadow-md z-30 h-15 flex items-center align-center justify-between"
      >
        <div class="flex items-center align-center">
          <img src="./assets/quextLogo.png" class="h-16 pl-4 pt-3 pb-3" />
          <div class="text-2xl font-light pl-1">Product Performance</div>
        </div>
        <div class="pt-2 pb-2">
          <button
            class="bg-white rounded-sm pt-1 pl-3 pr-3 pb-1 hover:bg-gray-100 focus:outline-none"
            @click="showCustomerPage = false"
            :class="{ active: showCustomerPage == false } "
          >
            MAP
          </button>
          <button
            class="mr-3 bg-white rounded-sm pt-1 pl-3 pr-3 pb-1 hover:bg-gray-100 focus:outline-none"
            @click="showCustomerPage = true"
            :class="{ active: showCustomerPage == true }"
          >
            CUSTOMERS
          </button>
        </div>
      </div>
    </div>
    <div class="flex flex-col pt-2 pl-2">
      <div class="bg-gray-100 bg-opacity-75 w-40 z-10 p-4 rounded-lg">
        <div class="text-xl font-semibold">Filters</div>
        <div>
          <input
            type="checkbox"
            id="digitalHuman"
            class="checkbox"
            v-model="digitalHumanChecked"
            checked
          />
          <label for="digitalHuman"> Digital Human</label><br />
        </div>
        <div>
          <input
            type="checkbox"
            id="websites"
            v-model="websitesChecked"
            checked
          />
          <label for="websites"> Wesbites</label><br />
        </div>
        <div>
          <input
            type="checkbox"
            id="propertyMgt"
            v-model="propertyMgtChecked"
            checked
          />
          <label for="propertyMgt"> Property Mgt.</label><br />
        </div>
        <div>
          <input
            type="checkbox"
            id="connect"
            v-model="connectChecked"
            checked
          />
          <label for="connect"> Connect</label><br />
        </div>
        <div>
          <input type="checkbox" id="iot" v-model="iotChecked" checked />
          <label for="iot"> IoT</label><br />
        </div>
      </div>
      <button
        @click="openModal"
        class="bg-gray-100 bg-opacity-75 hover:bg-opacity-100 w-40 z-10 p-4 rounded-lg mt-2 text-xl font-semibold"
      >
        Communities
      </button>
    </div>
    <BaseMap
      :locations="this.locations"
      :digitalHumanChecked="this.digitalHumanChecked"
      :websitesChecked="this.websitesChecked"
      :propertyMgtChecked="this.propertyMgtChecked"
      :connectChecked="this.connectChecked"
      :iotChecked="this.iotChecked"
    />
    <div
      v-if="communitiesModal == true"
      class="absolute z-40 inset-0 opacity-25 bg-black"
    ></div>
    <Modal v-model="communitiesModal" />
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
import Modal from "./components/Modal";
import CustomerPage from "./components/CustomerPage";

export default {
  name: "MapPage",
  components: { BaseMap, Modal, CustomerPage },
  data() {
    return {
      showCustomerPage: false,
      communitiesModal: false,
      digitalHumanChecked: true,
      websitesChecked: true,
      propertyMgtChecked: true,
      connectChecked: true,
      iotChecked: true,
      locations: [],
      customers: [],
      customerAddresses: [],
      communityAddresses: [],
    };
  },

  methods: {
    openModal() {
      this.communitiesModal = !this.communitiesModal;
    },

    // fills customer and community address arrays with address strings
    // TODO: this function needs to be able to fill the communityAddresses and customerAddresses with objects containing address string and color string. The color string will be black for customers and for communities will be determined by each product that is true the corresponding color will be associated with it. Probably no for loop and just five lines that pushes the object to the array if product is true
    makeAddresses() {
      this.customers.forEach((element) => {
        const addressString =
          element.address.address +
          ", " +
          element.address.city +
          ", " +
          element.address.state;
        const addressAndColor = [addressString, "black"];
        console.log(addressAndColor);
        this.customerAddresses.push(addressAndColor);
        element.communities.forEach((community) => {
          const addressString =
            community.address.address +
            ", " +
            community.address.city +
            ", " +
            community.address.state;
          if (community.digital_human == true) {
            this.communityAddresses.push([
              addressString,
              "#35c4e7",
              [-6, 0],
              this.digitalHumanChecked,
              "digitalHuman",
            ]);
          }
          if (community.core_pms == true) {
            this.communityAddresses.push([
              addressString,
              "#ff6f48",
              [0, 0],
              this.propertyMgtChecked,
              "propertyMgt",
            ]);
          }
          if (community.websites == true) {
            this.communityAddresses.push([
              addressString,
              "#b383ff",
              [0, 6],
              this.websitesChecked,
              "websites",
            ]);
          }
          if (community.connect == true) {
            this.communityAddresses.push([
              addressString,
              "#3bd4ae",
              [0, -6],
              this.connectChecked,
              "connect",
            ]);
          }
          if (community.iot == true) {
            this.communityAddresses.push([
              addressString,
              "#94c127",
              [6, 0],
              this.iotChecked,
              "iot",
            ]);
          }
        });
      });
      this.geocode(this.communityAddresses);
      console.log("customer", this.locations);
    },
    // TODO: make geocode function take in an input of customer and community addresses arrays
    // geocodes every customer headquarters address
    geocode(addresses) {
      addresses.forEach((address) => {
        geocodingClient
          .forwardGeocode({
            query: address[0],
          })
          .send()
          .then((response) => {
            const match = response.body;
            // make object with match.features[0].center and color and push to locations
            this.locations.push([
              match.features[0].center,
              address[1],
              address[2],
              address[3],
              address[4],
            ]);
          });
      });
    },

    // geocode() {
    //   this.customers.forEach((element) => {
    //     const addressString =
    //       element.address.address +
    //       ", " +
    //       element.address.city +
    //       ", " +
    //       element.address.state;
    //     geocodingClient
    //       .forwardGeocode({
    //         query: addressString,
    //       })
    //       .send()
    //       .then((response) => {
    //         const match = response.body;
    //         // console.log(addressString);
    //         //console.log(match.features[0].center);
    //         this.locations.push(match.features[0].center);
    //       });
    //     console.log(this.locations);
    //   });
    //},
    async getCustomers() {
      await axios
        .get("http://localhost:3000/api/customer")
        .then((res) => {
          this.customers = res.data;
        })
        .catch((error) => console.log(error))
        .finally(() => this.makeAddresses());
      //this.geocode(this.communityAddresses);
    },
  },
  created() {
    this.getCustomers();
  },
};
</script>
<style lang="css">
.active {
  font-weight: bold;
}
#checkbox {
  color: black;
  background-color: rgba(0, 0, 0, 0.08);
}
input[type="checkbox"] {
  visibility: hidden;
}
input[type="checkbox"] + label:before {
  border: 1px solid #333;
  border-radius: 3px;
  content: "\00a0";
  display: inline-block;
  font: 14px/1em sans-serif;
  height: 14px;
  margin: 0.35em 0.25em 0.25em -0.85em;
  padding: 0;
  vertical-align: top;
  width: 14px;
}
input[type="checkbox"]:checked + label:before {
  color: white;
  content: "\2713";
  text-align: center;
}
#digitalHuman:checked + label:before {
  background: #35c4e7;
  border: #35c4e7;
}
#propertyMgt:checked + label:before {
  background: #ff6f48;
  border: #ff6f48;
}
#websites:checked + label:before {
  background: #b383ff;
  border: #b383ff;
}
#connect:checked + label:before {
  background: #3bd4ae;
  border: #3bd4ae;
}
#iot:checked + label:before {
  background: #94c127;
  border: #94c127;
}

input[type="checkbox"]:checked + label:after {
  font-weight: bold;
}

input[type="checkbox"]:focus + label::before {
  outline: rgb(59, 153, 252) auto 5px;
}
</style>