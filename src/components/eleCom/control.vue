<template>

    <div class="container">
        <AlertView :arg="arg" @stateChange="handleStateChange" />

        <div class="controlTitle">
            请输入标题
        </div>
        <div class="input-container">
            <input class="input" type="text" v-model="queTitle">
        </div>
        <div class="controlTitle">
            <span v-if="showInput">
                请输入第{{index+1}}组问题
            </span>
            <span v-else>
                数据已填充完毕，请提交
            </span>
        </div>
        <div class="input-block" v-if="showInput" >
            <div class="input-container">
                <input class="input" type="text" v-model="currentQues.first">
            </div>
            <div class="input-container">
                <input class="input" type="text" v-model="currentQues.second">
            </div>
            <div class="input-container">
                <input class="input" type="text" v-model="currentQues.third">
            </div>
            <div class="input-container">
                <input class="input" type="text" v-model="currentQues.fouth">
            </div>
        </div>
        
        <div class="contents" v-else >
            <div class="blocks" v-for="(block, index) in quesList" :key="index">
                <div class="controlTitle">
                    第{{index+1}}组
                </div>
                <div>
                    <p class="block" v-for="(item, number) in block" :key="number" @click="handleItemEdit(index,number)" >
                        <span>
                            {{number+1}}、 
                        </span>
                        {{ item}}
                    </p>
                </div>
            </div>
        </div>
        
        
        <Button class="promptButtonPrimary" type="primary" @click="handleClick">
            {{buttonContent}}
        </Button>

        <!-- <div>
            {{currentQues}}
        </div> -->
        <div class="prompt" v-if="prompt">
            <div class="controlTitle">
                请输入需要修改的内容
            </div>
            <div class="input-container">
                <input class="input" type="text" v-model="editInputValue">
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

    import { Button, MessageBox } from 'mint-ui' 
    import axios from 'axios'
    import common from '../common/common.js'
    import AlertView from '../common/alertView.vue'


    export default {
        data(){
            return{
                index : 0,
                currentQues: {
                    first: '',
                    second: '',
                    third: '',
                    fouth: '',
                },
                quesList: [],
                queTitle: "",
                showInput: true,
                //编辑弹窗显示按钮
                prompt: false,
                editPosition: {
                    index: -1,
                    number: -1
                },
                editInputValue: "",
                //alertview 是否显示和显示内容
                arg: {
                    alertFlag: false,
                    alertcontent: ''
                }
                
            }
        },
        methods:{
            handleClick(){
                if(this.yanzheng){
                    if(this.index < 3){

                        this.quesList.push(this.currentQuesArr)
                        this.index ++
                        if(this.index === 3){
                            this.showInput = false
                            return true
                        }
                        this.cleanUp()
                    }else{
                        if(this.queTitle !== ""){
                            //这里向后端发送请求,参数包括：
                            /**
                             * {
                             *      queTitle: this.queTitle
                             *      quesList: this.quesList
                             * }
                             */
                            let url = common.baseUrl+'/set_queslist'
                            axios.get(url, {
                                params:{
                                    queTitle: this.queTitle,
                                    quesList: this.quesList
                                }
                            }).then((res) => {
                                this.formateArguments({
                                    alertFlag: true,
                                    alertcontent: res.data.message
                                })
                            }).catch((error) => {
                                console.log(error)
                            })
                        }else{
                            this.formateArguments({
                                alertFlag: true,
                                alertcontent: '标题不能为空'
                            })
                        }
                        
                    }

                }else{
                    this.formateArguments({
                        alertFlag: true,
                        alertcontent: '问题不能为空'
                    })
                }
            },
            cleanUp(){
                Object.keys(this.currentQues).map((key) => {
                    this.currentQues[key] = ""
                })
            },
            handleItemEdit(index,number){
                this.editPosition.index = index
                this.editPosition.number = number
                this.prompt = true
            },
            handleConfirm(){
                let {index, number} = this.editPosition;
                if(index !== -1 && number !== -1){
                    if(this.editInputValue !== ""){
                        this.quesList[index][number] = this.editInputValue
                    }else{
                        this.formateArguments({
                            alertFlag: true,
                            alertcontent: "您未输入任何内容，请重新编辑"
                        })
                        return false
                    }
                    //清空编辑输入框
                    this.editInputValue = ""
                    //重置编辑位置
                    this.editPosition.index = -1
                    this.editPosition.number = -1
                    this.prompt = false
                }else{
                    this.formateArguments({
                        alertFlag: true,
                        alertcontent: "请确认要编辑的位置"
                    })
                }
            },
            handleCancel(){
                this.prompt = false
            },
            formateArguments(obj){
                this.arg = Object.assign(this.arg, obj)
            },
            handleStateChange(state){
                this.arg.alertFlag = state
            }
            
            
        },
        computed:{
            buttonContent(){
                if(this.index < 2){
                    return '下一组'
                }else{
                    return '提交'
                }
            },
            currentQuesArr(){
                return Object.keys(this.currentQues).map((key) => {
                    return this.currentQues[key]
                })
            },
            yanzheng(){
                var status = true
                Object.keys(this.currentQues).map((key) => {
                    if(this.currentQues[key] === ""){
                        status = false
                        return 
                    }
                })
                return status
            }
        },
        components: {
            Button,
            MessageBox,
            AlertView
        },
        mounted(){
            
        }
    }
</script>

<style lang="less" scoped>
    .container{
        min-height: 1160px;
        background: #0d4d41;
        padding-top: 80px;
        padding-bottom: 50px;
        .input-block{
            margin-bottom: 35px;
        }
        .input-container{
            margin-bottom: 10px;
            box-sizing: border-box;
            text-align: center;
            padding: 10px 0;
            .input{
                width: 600px;
                height: 70px;
                font-size: 35px;
                font-weight: bold;
                color: #0d4d41;
                text-align: center;
            }
        }
        .controlTitle{
            color: white;
            font-weight: bolder;
        }
        .contents{
            margin-bottom: 35px;
            padding-top: 35px;
            
            .blocks{
                background: rgb(12, 80, 67);
                // background: orange;
                overflow: hidden;
                padding: 5px 0 15px 0;
                margin-bottom: 10px;
                box-sizing: border-box;
                .block{
                    text-align: left;
                    font-size: 30px;
                    font-weight: bold;
                    color: #fff;
                    // background: yellow;
                    margin: 10px 0 0 0;
                    box-sizing: border-box;
                    padding: 0 35px 0 35px;
                }
            }
        }
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
        .promptButtonPrimary{
            width: 150px;
            height: 60px;
            font-size: 30px;
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
    .mint-button--primary{
        width: 150px;
        height: 90px;
        font-weight: bold;
        font-size: 50px;
    }

</style>
