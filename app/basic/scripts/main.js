var detector = new FaceDetector('detection');

var app = new Vue({
  el: '#app',
  data() {
    return {
      detector: detector,
      webcamStarted: false
    }
  },
  /* Method Definition  */
  methods: {
    // Load App method
    loadApp(app) {
      this.detector.loadApp(app);
    },

    continuousMethod(facedetector) {
      console.log(facedetector.app.detections);
    },

    callbackMethod(facedetector) {
      console.log('Example of what can be done');
    },

    // Method to start the webcam feed
    startWebcam() {
      const video = document.getElementById('detection');
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          video.srcObject = stream;
          this.webcamStarted = true; // Update the status
        })
        .catch(err => {
          console.error('Error accessing webcam:', err);
        });
    },

    // Method to stop the webcam feed
    stopWebcam() {
      const video = document.getElementById('detection');
      const stream = video.srcObject;
      const tracks = stream.getTracks();

      tracks.forEach(track => {
        track.stop();
      });

      video.srcObject = null;
      this.webcamStarted = false; // Update the status
    }
  },

  /* upon object load, the following will be executed */
  mounted() {
    // Load general detection
    this.loadApp();

    // Load full detection
    this.loadApp({
      name: 'Full Detection',
      method: this.detector.draw,
      options: {
        welcome: "Detect faces, genders, ages and expressions",
        detection: true,
        landmarks: true,
        gender: true,
        expression: true,
        age: true
      }
    });

    // Load Model Recognition 
    this.loadApp({
      name: 'Recognize',
      method: this.detector.recognize,
      models: {
        labels: ['Flash'],
        sampleSize: 6
      },
      options: {
        welcome: "Flash will be recognized if he is present",
        recognition: true
      },
      algorithm: faceapi.SsdMobilenetv1Options
    });

    // Load puppeteer mode
    this.loadApp({
      name: "Puppeteer",
      method: this.detector.draw,
      options: {
        welcome: "Line Drawing",
        detection: false,
        puppeteer: true
      }

    });

    this.loadApp({
      name: "Custom continuous",
      method: this.continuousMethod,
      custom: false,
      options: {
        welcome: "Open the console to see how it is continuously being called at every detection",
        detection: true
      }

    });

    this.loadApp({
      name: "Custom callback",
      method: this.callbackMethod,
      custom: true,
      options: {
        welcome: "Open the console to see how it is executing its content and waiting for more to be done",
        detection: true
      }

    });
  }

});
