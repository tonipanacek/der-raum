import { isEmpty } from 'lodash'

export const state = () => {
  return {
    pages: [],
    pagesPrefix: "",
    pageNumber: 0,
    pageMax: 4
  }
}
export const mutations = {
  SET_PAGES(state, pages) {
    state.pages = pages
  },
  UNSET_PAGES(state) {
    state.pages = []
  },
  SET_PAGES_PREFIX(state, prefix) {
    state.pagesPrefix = prefix
  },
  PAGE_UP(state) {
    return new Promise((resolve, reject) => {
      if (!isEmpty(state.pages.slice(state.pageNumber + 1, state.pageMax))) {
        state.pageNumber += 1
        resolve(state.pageNumber)
      } else {
        reject(state.pageNumber)
      }
    })
  },
  PAGE_DOWN(state) {
    if (state.pageNumber > 0) {
      state.pageNumber -= 1
    }
  },
  UNSET_PAGES(state) {
    state.pageNumber = 0
  }
}

export const actions = {
  setPages({ commit }, pages) {
    commit("SET_PAGES", pages)
  },
  unsetPages({ commit }) {
    commit("UNSET_PAGES")
  },
  setPagesPrefix({ commit }, prefix) {
    commit("SET_PAGES_PREFIX", prefix)
  },
  pageUp({ commit }) {
    commit("PAGE_UP")
  },
  pageDown({ commit }) {
    commit("PAGE_DOWN")
  }
}

export const getters = {
  paginatedPages({ pages, pageNumber, pageMax }) {
    return pages.slice(pageNumber, pageMax)
  }
}
