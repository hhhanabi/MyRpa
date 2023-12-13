import { defineStore } from "pinia";

const useLayoutStore = defineStore('Layout', {
    state:()=>{
        return {
            isMenu:true
        }
    },
    actions:{
        changeMenu(){
            this.isMenu = !this.isMenu
        }
    }
})
export default useLayoutStore