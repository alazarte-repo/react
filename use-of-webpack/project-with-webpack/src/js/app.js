// src/js/app.js
/*!
 * App.js v0.0.1
 * (c) 2020 Victor Valencia Rico
 * Released under the MIT License.
 */

Vue.component('card-tag', {
  props: ['tag'],
  template: `
    <span class="badge badge-pill badge-secondary mr-2">
      #{{ tag }}
    </span>
  `
})
Vue.component('card-item', {
  props: ['post'],
  template: `
    <div class="card" style="width: 18rem;">
      <img class="card-img-top" :src="post.image" alt="Card">
      <div class="card-body">
        <h5 class="card-title">{{ post.title }}</h5>
        <p class="card-text">{{ post.description }}</p>
      </div>
      <div class="card-body pt-0">
        <card-tag v-for="tag in post.tags" v-bind:tag="tag">
        </card-tag>
      </div>
    </div>
  `
})
var app = new Vue({
  el: '#app',
  data: {
    posts: [
      {
        title: '¿Qué es TypeScript?',
        image: 'https://www.victorvr.com/img/posts/Post-10.webp',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        tags: ['TypeScript', 'Javascript', 'NodeJS']
      },
      {
        title: '¿Qué es Webpack?',
        image: 'https://www.victorvr.com/img/posts/Post-11.webp',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        tags: ['Webpack', 'NodeJs', 'Javascript']
      },
      {
        title: '¿Qué es NodeJS?',
        image: 'https://www.victorvr.com/img/posts/Post-12.webp',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        tags: ['NodeJs', 'Express', 'Npm']
      }
    ]
  }
})