<template>
  <div id="services"></div>
</template>

<script>
export default {
  async asyncData () {
    // create context via webpack to map over all blog services
    const allServices = await require.context('~/content/services/', true, /\.md$/)
    const services = allServices.keys().map((key) => {
      // give back the value of each service context
      return allServices(key)
    })
    return {
      services
    }
  }
}
</script>
