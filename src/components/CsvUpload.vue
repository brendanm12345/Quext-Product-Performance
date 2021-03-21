<template>
  <div>
    <div>
      <input type="file" id="files" class="hidden" value="Upload a CSV File" accept="csv" @change="previewFiles" multiple>
      <label class="addButton hover:underline" for="files">{{ buttonText }}</label>
    </div>
  </div>
</template>

<script>
//import VueCsvImport from "vue-csv-import";
export default {
  props: [ "buttonText" ],
  components: {
    //VueCsvImport,
  },
  data() {
    return {};
  },
  methods: {
    previewFiles(event) {
      const file = event.target.files[0];
      //const file2 = event.target.files[1];
      const reader = new FileReader();
      reader.onload = event => this.$emit("load", event.target.result);
      reader.readAsText(file);
      //reader.readAsText(file2);
    }
  },
};
</script>

<style lang="scss" scoped>
.addButton {
  border-style: solid;
  border-width: 1px;
  border-color: black;
  border-radius: 7px;
  padding-right: 15px;
  padding-left: 15px;
  padding-top: 6px;
  padding-bottom: 6px;
}
</style>