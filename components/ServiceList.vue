<template>
<!--   <Cluster> -->
    <div class="service-list">
      <NuxtLink
        v-for="service in sortedServices"
        :id="service.attributes.title"
        :key="service.attributes.title"
        :to="`/services/${formatSlug(service.attributes.title)}`"
        :class="{ 'active': hover,  'service-link': true }"
      >
        <Frame v-if="service.attributes.title">
          <img :src="service.attributes.image" :alt="service.attributes.title" />
        </Frame>
        <h3 class="service-title">
          {{ $ta(service.attributes, 'title') }}
        </h3>
      </NuxtLink>
      <NuxtLink
        class="projects-link"
        @mouseover.native="hover = true"
        @mouseleave.native="hover = false"
        to="/projects"
      >
        Projekte
      </NuxtLink>
    </div>
<!--   </Cluster> -->
</template>

<script>
import Frame from '~/components/Frame'
import Cluster from '~/components/Cluster'
export default {
  data() {
    return {
      hover: false
    }
  },
  components: {
    Frame,
    Cluster
  },
  props: {
    services: {
      type: Array,
      required: true
    }
  },
  computed: {
    sortedServices() {
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
    formatSlug(title) {
      const regex = / /gi
      return title
        .toLowerCase()
        .trim()
        .replace(regex, "-")
    }
  }
}
</script>

<style lang="scss">
.service-list {
  display: flex;
  flex-flow: row wrap;
  padding: 0 $sidebar-space $sidebar-space $sidebar-space;
  height: 85vh;
}
.service-title {
  @include smallCaps;
  color: color(light);
}
.service-link {
  flex: 45%;
  max-width: 45%;
  text-decoration: none;
  img {
    object-fit: fill;
    width: 100%;
    max-height: 100%;
  }
  h3 {
    margin-top: 0.5em;
  }
}
.projects-link {
  text-decoration: none;
  @include smallCaps;
  color: color(dark);
  border: 1px solid black;
  width: 100%;
  max-height: 10ch;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.active {
  opacity: .3;
  transition: opacity 0.3s ease-in-out;
}
</style>
