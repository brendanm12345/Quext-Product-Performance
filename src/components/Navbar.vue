<template>
    <div class="flex">
      <div id="nav" class="bg-white w-full shadow-md z-30 h-15 flex items-center align-center justify-between">
        <div class="flex items-center align-center">
          <img src="../assets/quextLogo.png" class="h-16 pl-4 pt-3 pb-3" />
          <div class="text-2xl font-light pl-1">Product Performance</div>
        </div>
        <div class="pt-2 pb-2">
          <button class="bg-white rounded-sm pt-1 pl-3 pr-3 pb-1 hover:bg-gray-100">
            MAP
          </button>
          <button class="mr-3 bg-white rounded-sm pt-1 pl-3 pr-3 pb-1 hover:bg-gray-100">
            CUSTOMERS
          </button>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style lang="scss" scoped>

#nav a.router-link-exact-active {
  color: #3182ce;
}

</style>