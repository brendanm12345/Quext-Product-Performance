<template>
  <div class="absolute z-20 flex">
    <div class="bg-white w-screen h-screen flex align-center justify-between">
      <div id="data area" class="w-screen pl-24 pr-24 pt-32">
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
            <button class="addButton hover:underline">
              Add Customer
            </button>
          </div>
          <CustomerTable :customers="this.customers"/>
        </div>
        <div id="community data" v-if="customersView == false">
          <div id="searchbar + buttons" class="flex">
            <button class="addButton hover:underline">
              Add Community
            </button>
          </div>
          <CommunityTable :communities="this.communities"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomerTable from "./CustomerTable";
import CommunityTable from "./CommunityTable";

export default {
  name: "CustomerPage",
  props: ["customers", "communities"],
  components: { CustomerTable, CommunityTable },
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
button.addButton {
  border-style: solid;
  border-width: 1px;
  border-color: black;
  border-radius: 7px;
  padding-right: 15px;
  padding-left: 15px;
  padding-top: 5px;
  padding-bottom: 5px;
  
}
</style>