<template>
  <q-page class="row items-center justify-evenly">
    <canvas ref="bjsCanvas" class="full-width full-height" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import { Engine } from '@babylonjs/core';
import { MapScene } from 'src/scenes/map_scene';
export default defineComponent({
  name: 'MapMockup',
  setup() {
    const bjsCanvas = ref<HTMLCanvasElement | null>(null);
    let engine: Engine;
    onMounted(() => {
      if (bjsCanvas?.value) {
        const myMapScene = new MapScene(bjsCanvas.value);
        engine = myMapScene.getEngine();
        myMapScene.initScene();
        myMapScene.startScene();
        window.addEventListener('resize', onWindowResize);
      }
    });
    onUnmounted(() => {
      cleanup();
    });
    const cleanup = () => {
      window.removeEventListener('resize', onWindowResize);
    };
    const onWindowResize = () => {
      engine.resize();
    };
    return {
      bjsCanvas,
    };
  },
});

</script>