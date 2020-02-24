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
        <div class="image-container">
          <img :src="service.attributes.image" :alt="service.attributes.title" />
          <h3 class="service-title">
            {{ $ta(service.attributes, 'title') }}
          </h3>
        </div>
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

$main-height: calc(100vh - 2 * #{spacing(frame)});
$more-height: calc(100vh - #{spacing(frame)});
// grid layout for small screens
.service-list {
  background-color: white;
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: minmax(5px, 2fr) minmax(5px, 2fr) minmax(5px, .3fr) minmax(5px, 2fr) minmax(5px, .5fr);
  grid-template-columns: minmax(5px, 2fr) minmax(5px, 2fr) minmax(5px, .3fr) minmax(5px, 2fr) minmax(5px, .5fr);
  -ms-grid-rows: minmax(5px, 1.5fr) minmax(5px, 2fr) minmax(5px, .5fr) minmax(5px, 2fr);
  grid-template-rows: minmax(5px, 1.5fr) minmax(5px, 2fr) minmax(5px, .5fr) minmax(5px, 2fr);
  margin-bottom: 100px;
}

#Planning.service-link  {
  -ms-grid-column: 4;
  -ms-grid-column-span: 6;
  -ms-grid-row: 1;
  -ms-grid-row-span: 3;
  grid-area: 1 / 4 / 3 / 6;
  align-self: stretch;
  display: block;
  .image-container {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
#Design.service-link {
  -ms-grid-column: 1;
  -ms-grid-column-span: 3;
  -ms-grid-row: 2;
  -ms-grid-row-span: 3;
  grid-area: 2 / 1 / 3 / 3;
  display: block;
  height: 100%;
  width: 100%;
  .image-container {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
#Production.service-link {
  -ms-grid-column: 2;
  -ms-grid-column-span: 5;
  -ms-grid-row: 4;
  -ms-grid-row-span: 5;
  grid-area: 4 / 2 / 5 / 5;
  display: block;
  height: 100%;
  width: 100%;
  .image-container {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
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
    min-height: 500px;
    height: $main-height;
    max-width: 110ch;
    margin: 0 auto;
    display: -ms-grid;
    display: grid;
    overflow: hidden;
    -ms-grid-columns: minmax(10px, .3fr) minmax(10px, 2.5fr) minmax(10px, .3fr) minmax(10px, .8fr) minmax(10px, 1.8fr);
    grid-template-columns: minmax(10px, .3fr) minmax(10px, 2.5fr) minmax(10px, .3fr) minmax(10px, .8fr) minmax(10px, 1.8fr);
    -ms-grid-rows: minmax(0, 2.1fr) minmax(0, .8fr) minmax(0, 1fr) minmax(0, .8fr) minmax(0, 2.1fr) minmax(0, 0.4fr);
    grid-template-rows: minmax(0, 2.1fr) minmax(0, .8fr) minmax(0, 1fr) minmax(0, .8fr) minmax(0, 2.1fr) minmax(0, 0.4fr);
    margin-bottom: 0px;
  }

  #Design.service-link {
    -ms-grid-column: 2;
    -ms-grid-column-span: 4;
    -ms-grid-row: 1;
    -ms-grid-row-span: 3;
    grid-area:  1 / 2 / 3 / 4;
    display: block;
    height: 100%;
    width: 100%;
    position: relative;
    > .image-container {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  #Planning.service-link {
    -ms-grid-column: 5;
    -ms-grid-column-span: 6;
    -ms-grid-row: 1;
    -ms-grid-row-span: 5;
    grid-area:  1 / 5 / 5 / 6;
    display: block;
    height: 100%;
    width: 100%;
    position: relative;
    > .image-container {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  #Production.service-link {
    -ms-grid-column: 1;
    -ms-grid-column-span: 3;
    -ms-grid-row: 4;
    -ms-grid-row-span: 6;
    grid-area:  4 / 1 / 6 / 3;
    display: block;
    height: 100%;
    width: 100%;
    position: relative;
    > .image-container {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  .projects-link-grid {
    -ms-grid-column: 5;
    -ms-grid-column-span: 6;
    -ms-grid-row: 5;
    -ms-grid-row-span: 6;
    grid-area:  5 / 5 / 6 / 6;
    align-self: end;
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
