<template lang='pug'>
div
  Form
    FormItem(label="Ratio")
      InputNumber(v-model="ratio", :min="0")
    FormItem(label="Distance")
      InputNumber(v-model="dis", :min="0")
  br
  br
  span {{ points }}
  highcharts.chart(:options="chartOptions")

  v-stage(:config="configKonva")
    v-layer(ref="background")
      v-image(:config="{ image: background }")
    v-layer(ref="rulers")
      Ruler(
        v-for="(r, i) in rulers",
        :key="i",
        :x1="r.x1",
        :y1="r.y1",
        :x2="r.x2",
        :y2="r.y2",
        :distance="dis",
        :ratio="ratio",
        @update:result="r.distance = $event"
      )
</template>

<script>
import Ruler from "./Ruler.vue";
import { Chart as Highcharts } from "highcharts-vue";

export default {
  components: { Highcharts, Ruler },

  data() {
    const rulers = [];
    for (let index = 0; index < 10; index++) {
      rulers.push({
        x1: 20 + index * 67,
        y1: 20,
        x2: 20 + index * 67,
        y2: 460,
        distance: 0,
      });
    }
    return {
      ratio: 1,
      dis: 1,
      configKonva: {
        width: 640,
        height: 480,
      },
      backgroundURL: "https://cdn.infratec.eu/_processed_/9/f/csm_thermography-electrical-installations-loaded-clamping-point-2_43b0c5b978.jpg",
      background: null,
      rulers: rulers,
    };
  },

  computed: {
    points () {
      return this.rulers.map(i => i.distance);
    },
    chartOptions() {
      return {
        chart: {
          type: "areaspline",
        },
        title: {
          text: "Sand chart",
        },
        series: [
          {
            data: this.points,
            color: "#dcb356",
          },
        ],
      }
    },
  },

  mounted () {
    // load image
    const image = new window.Image();
    image.src = this.backgroundURL;
    image.onload = () => {
      // set image only when it is loaded
      this.background = image;
    };
  }
};
</script>
