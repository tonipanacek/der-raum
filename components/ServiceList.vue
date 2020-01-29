<template>
  <Container>
    <div id="home" class="service-list">
      <NuxtLink
        v-for="service, index in sortedServices"
        :id="service.attributes.title"
        :key="service.attributes.title"
        :to="`/services/${formatSlug(service.attributes.title)}`"
        :class="{ 'active': hover && hover === service.attributes.title, hover: hover, 'service-link': true }"
        @mouseover.native="hover = service.attributes.title"
        @mouseleave.native="hover = ''"
      >
        <Frame v-if="service.attributes.title" :n="9" :d="16">
          <img :src="service.attributes.image" :alt="service.attributes.title" />
        </Frame>
        <Frame v-else :n="16" :d="9">
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
  font-weight: 400;
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

.hover:not(.active) {
  opacity: .3;
}
.hover {
  h3 {
    color: color(dark);
  }
  .projects-link {
    color: color(dark);
    border: 1px solid color(dark);
  }
}

$main-height: calc(100vh - 2 * #{spacing(lg)});
@include respond-to(large) {
  #home.service-list {
    height: $main-height;
    max-width: 100ch;
    margin: 0 auto;
  }
}
// grid layout for small screens
.service-list {
  background-color: white;
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
#Production.service-link {
  grid-area: 4 / 2 / 5 / 5;
  align-self: end;
}
.projects-link {
  text-decoration: none;
  @include smallCaps;
  color: color(light);
  border: 1px solid color(light);
  font-size: 0.9em;
  width: 100%;
  height: 100%;
  max-height: 10ch;
  display: block;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  justify-self: stretch;
  margin: spacing(lg) 0;
}

.projects-link-grid {
  display: none;
  width: 100%;
  // justify-content: center;
  justify-self: end;
  align-self: end;
}

.projects-link-non-grid {
  margin-top: spacing(md);
}

// grid layout for big screens
@include respond-to('large') {
  .service-list {
    max-width: 90ch;
    display: grid;
    grid-template-columns: .1fr 3fr .1fr .5fr 2fr;
    grid-template-rows: 2fr .6fr 1fr .4fr 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    align-content: space-between;
    .projects-link {
      text-decoration: none;
      @include smallCaps;
      color: color(light);
      border: 1px solid color(light);
      font-size: 0.9em;
      width: 100%;
      height: 100%;
      max-height: 10ch;
      display: block;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 20px;
      justify-self: stretch;
    }
  }

  #Design.service-link { grid-area: 1 / 2 / 2 / 4; }
  #Production.service-link { grid-area: 3 / 1 / 6 / 3; }
  #Planning.service-link {
    grid-area: 1 / 5 / 4 / 6;
    .frame {
      height: 100%;
      img {
        align-self: start;
        justify-self: start;
      }
    }
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
