<template>
  <div>
    <div class="absolute z-20 flex">
      <div class="bg-white w-screen h-screen flex">
        <div id="back arrow" v-if="showCommunities == true">
          <button
            class="absolute h-auto topMargin ml-8 focus:outline-none"
            @click="showCommunities = false"
          >
            <span class="sr-only">back</span>
            <svg
              width="30"
              height="30"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div class="align-center justify-between">
          <div id="data area" class="w-screen pl-24 pr-24 pt-32">
            <div v-if="showCommunities == false">
              <CustomerPage />
              <table class="w-full">
                <thead>
                  <tr class="text-gray-500 text-sm">
                    <th id="nonbutton" class="font-medium">NAME</th>
                    <th id="nonbutton" class="font-medium">TOTAL UNITS</th>
                    <th id="nonbutton" class="font-medium">COMMUNITIES</th>
                    <th id="nonbutton" class="font-medium">LOCATION</th>
                    <th id="button">
                      <button
                        class="hover:bg-gray-100 rounded-full p-1 pl-2 pr-2 focus:outline-none"
                        @click="confirmDelete = !confirmDelete"
                      >
                        <span class="sr-only">delete all</span>
                        <svg
                          width="22"
                          height="22"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                      <div
                        v-if="confirmDelete"
                        id="confirm delete"
                        class="z-60 absolute shadow-lg rounded-lg m-1 float-right"
                        v-click-outside="hide"
                      >
                        <button
                          id="delete all button"
                          @click="(deleteAllCustomers()), (confirmDelete = false)"
                          class="w-full block bg-white text-sm font-bold text-red-600 border pl-3 pr-3 p-2 pt-3 rounded-lg focus:outline-none"
                        >
                          DELETE ALL
                        </button>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="customer in customers">
                    <tr :key="customer.id">
                      <td
                        id="nonbutton"
                        name="name"
                        class="font-bold minWidthName customerRow cursor-pointer"
                        @click="
                          [(showCommunities = true), getCustomer(customer.id)]
                        "
                      >
                        {{ customer.name }}
                      </td>
                      <td id="nonbutton">{{ sumTotalUnits(customer) }}</td>
                      <td id="nonbutton">{{ customer.communities.length }}</td>
                      <td id="nonbutton">
                        {{ customer.city }}, {{ customer.country }}
                      </td>
                      <td>
                        <button
                          class="hover:bg-gray-100 rounded-full p-1 pl-2 pr-2 focus:outline-none"
                          @click="
                            (showOptionsID = customer.id),
                              getCustomer(showOptionsID)
                          "
                        >
                          <span class="sr-only">options</span>
                          <svg
                            width="24"
                            height="24"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"
                            />
                          </svg>
                        </button>
                        <div
                          :id="customer.id"
                          class="z-60 absolute shadow-lg rounded-lg m-1 float-right"
                          v-if="customer.id == showOptionsID"
                          v-click-outside="hide"
                        >
                          <button
                            id="edit"
                            @click="
                              (editModal = !editModal), (showOptionsID = '')
                            "
                            class="w-full block bg-white text-sm font-bold text-black border p-2 pt-3 rounded-t-lg"
                          >
                            EDIT
                          </button>
                          <button
                            id="delete"
                            @click="
                              deleteCustomer(customer.id), (showOptionsID = '')
                            "
                            class="w-full block bg-white text-sm font-bold text-black border pt-2 pb-3 pr-4 pl-4 rounded-b-lg"
                          >
                            DELETE
                          </button>
                        </div>
                      </td>
                    </tr>

                    <template v-for="community in customer.communities">
                      <tr
                        v-if="
                          showCommunities == true &&
                          customerClickedOn == customer.id
                        "
                        :key="community.id"
                      >
                        <td id="nonbutton" name="name">{{ community.name }}</td>
                        <td id="nonbutton">{{ community.units }}</td>
                        <td id="nonbutton" colspan="2">
                          <div v-if="checkProducts(community) != null">
                            <ul
                              v-for="product in checkProducts(community)"
                              :key="product.value"
                              class="float-left font-bold text-sm flex"
                            >
                              <div
                                class="w-auto rounded-full shadow-sm text-white pl-3 pb-1 pt-1 pr-3 mr-3"
                                :style="{ 'background-color': product[1] }"
                              >
                                {{ product[0] }}
                              </div>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    </template>
                  </template>
                </tbody>
              </table>
            </div>
            <div v-if="showCommunities == true">
              <CommunityTable
                :customerClickedOn="this.customerClickedOn"
                :showCommunities="this.showCommunities"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="absolute z-40 inset-0 opacity-25 bg-black"
      v-if="editModal"
    ></div>
    <EditCustomerModal
      v-model="editModal"
      :customerToEdit="this.customerClickedOn"
    />
  </div>
</template>

<script>
import axios from "axios";
import CommunityTable from "./CommunityTable";
import CustomerPage from "./CustomerPage";
import vClickOutside from "v-click-outside";
import EditCustomerModal from "./EditCustomerModal";

export default {
  components: { CommunityTable, CustomerPage, EditCustomerModal },
  props: ["customers"],
  data() {
    return {
      confirmDelete: false,
      showCommunities: false,
      customerClickedOn: "",
      showOptionsID: "",
      editModal: false,
    };
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  methods: {
    async deleteAllCustomers() {
      await this.customers.forEach((customer) => {
        axios
          .delete("http://localhost:3000/api/customer/" + customer.id)
          .then((Response) => {
            console.log(Response);
          })
          .catch((Error) => {
            console.log(Error);
          });
      });
      this.getCustomers();
    },
    hide() {
      this.confirmDelete = false;
      this.showOptionsID = "";
    },
    reload() {
      this.$forceUpdate();
    },
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
    async getCustomer(customerId) {
      console.log("getting customer" + customerId);
      await axios
        .get("http://localhost:3000/api/customer/" + customerId)
        .then((res) => {
          this.customerClickedOn = res.data;
        })
        .catch((error) => console.log(error));
    },
    sumTotalUnits(customer) {
      let sum = 0;
      customer.communities.forEach((community) => {
        sum += parseInt(community.units);
      });
      return sum;
    },
    deleteCustomer(customerId) {
      axios
        .delete("http://localhost:3000/api/customer/" + customerId)
        .then((Response) => {
          console.log(Response);
          this.getCustomers();
        })
        .catch((Error) => {
          console.log(Error);
        });
    },
    async getCustomers() {
      const res = await axios.get("http://localhost:3000/api/customer/");
      this.customers = res.data;
    },
  },
  watch: {
    editModal: function (newVal) {
      if (newVal == false) {
        console.log("inside if");
        this.reload();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
table {
  border-spacing: 0px;
  font-size: 18;
}
table,
th,
#button {
  padding-right: 10px;
}
#nonbutton {
  padding-right: 15px;
  min-width: 250px;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 0px;
}

.minWidthName {
  min-width: 600px;
}

th {
  text-align: left;
}
td {
  //font-weight: bold;
  border-top: 2px solid #e5e7eb;
  border-collapse: collapse;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.customerRow:hover {
  font-weight: 750;
}
.topMargin {
  margin-top: 142px;
}
</style>