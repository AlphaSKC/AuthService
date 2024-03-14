<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import router from './router';
import { useRoute } from 'vue-router';
const route = useRoute()
const isDiagonal = route.path == '/'

console.log(isDiagonal)
</script>

<template>
  <div class="container">
    <header>
      <div class="wrapper" v-if="isDiagonal">
        <nav>
          <RouterLink to="/home">
            <button class="btnHome">
              Home
            </button>
          </RouterLink>
          <RouterLink to="/blog">
            <button class="btnBlog">
              Blog
            </button>
          </RouterLink>
          <RouterLink to="/register">
            <button class="btnRegister">
              Register
            </button>
          </RouterLink>
        </nav>
      </div>
    </header>

    <RouterView />
  </div>
</template>

<style scoped>
nav {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.btnHome,
.btnBlog,
.btnRegister,
.btnHome::after,
.btnBlog::after,
.btnRegister::after {
  padding: 10px 50px;
  font-size: 20px;
  border: none;
  border-radius: 5px;
  color: white;
  background-color: transparent;
  position: relative;
}

.btnHome::after {
  --move1: inset(50% 50% 50% 50%);
  --move2: inset(31% 0 40% 0);
  --move3: inset(39% 0 15% 0);
  --move4: inset(45% 0 40% 0);
  --move5: inset(45% 0 6% 0);
  --move6: inset(14% 0 61% 0);
  clip-path: var(--move1);
  content: 'Home';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: block;
}

.btnBlog::after {
  --move1: inset(50% 50% 50% 50%);
  --move2: inset(31% 0 40% 0);
  --move3: inset(39% 0 15% 0);
  --move4: inset(45% 0 40% 0);
  --move5: inset(45% 0 6% 0);
  --move6: inset(14% 0 61% 0);
  clip-path: var(--move1);
  content: 'Blog';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: block;
}

.btnRegister::after {
  --move1: inset(50% 50% 50% 50%);
  --move2: inset(31% 0 40% 0);
  --move3: inset(39% 0 15% 0);
  --move4: inset(45% 0 40% 0);
  --move5: inset(45% 0 6% 0);
  --move6: inset(14% 0 61% 0);
  clip-path: var(--move1);
  content: 'Register';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: block;
}


.btnHome:hover::after,
.btnBlog:hover::after,
.btnRegister:hover::after {
  animation: glitch 1s;
  text-shadow: 10 10px 10px black;
  animation-timing-function: steps(2, end);
  text-shadow: -3px -3px 0px #1df2f0, 3px 3px 0px #E94BE8;
  background-color: transparent;
  border: 3px solid rgb(0, 255, 213);
}

.btnHome:hover,
.btnBlog:hover,
.btnRegister:hover {
  text-shadow: -1px -1px 0px #1df2f0, 1px 1px 0px #E94BE8;
  background-color: transparent;
  border: 1px solid rgb(0, 255, 213);
  box-shadow: 0px 10px 10px -10px rgb(0, 255, 213);
}

@keyframes glitch {
  0% {
    clip-path: var(--move1);
    transform: translate(0px, -10px);
  }

  10% {
    clip-path: var(--move2);
    transform: translate(-10px, 10px);
  }

  20% {
    clip-path: var(--move3);
    transform: translate(10px, 0px);
  }

  30% {
    clip-path: var(--move4);
    transform: translate(-10px, 10px);
  }

  40% {
    clip-path: var(--move5);
    transform: translate(10px, -10px);
  }

  50% {
    clip-path: var(--move6);
    transform: translate(-10px, 10px);
  }

  60% {
    clip-path: var(--move1);
    transform: translate(10px, -10px);
  }

  70% {
    clip-path: var(--move3);
    transform: translate(-10px, 10px);
  }

  80% {
    clip-path: var(--move2);
    transform: translate(10px, -10px);
  }

  90% {
    clip-path: var(--move4);
    transform: translate(-10px, 10px);
  }

  100% {
    clip-path: var(--move1);
    transform: translate(0);
  }
}
</style>
