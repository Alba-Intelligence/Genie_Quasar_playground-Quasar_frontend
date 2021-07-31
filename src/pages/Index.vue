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

//
// ORIGINAL FROM QUASAR TEMPLATE
//
//
//       <!-- :todos="todos"
//      :meta="meta" -->
//
// import { Todo, Meta } from 'components/models'
// import ExampleComponent from 'components/CompositionComponent.vue'
//
//
// export default defineComponent({
//   name: 'PageIndex',
//   components: { ExampleComponent },
//   setup() {
//     const todos = ref<Todo[]>([
//       {
//         id: 1,
//         content: 'ct1',
//       },
//       {
//         id: 2,
//         content: 'ct2',
//       },
//       {
//         id: 3,
//         content: 'ct3',
//       },
//       {
//         id: 4,
//         content: 'ct4',
//       },
//       {
//         id: 5,
//         content: 'ct5',
//       },
//     ]);
//     const meta = ref<Meta>({
//       totalCount: 1200,
//     });
//     return { todos, meta };
//   },
// });
</script>
