<script setup>
import { UserProfile, useAuth } from "vue-clerk";
import { useMiddleware } from "@/composables/middleware";

const { isSignedIn } = useAuth();

useMiddleware(isSignedIn.value);
</script>

<template>
  <div class="flex items-center justify-center min-h-screen py-6 px-2">
    <UserProfile v-if="isSignedIn" />
  </div>
</template>
