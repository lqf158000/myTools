import About from '@/views/About.vue';
import Home from '@/views/Home.vue';
import SpeechConvert from '@/views/speechConvert.vue';

export default [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      title: '主页',
      isMenu: true,
    },
  },
  {
    path: '/about',
    name: 'about',
    component: About,
    meta: {
      title: '关于',
      isMenu: true,
    },
  },
  {
    path: '/speech2Txt',
    name: 'SpeechConvert',
    component: SpeechConvert,
    meta: {
      title: '语音转文字',
      isMenu: true,
    },
  },
];
