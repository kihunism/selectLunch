<template>
  <div>
    <div class="listWrap">
      <table class="tablelist">
          <colgroup>
              <col width="12%" />
              <col width="*" />
              <col width="20%" />
              <col width="12%" />
              <col width="15%" />
          </colgroup>

          <tr class="thead">
              <th>카테고리</th>
              <th>음식</th>
              <th>가게</th>
              <th>작성자</th>
              <th>작성일</th>
          </tr>

          <tr class="tdbody" v-for="(i, idx) in foodList" :key="idx">
              <td>{{ i.category }}</td>
              <td>{{ i.title }}</td>
              <td>{{ storeList[idx] }}</td>
              <td>{{ i.name }}</td>
              <td>{{ i.regdate }}</td>
          </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    foodList: Array,
    storeList: Array
  }
}
</script>

<style>

</style>