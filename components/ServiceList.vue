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
.service-link {
  max-width: none;
  text-decoration: none;
  h3 {
    margin-top: 0.5em;
  }
  .projects-link {
    transition: opacity 0.3s ease-in-out;
  }
}
.service-link {
  transition: opacity 0.3s ease-in-out;
  h3 {
    transition: color 0.3s ease-in-out;
  }
}
.hover:not(.active) {
  opacity: .8;
  h3 {
    color: color(light);
  }
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

$main-height: calc(100vh - 2 * #{spacing(frame)});

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
  @include smallCaps;
  border: 1px solid color(light);
  text-decoration: none;
  width: 100%;
  height: 12ch;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.projects-link-grid {
  display: none;
  width: 100%;
  justify-self: end;
  align-self: end;
  a {
    &:hover {
      color: color(dark);
      border: 1px solid color(dark);
    }
  }
}

.projects-link-non-grid {
  margin-top: spacing(md);
}

// grid layout for big screens
@include respond-to('large') {
  .service-list {
    height: $main-height;
    max-width: 110ch;
    display: grid;
    grid-template-columns: .3fr 3fr .3fr .5fr 2fr;
    grid-template-rows: 1fr 1fr 1fr 1.5fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }

  #Design.service-link {
    grid-area: 1 / 2 / 3 / 4;
    align-self: stretch;
  }
  #Production.service-link {
    grid-area: 4 / 1 / 7 / 3;
    align-self: end;
    h3 {
      margin-bottom: 0;
    }
  }
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
    grid-area: 5 / 5 / 7 / 6;
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
