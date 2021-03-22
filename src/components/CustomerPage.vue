<template>
  <div class="inline-flex justify-between w-full">
    <!--
  <div class="absolute z-20 flex">
    <div class="bg-white w-screen h-screen flex align-center justify-between">
      <div id="data area" class="w-screen pl-24 pr-24 pt-32"> 
        -->
    <div id="Customers Commumities Buttons" class="text-4xl">
      <div
        class="w-1/2 pr-4 font-extrabold text-black focus:outline-none"
        @click="customersView = true"
        :class="{ active: customersView }"
      >
        Customers
      </div>
    </div>

    <div id="customers data" v-if="customersView == true" class="w-min">
      <div id="searchbar + buttons" class="mt-3 inline-flex items-center">
        <button
          class="addButton hover:underline mr-4"
          @click="addCustomerModal = !addCustomerModal"
        >
          Add Customer
        </button>

        <!--
        <textarea v-model="text" rows="10"></textarea>
        -->
        <CsvUpload
          :buttonText="this.buttonText"
          @load="(text = $event)"
        />
        <button
          class="submitButton bg-blue-500 text-white text-sm font-bold ml-3 pl-2 pr-2 pt-1 pb-1 hover:bg-blue-400 rounded-md"
          v-if="text != ''"
          @click="(mapCustomerCsv()), (text = '')"
        >
          SUBMIT
        </button>
      </div>
      <div
        class="absolute z-40 inset-0 opacity-25 bg-black"
        v-if="addCustomerModal"
      ></div>
      <AddCustomerModal
        v-model="addCustomerModal"
        @get-customers="refreshCustomers()"
      />
    </div>
  </div>
</template>

<script>
// Fix bug: on submit, an internal server error is caused. Its p[osting an empty array cuz the files isnt being stored or mapped anywhere.

// Use one of the templates for the VueCsvImport component and add data point to reflect
import AddCustomerModal from "./AddCustomerModal";
import CsvUpload from "./CsvUpload";
import axios from "axios";

export default {
  name: "CustomerPage",
  props: ["customers", "communities"],
  components: {
    AddCustomerModal,
    CsvUpload,
  },

  data() {
    return {
      buttonText: "Upload CSV File",
      customersView: true,
      addCommunityModal: false,
      addCustomerModal: false,
      csv: null,
      text: "",
      postedCustomerId: "",
      expectedCommunityHeaders: [
        "name",
        "units",
        "address",
        "city",
        "state",
        "country",
        "digital_human",
        "core_pms",
        "websites",
        "connect",
        "iot\r",
      ],
      expectedCustomerHeaders: [
        "name",
        "address",
        "city",
        "state",
        "country\r",
      ],
    };
  },
  methods: {
    refreshCustomers() {
      this.$emit("get-customers");
    },
    async mapCustomerCsv() {
      let rows = this.text.split("\n");
      let customer = rows[0];
      rows.shift();
      let splitCustomer = customer.split(",");
      await axios
        .post("http://localhost:3000/api/customer", {
          name: splitCustomer[0],
          address: splitCustomer[1],
          city: splitCustomer[2],
          state: splitCustomer[3],
          country: splitCustomer[4],
        })
        .then((Response) => {
          console.log(Response);
          this.postedCustomerId = Response.data["id"];
        })
        .catch((Error) => {
          console.log(Error);
        });
      let headers = rows[0].split(",");
      rows.shift();
      console.log(JSON.stringify(headers));
      console.log(JSON.stringify(this.expectedCommunityHeaders));
      if (
        JSON.stringify(headers) ===
        JSON.stringify(this.expectedCommunityHeaders)
      ) {
        console.log("inside if");
        await rows.forEach((row) => {
          let properties = row.split(",");
          console.log(properties);
          let units = parseInt(properties[1]);
          console.log(units);
          let id = parseInt(this.postedCustomerId);
          let dhTrue = properties[6].toLowerCase() == "true";
          let cpTrue = properties[7].toLowerCase() == "true";
          let wTrue = properties[8].toLowerCase() == "true";
          let cTrue = properties[9].toLowerCase() == "true";
          let iTrue = properties[10].toLowerCase() == "true";
          axios.post("http://localhost:3000/api/communities", {
            name: properties[0],
            units: units,
            customer_id: id,
            address: properties[2],
            city: properties[3],
            state: properties[4],
            country: properties[5],
            digital_human: dhTrue,
            core_pms: cpTrue,
            websites: wTrue,
            connect: cTrue,
            iot: iTrue,
          });
        });
      } else {
        console.log("ERROR: files headers do not match expected headers");
      }
      this.refreshCustomers();
    },
  },
  watch: {
    text: function (newVal) {
      if (newVal != "") {
        this.buttonText = "Replace File";
      } else {
        this.buttonText = "Upload CSV File"
      }
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
  padding-right: 15px;
  padding-left: 15px;
  padding-top: 5px;
  padding-bottom: 5px;
}
.submitButton {
  padding-top: 7px;
  padding-bottom: 7px;
}
</style>