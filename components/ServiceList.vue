<template>
  <!-- <Cluster> -->
    <div class="service-list">
      <NuxtLink
        v-for="service in sortedServices"
        :id="service.attributes.title"
        :key="service.attributes.title"
        :to="`/services/${formatSlug(service.attributes.title)}`"
        class="service-link"
      >
        <img :src="service.attributes.image" :alt="service.attributes.title" />
        <h3 class="service-title">
          {{ $ta(service.attributes, 'title') }}
        </h3>
      </NuxtLink>
    </div>
  <!-- </Cluster> -->
</template>

<script>
import Cluster from '~/components/Cluster'
// import Frame from '~/components/Frame'
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
  // display: flex;
  // flex-flow: row-wrap;
  // align-items: flex-start;
  // justify-content: space-between;
  // align-content: space-between;
  // padding: 0 $sidebar-space $sidebar-space $sidebar-space;
  display: grid;
  grid-template-columns: 8fr;
  grid-template-rows: 4fr;
}
.service-title {
  @include smallCaps;
  color: color(light);
  font-weight: 600;
}
.service-link {
  text-decoration: none;
}
// #Design {
//   margin-left: spacing(lg);
// }
// #Planning {
//   margin-right: $stack-space * 4;
//   img {
//     max-height: 60vh;
//   }
// }
// #Production {
//   margin-top: -$stack-space * 7;
// }
#Design {
  grid-column: 3 / span 3;
  grid-row: 1 / span 2;
}
</style>
