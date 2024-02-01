import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

export function useMiddleware(isSignedIn) {
  const router = useRouter();
  const toast = useToast();

  onBeforeMount(() => {
    if(!isSignedIn) {
      setTimeout(() => {
        toast.error("Unauthorized!");
        router.push("/sign-in");
      }, 1500);
    }
  })
}