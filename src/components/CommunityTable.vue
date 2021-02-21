<template>
  <div>
    <table class="w-full">
      <thead>
        <tr class="text-gray-500 text-sm">
          <th id="name" class="font-medium">NAME</th>
          <th id="managementCompany" class="font-medium">MANAGEMENT COMPANY</th>
          <th id="units" class="font-medium">UNITS</th>
          <th id="location" class="font-medium">LOCATION</th>
          <th id="products" class="font-medium">PRODUCTS</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="community in communities">
          <tr :key="community.id">
            <td id="name" class="font-bold">{{ community.name }}</td>
            <td id="managementCompany">{{ community.customer_id }}</td>
            <td id="units">{{ community.units }}</td>
            <td id="location">
              {{ community.address.city }}, {{ community.address.country }}
            </td>
            <td id="product" colspan="1">
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
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ["communities"],
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
  padding-right: 10px;
}
td {
  padding-right: 20px;
  min-width: 40px;
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

.triangle-right {
  width: 0;
  height: 0;
  padding-right: 2px;
  border-top: 6px solid transparent;
  border-left: 10px solid #d2d6dc;
  border-bottom: 6px solid transparent;
  outline: transparent;
}

.triangleDown {
  width: 0;
  height: 0;
  margin-top: 7px;
  padding-right: 0px;
  border-top: 10px solid  #d2d6dc;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent
}
</style>