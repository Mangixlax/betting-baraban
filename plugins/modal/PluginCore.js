import Vue from 'vue'
import Modal from './Modal.vue'
import ModalsContainer from './ModalsContainer.vue'

const createDivInBody = () => {
  const div = document.createElement('div')
  document.body.appendChild(div)
  return div
}

export function defineApi() {
  let _modalComponent = null

  return Vue.observable({
    context: {
      root: null,
    },
    show(modal, ...args) {
      switch (typeof modal) {
        case 'string':
          return this.toggle(modal, true, ...args)
        case 'object': {
          return Promise.allSettled([
            new Promise((resolve, reject) => {
              const defaultModal = {
                value: true,
                id: Symbol('dynamicModal'),
                component: _modalComponent,
                bind: {},
                slots: {},
                on: {},
                params: args[0],
                reject,
                opened() {
                  resolve('show')
                },
              }
              this.dynamicModals.push(Object.assign(defaultModal, modal))
            }),
          ])
        }
      }
    },
    hide(...names) {
      return this.toggle(names, false)
    },
    hideAll() {
      return this.hide(...this.openedModals.map((modal) => modal.name))
    },
    toggle(name, ...args) {
      const modals = Array.isArray(name) ? this.get(...name) : this.get(name)
      return Promise.allSettled(modals.map((modal) => modal.toggle(...args)))
    },
    get(...names) {
      return this.modals.filter((modal) => names.includes(modal.name))
    },
    dynamicModals: [],
    openedModals: [],
    modals: [],
    _setDefaultModal(modalComponent) {
      _modalComponent = modalComponent
    },
    _setDynamicModalContainer(parent, ModalsContainer) {
      this.context.root = parent

      const element = createDivInBody()

      new Vue({
        parent,
        render: (h) => h(ModalsContainer),
      }).$mount(element)
    },
  })
}

function bindApi(component, api) {
  const _component = { ...component, props: { ...component.props } }
  Object.assign(_component.props, {
    api: { type: Object, default: () => api },
  })
  return _component
}

export function defineModal(api) {
  const modalComponent = bindApi(Modal, api)
  api._setDefaultModal(modalComponent)
  return modalComponent
}

export function defineContainer(api) {
  return bindApi(ModalsContainer, api)
}
