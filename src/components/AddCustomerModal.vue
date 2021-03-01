<template>
  <div
    class="fixed overflow-x-hidden overflow-y-auto inset-0 flex items-center z-50"
    v-show="value"
  >
    <div class="relative mx-auto w-full max-w-xl">
      <div class="bg-white w-full rounded-lg shadow-2xl flex flex-col p-8">
        <div id="page 1" v-if="showNext == false">
          <div class="text-3xl font-bold text-left pb-4">Add Customer</div>
          <form id="new customer form" @submit.prevent="submitCustomerForm">
            <div class="text-lg font-bold">Basic Information</div>
            <div class="mb-4 mt-2">
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
            <div>
              <button
                type="submit"
                class="text-white bg-blue-400 float-right font-semibold text-sm mt-4 pt-2 pb-2 pl-3 pr-3 rounded-md"
              >
                NEXT
              </button>
            </div>
          </form>
        </div>
        <div id="page 2" v-if="showNext == true">
          <div class="text-3xl font-bold text-left pb-4">Add Customer</div>
          <form id="new community form" @submit.prevent="submitPage2">
            <div class="text-lg font-bold">Communities</div>
            <button
              class="addButton hover:underline"
              @click="addCommunityMiniModal = !addCommunityMiniModal"
            >
              Add Community
            </button>
            <form
              v-if="addCommunityMiniModal"
              class="rounded-md shadow-md p-2 mt-2 mb-2"
              @submit.prevent="addCommunityToArray"
            >
              <div class="inline-flex w-full pb-4">
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
              <div class="inline-flex w-full pb-2">
                <div class="pb-2 text-sm font-semibold block">PRODUCTS</div>
              </div>
              <div id="cancel and add buttons" class="flex justify-end">
                <button
                  type="submit"
                  class="text-white bg-blue-400 blueborder font-semibold text-xs mt-4 pt-2 pb-2 pl-3 pr-3 rounded-md mr-2"
                >
                  ADD
                </button>
                <button
                  @click="addCommunityMiniModal = false"
                  class="text-black blackborder font-semibold text-xs mt-4 pt-2 pb-2 pl-3 pr-3 rounded-md"
                >
                  CANCEL
                </button>
              </div>
            </form>
            <div id="added community pills" class="mt-4 mb-4">
              <span
                v-for="community in communitiesToPost"
                :key="community.id"
                class="rounded-full bg-gray-200 pt-2 pb-2 pr-3 pl-3 mr-3 text-sm font-semibold"
              >
                {{ community.name }}
              </span>
            </div>
            <div class="flex justify-end">
              <button
                type="submit"
                class="text-white bg-blue-400 font-semibold text-sm mt-4 pt-2 pb-2 pl-3 pr-3 rounded-md"
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
  name: "AddCustomerModal",
  props: {
    value: {
      required: true,
    },
  },
  data() {
    return {
      name: "",
      units: "",
      streetAddress: "",
      city: "",
      state: "",
      country: "",
      showNext: false,
      addCommunityMiniModal: false,
      communitiesToPost: [],
      presentCustomerId: "",
    };
  },
  methods: {
    submitCustomerForm() {
      console.log("Submitted Customer");
      axios
        .post("http://localhost:3000/api/customer", {
          name: this.name,
          address: this.streetAddress,
          city: this.city,
          state: this.state,
          country: this.country,
        })
        .then((Response) => {
          console.log(Response);
          this.showNext = true;
          this.getCommunities();
        })
        .catch((Error) => {
          console.log(Error);
        });

    // find a way to the the present customer Id into data and add ID to the communities
      this.presentCustomerID = "",
      this.name = "";
      this.streetAddress = "";
      this.city = "";
      this.state = "";
      this.country = "";
    },
    addCommunityToArray() {
      this.communitiesToPost.push({
        name: this.name,
        units: this.units,
        address: this.streetAddress,
        city: this.city,
        state: this.state,
        country: this.country,
      });
      this.addCommunityMiniModal = false;
      this.name = "";
      this.units = "";
      this.streetAddress = "";
      this.city = "";
      this.state = "";
      this.country = "";
    },
    submitPage2() {
      this.communitiesToPost.forEach((community) => {
        axios
          .post("http://localhost:3000/api/communities", {
            name: community.name,
            units: community.units,
            customer_id: "",
            address: community.streetAddress,
            city: community.city,
            state: community.state,
            country: community.country,
          })
          .then((Response) => {
            console.log(Response);
            this.showNext = true;
            this.getCommunities();
          })
          .catch((Error) => {
            console.log(Error);
          });
      });
      this.value.required = false;
    },
  },
};
</script>

<style lang="scss" scoped>
button.addButton {
  border-style: solid;
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
</style>