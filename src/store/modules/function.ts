// In your Pinia store file (functionStore.ts)
import { defineStore } from "pinia";
const fs = require('fs')

const functionStore = defineStore('function', {
    state: (): { visible:any, currentCodes:string[][],currentFilePath:string} => {
        return {
            visible: {
                openWeb: false,
                another_property: false,
                // Initialize other properties as needed
            },
            currentCodes:[
                ["from selenium import webdriver",
                "from selenium.webdriver.chrome.options import Options",
                "chrome_options = Options()",
                'chrome_options.add_experimental_option("detach", True)']
            ],
            currentFilePath:''
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
        addToCurrentCodes(codes:string[]) {
            const codeItem = []
            for(const code in codes){
                codeItem.push(code)
            }
            this.currentCodes.push(codeItem)
        },
        setCurrentFilePath(path:string) {
            this.currentFilePath=path
        },
        writeToCurrentFile() {
            fs.writeFileSync(this.currentFilePath, this.currentCodes.join('\n'), 'utf-8');
        }
    },
});

export default functionStore