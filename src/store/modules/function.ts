import { defineStore } from "pinia";

const functionStore = defineStore('function', {
    state:()=>{
        return {
            visible:{
                my_if:true,
            }
        }
    },
    actions:{

    }
})
export default functionStore