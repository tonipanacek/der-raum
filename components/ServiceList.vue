<template>
  <div class="services flex">
      <div class="service">
          <NuxtLink
                v-for="service in sortedServices"
                :key="service.attributes.title"
                :to="`/blog/${formatSlug(service.attributes.title)}`"
            >
          <img :src="service.attributes.image" :alt="service.attributes.title">
          <h3 class="service-title">{{ service.attributes.title }}</h3>
          </NuxtLink>
      </div>
  </div>
</template>

<script>
    export default {
        props: {
            services: {
                type: Array,
                required: true
            }
        },
        computed: {
            sortedServices() {
                const sortedServices = this.services
                sortedServices.sort((a,b) => {
                    const dateA = new Date(a.attributes.date);
                    const dateB = new Date(b.attributes.date);
                    if (a.attributes.position < b.attributes.position) {
                        return 1;
                    }
                    if (a.attributes.position > b.attributes.position) {
                        return -1;
                    }
                    return 0;
                })
                return sortedServices
            }
        },
        methods: {
            formatSlug(title) {
                const regex = / /gi;
                return title.toLowerCase().trim().replace(regex, "-")
            }
        }
    }
</script>

<style lang="scss">
  .project-title {
    color: color(light);
    @include smallCaps;
  }

  .project-link {
    text-decoration: none;
  }
</style>


