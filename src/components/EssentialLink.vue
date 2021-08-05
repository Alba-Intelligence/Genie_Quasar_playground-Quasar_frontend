<template>
  <q-item clickable tag="a" target="_blank" :href="link">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
//
// This templaate is a generic mini-template that creates the left hand side
// list of links.
//
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: { type: String, required: true },
    caption: { type: String, default: '' },
    link: { type: String, default: '#' },
    icon: { type: String, default: '' },
  },
});
</script>
