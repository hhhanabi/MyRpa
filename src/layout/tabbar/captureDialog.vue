<template>
    <el-dialog v-model="dialogVisible" title="Tips" width="70%">
        <span>网址</span>
        <el-input v-model="url"></el-input>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="dialogVisible = false; capture()">
                    确定
                </el-button>
            </span>
        </template>
        <iframe :src="url" style="width: 100%; height: 400px;" ref="iframeRef" @load="handleLoad"></iframe>
    </el-dialog>
</template>
  
<script lang="ts" setup>

import { ref } from 'vue'
const iframeRef = ref<HTMLIFrameElement | null>(null)
const url = ref<string>()
const dialogVisible = ref(false)

const switchVisible = () => {
    dialogVisible.value = !dialogVisible.value
}
const capture = () => {

}
const handleLoad = () => {
    if (iframeRef.value) {
        const iframeDoc = iframeRef.value.contentWindow?.document
        if (iframeDoc) {
            const script = iframeDoc.createElement('script')
            script.textContent = `var styleEl = document.createElement('style');
styleEl.type='text/css';
styleEl.appendChild(document.createTextNode('.myFocus {box-shadow: inset 0 0 0 1px #f00}'));

document.head.appendChild(styleEl);

var lastEl = null;
document.addEventListener('mouseover', (event) => {
    if (event.target !== lastEl) {
        lastEl && (lastEl.classList.remove('myFocus'));
        event.target.classList.add('myFocus');
        lastEl = event.target;
    }
});

document.addEventListener('click', (event) => {
    var selector = getSelector(event.target);
    console.log(selector);
});

function getSelector(element) {
    if (!element) return null;
    var path = [];
    while (element.parentNode) {
        var part = element.nodeName;
        if (element.id) {
            part += '#' + element.id;
            path.unshift(part);
            break;
        } else {
            var siblings = element.parentNode.children;
            if (siblings.length > 1) {
                var index = Array.prototype.indexOf.call(siblings, element);
                part += ':nth-child(' + (index + 1) + ')';
            }
        }
        path.unshift(part);
        element = element.parentNode;
    }
    return path.join(' > ');
}
`
            iframeDoc.body.appendChild(script)
        }
    }
}
defineExpose({ switchVisible })
</script>

<style scoped>
.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>
  