<template>
  <div id="business-partners">
    <Cluster class="md">
      <div class="box-wrapper">
        <ul>
          <li v-for="data in $options.businessPartners">{{data}}</li>
        </ul>
      </div>
    </Cluster>
  </div>
</template>

<script>
import json from "~/content/data/business_partners.json"
import Cluster from '~/components/Cluster'

export default {
  businessPartners: json["partners"],
  components: {
    Cluster
  }
}
</script>
<style lang="scss">
#business-partners {
  height: calc(100vh - 2 * #{spacing(lg)});
  margin: 0 auto;
  .box-wrapper {
    height: 100%;
    width: 100%;
    margin: spacing(sm);
  }
  ul {
    margin-left: spacing(md);
    @include respond-to('large') {
      margin: none;
      columns: 20ch 2;
      display: block;
    }
    list-style: none;
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0;
    margin-inline-end: 0;
    padding-inline-start: 0;
    padding-inline-end: 0;
    padding-block-start: 0;
    padding-block-end: 0;
    -webkit-padding-start: 0;
    li {
      font-size: .85em;
      display: block;
      color: color(dark);
      padding-bottom: spacing(xs);
    }
  }
}

</style>
