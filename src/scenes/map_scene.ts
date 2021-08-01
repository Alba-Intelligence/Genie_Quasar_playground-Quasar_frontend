import { Color3, Material, MultiMaterial, SubMesh, Texture } from '@babylonjs/core'
import { Engine } from '@babylonjs/core/Engines/engine'
import { Scene } from '@babylonjs/core/scene'
import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera'
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight'
import { Vector3 } from '@babylonjs/core/Maths/math.vector'

import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder'
import { DynamicTexture } from '@babylonjs/core/Materials/Textures/dynamicTexture'
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial'

// import { Inspector } from '@babylonjs/inspector'
// import { SampleMaterial } from 'src/Assets/Materials/SampleMaterial'

export class MapScene {

    private _scene: Scene
    private _engine: Engine

    public getEngine() {
        return this._engine
    }

    constructor(private _canvas: HTMLCanvasElement) {
        this._engine = this.createEngine(_canvas)
        this._scene = this.createScene(this._engine)
    }

    createEngine(canvas: HTMLCanvasElement) {
        const engine = new Engine(canvas);
        return engine;
    }

    createScene(engine: Engine) {
        const scene = new Scene(engine);
        return scene;
    }

    public initScene(cameraControlCanvas?: HTMLCanvasElement) {
        //
        // Create a basic BJS Scene object.
        //
        const camera = new ArcRotateCamera('camera1', 0, 0, 150, Vector3.Zero(), this._scene)
        camera.position = new Vector3(150, 100, 0)

        // Attach the camera to the canvas.
        const canvas = cameraControlCanvas ?? this._engine.getRenderingCanvas();
        camera.attachControl(canvas, true)

        // Create a basic light, aiming 0,1,0 - meaning, to the sky.
        const light = new HemisphericLight('light1', new Vector3(0, 1, 0), this._scene)
        light.intensity = 0.8

        const addButtons = true

        const halfSize = 50
        const distanceBetweenPlane = 25
        let planeCount = 0
        // const plane1Resolution = 512


        //
        // BOTTOM GROUND - https://playground.babylonjs.com/#1XBLWB
        //

        // Part 1 : Creation of Tiled Ground
        // Parameters
        const xmin = -halfSize, zmin = -halfSize
        const xmax = halfSize, zmax = halfSize

        const precision = { 'w': 2, 'h': 2 }
        const subdivisions = { 'h': 8, 'w': 8 }

        // Create the Tiled Ground and rotate into xy plane
        const tiledGround_GroundMap = MeshBuilder.CreateTiledGround('Tiled Ground',
            {
                xmin: xmin,
                zmin: zmin,
                xmax: xmax,
                zmax: zmax,
                subdivisions: subdivisions,
                precision: precision
            }, this._scene)

        tiledGround_GroundMap.position = new Vector3(0, 0, 0)


        // Part 2 : Create the multi material
        // Create differents materials
        // const whiteMaterial = new StandardMaterial('White', this._scene)
        // whiteMaterial.diffuseColor = new Color3(1, 1, 1)

        // const blackMaterial = new StandardMaterial('Black', this._scene)
        // blackMaterial.diffuseColor = new Color3(0, 0, 0)

        // Create Multi Material
        const material_GroundMap = new MultiMaterial('multi', this._scene)
        const zoom = 12 as unknown as string
        const xTileBase = 2120
        const yTileBase = 1498

        for (let row = 0; row < subdivisions.h; row++) {
            for (let col = 0; col < subdivisions.w; col++) {
                const row_text = row.toString()
                const col_text = col.toString()
                const material = new StandardMaterial(
                    'material' + row_text + '-' + col_text,
                    this._scene
                )

                const xTile_text = (xTileBase + col).toString()
                const yTile_text = (yTileBase - row).toString()
                material.diffuseTexture = new Texture(
                    'http://b.tile.openstreetmap.org/' + zoom + '/' + xTile_text + '/' + yTile_text + '.png',
                    this._scene
                )
                material.diffuseTexture.wrapU = Texture.CLAMP_ADDRESSMODE
                material.diffuseTexture.wrapV = Texture.CLAMP_ADDRESSMODE
                material.specularColor = new Color3(0, 0, 0)
                material.backFaceCulling = false
                material_GroundMap.subMaterials.push(material)
            }
        }


        // Part 3 : Apply the multi material
        // Define multimat as material of the tiled ground
        tiledGround_GroundMap.material = material_GroundMap

        // Needed letiables to set subMeshes
        const verticesCount_GroundMap = tiledGround_GroundMap.getTotalVertices()
        const indicesCount_GroundMap = tiledGround_GroundMap.getTotalIndices()
        // const length_indices_GroundMap = indicesCount_GroundMap.length
        const n_indices_GroundMap = indicesCount_GroundMap / (subdivisions.w * subdivisions.h)

        // Set subMeshes of the tiled ground
        tiledGround_GroundMap.subMeshes = []
        let index = 0
        let base = 0
        for (let row = 0; row < subdivisions.h; row++) {
            for (let col = 0; col < subdivisions.w; col++) {
                const submesh = new SubMesh(index++, 0, verticesCount_GroundMap, base, n_indices_GroundMap, tiledGround_GroundMap)
                tiledGround_GroundMap.subMeshes.push(submesh)
                base += n_indices_GroundMap
            }
        }


        //
        // HEATMAP WITH ALPHA
        //
        planeCount += 1

        //Create dynamic texture
        const texture_HeatMap = new DynamicTexture('No alpha', { width: 2 * halfSize, height: 2 * halfSize }, this._scene, false)
        texture_HeatMap.hasAlpha = true

        const material_HeatMap = new StandardMaterial('plane1 material', this._scene)
        material_HeatMap.backFaceCulling = false
        material_HeatMap.diffuseTexture = texture_HeatMap
        // materialPlane1.useAlphaFromDiffuseTexture = true
        // materialPlane1.useSpecularOverAlpha = true
        // materialPlane1.needDepthPrePass = true
        // materialPlane1.separateCullingPass = true

        // 'null' = null
        // 'Opaque' = 0 Material.MATERIAL_OPAQUE
        // 'Alpha Test' = 1 Material.MATERIAL_ALPHATEST
        // 'Alpha Blend'=  2 Material.MATERIAL_ALPHABLEND
        // 'Alpha Test + Blend' = 3 Material.MATERIAL_ALPHATESTANDBLEND
        // See https://playground.babylonjs.com/#TMDNDM
        material_HeatMap.transparencyMode = Material.MATERIAL_ALPHATEST
        material_HeatMap.alpha = 0.8

        const plane_HeatMap = MeshBuilder.CreatePlane('Assets/Images/heatmap.png', { width: 2 * halfSize, height: 2 * halfSize }, this._scene)
        plane_HeatMap.rotation = new Vector3(Math.PI / 2, 0, 0)     //  Plane starts in xy plane. Bring into xz plane
        plane_HeatMap.position = new Vector3(0, planeCount * distanceBetweenPlane, 0)
        plane_HeatMap.hasVertexAlpha = true
        plane_HeatMap.visibility = 0.6
        plane_HeatMap.material = material_HeatMap

        const image_HeatMap = new Image()
        image_HeatMap.src = plane_HeatMap.name

        const context_HeatMap = texture_HeatMap.getContext()

        let hmwidth = 0
        let hmheight = 0
        let hmwidth_text = ''
        let hmheight_text = ''

        image_HeatMap.onload = (() => {
            hmwidth = image_HeatMap.naturalWidth
            hmheight = image_HeatMap.naturalHeight
            hmwidth_text = hmwidth.toString()
            hmheight_text = hmheight.toString()
            context_HeatMap.drawImage(image_HeatMap, 0, 0, hmwidth, hmheight, 0, 0, 2 * halfSize, 2 * halfSize)
            texture_HeatMap.update(false)  // false = do not use invertY
        })


        // IMAGE PLANE (NO ALPHA)
        planeCount += 1

        const texture_FixedPix = new DynamicTexture('No alpha', { width: 2 * halfSize, height: 2 * halfSize }, this._scene, false)
        texture_FixedPix.hasAlpha = false

        const material_FixedPix = new StandardMaterial('mat fixed pix', this._scene)
        material_FixedPix.backFaceCulling = false
        material_FixedPix.diffuseTexture = texture_FixedPix

        const plane_FixedPix = MeshBuilder.CreatePlane('Assets/Images/heatmap.png', { width: 2 * halfSize, height: 2 * halfSize }, this._scene)
        plane_FixedPix.rotation = new Vector3(Math.PI / 2, 0, 0)
        plane_FixedPix.position = new Vector3(0, planeCount * distanceBetweenPlane, 0)
        plane_FixedPix.material = material_FixedPix

        const image_FixedPix = new Image()
        image_FixedPix.src = plane_FixedPix.name

        const context_FixedPix = texture_FixedPix.getContext()

        let pixwidth = 0
        let pixheight = 0
        let pixwidth_text = ''
        let pixheight_text = ''

        image_FixedPix.onload = (() => {
            pixwidth = image_FixedPix.naturalWidth
            pixheight = image_FixedPix.naturalHeight
            pixwidth_text = pixwidth.toString()
            pixheight_text = pixheight.toString()
            context_FixedPix.drawImage(image_FixedPix, 0, 0, pixwidth, pixheight, 0, 0, 2 * halfSize, 2 * halfSize)
            texture_FixedPix.update(false)  // false = do not use invertY
        })


        //
        // FLOATING TEXT
        //
        planeCount += 1
        const font_size = 48
        const font_size_text = font_size.toString()
        const font = 'bold ' + font_size_text + 'px Arial'

        // Set height for plane
        const planeTextHeight = 3

        // Set height for dynamic texture
        const DTextHeight = 1.5 * font_size; //or set as wished

        // Calculate ratio
        const ratio = planeTextHeight / DTextHeight

        // Set text
        // const text = 'Fixed Pix size: width=' + pixwidth_text + ' x height=' + pixheight_text
        const text = 'Top heatmap'

        // Use a temporay dynamic texture to calculate the length of the text on the dynamic texture canvas
        const texture_Text = new DynamicTexture('DynamicTexture', {}, this._scene, false)
        const context_Text = texture_Text.getContext()
        context_Text.font = font
        const textPlane_Width = context_Text.measureText(text).width + 8

        // Calculate width the plane has to be
        const planeWidth = textPlane_Width * ratio

        // Create dynamic texture and write the text
        const dynamicTexture_Text = new DynamicTexture('DynamicTexture', { width: textPlane_Width, height: DTextHeight }, this._scene, false)
        const material_DynText = new StandardMaterial('mat', this._scene)
        material_DynText.diffuseTexture = dynamicTexture_Text
        material_DynText.backFaceCulling = false
        dynamicTexture_Text.drawText(text, null, null, font, '#000000', '#ffffff', true)

        // Create plane and set dynamic texture as material
        const plane_Text = MeshBuilder.CreatePlane('plane', { width: planeWidth, height: planeTextHeight }, this._scene)
        plane_Text.rotation = new Vector3(0, -Math.PI / 2, 0)
        plane_Text.position = new Vector3(
            halfSize,
            (planeCount - 1) * distanceBetweenPlane - planeTextHeight / 2,
            -(halfSize - planeWidth / 2))
        plane_Text.material = material_DynText


        //
        // ADD UP/DOWN BUTTON
        //
        if (addButtons) {
            const buttonUp = document.createElement('button')
            buttonUp.style.top = '100px'
            buttonUp.style.right = '30px'
            buttonUp.textContent = 'Text box UP'
            buttonUp.style.width = '100px'
            buttonUp.style.height = '100px'

            buttonUp.setAttribute('id', 'but')
            buttonUp.style.position = 'absolute'
            buttonUp.style.color = 'black'

            document.body.appendChild(buttonUp)
            buttonUp.addEventListener('click', () => {
                if (plane_Text) {
                    plane_Text.position.y += 1
                }
            })

            const buttonDown = document.createElement('button')
            buttonDown.style.top = '250px'
            buttonDown.style.right = '30px'
            buttonDown.textContent = 'Text box DOWN'
            buttonDown.style.width = '100px'
            buttonDown.style.height = '100px'

            buttonDown.setAttribute('id', 'but')
            buttonDown.style.position = 'absolute'
            buttonDown.style.color = 'black'

            document.body.appendChild(buttonDown)
            buttonDown.addEventListener('click', () => {
                if (plane_Text) {
                    plane_Text.position.y -= 1
                }
            })
        }

        void this._scene.debugLayer.show({
            // embedMode: true,
            showInspector: true,
            // overlay: true,
            showExplorer: true
        })

    }

    public startScene() {
        this.setupRenderLoop();
    }

    private setupRenderLoop() {
        this._engine.runRenderLoop(() => {
            this._scene.render();
        });
    }
}
