<template>
  <Container>
    <div id="home" class="service-list">
      <NuxtLink
        v-for="service in sortedServices"
        :id="service.attributes.title"
        :key="service.attributes.title"
        :to="`/services/${formatSlug(service.attributes.title)}`"
        :class="{ 'active': hover && hover === service.attributes.title, hover: hover, 'service-link': true }"
        @mouseover.native="hover = service.attributes.title"
        @mouseleave.native="hover = ''"
      >
        <Frame v-if="service.attributes.title">
          <img :src="service.attributes.image" :alt="service.attributes.title" />
        </Frame>
        <h3 class="service-title">
          {{ $ta(service.attributes, 'title') }}
        </h3>
      </NuxtLink>
      <div class="projects-link-grid">
        <NuxtLink
          :class="{ 'active': hover && hover === 'projects', hover: hover, 'projects-link': true }"
          @mouseover.native="hover = 'projects'"
          @mouseleave.native="hover = ''"
          to="/projects"
        >
          {{ $t("projects.link") }}
        </NuxtLink>
      </div>
    </div>
    <div class="projects-link-non-grid">
      <NuxtLink
        :class="{ 'active': hover && hover === 'projects', hover: hover, 'projects-link': true }"
        @mouseover.native="hover = 'projects'"
        @mouseleave.native="hover = ''"
        to="/projects"
      >
        {{ $t("projects.link") }}
      </NuxtLink>
    </div>
  </Container>
</template>

<script>
import Frame from '~/components/Frame'
import Container from '~/components/Container'
export default {
  data() {
    return {
      hover: ''
    }
  },
  components: {
    Frame,
    Container
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
.service-link, .projects-link {
  transition: opacity 0.3s ease-in-out;
}
.service-link {
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
  display: block;
  margin-bottom: 10%;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
}
.hover:not(.active) {
  opacity: .3;
}

#home.service-list {
  max-width: 120ch;
}

.service-list {
  background-color: white;
  padding: 20px 0;
  display: grid;
  grid-template-columns: repeat(2, 2fr) .3fr 2fr .5fr;
  grid-template-rows: 1.5fr 2fr .5fr 2fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}

#Planning.service-link  {
  grid-area: 1 / 4 / 3 / 6;
  .frame { height: 100%; }
}
#Design.service-link {
  grid-area: 2 / 1 / 3 / 3;
  .frame { height: 100%; }
}
#Production.service-link { grid-area: 4 / 2 / 5 / 5; }

.projects-link-grid {
  display: none;
  width: 100%;
  justify-content: center;
}

@include respond-to('large') {
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
  .projects-link-grid {
    grid-area: 5 / 5 / 6 / 6;
    display: flex;
    align-items: flex-end;
  }
  .projects-link {
    padding: 0;
    display: flex;
  }
  .projects-link-grid {
    display: block;
  }
  .projects-link-non-grid {
    display: none;
  }
}



</style>
