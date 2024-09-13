<template>
  <div>
    <navbar />

    <CarrousselInformations />
    <CarrousselNotices />
    <Seals />
    <Contact />
  </div>
</template>

<script setup>
  import CarrousselInformations from '@/components/CarrousselInformations.vue'
  import CarrousselNotices from '@/components/CarrousselNotices.vue'
  import Seals from '@/components/Seals.vue'
  import Contact from '@/components/Contact.vue'
  import Navbar from '../components/Navbar.vue'
</script>