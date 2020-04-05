<template>
  <div class="section section--full section--404">
    <span>¯\(°_o)/¯</span>
    <h1>404</h1>
    <h2>Táto stránka neexistuje.</h2>
  </div>
</template>

<style lang="scss" scoped>
.section--404 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  span {
    margin-bottom: 0.7em;
    @include font-size(110, 110);
    // color: $color-primary-3;
  }

  h1 {
    margin-bottom: 0.1em;
    @include font-size(60, 60);
    color: $color-primary-3;
  }

  h2 {
    @include font-size(30, 48);
  }
}
</style>