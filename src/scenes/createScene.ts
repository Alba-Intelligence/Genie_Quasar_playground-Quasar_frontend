type Scene = import('@babylonjs/core/scene').Scene

export interface CreateSceneClass {
    initScene: (canvas: HTMLCanvasElement, genieServerAddress: string, genieServerPort: number) => Promise<CreateSceneClass>
    preTasks?: Promise<unknown>[]
}

export interface CreateSceneModule {
    default: CreateSceneClass
}

export const getSceneModuleWithName = (
    name = 'default_map_scene'
): Promise<CreateSceneClass> => {
    return import('./scenes/scene_definitions/' + name)
        .then((_module: CreateSceneModule) => {
            return _module.default
        })

    // // To build quicker if only a single possible scene, replace the above return statement with:
    // return import('./scenes/defaultWithTexture').then((module: CreateSceneModule)=> {
    //     return module.default
    // })
}
