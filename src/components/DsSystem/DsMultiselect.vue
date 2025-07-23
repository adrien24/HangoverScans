<template>
  <multiselect
    v-model="selected"
    :options="options"
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
  return `Chapitres : ${option.label}`
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss">
.multiselect__single,
.multiselect__option {
  background-color: #0f223b;
}

.multiselect__option {
  border-top: 1px solid #142d4f;
}

.multiselect__content-wrapper {
  border: 1px solid #0f223b;
}

.multiselect__option--selected.multiselect__option--highlight {
  background: #1d3b7a;
  height: 45px;
}

.multiselect__option--selected.multiselect__option--highlight::after {
  display: none;
}

.multiselect__option {
  background: #0f223b;
  height: 45px;
  display: flex;
  align-items: center;
}

.multiselect__select {
  height: 45px;
}

.multiselect__tags {
  background-color: #0f223b;
  border-radius: 7px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  border: #213170 0.1px solid;
  min-height: 45px;
  display: flex;
  align-items: center;
}
</style>
