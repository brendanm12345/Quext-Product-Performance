<template>
  <div
    class="fixed overflow-x-hidden overflow-y-auto inset-0 flex items-center z-50"
    v-show="value"
  >
    <div class="relative mx-auto w-full max-w-xl">
      <div class="bg-white w-full rounded-lg shadow-2xl flex flex-col p-8">
        <div class="text-3xl font-bold text-left pb-4">Add Community</div>
        <form id="new community form" @submit.prevent="submitForm">
          <div class="text-lg font-bold">Basic Information</div>
          <div class="mb-4 mt-2">
            <label for="name" class="pb-2 text-sm font-semibold block"
              >NAME</label
            >
            <input
              id="name"
              type="text"
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
                class="bg-gray-200 w-full focus:outline-none p-1 pl-2 pr-2 rounded-sm block"
              />
            </div>
          </div>
          <div class="text-lg font-bold">Products</div>
          <div>
            <button
              type="submit"
              class="white-text bg-blue-400 justify-left font-semibold text-sm pt-2 pb-2 pl-3 pr-3 rounded-md"
            >
              SUBMIT
            </button>
          </div>
        </form>
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
  },
  data() {
    return {
      name: "",
      streetAddress: "",
      city: "",
      state: "",
      country: "",
    };
  },
  methods: {
    submitForm() {
      console.log("Submitted!");
      axios.post("http://localhost:3000/api/communities", {
          name: this.name,
          
      })
    },
  },
};
</script>

<style lang="scss" scoped>
white-text {
  color: white;
}
</style>