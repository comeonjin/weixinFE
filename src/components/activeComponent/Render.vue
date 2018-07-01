<script>
    // import First from './activeComponent/First.vue'
    export default {
        props:{
            propComponents: {
                type: Array,
                required: true
            }
        },
        data(){
            return {
                currentComponentIndex: 0,
                buttonList: [],
                componentList: []
            }
        },
        computed:{
            initComponent(){
                return this.propComponents[0].name
            },
            currentComponent(){
                return this.propComponents[this.currentComponentIndex].name
            },
            componentArray(){
                let array = []
                this.propComponents.map((item) => {
                    array.push(item.component)
                })
                return array
            }
        },
        methods:{
            initButtonList(){
                this.buttonList = this._l(this.propComponents, (item, itemIndex) => {
                    return <button on-click={() => this.handleButtonClick(itemIndex)}>{item.name}</button>
                })
            },
            initComponentList(){
                this.componentList = this._l(this.propComponents, (item, itemIndex) => {
                    return Vue.component(this.formatName(item.name), item.component)
                })
            },
            handleButtonClick(index){
                console.log(index)
                this.currentComponentIndex = index
            },
            formatName(name){
                // return name.charAt(0).toUpperCase() + name.slice(1)
                return 'Abc'+name
            }
        },
        components: {
            // [this.initComponent]: this.componentArray[0].component
        },
        beforeCreate(){
            debugger
        },
        mounted(){
            this.initButtonList()

        },
        render(){
            return(
                <div class="renderContainer">
                    {this.buttonList}
                </div>
            )
        }
    }
</script>
