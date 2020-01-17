<template>
  <Cluster>
    <div class="project-list">
      <NuxtLink
        v-for="project in projects"
        :id="project.attributes.title"
        :key="project.attributes.title"
        :to="`/projects/${formatSlug(project.attributes.title)}`"
        class="project-link"
      >
        <img :src="project.attributes.images[0]" :alt="project.attributes.title" />
        <h3 class="project-title">
          {{ $ta(project.attributes, 'title') }}
        </h3>
      </NuxtLink>
    </div>
  </Cluster>
</template>

<script>
import Cluster from '~/components/Cluster'
// import Frame from '~/components/Frame'
export default {
  name: "ProjectsList",
  components: {
    Cluster
  },
  props: {
    projects: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss">
.project-list {
  display: flex;
  flex-flow: row-wrap;
  align-items: flex-start;
  justify-content: space-between;
  align-content: space-between;
  // padding: 0 $sidebar-space $sidebar-space $sidebar-space;
}
.project-title {
  @include smallCaps;
  color: color(light);
  font-weight: 600;
}
.project-link {
  text-decoration: none;
}
</style>
