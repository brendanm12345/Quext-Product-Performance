<template>
  <div
    v-if="communities != null"
    id="communities modal"
    class="fixed overflow-x-hidden overflow-y-auto inset-0 flex items-center z-50"
    v-show="value"
  >
    <div class="relative mx-auto w-full max-w-4xl">
      <div class="bg-white w-full rounded-2xl shadow-2xl flex flex-col p-8">
        <div class="text-3xl font-bold text-left pb-4">Communities</div>
        <ul id="community sections" class="justify-items-start">
          <div
            v-for="community in communities"
            :key="community.id"
            class="w-auto pt-2 pb-2 flex-col flex border-t-2 border-gray-300"
          >
            <div id="line 1 of community" class="inline flex pb-1">
              <div class="text-left text-lg font-bold">
                {{ community.name }}
              </div>
              <div class="text-left text-lg pl-4">
                {{ community.address.city }}
              </div>
              <div class="text-left text-lg pl-4">
                {{ community.address.address }}
              </div>
            </div>
            <div v-if="checkProducts(community) != null">
              <ul
                v-for="product in checkProducts(community)"
                :key="product.value"
                class="float-left font-bold text-sm inline flex"
              >
                <div
                  class="w-auto rounded-full text-white pl-3 pb-0 pt-0 pr-3 mt-1 mb-1 mr-3"
                  :style="{ 'background-color': product[1] }"
                >
                  {{ product[0] }}
                </div>
              </ul>
            </div>
          </div>
        </ul>

        <form id="new community form" @submit.prevent="submitForm">
          <div class="mb-4 mt-6">
            <label
              class="block text-gray-700 text-sm font-semibold mb-2 text-left"
              htmlFor="name"
            >
              Name
            </label>
            <input
              id="name"
              class="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
              type="text"
              placeholder="Community Name"
              required
            />
          </div>
          <div class="mb-6 mt-6">
            <label
              class="block text-gray-700 text-sm font-semibold mb-2 text-left"
              htmlFor="address"
            >
              Address
            </label>
            <input
              id="address"

              class="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10"
              type="address"
              placeholder="44 University Ave, Palo Alto, CA, 94025"
              required
            />
          </div>
          <div class="mb-6 mt-6">
            <label
              class="block text-gray-700 text-sm font-semibold mb-2 text-left"
              htmlFor="amenities"
            >
              Amenities
            </label>
            <input
              id="communityAmenities"
              
              class="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10"
              type="text"
              placeholder="wifi, hot tub, tennis court"
            />
          </div>
          <div id="buttons" class="w-full">
            <button
              @click="postModal = false"
              class="text-center inline-flex text-blue-600 rounded-l-md border w-1/2 border-blue-600 bg-white hover:bg-blue-100 px-2 py-2 mb-3 mt-1 font-semibold focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="text-center inline-flex text-white rounded-r-md border border-blue-600 bg-blue-600 hover:bg-blue-400 hover:border-blue-400 px-2 py-2 w-1/2 m-auto mb-3 mt-1 font-semibold focus:outline-none"
            >
              Add Community
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// TODO: be able to change the color of the different product pills (CSS) based on product[1]

import axios from "axios";

export default {
  name: "Modal",
  props: {
    value: {
      required: true,
    },
  },
  data() {
    return {
      communities: [],
    };
  },
  computed: {
    
  },
  methods: {
    checkProducts(community) {
      var hasProducts = [];
      if (community.digital_human) {
        hasProducts.push(["digital human", "#35c4e7"]);
      }
      if (community.core_pms) {
        hasProducts.push(["core pms", "#ff6f48"]);
      }
      if (community.websites) {
        hasProducts.push(["websites", "#b383ff"]);
      }
      if (community.connect) {
        hasProducts.push(["connect", "#3bd4ae"]);
      }
      if (community.iot) {
        hasProducts.push(["iot", "#94c127"]);
      }
      return hasProducts;
    },
    async getCommunities() {
      const res = await axios.get("http://localhost:3000/api/communities");
      this.communities = res.data;
      console.log(this.communities);
    },
  },
  mounted() {
    this.getCommunities();
  },
};
</script>

<style lang="scss" scoped>
</style>