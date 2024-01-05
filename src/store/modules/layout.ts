import { defineStore } from "pinia";

const useLayoutStore = defineStore('Layout', {
    state:()=>{
        return {
            isMenu:false
        }
    },
    actions:{
        changeMenu(){
            this.isMenu = !this.isMenu
        }
    }
})
export default useLayoutStore