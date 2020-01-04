<template>
  <g>
    <g :transform="'translate(0,' + (translate - glyphHeight) + ')'">
      <path :d="path1" :fill="color" />
    </g>

    <g :transform="'translate(0,' + translate + ')'">
      <path :d="path2" :fill="color" />
    </g>

    <g :transform="'translate(0,' + (translate + glyphHeight) + ')'">
      <path :d="path3" :fill="color" />
    </g>
  </g>
</template>

<script>
import glyphs from "./digitGlyphs.json";

export default {
  props: {
    value: {
      type: Number,
      required: true
    },
    color: {
      type: [String, Number],
      default: "#000000"
    }
  },

  computed: {
    prepared() {
      const d = this.value % 10;
      return d < 0 ? d + 10 : d;
    },

    integer() {
      return Math.round(this.prepared) % 10;
    },

    fractal() {
      return this.prepared % 1;
    },

    translate() {
      return (
        -this.fractal * this.glyphHeight +
        (this.fractal < 0.5 ? 0 : this.glyphHeight)
      );
    },

    path1() {
      //above
      const d = this.integer - 1 >= 0 ? this.integer - 1 : 9;
      return glyphs[d.toString()];
    },

    path2() {
      // central
      return glyphs[this.integer.toString()];
    },

    path3() {
      //below
      const d = this.integer + 1 <= 9 ? this.integer + 1 : 0;
      return glyphs[d.toString()];
    }
  },

  data() {
    return {
      glyphHeight: 22
    };
  }
};
</script>
