<template>
    <div class="container">
        <div class="history" v-for="item in historyList" :key="item.ansTime">
            <div class="left">
                <img :src="headimgurl" alt="touxiang">
            </div>
            <div class="right">
                <li> <span class="hisTitle">答题时间：&nbsp; </span>{{item.ansTime}}</li>
                <li> <span class="hisTitle">已答题目：</span> {{item.qId}}</li>
                <li>
                    <span class="hisTitle li-answer">所选答案：</span>
                    <div class="answers">
                        <p v-for="(answer, index) in item.ans" :key="index" > {{answer}} </p>
                    </div>
                </li>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import common from '../common/common.js'

    export default {
        props:{
            headimgurl: {
                type: String,
                // required: true
            }
        },
        data(){
            return{
                openId: '',
                historyList: []
            }
        },
        created(){
            common.bus.$emit('history', true)
        },
        mounted(){
            this.openId = this.$route.params.openId
            this.requestHistory()
        },
        beforeDestroy(){
            common.bus.$emit('history', false)
        },
        methods:{
            requestHistory(){
                let url = common.baseUrl+'/user_history'
                axios.get(url, {
                    params: {
                        openId: this.openId
                    }
                }).then((res) => {
                    // console.log( res.data.history )
                    if(res.data.status === 1500){
                        console.log(res.data.message)
                    }
                    this.historyList = res.data.history
                }).catch((err) => {
                    console.log(err)
                })
            }
        }
    }
</script>

<style lang="less" scoped>
.container{
    width: 100%;
    height: 1136px;
    background: rgb(15, 96, 81);
    overflow: hidden;
    .history{
        width: 100%;
        box-sizing: border-box;
        padding: 42px 42px;
        background: rgb(12, 80, 67);
        font-size: 28px;
        font-weight: bold;
        text-align: center;
        margin-top: 10px;
        overflow: hidden;
        .left{
            width: 118px;
            height: 118px;
            background: rgb(15, 96, 81);
            float: left;
            img{
                width: 100%;
                height: 100%;
                overflow: hidden;
            }
        }
        .right{
            float: left;
        }
        li{
            list-style: none;
            text-align: left;
            color: #eee;
            .hisTitle{
                display: inline-block;
                margin-left: 50px;
                color: #999;
            }
            .answers{
                margin-left: 9px;
                p{
                    margin: 0;
                }
            }
            .li-answer, .answers{
                float: left;
            }
        }
    }
}

</style>
