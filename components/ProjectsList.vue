<template>
  <Cluster>
    <transition-group
      name="insert"
      tag="div"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <NuxtLink
        :id="project.attributes.title"
        v-for="project in projects"
        :key="project.attributes.title"
        :to="`/projects/${formatSlug(project.attributes.title)}`"
        class="project-link"
      >
        <img :src="project.attributes.images[0]" :alt="project.attributes.title" />
        <h3 class="project-title">
          {{ $ta(project.attributes, 'title') }}
        </h3>
      </NuxtLink>
    </transition-group>
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
  },
  methods: {
    beforeEnter: function(el) {
      el.style.opacity = 0
      el.style.transform = "translateY(-50%)"
      el.style.transition = "opacity 500ms ease, transform 500ms ease"
    },
    enter: function(el, done) {
      setTimeout(() => {
        el.style.opacity = 1
        el.style.transform = "translateY(0)"
        done()
      }, 1000)
    },
    leave: function(el, done) {
      el.style.opacity = 0
      el.style.transform = "translateY(50%)"
      setTimeout(() => {
        done()
      }, 1000)
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
