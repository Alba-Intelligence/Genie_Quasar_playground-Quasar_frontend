import { Engine } from '@babylonjs/core/Engines/engine'
import { getSceneModuleWithName } from './createScene'


// const getModuleToLoad = (): string | undefined => location.search.split('scene=')[1]
const getModuleToLoad = (): string => 'default_map_scene'

export const babylonInit = async (genieServerAddress: string, genieServerPort: number): Promise<void> => {
    // get the module to load
    const moduleName = getModuleToLoad()
    const createSceneModule = await getSceneModuleWithName(moduleName)

    // Execute the pretasks, if defined
    await Promise.all(createSceneModule.preTasks || [])

    // Get the canvas element
    const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement

    // Create the scene
    // const scene = await createSceneModule.generateScene(canvas, genieServerAddress, genieServerPort)
    const scene = await createSceneModule.generateScene(canvas, genieServerAddress, genieServerPort)

    // Register a render loop to repeatedly render the scene
    engine.runRenderLoop(function () {
        scene.render()
    })

    // Watch for browser/canvas resize events
    window.addEventListener('resize', function () {
        engine.resize()
    })
}

// babylonInit(genieServerAddress, genieServerPort).then((): Promise<void> => {
//     // scene started rendering, everything is initialized
// })
