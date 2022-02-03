<template>
  <p>User page</p>
</template>

<script>
export default {
  name: 'IndexUser',
  middleware: ["isAuthorization"]
}
</script>
