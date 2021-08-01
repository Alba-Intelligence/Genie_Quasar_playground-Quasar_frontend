<template>
  <q-page class="row items-center justify-evenly">
    <canvas ref="babylonCanvas" class="full-width full-height" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';

import { Engine } from '@babylonjs/core';
import { MapScene } from 'src/scenes/map_scene';

export default defineComponent({
  name: 'MapMockup',
  setup() {
    // Address the possibility that null is returned to make eslint happy.
    const babylonCanvas = ref<HTMLCanvasElement | null>(null);
    let engine: Engine;
    onMounted(() => {

      // Interrogation mark in case the canvas is not available (null received)
      if (babylonCanvas?.value) {
        const myMapScene = new MapScene(babylonCanvas.value);
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
      babylonCanvas,
    };
  },
});

</script>
