<!-- eslint-disable new-cap -->
<template>
  <div>
    <span style="display: block;">
      支持热键：按{{hotkeyForm.startHotKey}}开始录制，{{hotkeyForm.stopHotKey}}停止录制获取结果并复制
    </span>
    <el-button @click="showHotkeySetting= true">自定义快捷键</el-button>
    <el-row style="margin-top:30px;margin-bottom: 30px;">
      <el-button
        type="primary"
        @click="startRecognition"
        :disabled="isRecording"
      >
        开始录制({{hotkeyForm.startHotKey}})
      </el-button>
      <el-button
        @click="stopRecognition"
        :disabled="!isRecording"
      >
        结束录制并复制({{hotkeyForm.stopHotKey}})
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
    <el-dialog
      title="自定义快捷键"
      :visible.sync="showHotkeySetting"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
    <el-form ref="hotkeyForm" :model="hotkeyForm">
      <el-form-item label="开始录制">
        <el-input
          v-model="hotkeyForm.startHotKey"
          @focus="showSetKey('startHotKey')"
          placeholder="请按一个键以设置快捷键"
          readonly
        ></el-input>
      </el-form-item>
      <el-form-item label="停止录制">
        <el-input
          v-model="hotkeyForm.stopHotKey"
          @focus="showSetKey('stopHotKey')"
          placeholder="请按一个键以设置快捷键"
          readonly
        ></el-input>
      </el-form-item>
    </el-form>
      <span slot="footer">
        <el-button @click="setDefaultHotkey">恢复默认</el-button>
        <el-button type="primary" @click="validateKey">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { copyToClipboard } from '../common/copyText';

export default {
  data() {
    return {
      recognition: null,
      transcript: '',
      showHotkeySetting: false,
      hotkeyForm: {
        startHotKey: 'F11',
        stopHotKey: 'F12',
      },
      formKey: '',
      showIcon: false,
      isRecording: false,
    };
  },

  mounted() {
    this.initWebkitSpeechRec();
    window.addEventListener('keydown', this.keydownHandler);
  },

  beforeDestroy() {
    window.removeEventListener('keydown', this.keydownHandler);
  },

  methods: {
    copy() {
      copyToClipboard(this.transcript);
    },

    keydownHandler(e) {
      debugger;
      console.log(e);
      console.log(this.hotkeyForm.startHotKey);
      if (e.key === this.hotkeyForm.startHotKey) {
        this.isRecording = true;
        this.startRecognition();
        e.preventDefault();
      } else if (e.key === this.hotkeyForm.stopHotKey) {
        this.isRecording = false;
        this.stopRecognition();
        e.preventDefault();
      }
      this.$forceUpdate();
    },

    showSetKey(formKey) {
      window.removeEventListener('keydown', this.keydownHandler);
      window.addEventListener('keydown', this.setKey);
      this.formKey = formKey;
      this.hotkeyForm[formKey] = '';
    },

    setKey(event) {
      let { key } = event;
      if (event.ctrlKey) key = `Ctrl+${key}`;
      if (event.shiftKey) key = `Shift+${key}`;
      if (event.altKey) key = `Alt+${key}`;
      if (event.metaKey) key = `Command+${key}`;
      this.hotkeyForm[this.formKey] = event.key;
      window.removeEventListener('keydown', this.setKey);
      window.addEventListener('keydown', this.keydownHandler);
    },

    setDefaultHotkey() {
      this.hotkeyForm.startHotKey = 'F11';
      this.hotkeyForm.stopHotKey = 'F12';
    },

    validateKey() {
      if (this.hotkeyForm.startHotKey === this.hotkeyForm.stopHotKey) {
        this.$message({
          type: 'error',
          message: '开始和结束录制的快捷键不能相同',
        });
      } else {
        this.showHotkeySetting = false;
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
        alert(`语音识别错误: ${event.error}`);
      };
    },

    startRecognition() {
      console.log('sta');
      this.recognition.start();
      this.showIcon = true;
    },

    stopRecognition() {
      console.log('stp');
      this.showIcon = false;
      this.recognition.stop();
      this.copy();
    },

  },
};
</script>

<style scoped>
</style>
