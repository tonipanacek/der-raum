import { sortBy, get, filter } from 'lodash'

export const state = () => {
  return {
    pages: [],
    pagesPrefix: "",
    hoveredMenuItem: "",
    lastPage: 0,
    anchorItem: false
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
  },
  SET_ANCHOR_ITEM(state, title) {
    state.anchorItem = title
  },
  UNSET_ANCHOR_ITEM(state) {
    state.anchorItem = false
  },
  SET_LAST_PAGE(state, number) {
    state.lastPage = number
  },
  RESET_LAST_PAGE(state) {
    state.lastPage = 0
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
  },
  setAnchorItem({ commit }, title) {
    commit("SET_ANCHOR_ITEM", title)
  },
  unsetAnchorItem({ commit }) {
    commit("UNSET_ANCHOR_ITEM")
  },
  setLastPage({ commit }, number) {
    commit('SET_LAST_PAGE', number)
  },
  resetLastPage({ commit }) {
    commit('RESET_LAST_PAGE')
  }
}

export const getters = {
  sortedPages({ pages }) {
    if (!pages) { return [] }
    return sortBy(pages, page => get(page, 'attributes.page'))
  }
}
