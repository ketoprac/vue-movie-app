<script setup>
  import { SignIn } from "vue-clerk";
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <SignIn afterSignInUrl="/" signUpUrl="/sign-up" />
  </div>
</template>
