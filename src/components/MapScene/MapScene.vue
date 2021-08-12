<template>
    <q-page class="row items-center justify-evenly">
        <canvas ref="babylonCanvas" class="full-width full-height" />
    </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import { MapScene } from 'src/scenes/scene_definitions/default_map_scene'

// import { Engine } from '@babylonjs/core'
// import { CreateSceneClass, getSceneModuleWithName } from '../scenes/createScene'

export default defineComponent({
    name: 'MapMockup',

    components: {},

    data() {
        const genieServerAddress: '127.0.0.1'
        const genieServerPort: 9009

        const myMapScene = this.setup(genieServerAddress, genieServerPort) as MapScene
        return {
            scene: myMapScene,
            moduleName: 'default_map_scene',
            GenieServerAddress: genieServerAddress,
            GenieServerPort: genieServerPort
        }
    },

    async setup(genieServerAddress, genieServerPort) {
        // const   moduleName= 'default_map_scene'
        // const GenieServerAddress = '127.0.0.1'
        // const GenieServerPort = 9009


        // const _resultcanvas = await new Promise<HTMLCanvasElement> ( () => {
        // Genie server access
        // const getModuleToLoad = (): string | undefined => location.search.split('scene=')[1]

        // get the module to load
        // const createSceneModule = await getSceneModuleWithName(moduleName)

        // Execute the pretasks, if defined
        // await Promise.all(createSceneModule.preTasks || [])

        // Address the possibility that null is returned to make eslint happy.
        // const babylonCanvas = ref<HTMLCanvasElement | null>(null)
        const babylonCanvas = document.getElementById('renderCanvas') as HTMLCanvasElement
        const myMapScene = new MapScene(babylonCanvas, genieServerAddress, genieServerPort)

        await myMapScene.initScene().then((response) => response)
        myMapScene.startScene()

        return myMapScene;
    },

    methods: {

    },

    resizeHandler(w) {
        this._engine.resize()
    },

    onMounted() {
        window.addEventListener('resize', this._engine.onWindowResize)
    },

    // onUnmounted(){
    //   window.removeEventListener('resize', this.onWindowResize)
    // },


    onWindowResize() {
        this.myMapScene._engine.resize()
    },

    created() {
        window.addEventListener("resize", this.resizeHandler)
    },

    destroyed() {
        window.removeEventListener("resize", this.resizeHandler)
    },`

})

</script>
