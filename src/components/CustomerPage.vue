<template>
  <div class="absolute z-20 flex">
    <div class="bg-white w-screen h-screen flex align-center justify-between">
      <div id="data area" class="pl-24 pr-24 pt-24">
        <div id="Customers Commumities Buttons" class="text-4xl">
          <button
            class="pr-4 font-extrabold text-gray-400 hover:underline focus:outline-none"
            @click="customersView = true"
            :class="{ active: customersView }"
          >
            Customers
          </button>
          <button
            class="font-extrabold text-gray-400 hover:underline focus:outline-none"
            @click="customersView = false"
            :class="{ active: !customersView }"
          >
            Communities
          </button>
        </div>

        <div id="customers data" v-if="customersView == true">
          <div id="searchbar + buttons" class="flex">
            <div>searchbar</div>
            <button class="rounded-md border border-black pt-2 pb-2 pr-3 pl-3">
              Add Customer
            </button>
          </div>

          <table>
              <thead>
                <tr class="text-gray-500 text-sm">
                    <th class="font-light">NAME</th>
                    <th class="font-light">UNITS</th>
                    <th class="font-light">COMMUNITIES</th>
                    <th class="font-light">LOCATION</th>
                </tr>
              </thead>
              <tbody>

              </tbody>
          </table>
          
        </div>
        <div id="community data" v-if="customersView == false">
            <div id="searchbar + buttons" class="flex">
              <div>searchbar</div>
              <button
                class="rounded-md border border-black pt-2 pb-2 pr-3 pl-3"
              >
                Add Community
              </button>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomerPage",
  data() {
    return {
      customersView: true,
    };
  },
};
</script>

<style lang="scss" scoped>
.active {
  color: black;
  text-decoration: none;
}
</style>