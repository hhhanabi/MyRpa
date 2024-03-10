// In your Pinia store file (functionStore.ts)
import { defineStore } from "pinia";


const functionStore = defineStore('function', {
    state: (): { visible:any, currentCodes:string[]} => {
        return {
            visible: {
                openWeb: false,
                another_property: false,
                // Initialize other properties as needed
            },
            currentCodes:[
                "from selenium import webdriver",
                "from selenium.webdriver.chrome.options import Options",
                "chrome_options = Options()",
                'chrome_options.add_experimental_option("detach", True)'
            ]
        };
    },
    actions: {
        // Method to toggle the visibility of a specific property
        disableVisibility(property: string) {
            this.visible[property] = false;
        },
        enableVisibility(property: string) {
            this.visible[property] = true;
        },

        // Method to set the visibility of a specific property to a given value
        setVisibility({ property, value }: { property: string; value: boolean }) {
            this.visible[property] = value;
        },
        getVisibility(property: string) {
            return this.visible[property];
        },
        addToCurrentCodes(codes:string[]){
            for(const code in codes){
                this.currentCodes.push(code);
            }
        }

    },
});

export default functionStore