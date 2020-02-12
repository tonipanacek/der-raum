<template>
  <Container>
    <div id="home" class="service-list">
      <NuxtLink
        v-for="service, index in sortedServices"
        :id="service.attributes.title"
        :key="service.attributes.title"
        :to="localePath({ name: 'services-slug', params: { slug: formatSlug($ta(service.attributes, 'title')) } })"
        :class="{ 'active': hover && hover === service.attributes.title, hover: hover, 'service-link': true }"
        @mouseover.native="hover = service.attributes.title"
        @mouseleave.native="hover = ''"
      >
        <!-- <div class="test">
          <img :src="service.attributes.image" :alt="service.attributes.title" />
        </div> -->
        <Frame>
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
          :to="localePath({ name: 'projects' })"
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
        :to="localePath({ name: 'projects' })"
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
  }
}
</script>

<style lang="scss">
.service-title {
  @include smallCaps;
  color: color(dark);
  font-weight: 400;
}
.service-link {
  max-width: none;
  text-decoration: none;
  .test {
    height: 100%;
    width: 100%;
  }
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
    padding-left: 0.5em;
    @include respond-to('large') {
      padding: 0;
    }
  }
}
.hover:not(.active) {
  opacity: .8;
  h3 {
    color: color(dark);
    font-weight: 400;
  }
}
.hover {
  h3 {
    color: color(black);
    font-weight: 700;
  }
  .projects-link {
    color: color(black);
    border: 1px solid color(black);
  }
}

$main-height: calc(100vh - 3em);

// grid layout for small screens
.service-list {
  background-color: white;
  display: grid;
  grid-template-columns: repeat(2, 2fr) .3fr 2fr .5fr;
  grid-template-rows: minmax(10px, 1.5fr) minmax(10px, 2fr) minmax(10px, .5fr) minmax(10px, 2fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}

#Planning.service-link  {
  grid-area: 1 / 4 / 3 / 6;
  .frame { height: 100%; }
  .test { background: blue; }
}
#Design.service-link {
  grid-area: 2 / 1 / 3 / 3;
  .frame { height: 100%; }
  .test { background: red; }
}
#Production.service-link {
  grid-area: 4 / 2 / 5 / 5;
  .test { background: yellow; }
  // align-self: end;
}
.projects-link {
  @include smallCaps;
  color: color(dark);
  border: 1px solid color(dark);
  text-decoration: none;
  width: 100%;
  height: 15ch;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.projects-link-grid {
  display: none;
  width: 100%;
  a {
    &:hover {
      color: color(black);
      font-weight: 700;
      border: 1.1px solid color(black);
    }
  }
}

.projects-link-non-grid {
  padding: 0.5em;
  margin-top: spacing(md);
}

// grid layout for big screens
@include respond-to('large') {
  .service-list {
    height: $main-height;
    max-width: 160ch;
    margin: 0 auto;
    display: grid;
    // align-items: center;
    grid-template-columns: minmax(0, .3fr) minmax(0, 3fr) minmax(0, .3fr) minmax(0, .5fr) minmax(0, 2fr);
    grid-template-rows: minmax(0, 2.1fr) minmax(0, .4fr) minmax(0, 1.2fr) minmax(0, .6fr) minmax(0, 1.5fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }

  .service-link {
    max-height: 15rem;
    @include respond-to-vertical(vertical) {
      min-height: 100%;
      max-height: none;
    }
  }

  #Design.service-link {
    grid-area:  1 / 2 / 3 / 4;
    // align-self: start;
    display: flex;
    flex-direction: column;
    .test {
      background: red;
    }
  }
  #Planning.service-link {
    grid-area:  1 / 5 / 4 / 6;
    display: flex;
    flex-direction: column;
    .test { background: blue; }
    // @include respond-to-vertical(vertical) {
    //   align-self: stretch;
    // }
    // .frame {
    //   height: 100%;
    // }
  }
  #Production.service-link {
    grid-area:  4 / 1 / 6 / 3;
    display: flex;
    flex-direction: column;
    .test { background: yellow; }
    // @include respond-to-vertical(vertical) {
    //   align-self: end;
    // }
    // h3 {
    //   margin-bottom: 0;
    // }
  }
  .projects-link-grid {
    grid-area:  5 / 5 / 6 / 6;
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
