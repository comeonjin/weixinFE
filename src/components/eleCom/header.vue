<template>
    <div class="header-container">

        <div class="nickname" v-if="!isHistory">
            <span class="point"></span>
            <span>{{nickname}}</span>
        </div>
        <span class="historyTitle" v-if="isHistory">历史竞猜</span>
        <div class="history" @click="handleHistoryClick" v-if="!isHistory">
            <span class="point"></span>
            <span>我的竞猜</span>
        </div>
        <div class="goback" @click="handleGoback" v-else>
            <span>&lt; 返回</span>
        </div>

    </div>
</template>

<script>
    import common from '../common/common.js'
    export default {
        props: {
            nickname:{
                type: String,
                required: true
            },
            isHistory:{
                type: Boolean,
                required: true
            },
            openId:{
                type: String,
                required: true
            }
        },
        data(){
            return{

            }
        },
        mounted(){
            // common.bus.$on('alertView', (type) => {
            //     this.alertViewShow(type)
            // })
        },
        methods: {
            handleHistoryClick(){
                this.$emit('rightClick', true)
                this.$router.push('/history/'+this.openId)
            },
            handleGoback(){
                this.$router.go(-1)
                this.$emit('rightClick', false)
            }
            // alertViewShow(type){
            //     switch(type){
            //         case 0:
            //             this.alertContent = '答题成功！'
            //             this.alertShow = true
            //             break;
            //         case 1:
            //             this.alertContent = '请选择答案后提交。'
            //             this.alertShow = true
            //             break;
            //         case 2:
            //             this.alertContent = '您已经提交过该题答案。'
            //             this.alertShow = true
            //             break;
            //     }
            //     setTimeout(() => {
            //         this.alertShow = false
            //     }, this.timeOut)
            // }

        }
    }
</script>

<style lang='less' scoped>
    .header-container{
        width: 750px;
        height: 90px;
        line-height: 90px;
        background-color: rgba(13, 77, 65, 1);
        font-size: 30px;
        color: white;
        margin: 0;
        padding: 0;
        position: relative;
        .historyTitle{
            font-size: 30px;
            font-weight: bold;
            color: rgb(226, 222, 148);
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        .alertView{
            position: fixed;
            width: 750px;
            height: 92px;
            background: yellowgreen;
            font-size: 22px;
            color: #fff;
            text-align: center;
            line-height: 92px;
        }
        .nickname{
            width: 290px;
            height: 90px;
            line-height: 95px;
            margin-left: 55px;
            float: left;
            text-align: left;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;

        }
        .history{
            height: 90px;
            line-height: 95px;
            margin-right: 40px;
            float: right;
            text-align: left;
        }
        .goback{
            width: 130px;
            height: 90px;
            line-height: 90px;
            margin-left: 35px;
            float: left;
            text-align: left;
        }
        .point{
            display: inline-block;
            width: 14px;
            height: 14px;
            background-color: rgba(15, 96, 81, 1);
            border-radius: 50% 50%;
            margin-right: 13px;
            position:relative;
            top: -5px;
        }
    }
</style>


