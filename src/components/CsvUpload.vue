<template>
  <div>
    <h4 class="mb-4">Result:</h4>
    <vue-csv-import
      autoMatchFields="true"
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
  </div>
</template>Î

<script>
//import VueCsvImport from "vue-csv-import";
export default {
  components: {
    //VueCsvImport,
  },
};
</script>

<style lang="scss" scoped>
</style>