<template>
  <Container>
    <div id="home" class="service-list">
      <h1 class="accessible">{{ seo.servicesOverviewH1 }}</h1>
      <p class="accessible">{{ seo.servicesOverviewText }}</p>
      <NuxtLink
        v-for="service, index in sortedServices"
        :id="service.attributes.title"
        :key="service.attributes.title"
        :to="localePath({ name: 'services', hash: '#' + formatSlug($ta(service.attributes, 'title'))})"
        :class="{ 'active': hover && hover === service.attributes.title, hover: hover, 'service-link': true }"
        @mouseover.native="hover = service.attributes.title"
        @mouseleave.native="hover = ''"
      >
        <div class="image-container">
          <img :src="service.attributes.image" :alt="service.attributes.title" loading="eager"/>
          <p class="service-title">
            {{ $ta(service.attributes, 'title') }}
          </p>
        </div>
      </NuxtLink>
      <div class="projects-link-grid">
        <NuxtLink
          :class="{ 'active': hover && hover === 'projects', hover: hover, 'projects-link': true }"
          @mouseover.native="hover = 'projects'"
          @mouseleave.native="hover = ''"
          :to="localePath({ name: 'projects' })">
          {{ $t("landing_page_projects_link") }}
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
        {{ $t("landing_page_projects_link") }}
      </NuxtLink>
    </div>
  </Container>
</template>

<script>
import Container from '~/components/Container'
import seo from '../content/data/seo.json'
export default {
  data() {
    return {
      hover: '',
      seo
    }
  },
  components: {
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
$main-height: calc(100vh - 2 * #{spacing(frame)});
$more-height: calc(100vh - #{spacing(frame)});
.service-link {
  max-width: none;
  text-decoration: none;
  transition: opacity 0.3s ease-in-out;
  .service-title {
    @include smallCaps;
    color: color(dark);
    font-weight: 300;
    margin-top: 0;
    padding-top: 0.5em;
    transition: color 0.1s ease-in-out font-weight 0.1s ease-in-out;
  }
}
.projects-link {
  @include smallCaps;
  color: color(dark);
  border: 1px solid color(light);
  text-decoration: none;
  width: 100%;
  height: 100px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px;
  transition: font-weight 0.1s ease-in-out color 0.1s ease-in-out;
}

.projects-link-grid {
  display: none;
  max-width: 400px;
  text-align: center;
  a:hover {
    color: color(dark);
    font-weight: 900;
    border: 1.2px solid color(dark);
  }
  @media(hover: hover) and (pointer: fine) {
    a:hover {
      color: color(dark);
      font-weight: 900;
      border: 1.2px solid color(dark);
    }
  }
}

.projects-link-non-grid {
  padding: 0.5em;
  margin-top: 4rem;
  margin-bottom: 2rem;
  a:hover {
    color: color(dark);
    font-weight: 900;
    border: 1.2px solid color(dark);
  }
  @media(hover: hover) and (pointer: fine) {
    a:hover {
      color: color(dark);
      font-weight: 900;
      border: 1.2px solid color(dark);
    }
  }
}
.hover:not(.active) {
  opacity: .8;
  .service-title {
    color: color(dark);
    font-weight: 300;
  }
}
.hover {
  .service-title {
    color: color(dark);
    font-weight: 900;
  }
  .projects-link {
    color: color(dark);
  }
  @media(hover: hover) and (pointer: fine) {
    .service-title {
      color: color(dark);
      font-weight: 900;
    }
    .projects-link {
      color: color(dark);
    }
  }
}

.service-list {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-end;
  background-color: white;
  margin-bottom: 3rem;
}
  #Design.service-link {
    width: 60%;
    align-self: flex-end;
    display: block;
    height: 100%;
    .image-container {
      width: 100%;
      height: 100%;
      img {
        max-width: 100%;
        max-height: 50vh;
        object-fit: cover;
        @media (orientation: landscape) {
          max-height: 65vh;
        }
      }
    }
    p {
      padding-left: 0.5em;
    }
  }

  #Planning.service-link {
    width: 35%;
    margin-left: 5%;
    display: block;
    .image-container {
      width: 100%;
      height: 100%;
      img {
        max-width: 100%;
        max-height: 74.5vh;
        object-fit: cover;
        @media (orientation: landscape) {
          max-height: 100vh;
        }
      }
    }
  }

  #Production.service-link {
    width: 60%;
    margin-top: 20px;
    display: block;
    height: 100%;
    margin-right: 5%;
    .image-container {
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        max-height: 50vh;
        object-fit: cover;
        @media (orientation: landscape) {
          max-height: 65vh;
        }
      }
    }
  }
// large screens
@include respond-to('large') {
  .service-list {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    min-height: 640px;
    height: $more-height;
    max-width: 1250px;
    margin: 0 auto;
    overflow: hidden;
    margin-bottom: 0px;
  }

  #Design.service-link {
    width: 51%;
    height: 40%;
    margin-left: 5.5%;
    display: block;
    position: relative;
    align-self: auto;
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
    p {
      padding-left: 0;
    }
  }

  #Planning.service-link {
    width: 29%;
    height: 58.5%;
    margin-left: 0px;
    display: block;
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
    width: 51%;
    height: 40%;
    margin-top: -104px;
    display: block;
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
    display: block;
    width: 29%;
    margin-bottom: 30px;
    align-self: center;
  }
  .projects-link-non-grid {
    display: none;
  }
}

</style>
