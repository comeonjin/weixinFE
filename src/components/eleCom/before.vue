<template>
    <div class="before-container" :class="backgroundStyle">       
        <AlertView :arg="arg" @stateChange="handleStateChange" />
        <div class="mainbox">
            <div class="button-group">
                <div class="button-container" v-for="(item, index) in qList[answer.length < 3 ? answer.length : 2]" :key="index">
                    <Button @click="handleClick(index,item)" :class="{actived : index === answerIndex}" >
                        {{item}}
                        <span v-if="index === answerIndex"></span>
                    </Button>
                </div>
            </div>
            <Button class="submit" @click="toNext">
                {{buttonContent}}
            </Button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import common from '../common/common.js'
    import AlertView from '../common/alertView.vue'
    import { Button }  from 'mint-ui'

    export default {
        props:{
            nickname: {
                type: String,
                required: true
            },
            openId: {
                type: String,
                required: true
            },

        },
        data(){
            return {
                qList: [
                    ['1','2','3','4'],
                    ['1','2','3','4'],
                    ['1','2','3','4']
                ], 
                qId: '谁是LULU?',
                answerIndex: null,
                answer: [],
                current: '',
                //alertview 是否显示和显示内容
                arg: {
                    alertFlag: false,
                    alertcontent: ''
                }

            }
        },
        components: {
            AlertView,
            Button
        },
        computed:{
            buttonContent(){
                if(this.answer.length < 2){
                    return '下一题'
                }else{
                    return '提交'
                }
            },
            backgroundStyle(){
                if(this.answer.length < 3){
                    return 'before'+this.answer.length
                }else{
                    return 'before2'
                }
            }
        },
        created(){
            common.bus.$emit('history', false)
            this.getQuesList()
        },
        mounted(){
            console.log(this.nickname, this.openId)
            console.log()
            
        },
        methods: {
            handleClick(index, item){
                this.answerIndex = index
                this.current = item.split('、')[1]
            },
            toNext(){
                if(this.answerIndex === null){
                    this.formateArguments({
                        alertFlag: true,
                        alertcontent: '请选择答案后提交!'
                    })
                    return
                }

                if(this.answer.length < 2){
                    this.answer.push(this.current)
                    this.answerIndex = null
                    return
                }

                this.answer.push(this.current)

                if(this.nickname === '' || this.nickname === undefined || this.openId === '' || this.openId === undefined){
                    this.formateArguments({
                        alertFlag: true,
                        alertcontent: '页面正在加载请稍后再提交!',
                        callback: () => {
                            window.location.reload()
                        }
                    })
                    return
                }

                let url = common.baseUrl+'/user_answer'
                axios.get(url, {
                    params: {
                        qId: this.qId,
                        answer: this.answer,
                        openId: this.openId,
                        nickname: this.nickname
                    }
                }).then((res) => {
                    /**
                     * status: 1 提交成功（新用户登录创建用户）
                     * status: 0 已经提交过，提交不成功
                     * status: 2 提交成功（用户已经登录过，更新数据）
                     */
                    if(res.data.status === 1000){
                        this.formateArguments({
                            alertFlag: true,
                            alertcontent: res.data.message
                        })
                    }
                    if(res.data.status === 0){
                        this.formateArguments({
                            alertFlag: true,
                            alertcontent: '您已经提交过答案!',
                            callback: () => {
                                this.$router.push('/after')
                            }
                        })
                    }else{
                        this.formateArguments({
                            alertFlag: true,
                            alertcontent: res.data.message,
                            callback: () => {
                                this.$router.push('/after')
                            }
                        })
                    }
                }).catch((err) => {
                    console.log(err)
                })
            },
            formateArguments(obj){
                this.arg = Object.assign(this.arg, obj)
            },
            handleStateChange(state){
                this.arg.alertFlag = state
            },
            getQuesList(){
                let url = common.baseUrl+'/queslist'
                axios.get(url).then((res) => {
                    this.qId = res.data.quetitle
                    document.getElementsByTagName('title')[0].innerHTML = this.qId
                    this.qList = res.data.queslist.map((item) => {
                        return JSON.parse(item).map((que, index) => {
                            return (index+1) + '、' + que
                        })
                    })

                    console.log(res.data.queslist)

                }).catch((err) => {
                    console.log(err)
                })
            }
        }

    }
</script>

<style lang='less' scoped>
    .before-container{
        width : 750px;
        height: 1136px;
        overflow: hidden;
        //http://img3.imgtn.bdimg.com/it/u=3810581282,3898894895&fm=27&gp=0.jpg
        position: relative;
        .alertview{
            width: 500px;
            background: #fff;
            box-shadow: 5px 5px 15px #888888;
            z-index: 200;
            padding: 10px 0 0px;
            border-radius: 15px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            .title{
                height: 60px;
                line-height: 60px;
                font-size: 30px;
                font-weight: bold;
            }
            .content{
                box-sizing: border-box;
                padding: 20px 35px;
                font-size: 25px;
                border-bottom: 1px solid #ccc;
                color: #999;
            }
            .confirm{
                display: inline-block;
                width: 100%;
                height: 100%;
                padding: 0 25px;
                border: 0;
                border-radius: 0 0 15px 15px;
                font-size: 30px;
                color: #26a2ff;
                height: 80px;
            }
        }

        .mainbox{
            position: relative;
            top: 465px;
            .button-container{
                margin-bottom: 15px;
                &:first-of-type{
                    margin-top: 32px;
                }
            }

            button{
                width: 580px;
                height: 100px;
                background:rgba(255, 255, 255, .5);
                color: white;
                font-size: 35px;
                padding-left: 78px;
                text-align: left;
                transform: skewY(-5deg);
                box-sizing: border-box;
                span{
                    display: inline-block;
                    margin-left: 20px;
                    width: 50px;
                    height: 36px;
                    background: url('../../assets/right.png') no-repeat center;
                    background-size: 100% 100%;
                }
            }
            .actived{
                border-bottom: 6px solid #fff;
                background:rgba(200, 205, 205, .5);
            }
            .submit{
                padding: 0;
                text-align: center;
            }
        }
    }
    .before0{
        background: url('../../assets/beforebg0.jpg') no-repeat center;
        background-size: 100% 100%;
    }
    .before1{
        background: url('../../assets/beforebg1.jpg') no-repeat center;
        background-size: 100% 100%;
    }
    .before2{
        background: url('../../assets/beforebg2.jpg') no-repeat center;
        background-size: 100% 100%;
    }
</style>

<style>
    .mint-msgbox{
        font-size: 30px;
    }
    .mint-msgbox-header {
        height: 60px;
        line-height: 60px;
    }
    .mint-msgbox-title{
        font-size: 30px;
    }
    .mint-msgbox-content{
        height: 80px;
    }
    .mint-msgbox-message{
        line-height: 80px;
    }
    .mint-msgbox-btns{
        height: 80px;
        line-height: 80px;
    }
    .mint-msgbox-btn{
        font-size: 30px;
    }
</style>




