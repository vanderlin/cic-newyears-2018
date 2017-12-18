<template>
    <section class="hero is-fullheight">
        <canvas ref="canvas"></canvas>
        <div class="hero-body">
            <div class="container">
                <img src="./assets/cic-new-year.png" alt="">
            </div>
        </div>
    </section> 
</template>

<script>
import Snow from './snow'
var snowMaker;
export default {
    name: 'App',
    props: {},
    data() {
        return {
        }
    },
    components: {
    },
    methods: {
        createSnowStorm() {
            if(!this.$refs.canvas) return
            if(snowMaker) {
                snowMaker.destroy();
            }
            snowMaker = new Snow(this.$refs.canvas);
            snowMaker.init();
        }
    },
    computed: {
    },
    watch: {
    },
    created() {
        console.log('app created');
        this.createSnowStorm();
    },
    mounted() {
        this.createSnowStorm();
    }
}
</script>

<style lang="scss">
@import '~bulma';
.hero-body {
    padding: 0; 
}
canvas {
    z-index: 100000;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
}
</style>