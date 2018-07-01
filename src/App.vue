<template>
    <div id="app">
        <AlertView :arg="arg" @stateChange="handleStateChange" />
        <Header :nickname="nickname" :openId="openId"  :isHistory="isHistory" @rightClick="handRightClick"></Header>
        <router-view :nickname="nickname" :openId="openId" :headimgurl="headimgurl" class="animated"/>
        <div class="prompt" v-if="prompt">
            <div class="controlTitle">
                请问是否现在去设置标题和题目？
            </div>
            <Button class="promptButton" type="danger" @click="handleConfirm">
                确认
            </Button>
            <Button class="promptButton" type="default" @click="handleCancel">
                取消
            </Button>
        </div>
    </div>
</template>

<script>
import Header from './components/eleCom/header'
import axios from 'axios'
import common from './components/common/common.js'
import AlertView from './components/common/alertView.vue'
import { Button } from 'mint-ui' 


export default {
    name: 'App',
     data(){
            return {
                code: '',
                nickname: '',
                openId: '',
                headimgurl: '',
                isHistory: false,
                show: false,
                arg: {
                    alertFlag: false,
                    alertcontent: ''
                },
                //编辑弹窗显示按钮
                prompt: true,
            }
        },
        components: {
           Header,
           AlertView,
           Button
        },
        created(){
            this.onBusHistroy()
        },
        mounted(){
            this.code = this.$route.query.code
            axios.get(common.baseUrl+'/request', {
                params:{
                    code: this.code
                }
            }).then((res) => {
                if(res.data.errcode || res.data.status === 2000){
                    this.formateArguments({
                        alertFlag: true,
                        alertcontent: '页面授权已过期，请重新进入',
                        callback: () => {
                            window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd55316e683616eda&redirect_uri=http://www.dadiandesign.com/activity&response_type=code&scope=snsapi_userinfo&state=state123#wechat_redirect'
                        }
                    })
                    return
                }

                //拿到用户的昵称和openId
                this.nickname = res.data.nickname
                this.openId = res.data.openid
                if(this.openId === 'ogwi20fMDnqfdocFdYwjbI5wW2Fc'){
                    this.prompt = true
                }
                if(res.data.openid === 'ogwi20c-PvX-LvcCq9JlM2F1Cc9Y'){
                    this.prompt = true                    
                }
                this.headimgurl = res.data.headimgurl
            }).catch((err) => {
                console.log(err)
            })

        },
        methods: {
            handRightClick(flag){
                this.isHistory = flag
            },
            onBusHistroy(){
                common.bus.$on('history', (value) => {
                    this.isHistory = value
                })
            },
            formateArguments(obj){
                this.arg = Object.assign(this.arg, obj)
            },
            handleStateChange(state){
                this.arg.alertFlag = state
            },
            handleConfirm(){
                this.prompt = false
                this.$router.push('/control')
            },
            handleCancel(){
                this.prompt = false
            }
        }

}
</script>

<style lang="less">
html,body{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    position: relative;
    .prompt{
        background: lightblue;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 80%;
        padding: 30px 0;
        .controlTitle{
            font-size: 30px;
            margin-bottom: 30px;
            font-weight: bold;
        }
        .promptButton{
            width: 100px;
            height: 55px;
            font-size: 30px;
        }
        .input-container{
            margin-bottom: 20px;
            box-sizing: border-box;
            text-align: center;
            padding: 10px 0;
            .input{
                width: 80%;
                height: 50px;
                font-size: 25px;
                font-weight: bold;
                color: #0d4d41;
                text-align: center;
            }
        }
    }
}

</style>


