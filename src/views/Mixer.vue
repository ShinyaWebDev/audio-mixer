<template>
  <v-container class="fill-height d-flex flex-column">
    <v-card class="mx-auto" width="95vw">
      <v-card-title class="d-flex justify-space-between align-center">
        <span class="text-h6">🎛️ Yosuke 師匠 Mixer</span>
        <v-btn @click="togglePlayback" color="primary" icon>
          <v-icon>{{ isPlaying ? "mdi-pause" : "mdi-play" }}</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-list>
          <v-list-item v-for="track in tracks" :key="track.id">
            <div class="d-flex align-center justify-center">
              <p class="text-caption">{{ track.name }}</p>
            </div>
            <v-row class="align-center">
              <!-- Mute & Solo Buttons -->
              <v-col cols="2" class="d-flex flex-column align-center">
                <v-btn icon @click="toggleMute(track)">
                  <v-icon>{{
                    track.muted ? "mdi-volume-off" : "mdi-volume-high"
                  }}</v-icon>
                </v-btn>
                <v-btn icon @click="toggleSolo(track)">
                  <v-icon>{{
                    track.solo ? "mdi-headphones" : "mdi-headphones-off"
                  }}</v-icon>
                </v-btn>
              </v-col>

              <!-- Waveform Display -->
              <v-col cols="7">
                <div
                  :id="`waveform-${track.id}`"
                  class="waveform"
                  @click="syncSeek(track)"
                ></div>
              </v-col>

              <!-- Volume Slider -->
              <v-col cols="3" class="d-flex align-center">
                <v-slider
                  v-model="track.volume"
                  min="0"
                  max="1"
                  step="0.01"
                  hide-details
                  @input="updateVolume(track, $event)"
                ></v-slider>
              </v-col>
            </v-row>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import WaveSurfer from "wavesurfer.js";

const tracks = ref([
  {
    id: 1,
    name: "Vocals",
    icon: "mdi-microphone",
    url: "/audio/vocals.wav",
    volume: 1,
    muted: false,
    solo: false,
    wavesurfer: null,
  },
  {
    id: 2,
    name: "Drums",
    icon: "mdi-drum",
    url: "/audio/drums.wav",
    volume: 1,
    muted: false,
    solo: false,
    wavesurfer: null,
  },
  {
    id: 3,
    name: "Bass",
    icon: "mdi-guitar-electric",
    url: "/audio/bass.wav",
    volume: 1,
    muted: false,
    solo: false,
    wavesurfer: null,
  },
  {
    id: 4,
    name: "Others",
    icon: "mdi-music",
    url: "/audio/other.wav",
    volume: 1,
    muted: false,
    solo: false,
    wavesurfer: null,
  },
]);

const isPlaying = ref(false);

const togglePlayback = () => {
  if (isPlaying.value) {
    tracks.value.forEach((track) => track.wavesurfer.pause());
  } else {
    tracks.value.forEach((track) => track.wavesurfer.play());
  }
  isPlaying.value = !isPlaying.value;
};

const updateVolume = (track, volume) => {
  track.wavesurfer.setVolume(volume);
};

const toggleMute = (track) => {
  track.muted = !track.muted;
  track.wavesurfer.setVolume(track.muted ? 0 : track.volume);
};

const toggleSolo = (track) => {
  track.solo = !track.solo;
  if (track.solo) {
    tracks.value.forEach((t) => {
      if (t.id !== track.id) {
        t.muted = true;
        t.wavesurfer.setVolume(0);
      }
    });
  } else {
    tracks.value.forEach((t) => {
      t.muted = false;
      t.wavesurfer.setVolume(t.volume);
    });
  }
};

const syncSeek = (selectedTrack) => {
  const currentTime = selectedTrack.wavesurfer.getCurrentTime();
  tracks.value.forEach((track) => {
    if (track.id !== selectedTrack.id) {
      track.wavesurfer.seekTo(currentTime / track.wavesurfer.getDuration());
    }
  });
};

onMounted(() => {
  tracks.value.forEach((track) => {
    track.wavesurfer = WaveSurfer.create({
      container: `#waveform-${track.id}`,
      waveColor: "#64b5f6",
      progressColor: "#1976d2",
      cursorColor: "#ffca28",
      barWidth: 2,
      responsive: true,
      height: 100, // Increase waveform height
      width: "100%", // Make sure it fills its container
      url: track.url,
      volume: track.volume,
    });
  });
});
</script>

<style scoped>
.waveform {
  width: 100%;
  height: 80px; /* Increase height */
  background: #000;
  border-radius: 4px;
}
</style>
