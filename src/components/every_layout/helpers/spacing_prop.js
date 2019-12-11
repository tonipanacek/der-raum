export default {
  spacing: {
    type: String,
    default: 'sm',
    validator(value) {
      // The value must match one of these strings
      return ['xs', 'sm', 'md', 'lg', 'xl'].includes(value);
    }
  }
}
