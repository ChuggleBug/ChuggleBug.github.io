
const particleOptions = {
  // "background": {
  //   "color": "#000000"
  // },
  "fpsLimit": 60,
  "particles": {
    "number": {
      "value": 150,
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "square"
    },
    "opacity": {
      "value": { "min": 0, "max": 1 },
      "animation": {
        "enable": true,
        "speed": 0.5,
        "sync": false,
        "startValue": "random",
        "destroy": "none"
      }
    },
    "paint": {
      "fill": {
        "color": {
          "value": [
            "#FFFFFF",
            "#CFE8FF",
            "#DFEEF",
            "#FFF6D9",
            "#FFE9C7"
          ]
        },
        "enable": true
      },
    },
    "size": {
      "value": { "min": 2, "max": 6 }
    },
    "move": {
      "enable": true,
      // "speed": {"min": 0.001, "max": 0.1}
      "speed": { "min": 0.05, "max": 0.2 }
    },
    "links": {
      "enable": false
    }
  },
  "interactivity": {
    "events": {
      "onHover": {
        "enable": false
      },
      "onClick": {
        "enable": false
      }
    }
  },
  "detectRetina": true
};

export default particleOptions;