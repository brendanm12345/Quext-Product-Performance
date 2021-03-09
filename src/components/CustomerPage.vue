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
            <button
              class="addButton hover:underline"
              @click="addCustomerModal = !addCustomerModal"
            >
              Add Customer
            </button>
            
            <!--
            <template>
              <h4 class="mb-4">Result:</h4>
              <vue-csv-import
                autoMatchFields = true
                url="http://localhost:3003/service/auth/v1/customers/test"
                v-model="csv"
                :map-fields="['columnA', 'columnB']"
              ></vue-csv-import>
              <div class="mt-2">
                {{ csv }}
              </div>
              
              <vue-csv-import
                url="http://localhost:3000/api/customer"
                :map-fields="['name', 'units', 'address', 'city']"
              >
                <vue-csv-map></vue-csv-map>
              </vue-csv-import>

             
              <vue-csv-import
                url="http://localhost:3000/api/customer"
                v-model="csv"
                :map-fields="['name', 'units', 'field', 'names']"
              >
                <vue-csv-toggle-headers></vue-csv-toggle-headers>
                <vue-csv-errors></vue-csv-errors>
                <vue-csv-input name="file">upload</vue-csv-input>
                <vue-csv-map></vue-csv-map>
                <vue-csv-submit url="http://localhost:3000/api/customer"></vue-csv-submit>
              </vue-csv-import>
              
            </template>
            -->
          </div>
          <CustomerTable :customers="this.customers" />
          <div
            class="absolute z-40 inset-0 opacity-25 bg-black"
            v-if="addCustomerModal"
          ></div>
          <AddCustomerModal v-model="addCustomerModal" />
        </div>
        <div id="community data" v-if="customersView == false">
          <div id="searchbar + buttons" class="flex">
            <button
              class="addButton hover:underline"
              @click="addCommunityModal = !addCommunityModal"
            >
              Add Community
            </button>
          </div>
          <CommunityTable :communities="this.communities" />
          <div
            class="absolute z-40 inset-0 opacity-25 bg-black"
            v-if="addCommunityModal"
          ></div>
          <AddCommunityModal v-model="addCommunityModal" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Fix bug: on submit, an internal server error is caused. Its p[osting an empty array cuz the files isnt being stored or mapped anywhere.

// Use one of the templates for the VueCsvImport component and add data point to reflect
import CustomerTable from "./CustomerTable";
import CommunityTable from "./CommunityTable";
import AddCommunityModal from "./AddCommunityModal";
import AddCustomerModal from "./AddCustomerModal";
//import VueCsvImport from "vue-csv-import";

export default {
  name: "CustomerPage",
  props: ["customers", "communities"],
  components: {
    CustomerTable,
    CommunityTable,
    AddCommunityModal,
    AddCustomerModal,
    //VueCsvImport,
    //VueCsvToggleHeaders,
    // VueCsvInput,
    //VueCsvErrors,
    //VueCsvMap,
  },

  data() {
    return {
      customersView: true,
      addCommunityModal: false,
      addCustomerModal: false,
      csv: null,
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