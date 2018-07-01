<template>
    <div class="before-container">

        <div class="button-group">
            <div class="button-container" v-for="(item, index) in qList[answer.length]" :key="index">
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
</template>

<script>
    import axios from 'axios'
    import common from '../common/common.js'
    import { Button, MessageBox }  from 'mint-ui'


    export default {
        props:{
            nickname: {
                type: String,
                // required: true
            },
            openId: {
                type: String,
                // required: true
            },

        },
        data(){
            return {
                qList: [
                    [
                        '1、明显是一只法牛啊。',
                        '2、应该是一只柯基啦。',
                        '3、绝对是一只贵宾犬。',
                        '4、以上答案都不正确。'
                    ],
                    [
                        '1、明显是二只法牛啊。',
                        '2、应该是二只柯基啦。',
                        '3、绝对是二只贵宾犬。',
                        '4、以上答案都不正确。'
                    ],
                    [
                        '1、明显是三只法牛啊。',
                        '2、应该是三只柯基啦。',
                        '3、绝对是三只贵宾犬。',
                        '4、以上答案都不正确。'
                    ],  
                ],
                    
                qId: '谁是LULU?',
                answerIndex: null,
                answer: [],
                current: ''
            }
        },
        components: {
            Button,
            MessageBox
        },
        computed:{
            buttonContent(){
                if(this.answer.length < 2){
                    return '下一题'
                }else{
                    return '提交'
                }
            }
        },
        created(){
            console.log(this.nickname, this.openId)
            let url = common.baseUrl+'/queslist'
            axios.get(url).then((res) => {
                this.qId = res.data.quetitle
                this.qList = res.data.queslist.map((item) => {
                    return JSON.parse(item)
                })
                console.log(res.data.queslist)

            }).catch((err) => {
                console.log(err)
            })
        },
        mounted(){

        },
        methods: {
            handleClick(index, item){
                this.answerIndex = index
                this.current = item.split('、')[1]
            },
            toNext(){
                
                if(this.answerIndex === null){
                    MessageBox.alert('请选择答案后提交!')
                    return
                }

                if(this.answer.length < 2){
                    this.answer.push(this.current)
                    this.answerIndex = null
                    return
                }

                this.answer.push(this.current)
        
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
                    if(res.data.status === 0){
                        MessageBox.alert('您已经提交过答案').then(action => {
                            this.$router.push('/after')
                        });
                    }else{
                        MessageBox.alert(res.data.message).then(action => {
                            this.$router.push('/after')
                        });
                    }
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
        height: 1240px;
        overflow: hidden;
        //http://img3.imgtn.bdimg.com/it/u=3810581282,3898894895&fm=27&gp=0.jpg
        background: url('../../assets/beforebg.jpg') no-repeat center;
        background-size: 100% 100%;
        .button-group{
            padding-top: 496px;
            .button-container{
                margin-bottom: 15px;
                &:first-of-type{
                    margin-top: 32px;
                }
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
                margin-left: 30px;
                width: 50px;
                height: 36px;
                background: url('../../assets/right.png') no-repeat center;
                background-size: 100% 100%;
            }
        }
        .actived{
            border-bottom: 6px solid #fff;
        }
        .submit{
            padding: 0;
            text-align: center;
        }
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

