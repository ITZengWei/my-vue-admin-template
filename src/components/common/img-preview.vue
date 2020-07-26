<template>
    <div v-if="previewSrc !== null">
        <!-- 二维码弹框 -->
        <el-dialog
                :visible="previewSrc !== null"
                width="30%"
                center
                :show-close="false"
                @close="handleClose"
        >
            <!-- 展示图片 -->
            <div class="d-flex a-center j-center">
                <el-image lazy :src="previewSrc" />
            </div>


            <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handleClose">确 定</el-button>
        </span>
        </el-dialog>
    </div>

</template>

<script>
  export default {
    name: "img-preview",
    data() {
      return {
        // 是否展示弹框
        isShow: false
      }
    },
    props: {
      // 预览地址, 如果 不等于 null 我们就展示
      previewSrc: {
        // type: [ String, Object ],
        required: true
      },
    },
    methods: {
      handleClose() {
        /* 提醒父组件关闭 */
        this.$emit('update:previewSrc', null)
      }
    },
    mounted() {
      console.log(typeof this.previewSrc)
    }

  }
</script>

<style scoped>

</style>





<!--


        <!-- 二维码弹框 -->
<!--<el-dialog-->
<!--:visible="currentPrevSrc !== null"-->
<!--width="30%"-->
<!--center-->
<!--:show-close="false"-->
<!--@close="currentPrevSrc = null"-->
<!--&gt;-->
<!--&lt;!&ndash; 展示图片 &ndash;&gt;-->
<!--<div class="d-flex a-center j-center">-->
<!--<el-image lazy :src="currentPrevSrc" />-->
<!--</div>-->

<!--<span slot="footer" class="dialog-footer">-->
<!--<el-button type="primary" @click="currentPrevSrc = null">确 定</el-button>-->
<!--</span>-->
<!--</el-dialog>-->

-->