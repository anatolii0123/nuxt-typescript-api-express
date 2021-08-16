<template>
  <v-layout
    column
    justify-center
    align-center
  >

  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  mounted: () => {
    console.log('Index hits');
  },
  components: {
    Logo,
    VuetifyLogo
  }
}
</script>
