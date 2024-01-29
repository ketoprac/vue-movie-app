<script setup>
  import { SignUp } from "vue-clerk";
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <SignUp afterSignUpUrl="/" signInUrl="/sign-in" />
  </div>
</template>
