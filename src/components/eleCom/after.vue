<template>
    <div class="after-container">
        <img src="../../assets/afterbg.jpg" alt="">
    </div>
</template>

<script>
    import axios from 'axios'
    import common from "../common/common.js"
    export default{
        data(){
            return {
            }
        },
        created(){
            common.bus.$emit('history', false)
        }
    }
</script>

<style lang="less" scoped>
    .after-container{
        width: 100%;
        height: 1136px;
        background: #fff;
        background-size: 100% 100%;
        img{
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
        }
    }
</style>

