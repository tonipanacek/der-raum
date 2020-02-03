import { sortBy, get } from 'lodash'

export const state = () => {
  return {
    pages: [],
    pagesPrefix: "",
    hoveredMenuItem: ""
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
  SET_HOVERED_MENU_ITEM(state, title) {
    state.hoveredMenuItem = title
  },
  UNSET_HOVERED_MENU_ITEM(state) {
    state.hoveredMenuItem = ''
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
  setHoveredMenuItem({ commit }, title) {
    commit("SET_HOVERED_MENU_ITEM", title)
  },
  unsetHoveredMenuItem({ commit }) {
    commit("UNSET_HOVERED_MENU_ITEM")
  }
}

export const getters = {
  sortedPages({ pages }) {
    if (!pages) { return [] }
    return sortBy(pages, page => get(page, 'attributes.page'))
  }
}
