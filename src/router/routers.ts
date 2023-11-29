import About from '@/views/About.vue';
import SpeechConvert from '@/views/speechConvert.vue';

export default [
  {
    path: '/',
    redirect: '/about',
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
