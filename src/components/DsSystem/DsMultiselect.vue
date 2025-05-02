<template>
  <multiselect
    v-model="selected"
    :options="options"
    :multiple="false"
    :searchable="false"
    track-by="value"
    :custom-label="customLabel"
    :allowEmpty="false"
    deselect-label="X"
    @update:modelValue="$emit('update:modelValue', $event)"
  >
  </multiselect>
  <pre></pre>
</template>

<script setup lang="ts">
import Multiselect from 'vue-multiselect'
import { ref } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  options: {
    type: Array as () => Array<{ value: number; label: string }>,
    required: true,
  },
})

const selected = ref({ value: props.options[0].value, label: props.options[0].label })

const customLabel = (option: { value: number; label: string }) => {
  return `chapitres : ${option.label}`
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss">
span {
  color: black;
}
</style>
