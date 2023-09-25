<script >
export default {
  name: 'Card',
  props: {
    title: {
      type: String,
      default: 'Card Title'
    },
    footer: {
      type: String,
      default: 'Card Footer'
    }
  }
}
  
</script>

<template>
  <div class="card">
    <div class="card-header">{{ title }}</div>
    <div class="card-body">
      <slot></slot>
    </div>
    <div class="card-footer">{{ footer }}</div>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  margin: 10px;
  padding: 10px;
}

.card-header {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.card-footer {
  font-size: 14px;
  font-style: italic;
  margin-top: 10px;
}
</style>