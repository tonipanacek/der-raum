import { isEmpty } from 'lodash'

export default {
  data() {
    return {
      page: 0
    }
  },
  methods: {
    addPage() {
      if (!isEmpty(this.paginated)) {
        this.page += 1;
      }
    },
    subtractPage() {
      if (this.page > 1) {
        this.page -= 1;
      }
    }
  }
}
