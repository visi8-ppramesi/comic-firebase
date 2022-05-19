<template>
    <div>{{ test }}</div>
    <button @click="print">test</button>
</template>

<script>
export default {
    data(){
        return {
            test: '',
            consoleOpen: false
        }
    },
    methods: {
        print(){
            console.log('test')
        },
    },
    created() {
        let self = this
        function measure() {
            if(!self.consoleOpen){
                const start = performance.now();
                debugger;// eslint-disable-line no-debugger
                const time = performance.now() - start;
                if (time > 100) {
                    alert('Please close the console and refresh the page to read the comic!')
                    self.test = 'no'
                    self.consoleOpen = true
                }
            }
        }
        measure();
        setInterval(measure, 1000);

        if(!this.consoleOpen){
            this.test = 'yeah'
        }
    },
}
</script>