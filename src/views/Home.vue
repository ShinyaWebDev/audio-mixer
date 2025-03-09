<template>
  <v-container class="text-center">
    <h1 class="text-h4 font-weight-bold mb-6">🎵 Audio Mixer</h1>
    <v-btn color="primary" @click="$router.push('/audio-mixer/mixer')"
      >🎚️ Open Mixer</v-btn
    >
    <v-btn
      color="secondary"
      class="ml-2"
      @click="$router.push('/audio-mixer/songs')"
      >🎵 Song List</v-btn
    >
  </v-container>
</template>
