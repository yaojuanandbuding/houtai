<template>
  <div>
    <div class="card-header">
        <span>{{title}}</span>
        <svg t="1659453490228" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3005" width="16" height="16"><path d="M512 958.016C266.08 958.016 65.984 757.952 65.984 512 65.984 266.08 266.08 65.984 512 65.984c245.952 0 446.016 200.064 446.016 446.016 0 245.952-200.064 446.016-446.016 446.016z m0-828.032c-210.656 0-382.016 171.36-382.016 382.016 0 210.624 171.36 382.016 382.016 382.016 210.624 0 382.016-171.36 382.016-382.016S722.624 129.984 512 129.984z" p-id="3006" fill="#d81e06"></path><path d="M464 304a1.5 1.5 0 1 0 96 0 1.5 1.5 0 1 0-96 0zM512 768c-17.664 0-32-14.304-32-32V448c0-17.664 14.336-32 32-32s32 14.336 32 32v288c0 17.696-14.336 32-32 32z" p-id="3007" fill="#d81e06"></path></svg>
    </div>
    <div class="card-content">{{count}}</div>
    <div class="card-charts">
        <slot name="charts"></slot>
    </div>
    <div class="card-footer">
        <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
name:'',
props:['title','count']
}
</script>

<style scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    color:#d9d9d9;
    font-size: 16px;
}
.card-content {
    font-size: 30px;
    padding: 10px 0;
}
.card-charts {
    height: 50px;
}
.card-footer {
    border-top: 1px solid #eee;
    padding-top: 10px;
}
</style>