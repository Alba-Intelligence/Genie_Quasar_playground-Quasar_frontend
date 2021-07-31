import {
  Color4,
  Engine,
  FreeCamera,
  HemisphericLight,
  MeshBuilder,
  Scene,
  Vector3
} from '@babylonjs/core';

export class MyScene {
  _scene: Scene;
  _engine: Engine;

  public getEngine() {
    return this._engine;
  }

  constructor(private _canvas: HTMLCanvasElement) {
    this._engine = this.createEngine(_canvas);
    this._scene = this.createScene(this._engine);
  }

  public initScene(cameraControlCanvas?: HTMLCanvasElement) {
    const camera = new FreeCamera(
      'camera1',
      new Vector3(0, 5, -10),
      this._scene
    );
    camera.setTarget(Vector3.Zero());
    const canvas = cameraControlCanvas ?? this._engine.getRenderingCanvas();
    camera.attachControl(canvas, true);

    this._scene.clearColor = new Color4(0.3, 0.2, 0.7, 1);

    const light = new HemisphericLight(
      'light',
      new Vector3(0, 1, 0),
      this._scene
    );
    light.intensity = 0.7;

    const sphere = MeshBuilder.CreateSphere(
      'sphere',
      { diameter: 2, segments: 32 },
      this._scene
    );
    sphere.position.y = 1;

    MeshBuilder.CreateGround('ground', { width: 6, height: 6 }, this._scene);
  }

  public startScene() {
    this.setupRenderLoop();
  }

  createEngine(canvas: HTMLCanvasElement) {
    const engine = new Engine(canvas);
    return engine;
  }

  createScene(engine: Engine) {
    const scene = new Scene(engine);
    return scene;
  }

  private setupRenderLoop() {
    this._engine.runRenderLoop(() => {
      this._scene.render();
    });
  }
}
