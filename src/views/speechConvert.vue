<!-- eslint-disable new-cap -->
<template>
  <div>
    <span style="display: block;">
      支持热键：按F11开始录制，F12停止录制获取结果并复制
    </span>
    <el-row style="margin-top:30px;margin-bottom: 30px;">
      <el-button type="primary" @click="startRecognition">开始录制(F11)</el-button>
      <el-button @click="stopRecognition">结束录制并复制(F12)</el-button>
    </el-row>
    结果：
    <el-row style="display: flex;">
      <el-input
        type="textarea"
        autosize
        v-model="transcript"
        style="display:inline-block;width: 400px;"
      >
      </el-input>
      <el-button
        style="margin-left:20px; height:33px;line-height:9px;"
        type="primary"
        @click="copy"
      >
        复制
      </el-button>
    </el-row>
  </div>
</template>

<script>
import { copyToClipboard } from '../common/copyText';

export default {
  data() {
    return {
      recognition: null,
      transcript: '',
    };
  },

  mounted() {
    this.initWebkitSpeechRec();
  },

  methods: {
    copy() {
      copyToClipboard(this.transcript);
    },

    handleKeyDown(e) {
      if (e.keyCode === 123) { // F12的键码
        this.stopRecognition();
      } else if (e.keyCode === 122) { // F11的键码
        this.startRecognition();
      }
    },

    initWebkitSpeechRec() {
      // 检查浏览器是否支持 SpeechRecognition
      if ('webkitSpeechRecognition' in window) {
        this.recognition = new webkitSpeechRecognition();
      } else if ('SpeechRecognition' in window) {
        this.recognition = new SpeechRecognition();
      } else {
        alert('你的浏览器不支持语音识别。请使用最新版的 Google Chrome。');
        return;
      }

      // 创建一个新的 SpeechRecognition 对象
      this.recognition = new webkitSpeechRecognition();
      this.recognition.continuous = true; // 连续识别
      this.recognition.interimResults = true; // 返回临时结果

      // 设置识别结果的回调函数
      this.recognition.onresult = (event) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i += 1) {
          if (event.results[i].isFinal) {
            this.transcript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
      };

      this.recognition.onerror = (event) => {
        alert('语音识别错误: ', event.error);
      };
    },

    startRecognition() {
      this.recognition.start();
    },

    stopRecognition() {
      this.recognition.stop();
      this.copy();
    },

  },
};
</script>

<style scoped>
</style>
