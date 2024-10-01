<template>
  <!-- Main container for the 'About Us' page -->
<div class="about-us-container">
  <!-- Section displaying the main image and title -->
  <div class="image-container">
    <img src="@/assets/4002676.jpg" alt="About Us Image" class="about-us-image" />
    <div class="overlay">
      <h1>About Us</h1>
    </div>
  </div>
  <!-- Section with introductory text about the team -->
  <div class="middle-text">
    <p class="styled-paragraph">
      Welcome to our recipe Website!<br> Our team is dedicated to continuous improvement and innovation. <br>We are two Software and Information Systems Engineering students in our 3rd year at Ben Gurion University. We are passionate about technology and committed to delivering high-quality solutions. Our expertise spans a variety of programming languages and platforms, allowing us to tackle diverse challenges in the tech world.
    </p>
  </div>
  <!-- Section for Dvir Zandany's profile with audio controls -->
  <div class="content-section">
    <img src="@/assets/dvir.jpg" alt="Another Image" class="side-image" />
    <div class="text-content">
      <audio ref="audioDvir" src="@/assets/Dwirr.mp3"></audio>
      <p class="styled-paragraph">
        Dvir Zandany <br> Dvir Zandany, tech's shining star,<br>Leading projects, reaching far,<br>With code and vision, sets the bar,<br>Innovation drives his car,<br>In the digital world, he’s raising the par.
      </p>
      <!-- Audio control buttons for Dvir -->
      <div class="audio-controls">
        <button @click="playAudio('audioDvir')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-circle" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
          <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445"/>
        </svg></button>
        <button @click="pauseAudio('audioDvir')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-circle" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
          <path d="M5 6.25a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0zm3.5 0a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0z"/>
        </svg></button>
        <button @click="stopAudio('audioDvir')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stop-circle" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
          <path d="M5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5z"/>
        </svg></button>
      </div>
    </div>
  </div>
  <!-- Section for Ido Dai's profile with audio controls -->
  <div class="content-section">
    <img src="@/assets/ido.jpg" alt="Another Image" class="side-image" />
    <div class="text-content">
      <audio ref="audioIdo" src="@/assets/Wedo.mp3"></audio>
      <p class="styled-paragraph">
        Ido Dai<br>Ido Dai, in tech he shines bright,<br>Crafting code through day and night,<br>Innovation's path, he lights,<br>In the world of tech, he takes flight,<br>Turning dreams to real, just right.
      </p>
      <!-- Audio control buttons for Ido -->
      <div class="audio-controls">
        <button @click="playAudio('audioIdo')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-circle" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
          <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445"/>
        </svg></button>
        <button @click="pauseAudio('audioIdo')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-circle" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
          <path d="M5 6.25a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0zm3.5 0a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0z"/>
        </svg></button>
        <button @click="stopAudio('audioIdo')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stop-circle" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
          <path d="M5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5z"/>
        </svg></button>
      </div>
    </div>
  </div>
  <!-- Section containing links to projects and LinkedIn profiles -->
  <div class="links-sections-container">
    <!-- Section for GitHub links -->
    <div class="links-section">
      <h1>Projects</h1>
      <br>
      <div class="link-item" v-for="(link, index) in links" :key="index">
        <img src="@/assets/git.jpg" alt="Another Image" class="icon" />
        <a :href="link.url">{{ link.text }}</a>
      </div>
    </div>
    <!-- Section for LinkedIn links -->
    <div class="links-section">
      <h1>LinkedIn</h1>
      <div class="link-item" v-for="(link, index) in links2" :key="index">
        <img img src="@/assets/link.webp" alt="Another Image"  class="icon1" />
        <a :href="link.url">{{ link.text }}</a>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
name: 'AboutUs',
data() {
  return {
    links: [
      { image: '@/assets/git.jpg', url: 'https://github.com/zandanyd', text: "Dvir's GitHub", alt: "Link 1 Image" },
      { image: '@/assets/in.png', url: 'https://github.com/IdoDai', text: "Ido's GitHub", alt: 'Link 2 Image' }
    ],
    links2: [
      { image: '@/assets/git.jpg', url: 'https://www.linkedin.com/in/dvir-zandany-197921236/', text: "Dvir's LinkedIn", alt: 'Link 1 Image' },
      { image: '@/assets/in.png', url: 'https://www.linkedin.com/in/ido-dai-a176b0201?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app', text: "Ido's LinkedIn", alt: 'Link 2 Image' }
    ]
  };
},
methods: {
  /**
   * Plays the audio element referenced by the given ref name.
   * @param {string} refName - The ref name of the audio element.
   */
  playAudio(refName) {
    this.$refs[refName].play();
  },
  /**
   * Pauses the audio element referenced by the given ref name.
   * @param {string} refName - The ref name of the audio element.
   */
  pauseAudio(refName) {
    this.$refs[refName].pause();
  },
  /**
   * Stops the audio element referenced by the given ref name and resets its playback position.
   * @param {string} refName - The ref name of the audio element.
   */
  stopAudio(refName) {
    const audio = this.$refs[refName];
    audio.pause();
    audio.currentTime = 0;
  }
}
};
</script>


<style scoped>
.about-us-container {
  text-align: center;
  color: white;
}

.image-container {
  position: relative;
  display: inline-block;
  width: 100%;
  max-height: 300px; /* Adjust this value to make the image less tall */
  overflow: hidden;
}

.about-us-image {
  width: 100%;
  height: auto;
  display: block;
}

.overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.overlay h1 {
  font-size: 3em;
  font-weight: bold;
  color: white;
}

.middle-text {
  padding: 20px;
  background-color: #fff;
  color: #000;
  font-size: 1.2em;
}

.content-section {
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #f0f0f0;
  color: black;
}

.side-image {
  width: 300px; /* Adjust the width as needed */
  height: auto;
  margin-right: 20px;
}

.text-content {
  max-width: 60%;
  padding-left: 15%;
}

.links-sections-container {
  display: flex;
  justify-content: space-around;
  padding: 20px;
  background-color: #294b47;
  
  color: #f1f1f1;
}

.links-section {
  flex: 1;
  margin: 0 10px;
}

.link-item {
  display: flex;
  align-items: center;
  margin: 10px 0;
}

.icon1 {
  width: 80px; /* Adjust the width as needed */
  height: auto;
  margin-right: 10px;
}

.icon {
  width: 50px; /* Adjust the width as needed */
  height: auto;
  margin-right: 10px;
}
/* Add this CSS rule to change the link text color */
.link-item a {
color: #f3f3f3; /* Change this to your desired link text color */
text-decoration: none; /* Optional: remove underline */
}

/* Optional: add hover effect for the links */
.link-item a:hover {
color: #000000; /* Change this to your desired hover color */
text-decoration: underline; /* Optional: add underline on hover */
}
.styled-paragraph {
font-weight: bold;
font-family: 'Arial', sans-serif; /* Change 'Arial' to any other font you prefer */
font-size: 2em; /* Adjust the font size as needed */
color: #013c30; /* Change the text color if desired */
width: 100%;
}
.audio-controls {
margin-top: 20px;
}

.audio-controls button {
background-color: #294b47;
color: #f1f1f1;
border: none;
padding: 10px 20px;
margin: 0 5px;
cursor: pointer;
font-size: 1em;
}

.audio-controls button:hover {
background-color: #013c30;
}

</style>
