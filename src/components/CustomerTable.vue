<template>
  <div>
    <div class="absolute z-20 flex">
      <div class="bg-white w-screen h-screen flex align-center justify-between">
        <div id="data area" class="w-screen pl-24 pr-24 pt-32">
          <div v-if="showCommunities == false">
            <CustomerPage />
            <table class="w-full">
              <thead>
                <tr class="text-gray-500 text-sm">
                  <th id="nonbutton" class="font-medium">NAME</th>
                  <th id="nonbutton" class="font-medium">UNITS</th>
                  <th id="nonbutton" class="font-medium">COMMUNITIES</th>
                  <th id="nonbutton" class="font-medium">LOCATION</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="customer in customers">
                  <tr
                    :key="customer.id"
                    class="customerRow"
                    @click="
                      [(showCommunities = true), getCustomer(customer.id)]
                    "
                  >
                    <td id="nonbutton" name="name" class="font-bold">
                      {{ customer.name }}
                    </td>
                    <td id="nonbutton">units</td>
                    <td id="nonbutton">{{ customer.communities.length }}</td>
                    <td id="nonbutton">
                      {{ customer.city }}, {{ customer.country }}
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
</template>

<script>
import axios from "axios";
import CommunityTable from "./CommunityTable";
import CustomerPage from "./CustomerPage";
export default {
  components: { CommunityTable, CustomerPage },
  props: ["customers"],
  data() {
    return {
      showCommunities: false,
      customerClickedOn: "",
    };
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
    toggleId(customerClickedOn, id) {
      console.log("trying to toggle");
      if (customerClickedOn == id) {
        console.log("inside if");
        customerClickedOn = null;
      } else {
        console.log("inside else");
        customerClickedOn = id;
      }
    },
    getCustomer(customerId) {
      axios
        .get("http://localhost:3000/api/customer/" + customerId)
        .then((res) => {
          this.customerClickedOn = res.data;
        })
        .catch((error) => console.log(error));
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

th {
  text-align: left;
}
td {
  //font-weight: bold;
  border-top: 2px solid #e5e7eb;
  border-collapse: collapse;
}
.customerRow:hover {
  background-color: #f9fafb;
}
</style>