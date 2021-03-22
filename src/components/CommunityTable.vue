<template>
  <div>
    <div id="topbar" class="inline-flex justify-between w-full">
      <div id="customerName" class="text-4xl pr-4 font-bold text-black">
        {{ customerClickedOn.name }}
      </div>
      <button
        class="addButton hover:underline mr-4"
        @click="addCommunityModal = !addCommunityModal"
      >
        Add Community
      </button>
      <div
        class="absolute z-40 inset-0 opacity-25 bg-black"
        v-if="addCommunityModal"
      ></div>
      <AddCommunityModal
        @get-customers="refreshCustomers()"
        v-model="addCommunityModal"
        :ownerId="this.customerClickedOn.id"
      />
    </div>

    <table class="w-full">
      <thead>
        <tr class="text-gray-500 text-sm">
          <th id="name" class="nonbutton font-medium">NAME</th>
          <th id="units" class="nonbutton font-medium">UNITS</th>
          <th id="location" class="nonbutton font-medium">LOCATION</th>
          <th id="products" class="nonbutton font-medium">PRODUCTS</th>
          <th id="button" class="button"></th>
        </tr>
      </thead>
      <tbody @change="editModal">
        <template v-for="community in this.customerClickedOn.communities">
          <tr :key="community.id">
            <td id="name" class="nonbutton font-bold">{{ community.name }}</td>
            <td id="units" class="nonbutton">{{ community.units }}</td>
            <td id="location" class="nonbutton">
              {{ community.city }}, {{ community.country }}
            </td>
            <td id="product" class="nonbutton" colspan="1">
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
            <td class="button">
              <button
                class="hover:bg-gray-100 rounded-full p-1 pl-2 pr-2 focus:outline-none"
                @click="
                  (showOptionsID = community.id), getCommunity(showOptionsID)
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
                :id="community.id"
                class="z-60 absolute shadow-lg rounded-lg m-1 float-right"
                v-if="community.id == showOptionsID"
                v-click-outside="hide"
              >
                <button
                  id="edit"
                  @click="(editModal = !editModal), (showOptionsID = '')"
                  class="w-full block bg-white text-sm font-bold text-black border p-2 pt-3 rounded-t-lg"
                >
                  EDIT
                </button>
                <button
                  id="delete"
                  @click="deleteCommunity(community.id), (showOptionsID = '')"
                  class="w-full block bg-white text-sm font-bold text-black border pt-2 pb-3 pr-4 pl-4 rounded-b-lg"
                >
                  DELETE
                </button>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <div
      class="absolute z-40 inset-0 opacity-25 bg-black"
      v-if="editModal"
    ></div>
    <EditCommunityModal
      @get-customers="refreshCustomers()"
      v-model="editModal"
      :community="this.communityClickedOn"
      :ownerId="this.customerClickedOn.id"
    />
  </div>
</template>

<script>
import axios from "axios";
import vClickOutside from "v-click-outside";
import EditCommunityModal from "./EditCommunityModal";
import AddCommunityModal from "./AddCommunityModal";

export default {
  components: { EditCommunityModal, AddCommunityModal },
  props: ["customerClickedOn", "showCommunities"],
  data() {
    return {
      presentCustomer: "",
      communityClickedOn: "",
      showOptionsID: "",
      editModal: false,
      addCommunityModal: false,
    };
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  methods: {
    refreshCustomers() {
      this.$emit("get-customers");
    },
    hide() {
      this.showOptionsID = "";
    },
    async getCommunity(communityId) {
      console.log("getting community" + communityId);
      await axios
        .get("http://localhost:3000/api/communities/" + communityId)
        .then((res) => {
          this.communityClickedOn = res.data;
          console.log(this.communityClickedOn);
        })
        .catch((error) => console.log(error));
    },
    async deleteCommunity(communityId) {
      await axios
        .delete("http://localhost:3000/api/communities/" + communityId)
        .then((Response) => {
          console.log(Response);
          console.log("hi" + this.customerClickedOn.id);
          this.getCommunities(this.customerClickedOn.id);
        })
        .catch((Error) => {
          console.log(Error);
        });
        this.refreshCustomers();
    },
    async getCustomerInfo(communityId) {
      console.log("trying to get" + communityId);
      await axios
        .get("http://localhost:3000/api/customer/" + communityId)
        .then((res) => {
          this.presentCustomer = res.data;
        })
        .catch((error) => console.log(error));
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
    async getCommunities(customerId) {
      const res = await axios.get(
        "http://localhost:3000/api/customer/" + customerId
      );
      console.log(res.data);
      this.customerClickedOn = res.data;
    },
    created() {
      this.getCustomerInfo(this.customerClickedOn);
      console.log(this.presentCustomer);
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
th {
  padding-right: 100px;
}
.button {
  padding-right: 0px;
}
.nonbutton {
  padding-right: 15px;
  min-width: 200px;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 0px;
}

th {
  text-align: left;
  padding-bottom: 15px;
  padding-top: 15px;
}
td {
  //font-weight: bold;
  border-top: 2px solid #d2d6dc;
  border-collapse: collapse;
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
  margin-top: 8px;
  margin-bottom: 8px;
}
</style>