import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        testVariable: 'test Store Variable',
    },
    getters: {
        testVariable(state) {
            return state.testVariable;
        }
    }
})