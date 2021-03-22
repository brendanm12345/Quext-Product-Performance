<template>
  <div
    class="fixed overflow-x-hidden overflow-y-auto inset-0 flex items-center z-50"
    v-show="value"
  >
    <div class="relative mx-auto w-full max-w-xl">
      <div class="bg-white w-full rounded-lg shadow-2xl flex flex-col p-8">
        <div id="page 1" v-if="showNext == false">
          <div class="w-full inline-flex justify-between items-center pb-4">
            <div class="text-3xl font-bold text-left">Add Community</div>
            <button @click="closeModal()" class="focus:outline-none">
              <span class="sr-only">back</span>
              <svg
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>

          <form id="new customer form" @submit.prevent="submitCommunityForm()">
            <div class="text-lg font-bold">Basic Information</div>
            <div class="inline-flex w-full pt-2 pb-4">
              <div class="w-1/2 pr-1">
                <label for="name" class="pb-2 text-sm font-semibold block"
                  >NAME</label
                >
                <input
                  id="name"
                  type="text"
                  v-model="name"
                  class="bg-gray-200 w-full focus:outline-none p-1 pl-2 pr-2 rounded-sm block"
                />
              </div>
              <div class="w-1/2 pl-1">
                <label for="units" class="pb-2 text-sm font-semibold block"
                  >NUMBER OF UNITS</label
                >
                <input
                  id="units"
                  type="text"
                  v-model="units"
                  class="bg-gray-200 w-full focus:outline-none p-1 pl-2 pr-2 rounded-sm block"
                />
              </div>
            </div>
            <div class="inline-flex w-full pb-4">
              <div class="w-1/2 pr-1">
                <label
                  for="street address"
                  class="pb-2 text-sm font-semibold block"
                  >STREET ADDRESS</label
                >
                <input
                  id="street address"
                  type="text"
                  v-model="streetAddress"
                  class="bg-gray-200 w-full focus:outline-none p-1 pl-2 pr-2 rounded-sm block"
                />
              </div>
              <div class="w-1/2 pl-1">
                <label for="city" class="pb-2 text-sm font-semibold block"
                  >CITY</label
                >
                <input
                  id="city"
                  type="text"
                  v-model="city"
                  class="bg-gray-200 w-full focus:outline-none p-1 pl-2 pr-2 rounded-sm block"
                />
              </div>
            </div>
            <div class="inline-flex w-full pb-2">
              <div class="w-1/2 pr-1">
                <label for="state" class="pb-2 text-sm font-semibold block"
                  >STATE</label
                >
                <input
                  id="state"
                  type="text"
                  v-model="state"
                  class="bg-gray-200 w-full focus:outline-none p-1 pl-2 pr-2 rounded-sm block"
                />
              </div>
              <div class="w-1/2 pl-1">
                <label for="country" class="pb-2 text-sm font-semibold block"
                  >COUNTRY</label
                >
                <input
                  id="country"
                  type="text"
                  v-model="country"
                  class="bg-gray-200 w-full focus:outline-none p-1 pl-2 pr-2 rounded-sm block"
                />
              </div>
            </div>
            <div class="block w-full pb-2">
              <div class="pb-2 text-sm font-semibold block">PRODUCTS</div>
              <div id="pills">
                <button
                  type="button"
                  @click="selectDigitalHuman = !selectDigitalHuman"
                  class="unclickedProduct w-auto font-semibold text-sm shadow-sm pl-3 pb-1 pt-1 pr-3 mr-2"
                  :class="{ digitalHuman: selectDigitalHuman }"
                >
                  digital human
                </button>
                <button
                  type="button"
                  @click="selectWebsites = !selectWebsites"
                  class="unclickedProduct w-auto font-semibold text-sm shadow-sm pl-3 pb-1 pt-1 pr-3 mr-2"
                  :class="{ websites: selectWebsites }"
                >
                  websites
                </button>
                <button
                  type="button"
                  @click="selectPropertyMgt = !selectPropertyMgt"
                  class="unclickedProduct w-auto font-semibold text-sm shadow-sm pl-3 pb-1 pt-1 pr-3 mr-2"
                  :class="{ corePms: selectPropertyMgt }"
                >
                  property mgt.
                </button>
                <button
                  type="button"
                  @click="selectConnect = !selectConnect"
                  class="unclickedProduct w-auto font-semibold text-sm shadow-sm pl-3 pb-1 pt-1 pr-3 mr-2"
                  :class="{ connect: selectConnect }"
                >
                  connect
                </button>
                <button
                  type="button"
                  @click="selectIot = !selectIot"
                  class="unclickedProduct w-auto font-semibold text-sm shadow-sm pl-3 pb-1 pt-1 pr-3 mr-2"
                  :class="{ iot: selectIot }"
                >
                  iot
                </button>
              </div>
            </div>
            <div class="text-white">
              <button
                type="submit"
                class="bg-blue-500 float-right font-bold text-sm mt-4 pt-2 pb-2 pl-3 pr-3 rounded-md"
              >
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddCommunityModal",
  props: {
    value: {
      required: true,
    },
    ownerId: {
      type: String,
    },
  },
  data() {
    return {
      name: "",
      units: "",
      customer_id: "",
      streetAddress: "",
      city: "",
      state: "",
      country: "",
      showNext: false,
      addCommunityMiniModal: false,
      existingCommunities: [],
      communitiesToPost: [],
      presentCustomerId: "",
      selectDigitalHuman: false,
      selectWebsites: false,
      selectPropertyMgt: false,
      selectConnect: false,
      selectIot: false,
    };
  },
  methods: {
    refreshCustomers() {
      this.$emit("get-customers");
    },
    async submitCommunityForm() {
      await axios
        .post(
          "http://localhost:3000/api/communities/",
          {
            name: this.name,
            units: this.units,
            customer_id: this.ownerId,
            address: this.streetAddress,
            city: this.city,
            state: this.state,
            country: this.country,
            digital_human: this.selectDigitalHuman,
            core_pms: this.selectPropertyMgt,
            websites: this.selectWebsites,
            connect: this.selectConnect,
            iot: this.selectIot,
          }
        )
        .then((Response) => {
          console.log(Response);
          this.presentCustomerId = Response.data["id"];
        })
        .catch((Error) => {
          console.log(Error);
        });
      this.$emit("input", !this.value);
      this.name = "";
      this.streetAddress = "";
      this.city = "";
      this.state = "";
      this.country = "";

      this.refreshCustomers();
    },
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
    closeModal() {
      this.$emit("input", !this.value);
    },
  },
  watch: {
    community: function (newVal) {
      console.log(newVal.name);
      this.name = newVal.name;
      this.units = newVal.units
      this.streetAddress = newVal.address;
      this.city = newVal.city;
      this.state = newVal.state;
      this.country = newVal.country;
      this.selectDigitalHuman = newVal.digital_human;
      this.selectPropertyMgt = newVal.core_pms;
      this.selectWebsites = newVal.websites;
      this.selectConnect = newVal.connect;
      this.selectIot = newVal.iot;
    },
  },
};
</script>

<style lang="scss" scoped>
button.addButton {
  border-style: inset solid;
  border-width: 1px;
  border-color: black;
  border-radius: 7px;
  padding-right: 14px;
  padding-left: 14px;
  padding-top: 4px;
  padding-bottom: 4px;
}
button.blackborder {
  border-style: solid;
  border-width: 1px;
  border-color: black;
}
button.blueborder {
  border-style: solid;
  border-width: 1px;
  border-color: #60a5fa;
}
button.unclickedProduct {
  color: gray;
  border-width: 1px;
  border-color: gray;
  border-style: solid;
  border-radius: 20px;
  outline: transparent;
}

button.digitalHuman {
  background-color: #35c4e7;
  color: white;
  border-color: #35c4e7;
  border-width: 1px;
  border-style: solid;
}
button.corePms {
  background-color: #ff6f48;
  color: white;
  border-color: #ff6f48;
  border-width: 1px;
  border-style: solid;
}
button.websites {
  background-color: #b383ff;
  color: white;
  border-color: #b383ff;
  border-width: 1px;
  border-style: solid;
}
button.connect {
  background-color: #3bd4ae;
  color: white;
  border-color: #3bd4ae;
  border-width: 1px;
  border-style: solid;
}
button.iot {
  background-color: #94c127;
  color: white;
  border-color: #94c127;
  border-width: 1px;
  border-style: solid;
}
</style>