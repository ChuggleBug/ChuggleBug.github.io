
import { isMobile } from 'react-device-detect'

export type ParticleOptions = any;

export const defaultParticleOptions = {
  "fpsLimit": isMobile ? 30 : 60,
  "detectRetina": !isMobile,
  "particles": {
    "number": {
      "value": isMobile ? 250 : 500,
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
};


export default defaultParticleOptions;