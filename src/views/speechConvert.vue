<!-- eslint-disable new-cap -->
<template>
  <div>
    <span style="display: block;">
      支持热键：按F7开始录制，F8停止录制获取结果并复制
    </span>
    <el-row style="margin-top:30px;margin-bottom: 30px;">
      <el-button
        type="primary"
        @click="startRecognition"
        :disabled="isRecording"
      >
        开始录制(F7)
      </el-button>
      <el-button
        @click="stopRecognition"
        :disabled="!isRecording"
      >
        结束录制并复制(F8)
      </el-button>
      <i v-show="showIcon" class="el-icon-headset" style="margin-left:20px">录音中...</i>
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
import { ipcRenderer } from 'electron';

export default {
  data() {
    return {
      recognition: null,
      transcript: '',
      showIcon: false,
      isRecording: false,
      audioContext: new (window.AudioContext || window.webkitAudioContext)(),
      oscillator: null,
      gainNode: null,
    };
  },

  mounted() {
    // 初始化语音识别
    this.initWebkitSpeechRec();
    // 初始化音频播放
    this.initAudioComponents();
    // 初始化热键监听
    this.initHotKeyListenr();
  },

  methods: {
    copy() {
      copyToClipboard(this.transcript);
    },

    initHotKeyListenr() {
      // 监听 'global-shortcut' 消息
      ipcRenderer.on('global-shortcut', (event, arg) => {
        // 当收到消息时，执行相应的操作
        if (arg === 'F7') {
          this.startRecognition();
        } else if (arg === 'F8') {
          this.stopRecognition();
        }
      });
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
        alert(`语音识别发生错误，原因：${event.error}`);
      };
    },

    startRecognition() {
      if (!this.isRecording) {
        this.transcript = '';
        this.showIcon = true;
        this.isRecording = true;
        this.recognition.start();
        this.playRisingTone();
      }
    },

    stopRecognition() {
      if (this.isRecording) {
        this.showIcon = false;
        this.isRecording = false;
        this.recognition.stop();
        this.copy();
        this.playFallingTone();
      }
    },

    initAudioComponents() {
      // 创建一个新的振荡器
      this.oscillator = this.audioContext.createOscillator();
      // 创建一个新的增益节点
      this.gainNode = this.audioContext.createGain();

      // 设置振荡器的类型为正弦波
      this.oscillator.type = 'sine';
      // 将振荡器连接到增益节点
      this.oscillator.connect(this.gainNode);
      // 将增益节点连接到音频上下文的输出
      this.gainNode.connect(this.audioContext.destination);
    },

    playRisingTone() {
      // 初始化音频组件
      this.initAudioComponents();
      // 设置振荡器的频率为300Hz
      this.oscillator.frequency.value = 300;

      // 在当前时间开始播放
      this.oscillator.start(this.audioContext.currentTime);
      // 在0.6秒内将频率平滑地提高到600Hz
      setTimeout(() => {
        this.oscillator.frequency.exponentialRampToValueAtTime(600, this.audioContext.currentTime + 0.6);
      }, 0);
      // 在1秒后停止播放
      setTimeout(() => {
        this.oscillator.stop(this.audioContext.currentTime);
      }, 1000);
    },

    playFallingTone() {
      // 初始化音频组件
      this.initAudioComponents();
      // 设置振荡器的频率为600Hz
      this.oscillator.frequency.value = 600;

      // 在当前时间开始播放
      this.oscillator.start(this.audioContext.currentTime);
      // 立即开始，在0.6秒内将频率平滑地降低到300Hz
      setTimeout(() => {
        this.oscillator.frequency.exponentialRampToValueAtTime(300, this.audioContext.currentTime + 0.6);
      }, 0);
      // 在1秒后停止播放
      setTimeout(() => {
        this.oscillator.stop(this.audioContext.currentTime);
      }, 1000);
    }
  },
};
</script>

<style scoped>
</style>
