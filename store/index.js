import { sortBy, get } from 'lodash'

export const state = () => {
  return {
    pages: [],
    pagesPrefix: "",
    hoveredMenuItem: "",
    pageNumber: 0
    // need to set pageNumber in state
    // but need to make sure it resets to 0 after page reloads / component unmounts
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
  INCREMENT_PAGE_NUMBER(state) {
    state.pageNumber += 1
  },
  DECREMENT_PAGE_NUMBER(state) {
    state.pageNumber -= 1
  },
  RESET_PAGE_NUMBER(state) {
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
  setHoveredMenuItem({ commit }, title) {
    commit("SET_HOVERED_MENU_ITEM", title)
  },
  unsetHoveredMenuItem({ commit }) {
    commit("UNSET_HOVERED_MENU_ITEM")
  },
  resetPageNumber({ commit }) {
    commit('RESET_PAGE_NUMBER')
  },
  incrementPageNumber({ commit }) {
    commit('INCREMENT_PAGE_NUMBER')
  },
  decrementPageNumber({ commit }) {
    commit('DECREMENT_PAGE_NUMBER')
  }
}

export const getters = {
  sortedPages({ pages }) {
    if (!pages) { return [] }
    return sortBy(pages, page => get(page, 'attributes.page'))
  },
  // do I need a pageNumber here?
  pageNumber({ pageNumber }) {
    return pageNumber
  }
}
