<template>
    <div class="container">
        <slot name="button">button will show here!</slot>
        <keep-alive>
            <slot name="component">component will show here!</slot>
        </keep-alive>
    </div>
</template>

<script>


export default {
    // props:{
    //     /**@augments
    //      * coms tab组件数据
    //      */
    //     coms:{
    //         type: Array,
    //         required: true
    //     }
    // },
    name: "Nav",
    data() {
        return {
            test: 'this is a typescript project now',
            // currentComponentId: this.coms[0].name,

        };
    },
    computed:{
        relTest(){
            return this.test+"rel"
        },
        // initComponentId(){
        //     return this.coms.length !== 0 ? this.coms[0].name : ''
        // },
        // comps(){
        //     let compsArr = []
        //     this.coms.map((item) => {
        //         let tempObj = {}
        //         tempObj[item.name] = item.component
        //         compsArr.push(tempObj)
        //     })
        //     return compsArr
        // }
    },
    watch:{
        relTest(newVal,oldVal){
            console.log(newVal)
            console.log(oldVal)
        }
    },
    filters:{

    },
    methods:{
        componentChange(componentId){
            this.currentComponentId = this.comFormate(componentId)
        },
        comFormate(com){
            return com.charAt(0).toUpperCase() + com.slice(1,)
        }
    },
    components:{

    },
    mounted(){

        console.log({name: "jin"})
    }


};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
