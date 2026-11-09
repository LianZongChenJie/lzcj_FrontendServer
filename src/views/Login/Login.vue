<template>
  <div
    :class="prefixCls"
    class="relative h-[100%] flex items-center justify-center"
  >
    <!-- 登录表单 -->
    <div class="w-full max-w-md">
      <LoginForm />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useDesign } from '@/hooks/web/useDesign'

import { LoginForm } from './components'

defineOptions({ name: 'Login' })

const { getPrefixCls } = useDesign()
const prefixCls = getPrefixCls('login')
</script>

<style lang="scss" scoped>
$prefix-cls: #{$namespace}-login;

.#{$prefix-cls} {
  overflow: auto;
}
</style>
