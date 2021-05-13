<template lang='pug'>
v-group(ref="group")
  v-line(:config="lineConfig")
  v-circle(:config="circle1Config", @dragmove="onMove1", @mouseenter="onEnter(1, $event)", @mouseleave="onLeave(1, $event)")
  v-circle(:config="circle2Config" @dragmove="onMove2", @mouseenter="onEnter(2, $event)", @mouseleave="onLeave(2, $event)")
  v-text(:config="textConfig")
</template>

<script>
export default {
  props: {
    // initial values
    x1: Number,
    y1: Number,
    x2: Number,
    y2: Number,

    ratio: Number,
    distance: Number,
  },
  data () {
    return {
      x1Local: this.x1,
      y1Local: this.y1,
      x2Local: this.x2,
      y2Local: this.y2,
      hover: null
    }
  },
  computed: {
    localDistance() {
      let xDiff = this.x1Local - this.x2Local;
      let yDiff = this.y1Local - this.y2Local;
      let result = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
      return result;
    },
    result() {
      return (this.localDistance * this.distance) / this.ratio;
    },
    text() {
      return this.result.toFixed() + " CM";
    },
    lineConfig() {
      return {
        points: [this.x1Local, this.y1Local, this.x2Local, this.y2Local],
        stroke: "#fff",
        strokeWidth: 4,
      };
    },
    circle1Config() {
      return {
        x: this.x1Local,
        y: this.y1Local,
        fill: "#fff",
        radius: 6,
        draggable: true,
        dragBoundFunc: function (pos) {
          return {
            x: this.absolutePosition().x,
            y: pos.y,
          };
        },
      };
    },
    circle2Config() {
      return {
        x: this.x2Local,
        y: this.y2Local,
        fill: "#fff",
        radius: 6,
        draggable: true,
        dragBoundFunc: function (pos) {
          return {
            x: this.absolutePosition().x,
            y: pos.y,
          };
        },
      };
    },
    textConfig() {
      const width = 50;
      return {
        x: this.x1Local + (this.x2Local - this.x1Local) / 2 - width / 2,
        y: this.y1Local + (this.y2Local - this.y1Local) / 2,
        fontFamily: "Calibri",
        fontSize: 12,
        fill: "#fff",
        align: "center",
        width: width,
        text: this.text,
      };
    },
  },
  watch: {
    result: {
      immediate: true,
      handler (v) {
        this.$emit('update:result', v)
      }
    }
  },
  methods: {
    onMove1(event) {
      this.x1Local = event.target.attrs.x
      this.y1Local = event.target.attrs.y
    },
    onMove2(event) {
      this.x2Local = event.target.attrs.x
      this.y2Local = event.target.attrs.y
    },
    onEnter(circle) {
      this.$refs.group.getNode().getStage().container().style.cursor = 'move';
      this.hover = circle
    },
    onLeave(circle) {
      if (circle === this.hover) {
        this.$refs.group.getNode().getStage().container().style.cursor = 'default';
        this.hover = null
      }
    }
  },
};
</script>