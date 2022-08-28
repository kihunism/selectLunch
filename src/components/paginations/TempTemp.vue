<template>
  <div>
    <div class="btnWrap">
        <button class="pnbtn" :disabled="pageNum === 0" @click="$emit('prev')">이전</button>
        <span class="pagenumber">{{ pageNum + 1 }} / {{ pageCount }}</span>
        <button class="pnbtn" :disabled="pageNum >= pageCount - 1" @click="$emit('next')">다음</button>
    </div>
  </div>
</template>

<script>
export default {
    name: 'TempTemp',
    props: {
        pageSize: Number,
        totalListLength: Number,
        pageCount: Number,
        pageNum: Number
    },
    data() {
        return {
            
        }
    },
}
</script>

<style>

</style>