<template>
  <div>
    <div>
        <NavbarPage />
    </div>
    <div id="history">
        history페이지
        {{ isHistoryModal }}
        {{ recommendFood }}
    </div>
  </div>
</template>

<script>
import NavbarPage from '../../components/commons/NavbarPage.vue';
export default {
    components: { 
        NavbarPage 
    },
    props: {
        isHistoryModal: Boolean,
        recommendFood: Object
    },
    data() {
        return {

        }
    }
}
</script>

<style>

</style>