<template>
    <div>
        <q-toggle v-model="randomStateVariable" />
    </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
    setup() {
        const $store = useStore()

        const updateRandomState = computed({
            get: () => $store.state.babylonModule.randomStateVariable,
            set: val => {
                $store.commit('babylonModule/updateDrawerState', val)
            }
        })

        return {
            randomStateVariable
        }
    }
}
</script>

