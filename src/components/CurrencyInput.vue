<template>
  <input 
    ref="inputRef" :value="formattedValue"    class="form-control"
  >
</template>

<script>
import { watch } from '@vue/composition-api' 
import { useCurrencyInput } from 'vue-currency-input'
import {mapState} from 'vuex'

export default {
  name: 'CurrencyInput',
  props: {
    value: Number,
    options: Object,
    mValue : Number,
    metric: Text,
    item: Object,
    isEdited: Boolean,
    model: Object,
    disabled: Boolean
  },
  setup (props) {
    const {
      inputRef,
      formattedValue,
      setOptions,
      setValue
    } = useCurrencyInput(props.options)

    watch(() => props.value, (value) => { // Vue 2: props.value
      setValue(value)
    })

    watch(() => props.options, (options) => {
      setOptions(options)
    })

    return { inputRef, formattedValue }
  }
}
</script>
