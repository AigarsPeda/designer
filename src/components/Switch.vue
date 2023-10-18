<template>
  <label class="switch">
    <input :checked="isChecked" @change="handleChecked" type="checkbox" />
    <div class="slider">
      <div class="circle">
        <svg
          class="cross"
          xml:space="preserve"
          style="enable-background: new 0 0 512 512"
          viewBox="0 0 365.696 365.696"
          y="0"
          x="0"
          height="6"
          width="6"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path
              data-original="#000000"
              fill="currentColor"
              d="M243.188 182.86 356.32 69.726c12.5-12.5 12.5-32.766 0-45.247L341.238 9.398c-12.504-12.503-32.77-12.503-45.25 0L182.86 122.528 69.727 9.374c-12.5-12.5-32.766-12.5-45.247 0L9.375 24.457c-12.5 12.504-12.5 32.77 0 45.25l113.152 113.152L9.398 295.99c-12.503 12.503-12.503 32.769 0 45.25L24.48 356.32c12.5 12.5 32.766 12.5 45.247 0l113.132-113.132L295.99 356.32c12.503 12.5 32.769 12.5 45.25 0l15.081-15.082c12.5-12.504 12.5-32.77 0-45.25zm0 0"
            ></path>
          </g>
        </svg>
        <svg
          class="checkmark"
          xml:space="preserve"
          style="enable-background: new 0 0 512 512"
          viewBox="0 0 24 24"
          y="0"
          x="0"
          height="10"
          width="10"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path
              class=""
              data-original="#000000"
              fill="currentColor"
              d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
            ></path>
          </g>
        </svg>
      </div>
    </div>
  </label>
</template>

<script setup lang="ts">
defineProps<{
  isChecked: boolean;
  handleChecked: () => void;
}>();
</script>

<style scoped>
.switch {
  /* switch */
  --switch-width: 46px;
  --switch-height: 24px;
  --switch-bg: rgb(131, 131, 131);
  --switch-checked-bg: rgb(0, 218, 80);
  --switch-transition: all 0.2s cubic-bezier(0.27, 0.2, 0.25, 1.51);
  --switch-offset: calc((var(--switch-height) - var(--circle-diameter)) / 2);

  /* circle */
  --circle-bg: #fff;
  --circle-diameter: 18px;
  --circle-transition: var(--switch-transition);
  --circle-shadow: 1px 1px 2px rgba(146, 146, 146, 0.45);
  --circle-checked-shadow: -1px 1px 2px rgba(163, 163, 163, 0.45);

  /* icon */
  --icon-cross-size: 6px;
  --icon-checkmark-size: 10px;
  --icon-cross-color: var(--switch-bg);
  --icon-checkmark-color: var(--switch-checked-bg);
  --icon-transition: all 0.2s cubic-bezier(0.27, 0.2, 0.25, 1.51);

  /* effect line */
  --effect-border-radius: 1px;
  --effect-bg: var(--circle-bg);
  --effect-transition: all 0.2s ease-in-out;
  --effect-width: calc(var(--circle-diameter) / 2);
  --effect-height: calc(var(--effect-width) / 2 - 1px);
}

.switch input {
  display: none;
}

.switch {
  display: inline-block;
}

.switch svg {
  height: auto;
  position: absolute;
  transition: var(--icon-transition);
  -o-transition: var(--icon-transition);
  -webkit-transition: var(--icon-transition);
}

.switch .checkmark {
  transform: scale(0);
  -ms-transform: scale(0);
  -webkit-transform: scale(0);
  width: var(--icon-checkmark-size);
  color: var(--icon-checkmark-color);
}

.switch .cross {
  width: var(--icon-cross-size);
  color: var(--icon-cross-color);
}

.slider {
  display: flex;
  cursor: pointer;
  position: relative;
  align-items: center;
  border-radius: 999px;
  display: -webkit-box;
  display: -ms-flexbox;
  box-sizing: border-box;
  -ms-flex-align: center;
  -webkit-box-align: center;
  width: var(--switch-width);
  height: var(--switch-height);
  background: var(--switch-bg);
  -webkit-box-sizing: border-box;
  transition: var(--switch-transition);
  -o-transition: var(--switch-transition);
  -webkit-transition: var(--switch-transition);
}

.circle {
  z-index: 1;
  display: flex;
  position: absolute;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  -ms-flex-pack: center;
  -ms-flex-align: center;
  border-radius: inherit;
  justify-content: center;
  -webkit-box-pack: center;
  -webkit-box-align: center;
  left: var(--switch-offset);
  background: var(--circle-bg);
  width: var(--circle-diameter);
  height: var(--circle-diameter);
  box-shadow: var(--circle-shadow);
  transition: var(--circle-transition);
  -o-transition: var(--circle-transition);
  -webkit-box-shadow: var(--circle-shadow);
  -webkit-transition: var(--circle-transition);
}

.slider::before {
  content: "";
  position: absolute;
  width: var(--effect-width);
  height: var(--effect-height);
  background: var(--effect-bg);
  transition: var(--effect-transition);
  -o-transition: var(--effect-transition);
  border-radius: var(--effect-border-radius);
  -webkit-transition: var(--effect-transition);
  left: calc(var(--switch-offset) + (var(--effect-width) / 2));
}

/* actions */

.switch input:checked + .slider {
  background: var(--switch-checked-bg);
}

.switch input:checked + .slider .checkmark {
  transform: scale(1);
  -ms-transform: scale(1);
  -webkit-transform: scale(1);
}

.switch input:checked + .slider .cross {
  transform: scale(0);
  -ms-transform: scale(0);
  -webkit-transform: scale(0);
}

.switch input:checked + .slider::before {
  left: calc(
    100% - var(--effect-width) - (var(--effect-width) / 2) -
      var(--switch-offset)
  );
}

.switch input:checked + .slider .circle {
  box-shadow: var(--circle-checked-shadow);
  -webkit-box-shadow: var(--circle-checked-shadow);
  left: calc(100% - var(--circle-diameter) - var(--switch-offset));
}
</style>
