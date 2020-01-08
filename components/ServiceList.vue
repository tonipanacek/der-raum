<template>
  <Cluster>
    <div class="service-list">
      <NuxtLink
        v-for="service in sortedServices"
        :key="service.attributes.title"
        :to="`/services/${formatSlug(service.attributes.title)}`"
        class="service-link"
        :id="service.attributes.title"
      >
        <img :src="service.attributes.image" :alt="service.attributes.title">
        <h3 class="service-title">
          {{ service.attributes.title }}
        </h3>
      </NuxtLink>
    </div>
  </Cluster>
</template>

<script>
import Cluster from '~/components/Cluster'
export default {
  components: {
    Cluster
  },
  props: {
    services: {
      type: Array,
      required: true
    }
  },
  computed: {
    sortedServices () {
      const sortedServices = this.services
      sortedServices.sort((a, b) => {
        if (a.attributes.position > b.attributes.position) {
          return 1
        }
        if (a.attributes.position < b.attributes.position) {
          return -1
        }
        return 0
      })
      return sortedServices
    }
  },
  methods: {
    formatSlug (title) {
      const regex = / /gi
      return title.toLowerCase().trim().replace(regex, '-')
    }
  }
}
</script>

<style lang="scss">
.service-title {
  @include smallCaps;
  color: color(light);
  font-weight: 600;
}

.service-link {
  text-decoration: none;
}
</style>
