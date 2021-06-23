<template>
    <div class="form">
        <input type="text" placeholder="name" v-model="name">
        <input type="number" placeholder="listID" v-model="listID">
        <button @click='addTask'>add</button>
    </div>
</template>

<script>

export default {
    name: 'Form',

    data() {
        return {
            name: '',
            listID: ''
        }
    },

    methods: {
        addTask() {
            this.$emit('addTask', {
                name: this.name,
                listID: this.listID
            })
            this.name = ''
            this.listID = ''
        }
    }
    
}
</script>

<style>
 .form {
     display: flex;
 }
</style>
