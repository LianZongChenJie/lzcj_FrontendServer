<script lang="tsx">
import { defineComponent } from 'vue'
import { UserInfo } from '@/layout/components/UserInfo'
import { useDesign } from '@/hooks/web/useDesign'

const { variables } = useDesign()

const prefixCls = 'tool-header'

export default defineComponent({
  name: 'ToolHeader',
  setup() {
    return () => (
      <div
        id={`${variables.namespace}-tool-header`}
        class={[
          prefixCls,
          'h-[var(--top-tool-height)] relative px-[var(--top-tool-p-x)] flex items-center justify-end',
          'dark:bg-[var(--el-bg-color)]'
        ]}
      >
        <div class="h-full flex items-center">
          <UserInfo></UserInfo>
        </div>
      </div>
    )
  }
})
</script>

<style lang="scss" scoped>
.tool-header {
  transition: left var(--transition-time-02);
}
</style>
