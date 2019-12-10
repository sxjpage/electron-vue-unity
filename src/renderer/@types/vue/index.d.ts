import { VueConstructor } from "vue/types/vue";

declare module 'vue/types/vue' {
  interface Vue {
    $bus: CombinedVueInstance<Vue, object, object, object, Record<never, any>>
  }
}