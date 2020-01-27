<template>
<!--   <Cluster> -->
    <div id="home" class="service-list">
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
      <div class="projects-link-cont">
        <NuxtLink class="projects-link"
          @mouseover.native="hover = true"
          @mouseleave.native="hover = false"
          to="/projects"
        >
          {{ $t("projects.link") }}
        </NuxtLink>
      </div>
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

.service-title {
  @include smallCaps;
  color: color(light);
}
.service-link {
  // flex: 45%;
  max-width: none;
  text-decoration: none;
  img {
    object-fit: fill;
    width: 100%;
    max-height: 100%;
    max-width: none;
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
  height: 100%;
  max-height: 10ch;
  display: flex;
  margin-bottom: 10%;
  align-items: center;
  justify-content: space-around;
}
.active {
  opacity: .3;
  transition: opacity 0.3s ease-in-out;
}

#home.service-list {
  max-width: 120ch;
  margin-left: auto;
}

.service-list {
  display: grid;
  grid-template-columns: .1fr 3fr .1fr .5fr 2fr;
  grid-template-rows: 2.5fr .4fr 1fr .4fr 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}

#Design.service-link { grid-area: 1 / 2 / 2 / 4; }
#Production.service-link { grid-area: 3 / 1 / 6 / 3; }
#Planning.service-link {
  grid-area: 1 / 5 / 4 / 6;
  .frame { height: 100%; }
}
.projects-link-cont {
  grid-area: 5 / 5 / 6 / 6;
  display: flex;
  align-items: flex-end;
}


</style>
