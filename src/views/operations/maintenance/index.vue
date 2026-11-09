<template>
  <div>
    <!-- 页面头部 -->
    <div
      class="mb-16px flex items-center gap-12px rounded-8px border border-[var(--el-border-color-light)] bg-[var(--el-bg-color)] p-16px"
    >
      <div
        class="flex h-48px w-48px flex-none items-center justify-center rounded-8px bg-[var(--el-color-primary-light-9)]"
      >
        <Icon icon="ep:wrench" :size="28" class="text-[var(--el-color-primary)]" />
      </div>
      <div class="min-w-0 flex-1">
        <div class="text-20px font-600 leading-28px text-[var(--el-text-color-primary)]">
          网站内容管理
        </div>
        <div class="mt-2px text-13px text-[var(--el-text-color-secondary)]">
          统一管理官网展示内容：首页、公司业务、公司动态、加入我们
        </div>
      </div>
      <el-tag type="primary" effect="light">Site Content</el-tag>
    </div>

    <!-- Tab 切换管理模块 -->
    <el-tabs v-model="activeModule" class="content-tabs">
      <!-- ==================== 首页管理 ==================== -->
      <el-tab-pane label="首页管理" name="home">
        <el-tabs v-model="homeTab" tab-position="left" class="sub-tabs">
          <!-- Banner 轮播图 -->
          <el-tab-pane label="Banner轮播" name="banner">
            <ContentWrap>
              <el-button type="primary" plain @click="openBannerForm('create')">
                <Icon icon="ep:plus" class="mr-5px" /> 新增轮播
              </el-button>
              <el-table
                class="mt-10px"
                v-loading="bannerLoading"
                :data="bannerList"
                :stripe="true"
                :show-overflow-tooltip="true"
              >
                <el-table-column label="序号" type="index" width="60" />
                <el-table-column label="图片" width="180">
                  <template #default="scope">
                    <el-image
                      v-if="scope.row.image"
                      :src="scope.row.image"
                      style="width: 120px; height: 60px; cursor: pointer"
                      fit="cover"
                      @click="openImagePreview(scope.row.image)"
                    />
                    <span v-else class="text-gray-400">无图片</span>
                  </template>
                </el-table-column>
                <el-table-column label="主标题" prop="title" min-width="160" />
                <el-table-column
                  label="副标题"
                  prop="subtitle"
                  min-width="200"
                  show-overflow-tooltip
                />
                <el-table-column label="排序" prop="sort" width="80" />
                <el-table-column label="状态" width="80">
                  <template #default="scope">
                    <el-tag :type="scope.row.status === 1 ? 'success' : 'info'" size="small">
                      {{ scope.row.status === 1 ? '启用' : '禁用' }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="创建时间" prop="createTime" width="170" />
                <el-table-column label="操作" width="150" fixed="right">
                  <template #default="scope">
                    <el-button link type="primary" @click="openBannerForm('update', scope.row)"
                      >编辑</el-button
                    >
                    <el-button link type="danger" @click="handleDeleteBanner(scope.row)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </ContentWrap>
          </el-tab-pane>

          <!-- 公司介绍 -->
          <el-tab-pane label="公司介绍" name="intro">
            <ContentWrap>
              <el-button type="primary" plain @click="openIntroForm('create')">
                <Icon icon="ep:plus" class="mr-5px" /> 新增版本
              </el-button>
              <el-table
                class="mt-10px"
                v-loading="introLoading"
                :data="introList"
                :stripe="true"
                :show-overflow-tooltip="true"
              >
                <el-table-column label="序号" type="index" width="60" />
                <el-table-column
                  label="介绍摘要"
                  prop="description"
                  min-width="300"
                  show-overflow-tooltip
                />
                <el-table-column label="图片数量" width="100">
                  <template #default="scope"> {{ (scope.row.images || []).length }} 张 </template>
                </el-table-column>
                <el-table-column label="版本" prop="version" width="80" />
                <el-table-column label="状态" width="80">
                  <template #default="scope">
                    <el-tag :type="scope.row.status === 1 ? 'success' : 'info'" size="small">
                      {{ scope.row.status === 1 ? '启用' : '禁用' }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="创建时间" prop="createTime" width="170" />
                <el-table-column label="操作" width="180" fixed="right">
                  <template #default="scope">
                    <el-button link type="primary" @click="openIntroForm('update', scope.row)"
                      >编辑</el-button
                    >
                    <el-button link type="danger" @click="handleDeleteIntro(scope.row)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </ContentWrap>
          </el-tab-pane>

          <!-- 发展历程 -->
          <el-tab-pane label="发展历程" name="milestone">
            <ContentWrap>
              <el-button type="primary" plain @click="openMilestoneForm('create')">
                <Icon icon="ep:plus" class="mr-5px" /> 新增事件
              </el-button>
              <el-table
                class="mt-10px"
                v-loading="milestoneLoading"
                :data="milestoneList"
                :stripe="true"
              >
                <el-table-column label="序号" type="index" width="60" />
                <el-table-column label="年份" prop="year" width="90" />
                <el-table-column label="事件标题" prop="title" min-width="200" />
                <el-table-column
                  label="事件描述"
                  prop="description"
                  min-width="250"
                  show-overflow-tooltip
                />
                <el-table-column label="排序" prop="sort" width="80" />
                <el-table-column label="状态" width="80">
                  <template #default="scope">
                    <el-tag :type="scope.row.status === 1 ? 'success' : 'info'" size="small">
                      {{ scope.row.status === 1 ? '启用' : '禁用' }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="150" fixed="right">
                  <template #default="scope">
                    <el-button link type="primary" @click="openMilestoneForm('update', scope.row)"
                      >编辑</el-button
                    >
                    <el-button link type="danger" @click="handleDeleteMilestone(scope.row)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </ContentWrap>
          </el-tab-pane>

          <!-- 企业文化 -->
          <el-tab-pane label="企业文化" name="culture">
            <ContentWrap>
              <el-button type="primary" plain @click="openCultureForm('create')">
                <Icon icon="ep:plus" class="mr-5px" /> 新增版本
              </el-button>
              <el-table
                class="mt-10px"
                v-loading="cultureLoading"
                :data="cultureList"
                :stripe="true"
                :show-overflow-tooltip="true"
              >
                <el-table-column label="序号" type="index" width="60" />
                <el-table-column
                  label="使命"
                  prop="mission"
                  min-width="200"
                  show-overflow-tooltip
                />
                <el-table-column label="愿景" prop="vision" min-width="200" show-overflow-tooltip />
                <el-table-column
                  label="价值观"
                  prop="values"
                  min-width="200"
                  show-overflow-tooltip
                />
                <el-table-column label="版本" prop="version" width="80" />
                <el-table-column label="状态" width="80">
                  <template #default="scope">
                    <el-tag :type="scope.row.status === 1 ? 'success' : 'info'" size="small">
                      {{ scope.row.status === 1 ? '启用' : '禁用' }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="创建时间" prop="createTime" width="170" />
                <el-table-column label="操作" width="180" fixed="right">
                  <template #default="scope">
                    <el-button link type="primary" @click="openCultureForm('update', scope.row)"
                      >编辑</el-button
                    >
                    <el-button link type="danger" @click="handleDeleteCulture(scope.row)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </ContentWrap>
          </el-tab-pane>

          <!-- 员工风采 -->
          <el-tab-pane label="员工风采" name="team">
            <ContentWrap>
              <el-button type="primary" plain @click="openTeamForm('create')">
                <Icon icon="ep:plus" class="mr-5px" /> 新增图片
              </el-button>
              <el-table class="mt-10px" v-loading="teamLoading" :data="teamList" :stripe="true">
                <el-table-column label="序号" type="index" width="60" />
                <el-table-column label="图片" width="200">
                  <template #default="scope">
                    <div v-if="(scope.row.images || []).length > 0" class="flex gap-2px">
                      <el-image
                        v-for="(img, idx) in scope.row.images.slice(0, 2)"
                        :key="idx"
                        :src="img"
                        @click.stop="openImagePreview(img)"
                        style="width: 80px; height: 60px"
                        fit="cover"
                      />
                      <span
                        v-if="(scope.row.images || []).length > 2"
                        class="flex items-center text-12px text-gray-500"
                      >
                        +{{ (scope.row.images || []).length - 2 }}
                      </span>
                    </div>
                    <span v-else class="text-gray-400">无图片</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="描述"
                  prop="description"
                  min-width="200"
                  show-overflow-tooltip
                />
                <el-table-column label="排序" prop="sort" width="80" />
                <el-table-column label="状态" width="80">
                  <template #default="scope">
                    <el-tag :type="scope.row.status === 1 ? 'success' : 'info'" size="small">
                      {{ scope.row.status === 1 ? '启用' : '禁用' }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="150" fixed="right">
                  <template #default="scope">
                    <el-button link type="primary" @click="openTeamForm('update', scope.row)"
                      >编辑</el-button
                    >
                    <el-button link type="danger" @click="handleDeleteTeam(scope.row)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </ContentWrap>
          </el-tab-pane>

          <!-- 资质荣誉 -->
          <el-tab-pane label="资质荣誉" name="honor">
            <ContentWrap>
              <el-button type="primary" plain @click="openHonorForm('create')">
                <Icon icon="ep:plus" class="mr-5px" /> 新增荣誉
              </el-button>
              <el-table class="mt-10px" v-loading="honorLoading" :data="honorList" :stripe="true">
                <el-table-column label="序号" type="index" width="60" />
                <el-table-column label="证书图片" width="120">
                  <template #default="scope">
                    <div v-if="(scope.row.images || []).length > 0" class="flex gap-2px">
                      <el-image
                        v-for="(img, idx) in scope.row.images.slice(0, 1)"
                        :key="idx"
                        :src="img"
                        @click.stop="openImagePreview(img)"
                        style="width: 80px; height: 60px"
                        fit="contain"
                      />
                      <span
                        v-if="(scope.row.images || []).length > 1"
                        class="flex items-center text-12px text-gray-500"
                      >
                        +{{ (scope.row.images || []).length - 1 }}
                      </span>
                    </div>
                    <span v-else class="text-gray-400">无图片</span>
                  </template>
                </el-table-column>
                <el-table-column label="名称" prop="name" min-width="160" />
                <el-table-column label="类型" width="100">
                  <template #default="scope">
                    <el-tag
                      :type="scope.row.type === 'qualification' ? 'primary' : 'warning'"
                      size="small"
                    >
                      {{ scope.row.type === 'qualification' ? '资质认证' : '荣誉奖项' }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="获得年份" prop="date" width="100" />
                <el-table-column label="排序" prop="sort" width="80" />
                <el-table-column label="状态" width="90">
                  <template #default="scope">
                    <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0" disabled />
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="150" fixed="right">
                  <template #default="scope">
                    <el-button link type="primary" @click="openHonorForm('update', scope.row)"
                      >编辑</el-button
                    >
                    <el-button link type="danger" @click="handleDeleteHonor(scope.row)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </ContentWrap>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>

      <!-- ==================== 公司业务管理 ==================== -->
      <el-tab-pane label="公司业务" name="business">
        <el-tabs v-model="businessTab" tab-position="left" class="sub-tabs">
          <!-- 自研产品 -->
          <el-tab-pane label="自研产品" name="selfProduct">
            <ContentWrap>
              <el-button type="primary" plain @click="openProductForm('create', 'self')">
                <Icon icon="ep:plus" class="mr-5px" /> 新增自研产品
              </el-button>
              <el-table
                class="mt-10px"
                v-loading="productLoading"
                :data="filteredProductList('self')"
                :stripe="true"
              >
                <el-table-column label="序号" type="index" width="60" />
                <el-table-column label="图片" width="120">
                  <template #default="scope">
                    <el-image
                      v-if="scope.row.image"
                      :src="scope.row.image"
                      @click.stop="openImagePreview(scope.row.image)"
                      style="width: 80px; height: 60px"
                      fit="cover"
                    />
                    <span v-else class="text-gray-400">无图片</span>
                  </template>
                </el-table-column>
                <el-table-column label="产品名称" prop="name" min-width="160" />
                <el-table-column
                  label="产品摘要"
                  prop="summary"
                  min-width="200"
                  show-overflow-tooltip
                />
                <el-table-column label="核心特性" min-width="180">
                  <template #default="scope">
                    <el-tag
                      v-for="(item, idx) in (scope.row.features || []).slice(0, 2)"
                      :key="idx"
                      size="small"
                      class="mr-2px"
                    >
                      {{ item }}
                    </el-tag>
                    <span
                      v-if="(scope.row.features || []).length > 2"
                      class="text-12px text-gray-500"
                    >
                      +{{ scope.row.features.length - 2 }}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column label="排序" prop="sort" width="80" />
                <el-table-column label="状态" width="80">
                  <template #default="scope">
                    <el-tag :type="scope.row.status === 1 ? 'success' : 'info'" size="small">
                      {{ scope.row.status === 1 ? '启用' : '禁用' }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="150" fixed="right">
                  <template #default="scope">
                    <el-button
                      link
                      type="primary"
                      @click="openProductForm('update', 'self', scope.row)"
                      >编辑</el-button
                    >
                    <el-button link type="danger" @click="handleDeleteProduct(scope.row)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </ContentWrap>
          </el-tab-pane>

          <!-- 代理产品 -->
          <el-tab-pane label="代理产品" name="agentProduct">
            <ContentWrap>
              <el-button type="primary" plain @click="openProductForm('create', 'agent')">
                <Icon icon="ep:plus" class="mr-5px" /> 新增代理产品
              </el-button>
              <el-table
                class="mt-10px"
                v-loading="productLoading"
                :data="filteredProductList('agent')"
                :stripe="true"
              >
                <el-table-column label="序号" type="index" width="60" />
                <el-table-column label="图片" width="120">
                  <template #default="scope">
                    <el-image
                      v-if="scope.row.image"
                      :src="scope.row.image"
                      @click.stop="openImagePreview(scope.row.image)"
                      style="width: 80px; height: 60px"
                      fit="cover"
                    />
                    <span v-else class="text-gray-400">无图片</span>
                  </template>
                </el-table-column>
                <el-table-column label="产品名称" prop="name" min-width="160" />
                <el-table-column
                  label="产品摘要"
                  prop="summary"
                  min-width="200"
                  show-overflow-tooltip
                />
                <el-table-column label="核心特性" min-width="180">
                  <template #default="scope">
                    <el-tag
                      v-for="(item, idx) in (scope.row.features || []).slice(0, 2)"
                      :key="idx"
                      size="small"
                      class="mr-2px"
                    >
                      {{ item }}
                    </el-tag>
                    <span
                      v-if="(scope.row.features || []).length > 2"
                      class="text-12px text-gray-500"
                    >
                      +{{ scope.row.features.length - 2 }}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column label="排序" prop="sort" width="80" />
                <el-table-column label="状态" width="80">
                  <template #default="scope">
                    <el-tag :type="scope.row.status === 1 ? 'success' : 'info'" size="small">
                      {{ scope.row.status === 1 ? '启用' : '禁用' }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="150" fixed="right">
                  <template #default="scope">
                    <el-button
                      link
                      type="primary"
                      @click="openProductForm('update', 'agent', scope.row)"
                      >编辑</el-button
                    >
                    <el-button link type="danger" @click="handleDeleteProduct(scope.row)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </ContentWrap>
          </el-tab-pane>

          <!-- 解决方案 -->
          <el-tab-pane label="解决方案" name="solution">
            <ContentWrap>
              <el-button type="primary" plain @click="openSolutionForm('create')">
                <Icon icon="ep:plus" class="mr-5px" /> 新增解决方案
              </el-button>
              <el-table
                class="mt-10px"
                v-loading="solutionLoading"
                :data="solutionList"
                :stripe="true"
              >
                <el-table-column label="序号" type="index" width="60" />
                <el-table-column label="封面" width="120">
                  <template #default="scope">
                    <el-image
                      v-if="scope.row.image"
                      :src="scope.row.image"
                      @click.stop="openImagePreview(scope.row.image)"
                      style="width: 80px; height: 60px"
                      fit="cover"
                    />
                    <span v-else class="text-gray-400">无封面</span>
                  </template>
                </el-table-column>
                <el-table-column label="方案名称" prop="name" min-width="160" />
                <el-table-column label="所属行业" prop="industry" width="100">
                  <template #default="scope">
                    <el-tag size="small">{{ scope.row.industry }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column
                  label="方案摘要"
                  prop="summary"
                  min-width="200"
                  show-overflow-tooltip
                />
                <el-table-column label="排序" prop="sort" width="80" />
                <el-table-column label="状态" width="80">
                  <template #default="scope">
                    <el-tag :type="scope.row.status === 1 ? 'success' : 'info'" size="small">
                      {{ scope.row.status === 1 ? '启用' : '禁用' }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="150" fixed="right">
                  <template #default="scope">
                    <el-button link type="primary" @click="openSolutionForm('update', scope.row)"
                      >编辑</el-button
                    >
                    <el-button link type="danger" @click="handleDeleteSolution(scope.row)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </ContentWrap>
          </el-tab-pane>

          <!-- 技术服务 -->
          <el-tab-pane label="技术服务" name="techService">
            <ContentWrap>
              <el-button type="primary" plain @click="openTechServiceForm('create')">
                <Icon icon="ep:plus" class="mr-5px" /> 新增技术服务
              </el-button>
              <el-table
                class="mt-10px"
                v-loading="techServiceLoading"
                :data="techServiceList"
                :stripe="true"
              >
                <el-table-column label="序号" type="index" width="60" />
                <el-table-column label="行业" prop="industry" width="120">
                  <template #default="scope">
                    <el-tag size="small">{{ scope.row.industry }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="图标" width="80">
                  <template #default="scope">
                    <Icon v-if="scope.row.icon" :icon="scope.row.icon" :size="20" />
                    <span v-else class="text-gray-400">-</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="服务描述"
                  prop="description"
                  min-width="250"
                  show-overflow-tooltip
                />
                <el-table-column label="排序" prop="sort" width="80" />
                <el-table-column label="状态" width="80">
                  <template #default="scope">
                    <el-tag :type="scope.row.status === 1 ? 'success' : 'info'" size="small">
                      {{ scope.row.status === 1 ? '启用' : '禁用' }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="150" fixed="right">
                  <template #default="scope">
                    <el-button link type="primary" @click="openTechServiceForm('update', scope.row)"
                      >编辑</el-button
                    >
                    <el-button link type="danger" @click="handleDeleteTechService(scope.row)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </ContentWrap>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>

      <!-- ==================== 公司动态 ==================== -->
      <el-tab-pane label="公司动态" name="news">
        <el-tabs v-model="newsTab" tab-position="left" class="sub-tabs">
          <!-- 新闻中心 -->
          <el-tab-pane label="新闻中心" name="newsList">
            <ContentWrap>
              <el-button type="primary" plain @click="openNewsForm('create')">
                <Icon icon="ep:plus" class="mr-5px" /> 新增新闻
              </el-button>
              <el-table class="mt-10px" v-loading="newsLoading" :data="newsList" :stripe="true">
                <el-table-column label="序号" type="index" width="60" />
                <el-table-column label="封面" width="120">
                  <template #default="scope">
                    <el-image
                      v-if="scope.row.cover"
                      :src="scope.row.cover"
                      @click.stop="openImagePreview(scope.row.cover)"
                      style="width: 80px; height: 60px"
                      fit="contain"
                    />
                    <span v-else class="text-gray-400">无封面</span>
                  </template>
                </el-table-column>
                <el-table-column label="新闻标题" prop="title" min-width="200" />
                <el-table-column
                  label="摘要"
                  prop="summary"
                  min-width="200"
                  show-overflow-tooltip
                />
                <el-table-column label="作者" prop="author" width="100" />
                <el-table-column label="发布日期" prop="publishDate" width="110" />
                <el-table-column label="状态" width="80">
                  <template #default="scope">
                    <el-tag :type="scope.row.status === 1 ? 'success' : 'info'" size="small">
                      {{ scope.row.status === 1 ? '已发布' : '草稿' }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="150" fixed="right">
                  <template #default="scope">
                    <el-button link type="primary" @click="openNewsForm('update', scope.row)"
                      >编辑</el-button
                    >
                    <el-button link type="danger" @click="handleDeleteNews(scope.row)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
              <!-- 分页 -->
              <Pagination
                :total="newsTotal"
                v-model:page="newsQueryParams.pageNo"
                v-model:limit="newsQueryParams.pageSize"
                @pagination="getNewsList"
              />
            </ContentWrap>
          </el-tab-pane>

          <!-- 公司公告 -->
          <el-tab-pane label="公司公告" name="announcement">
            <ContentWrap>
              <el-button type="primary" plain @click="openAnnouncementForm('create')">
                <Icon icon="ep:plus" class="mr-5px" /> 新增公告
              </el-button>
              <el-table
                class="mt-10px"
                v-loading="announcementLoading"
                :data="announcementList"
                :stripe="true"
              >
                <el-table-column label="序号" type="index" width="60" />
                <el-table-column label="公告标题" prop="title" min-width="200" />
                <el-table-column
                  label="摘要"
                  prop="summary"
                  min-width="200"
                  show-overflow-tooltip
                />
                <el-table-column label="重要" width="80">
                  <template #default="scope">
                    <el-tag v-if="scope.row.important === 1" type="danger" size="small"
                      >重要</el-tag
                    >
                    <span v-else>-</span>
                  </template>
                </el-table-column>
                <el-table-column label="发布日期" prop="publishDate" width="110" />
                <el-table-column label="状态" width="80">
                  <template #default="scope">
                    <el-tag :type="scope.row.status === 1 ? 'success' : 'info'" size="small">
                      {{ scope.row.status === 1 ? '已发布' : '草稿' }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="150" fixed="right">
                  <template #default="scope">
                    <el-button
                      link
                      type="primary"
                      @click="openAnnouncementForm('update', scope.row)"
                      >编辑</el-button
                    >
                    <el-button link type="danger" @click="handleDeleteAnnouncement(scope.row)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
              <!-- 分页 -->
              <Pagination
                :total="announcementTotal"
                v-model:page="announcementQueryParams.pageNo"
                v-model:limit="announcementQueryParams.pageSize"
                @pagination="getAnnouncementList"
              />
            </ContentWrap>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>

      <!-- ==================== 加入我们 ==================== -->
      <el-tab-pane label="加入我们" name="join">
        <el-tabs v-model="joinTab" tab-position="left" class="sub-tabs">
          <!-- 招聘信息 -->
          <el-tab-pane label="招聘信息" name="job">
            <ContentWrap>
              <el-button type="primary" plain @click="openJobForm('create')">
                <Icon icon="ep:plus" class="mr-5px" /> 新增职位
              </el-button>
              <el-table class="mt-10px" v-loading="jobLoading" :data="jobList" :stripe="true">
                <el-table-column label="序号" type="index" width="60" />
                <el-table-column label="职位名称" prop="title" min-width="160" />
                <el-table-column label="工作地点" prop="location" width="100">
                  <template #default="scope">
                    <el-tag size="small">{{ scope.row.location }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="部门" prop="department" width="100" />
                <el-table-column label="类型" prop="type" width="80" />
                <el-table-column label="急聘" width="70">
                  <template #default="scope">
                    <el-tag v-if="scope.row.urgent === 1" type="danger" size="small">急聘</el-tag>
                    <span v-else>-</span>
                  </template>
                </el-table-column>
                <el-table-column label="招聘人数" prop="headcount" width="90" />
                <el-table-column label="状态" width="90">
                  <template #default="scope">
                    <el-tag :type="scope.row.status === 1 ? 'success' : 'info'" size="small">
                      {{ scope.row.status === 1 ? '招聘中' : '已关闭' }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="150" fixed="right">
                  <template #default="scope">
                    <el-button link type="primary" @click="openJobForm('update', scope.row)"
                      >编辑</el-button
                    >
                    <el-button link type="danger" @click="handleDeleteJob(scope.row)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </ContentWrap>
          </el-tab-pane>

          <!-- 分公司联系方式 -->
          <el-tab-pane label="分公司联系方式" name="branch">
            <ContentWrap>
              <el-button type="primary" plain @click="openBranchForm('create')">
                <Icon icon="ep:plus" class="mr-5px" /> 新增分公司
              </el-button>
              <el-table class="mt-10px" v-loading="branchLoading" :data="branchList" :stripe="true">
                <el-table-column label="序号" type="index" width="60" />
                <el-table-column label="城市" prop="city" width="100">
                  <template #default="scope">
                    <el-tag size="small" effect="dark" :color="scope.row.themeColor">
                      {{ scope.row.city }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column
                  label="地址"
                  prop="address"
                  min-width="250"
                  show-overflow-tooltip
                />
                <el-table-column label="电话" prop="phone" width="130" />
                <el-table-column label="邮编" prop="postalCode" width="90" />
                <el-table-column label="邮箱" prop="email" width="170" show-overflow-tooltip />
                <el-table-column label="排序" prop="sort" width="80" />
                <el-table-column label="状态" width="80">
                  <template #default="scope">
                    <el-tag :type="scope.row.status === 1 ? 'success' : 'info'" size="small">
                      {{ scope.row.status === 1 ? '启用' : '禁用' }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="150" fixed="right">
                  <template #default="scope">
                    <el-button link type="primary" @click="openBranchForm('update', scope.row)"
                      >编辑</el-button
                    >
                    <el-button link type="danger" @click="handleDeleteBranch(scope.row)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </ContentWrap>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
    </el-tabs>

    <!-- ==================== 弹窗表单 ==================== -->

    <!-- 公司介绍表单 -->
    <Dialog v-model="introDialogVisible" :title="introDialogTitle" width="700px">
      <el-form :model="introForm" :rules="introRules" ref="introFormRef" label-width="100px">
        <el-form-item label="公司介绍" prop="description" required>
          <el-input
            v-model="introForm.description"
            type="textarea"
            :rows="6"
            placeholder="请输入公司介绍文本"
            maxlength="1000"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="公司风采图片">
          <UploadImgs v-model="introForm.images" :limit="5" :file-size="15" directory="site/intro">
            <template #tip>
              <div class="text-12px text-[var(--el-text-color-secondary)]">
                最多上传5张，建议尺寸 800×600，单张最大15MB
              </div>
            </template>
          </UploadImgs>
        </el-form-item>
        <el-form-item label="版本号">
          <el-input-number v-model="introForm.version" :min="1" />
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="introForm.status" :active-value="1" :inactive-value="0" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="introDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveIntro">保 存</el-button>
      </template>
    </Dialog>

    <!-- 企业文化表单 -->
    <Dialog v-model="cultureDialogVisible" :title="cultureDialogTitle" width="600px">
      <el-form :model="cultureForm" :rules="cultureRules" ref="cultureFormRef" label-width="100px">
        <el-form-item label="使命" prop="mission" required>
          <el-input v-model="cultureForm.mission" placeholder="请输入公司使命" />
        </el-form-item>
        <el-form-item label="愿景" prop="vision" required>
          <el-input v-model="cultureForm.vision" placeholder="请输入公司愿景" />
        </el-form-item>
        <el-form-item label="价值观" prop="values" required>
          <el-input v-model="cultureForm.values" placeholder="请输入公司价值观" />
        </el-form-item>
        <el-form-item label="版本号">
          <el-input-number v-model="cultureForm.version" :min="1" />
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="cultureForm.status" :active-value="1" :inactive-value="0" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="cultureDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveCulture">保 存</el-button>
      </template>
    </Dialog>

    <!-- Banner 表单 -->
    <Dialog v-model="bannerDialogVisible" :title="bannerDialogTitle" width="600px">
      <el-form :model="bannerForm" :rules="bannerRules" ref="bannerFormRef" label-width="100px">
        <el-form-item label="轮播图片" required>
          <UploadImg
            v-model="bannerForm.image"
            :width="'150px'"
            :height="'150px'"
            :fileSize="15"
            directory="site/banner"
          />
        </el-form-item>
        <el-form-item label="主标题" prop="title">
          <el-input v-model="bannerForm.title" placeholder="请输入主标题" />
        </el-form-item>
        <el-form-item label="副标题">
          <el-input v-model="bannerForm.subtitle" placeholder="请输入副标题" />
        </el-form-item>
        <el-form-item label="排序号">
          <el-input-number v-model="bannerForm.sort" :min="0" />
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="bannerForm.status" :active-value="1" :inactive-value="0" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="bannerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveBanner">保 存</el-button>
      </template>
    </Dialog>

    <!-- 发展历程表单 -->
    <Dialog v-model="milestoneDialogVisible" :title="milestoneDialogTitle" width="600px">
      <el-form :model="milestoneForm" :rules="milestoneRules" ref="milestoneFormRef" label-width="100px">
        <el-form-item label="年份" prop="year" required>
          <el-input-number
            v-model="milestoneForm.year"
            :min="1900"
            :max="2100"
            controls-position="right"
          />
        </el-form-item>
        <el-form-item label="事件标题" prop="title" required>
          <el-input v-model="milestoneForm.title" placeholder="请输入事件标题" />
        </el-form-item>
        <el-form-item label="事件描述">
          <el-input
            v-model="milestoneForm.description"
            type="textarea"
            :rows="3"
            placeholder="请输入事件描述"
          />
        </el-form-item>
        <el-form-item label="排序号">
          <el-input-number v-model="milestoneForm.sort" :min="0" />
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="milestoneForm.status" :active-value="1" :inactive-value="0" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="milestoneDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveMilestone">保 存</el-button>
      </template>
    </Dialog>

    <!-- 员工风采表单 -->
    <Dialog v-model="teamDialogVisible" :title="teamDialogTitle" width="600px">
      <el-form :model="teamForm" ref="teamFormRef" label-width="100px">
        <el-form-item label="图片" required>
          <UploadImg
            v-model="teamForm.image"
            :width="'150px'"
            :height="'150px'"
            :fileSize="15"
            directory="site/team"
          />
        </el-form-item>
        <el-form-item label="图片描述">
          <el-input v-model="teamForm.description" placeholder="请输入描述" />
        </el-form-item>
        <el-form-item label="排序号">
          <el-input-number v-model="teamForm.sort" :min="0" />
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="teamForm.status" :active-value="1" :inactive-value="0" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="teamDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveTeam">保 存</el-button>
      </template>
    </Dialog>

    <!-- 资质荣誉表单 -->
    <Dialog v-model="honorDialogVisible" :title="honorDialogTitle" width="600px">
      <el-form :model="honorForm" ref="honorFormRef" label-width="100px">
          <el-form-item label="证书图片" required>
            <UploadImg
              v-model="honorForm.image"
              :width="'150px'"
              :height="'150px'"
              :fileSize="15"
              directory="site/honor"
            />
          </el-form-item>
        <el-form-item label="名称" required>
          <el-input v-model="honorForm.name" placeholder="请输入荣誉/资质名称" />
        </el-form-item>
        <el-form-item label="类型" required>
          <el-select v-model="honorForm.type" placeholder="请选择类型">
            <el-option label="资质认证" value="qualification" />
            <el-option label="荣誉奖项" value="award" />
          </el-select>
        </el-form-item>
        <el-form-item label="获得年份">
          <el-input v-model="honorForm.date" placeholder="如：2024" />
        </el-form-item>
          <el-form-item label="排序号">
            <el-input-number v-model="honorForm.sort" :min="0" />
          </el-form-item>
          <el-form-item label="状态">
            <el-switch v-model="honorForm.status" :active-value="1" :inactive-value="0" />
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="honorDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveHonor">保 存</el-button>
        </template>
      </Dialog>

    <!-- 产品表单 -->
    <Dialog v-model="productDialogVisible" :title="productDialogTitle" width="700px">
      <el-form :model="productForm" ref="productFormRef" label-width="100px">
        <el-form-item label="产品图片" required>
          <UploadImg
            v-model="productForm.image"
            :width="'150px'"
            :height="'150px'"
            :fileSize="15"
            directory="site/product"
          />
        </el-form-item>
        <el-form-item label="产品名称" required>
          <el-input v-model="productForm.name" placeholder="请输入产品名称" />
        </el-form-item>
        <el-form-item label="产品类型">
          <el-tag :type="productForm.type === 'self' ? 'primary' : 'warning'" size="large">
            {{ productForm.type === 'self' ? '自研产品' : '代理产品' }}
          </el-tag>
        </el-form-item>
        <el-form-item label="产品摘要">
          <el-input
            v-model="productForm.summary"
            placeholder="请输入产品一句话介绍"
            maxlength="200"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="详细描述">
          <el-input
            v-model="productForm.description"
            type="textarea"
            :rows="3"
            placeholder="请输入产品详细描述"
          />
        </el-form-item>
        <el-form-item label="核心特性">
          <div v-for="(_, idx) in productForm.features" :key="idx" class="mb-8px">
            <el-input v-model="productForm.features[idx]" placeholder="请输入特性">
              <template #append>
                <el-button @click="removeFeature(idx)" :icon="Delete" />
              </template>
            </el-input>
          </div>
          <el-button type="primary" plain size="small" @click="addFeature">
            <Icon icon="ep:plus" /> 添加特性
          </el-button>
        </el-form-item>
        <el-form-item label="适用场景">
          <div v-for="(_, idx) in productForm.scenarios" :key="idx" class="mb-8px">
            <el-input v-model="productForm.scenarios[idx]" placeholder="请输入场景">
              <template #append>
                <el-button @click="removeScenario(idx)" :icon="Delete" />
              </template>
            </el-input>
          </div>
          <el-button type="primary" plain size="small" @click="addScenario">
            <Icon icon="ep:plus" /> 添加场景
          </el-button>
        </el-form-item>
        <el-form-item label="排序号">
          <el-input-number v-model="productForm.sort" :min="0" />
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="productForm.status" :active-value="1" :inactive-value="0" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="productDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveProduct">保 存</el-button>
      </template>
    </Dialog>

    <!-- 解决方案表单 -->
    <Dialog v-model="solutionDialogVisible" :title="solutionDialogTitle" width="700px">
      <el-form :model="solutionForm" ref="solutionFormRef" label-width="100px">
        <el-form-item label="方案封面" required>
          <UploadImg
            v-model="solutionForm.image"
            :width="'150px'"
            :height="'150px'"
            :fileSize="15"
            directory="site/solution"
          />
        </el-form-item>
        <el-form-item label="方案名称" required>
          <el-input v-model="solutionForm.name" placeholder="请输入方案名称" />
        </el-form-item>
        <el-form-item label="所属行业" required>
          <el-select v-model="solutionForm.industry" placeholder="请选择行业">
            <el-option label="政务" value="政务" />
            <el-option label="教育" value="教育" />
            <el-option label="医疗" value="医疗" />
            <el-option label="金融" value="金融" />
            <el-option label="制造业" value="制造业" />
            <el-option label="服务业" value="服务业" />
          </el-select>
        </el-form-item>
        <el-form-item label="方案摘要">
          <el-input
            v-model="solutionForm.summary"
            placeholder="请输入方案摘要"
            maxlength="200"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="详细描述">
          <el-input
            v-model="solutionForm.description"
            type="textarea"
            :rows="3"
            placeholder="请输入详细描述"
          />
        </el-form-item>
        <el-form-item label="需求分析">
          <el-input
            v-model="solutionForm.demandAnalysis"
            type="textarea"
            :rows="3"
            placeholder="请输入需求分析"
          />
        </el-form-item>
        <el-form-item label="排序号">
          <el-input-number v-model="solutionForm.sort" :min="0" />
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="solutionForm.status" :active-value="1" :inactive-value="0" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="solutionDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveSolution">保 存</el-button>
      </template>
    </Dialog>

    <!-- 技术服务表单 -->
    <Dialog v-model="techServiceDialogVisible" :title="techServiceDialogTitle" width="600px">
      <el-form :model="techServiceForm" ref="techServiceFormRef" label-width="100px">
<el-form-item label="服务行业" required>
<el-select
v-model="techServiceForm.industry"
placeholder="请选择服务行业"
@change="handleTechServiceIndustryChange"
>
<el-option label="政务" value="政务" />
            <el-option label="教育" value="教育" />
            <el-option label="医疗" value="医疗" />
            <el-option label="金融" value="金融" />
            <el-option label="制造业" value="制造业" />
            <el-option label="服务业" value="服务业" />
          </el-select>
        </el-form-item>
<el-form-item label="图标标识" required>
<el-select
v-model="techServiceForm.icon"
placeholder="请选择图标标识"
clearable
class="!w-full"
>
<el-option
v-for="item in techServiceIconOptions"
:key="item.value"
:label="item.label"
:value="item.value"
>
<div class="flex items-center">
<Icon :icon="item.value" :size="18" class="mr-8px" />
<span>{{ item.label }}</span>
</div>
</el-option>
</el-select>
</el-form-item>
        <el-form-item label="服务描述">
          <el-input
            v-model="techServiceForm.description"
            type="textarea"
            :rows="3"
            placeholder="请输入服务描述"
          />
        </el-form-item>
        <el-form-item label="排序号">
          <el-input-number v-model="techServiceForm.sort" :min="0" />
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="techServiceForm.status" :active-value="1" :inactive-value="0" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="techServiceDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveTechService">保 存</el-button>
      </template>
    </Dialog>

    <!-- 新闻表单 -->
    <Dialog v-model="newsDialogVisible" :title="newsDialogTitle" width="800px">
      <el-form :model="newsForm" ref="newsFormRef" label-width="100px">
        <el-form-item label="新闻标题" required>
          <el-input v-model="newsForm.title" placeholder="请输入新闻标题" />
        </el-form-item>
        <el-form-item label="封面图片">
          <UploadImg
            v-model="newsForm.cover"
            :width="'150px'"
            :height="'150px'"
            :fileSize="15"
            directory="site/news"
          />
        </el-form-item>
        <el-form-item label="新闻摘要">
          <el-input
            v-model="newsForm.summary"
            placeholder="请输入新闻摘要"
            maxlength="200"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="新闻正文">
          <el-input
            v-model="newsForm.content"
            type="textarea"
            :rows="6"
            placeholder="请输入新闻正文"
          />
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="newsForm.author" placeholder="请输入作者名称" />
        </el-form-item>
        <el-form-item label="发布日期">
          <el-date-picker
            v-model="newsForm.publishDate"
            type="date"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="newsForm.status">
            <el-radio :value="1">发布</el-radio>
            <el-radio :value="0">草稿</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="newsDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveNews">保 存</el-button>
      </template>
    </Dialog>

    <!-- 公告表单 -->
    <Dialog v-model="announcementDialogVisible" :title="announcementDialogTitle" width="800px">
      <el-form :model="announcementForm" ref="announcementFormRef" label-width="100px">
        <el-form-item label="公告标题" required>
          <el-input v-model="announcementForm.title" placeholder="请输入公告标题" />
        </el-form-item>
        <el-form-item label="公告摘要">
          <el-input
            v-model="announcementForm.summary"
            placeholder="请输入公告摘要"
            maxlength="200"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="公告正文">
          <el-input
            v-model="announcementForm.content"
            type="textarea"
            :rows="6"
            placeholder="请输入公告正文"
          />
        </el-form-item>
        <el-form-item label="发布日期">
          <el-date-picker
            v-model="announcementForm.publishDate"
            type="date"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item label="重要公告">
          <el-switch
            v-model="announcementForm.important"
            :active-value="1"
            :inactive-value="0"
            active-text="是"
            inactive-text="否"
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="announcementForm.status">
            <el-radio :value="1">发布</el-radio>
            <el-radio :value="0">草稿</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="announcementDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveAnnouncement">保 存</el-button>
      </template>
    </Dialog>

    <!-- 招聘表单 -->
    <Dialog v-model="jobDialogVisible" :title="jobDialogTitle" width="700px">
        <el-form :model="jobForm" label-width="100px">
        <el-form-item label="职位名称" required>
          <el-input v-model="jobForm.title" placeholder="请输入职位名称" />
        </el-form-item>
        <el-form-item label="工作地点" required>
          <el-select v-model="jobForm.location" placeholder="请选择工作地点">
            <el-option v-for="city in branchCityOptions" :key="city" :label="city" :value="city" />
          </el-select>
        </el-form-item>
        <el-form-item label="所属部门">
          <el-input v-model="jobForm.department" placeholder="请输入所属部门" />
        </el-form-item>
        <el-form-item label="工作类型" required>
          <el-select v-model="jobForm.type" placeholder="请选择工作类型">
            <el-option label="全职" value="全职" />
            <el-option label="兼职" value="兼职" />
            <el-option label="实习" value="实习" />
          </el-select>
        </el-form-item>
        <el-form-item label="招聘人数">
          <el-input-number v-model="jobForm.headcount" :min="1" />
        </el-form-item>
        <el-form-item label="急聘">
          <el-switch v-model="jobForm.urgent" :active-value="1" :inactive-value="0" />
        </el-form-item>
        <el-form-item label="岗位职责">
          <div v-for="(_, idx) in jobForm.responsibilities" :key="idx" class="mb-8px">
            <el-input v-model="jobForm.responsibilities[idx]" placeholder="请输入岗位职责">
              <template #append>
                <el-button @click="removeResponsibility(idx)" :icon="Delete" />
              </template>
            </el-input>
          </div>
          <el-button type="primary" plain size="small" @click="addResponsibility">
            <Icon icon="ep:plus" /> 添加职责
          </el-button>
        </el-form-item>
        <el-form-item label="任职要求">
          <div v-for="(_, idx) in jobForm.requirements" :key="idx" class="mb-8px">
            <el-input v-model="jobForm.requirements[idx]" placeholder="请输入任职要求">
              <template #append>
                <el-button @click="removeRequirement(idx)" :icon="Delete" />
              </template>
            </el-input>
          </div>
          <el-button type="primary" plain size="small" @click="addRequirement">
            <Icon icon="ep:plus" /> 添加要求
          </el-button>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="jobForm.status" :active-value="1" :inactive-value="0" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="jobDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveJob">保 存</el-button>
      </template>
    </Dialog>

    <!-- 分公司表单 -->
    <Dialog v-model="branchDialogVisible" :title="branchDialogTitle" width="600px">
        <el-form :model="branchForm" label-width="100px">
        <el-form-item label="城市名称" required>
          <el-input v-model="branchForm.city" placeholder="请输入城市/分公司名称" />
        </el-form-item>
        <el-form-item label="详细地址" required>
          <el-input v-model="branchForm.address" placeholder="请输入详细地址" />
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="branchForm.phone" placeholder="请输入联系电话" />
        </el-form-item>
        <el-form-item label="邮政编码">
          <el-input v-model="branchForm.postalCode" placeholder="请输入邮编" />
        </el-form-item>
        <el-form-item label="电子邮箱">
          <el-input v-model="branchForm.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="主题色">
          <el-color-picker v-model="branchForm.themeColor" />
        </el-form-item>
        <el-form-item label="排序号">
          <el-input-number v-model="branchForm.sort" :min="0" />
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="branchForm.status" :active-value="1" :inactive-value="0" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="branchDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveBranch">保 存</el-button>
      </template>
    </Dialog>

    <!-- 图片预览弹窗 -->
    <Dialog v-model="imagePreviewVisible" title="图片预览" width="800px">
      <div class="flex items-center justify-center">
        <el-image
          v-if="imagePreviewUrl"
          :src="imagePreviewUrl"
          fit="contain"
          style="max-width: 100%; max-height: 70vh"
        />
      </div>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
/** 网站内容管理 */
defineOptions({ name: 'OperationsMaintenance' })

import { ref, reactive, computed, onMounted, watch } from 'vue'
import { Delete } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import Dialog from '@/components/Dialog/src/Dialog.vue'
import Pagination from '@/components/Pagination/index.vue'
import Icon from '@/components/Icon/src/Icon.vue'
import { UploadImg, UploadImgs } from '@/components/UploadFile'
import { useMessage } from '@/hooks/web/useMessage'
import * as BannerApi from '@/api/site/banner'
import * as CompanyIntroApi from '@/api/site/company-intro'
import * as MilestoneApi from '@/api/site/company-milestone'
import * as CultureApi from '@/api/site/company-culture'
import * as TeamGalleryApi from '@/api/site/team-gallery'
import * as HonorApi from '@/api/site/honor'
import * as ProductApi from '@/api/site/product'
import * as SolutionApi from '@/api/site/solution'
import * as TechServiceApi from '@/api/site/tech-service'
import * as NewsApi from '@/api/site/news'
import * as AnnouncementApi from '@/api/site/announcement'
import * as JobApi from '@/api/site/job'
import * as BranchContactApi from '@/api/site/branch-contact'

// ==================== Tab 状态 ====================
const activeModule = ref('home')
const homeTab = ref('banner')
const businessTab = ref('selfProduct')
const newsTab = ref('newsList')
const joinTab = ref('job')

// ==================== 图片预览 ====================
const imagePreviewVisible = ref(false)
const imagePreviewUrl = ref('')

/** 打开图片预览弹窗 */
const openImagePreview = (url: string) => {
  imagePreviewUrl.value = url
  imagePreviewVisible.value = true
}

// ==================== Banner ====================
const message = useMessage()
const bannerLoading = ref(false)
const bannerList = ref<BannerApi.BannerRespVO[]>([])
const bannerDialogVisible = ref(false)
const bannerDialogTitle = ref('')
const bannerFormRef = ref<FormInstance>()
const bannerForm = reactive({
  id: undefined as number | undefined,
  image: '',
  title: '',
  subtitle: '',
  sort: 0,
  status: 1
})
const bannerRules: FormRules = {
  title: [{ required: true, message: '请输入主标题', trigger: 'blur' }]
}

/** 获取 Banner 列表 */
const getBannerList = async () => {
  bannerLoading.value = true
  try {
    const data = await BannerApi.getBannerPage({ pageNo: 1, pageSize: 100 })
    bannerList.value = data.list
  } finally {
    bannerLoading.value = false
  }
}

const openBannerForm = (type: string, row?: any) => {
  bannerFormRef.value?.clearValidate()
  if (type === 'update' && row) {
    Object.assign(bannerForm, row)
    bannerDialogTitle.value = '编辑轮播'
  } else {
    Object.assign(bannerForm, {
      id: undefined,
      image: '',
      title: '',
      subtitle: '',
      sort: 0,
      status: 1
    })
    bannerDialogTitle.value = '新增轮播'
  }
  bannerDialogVisible.value = true
}
const saveBanner = async () => {
  try {
    await bannerFormRef.value?.validate()
    if (bannerForm.id) {
      await BannerApi.updateBanner(bannerForm)
      message.success('更新成功')
    } else {
      await BannerApi.createBanner(bannerForm)
      message.success('创建成功')
    }
    bannerDialogVisible.value = false
    getBannerList()
  } catch (error) {
    console.error('保存失败:', error)
  }
}

const handleDeleteBanner = async (row: any) => {
  try {
    await message.confirm(`确定删除轮播「${row.title}」？`)
    await BannerApi.deleteBanner(row.id)
    message.success('删除成功')
    getBannerList()
  } catch (error) {
    console.error('删除失败:', error)
  }
}

// ==================== Tab 懒加载 ====================
/**
 * 各子 Tab 对应的列表加载函数（按数据维度划分）
 * 说明：
 *   1. 自研产品 / 代理产品共用 productList，统一映射到 'business:product'
 *   2. 首次展示招聘信息时，同步加载分公司列表（职位表单的工作地点选项依赖它）
 */
const tabLoaderMap: Record<string, () => Promise<void>> = {
  'home:banner': () => getBannerList(),
  'home:intro': () => getIntroList(),
  'home:milestone': () => getMilestoneList(),
  'home:culture': () => getCultureList(),
  'home:team': () => getTeamList(),
  'home:honor': () => getHonorList(),
  'business:product': () => getProductList(),
  'business:solution': () => getSolutionList(),
  'business:techService': () => getTechServiceList(),
  'news:newsList': () => getNewsList(),
  'news:announcement': () => getAnnouncementList(),
  'join:job': async () => {
    await Promise.all([getJobList(), getBranchList()])
    loadedTabs.add('join:branch')
  },
  'join:branch': () => getBranchList()
}

/** 已加载过的子 Tab key（同一页面会话内不重复请求） */
const loadedTabs = new Set<string>()

/** 当前展示的子 Tab 对应的加载 key */
const activeLoadKey = computed(() => {
  if (activeModule.value === 'home') return `home:${homeTab.value}`
  if (activeModule.value === 'business') {
    // 自研产品、代理产品共用 productList
    return businessTab.value === 'selfProduct' || businessTab.value === 'agentProduct'
      ? 'business:product'
      : `business:${businessTab.value}`
  }
  if (activeModule.value === 'news') return `news:${newsTab.value}`
  if (activeModule.value === 'join') return `join:${joinTab.value}`
  return ''
})

/**
 * 展示哪个子 Tab，才调用该 Tab 下的列表接口
 * 已加载过的 Tab 切回时不重复请求；增删改后由操作回调手动刷新列表
 */
const loadTabData = () => {
  const key = activeLoadKey.value
  if (!key || loadedTabs.has(key)) {
    return
  }
  loadedTabs.add(key)
  tabLoaderMap[key]?.()
}

// 监听外层模块与子 Tab 的切换
watch([activeModule, homeTab, businessTab, newsTab, joinTab], loadTabData)

// 首次进入页面：仅加载默认展示的子 Tab（首页 - Banner）
onMounted(() => {
  loadTabData()
})

// ==================== 公司介绍 ====================
const introLoading = ref(false)
const introList = ref<CompanyIntroApi.CompanyIntroRespVO[]>([])
const introDialogVisible = ref(false)
const introDialogTitle = ref('')
const introFormRef = ref<FormInstance>()
const introForm = reactive({
  id: undefined as number | undefined,
  description: '',
  images: [] as string[],
  version: 1,
  status: 1
})
const introRules: FormRules = {
  description: [{ required: true, message: '请输入公司介绍', trigger: 'blur' }]
}

/** 获取公司介绍列表 */
const getIntroList = async () => {
  introLoading.value = true
  try {
    const data = await CompanyIntroApi.getCompanyIntroPage({ pageNo: 1, pageSize: 100 })
    introList.value = data.list
  } finally {
    introLoading.value = false
  }
}

const openIntroForm = (type: string, row?: any) => {
  introFormRef.value?.clearValidate()
  if (type === 'update' && row) {
    Object.assign(introForm, row)
    introDialogTitle.value = '编辑公司介绍'
  } else {
    Object.assign(introForm, { id: undefined, description: '', images: [], version: 1, status: 1 })
    introDialogTitle.value = '新增版本'
  }
  introDialogVisible.value = true
}
const saveIntro = async () => {
  try {
    await introFormRef.value?.validate()
    if (introForm.id) {
      await CompanyIntroApi.updateCompanyIntro(introForm)
      message.success('更新成功')
    } else {
      await CompanyIntroApi.createCompanyIntro(introForm)
      message.success('创建成功')
    }
    introDialogVisible.value = false
    getIntroList()
  } catch (error) {
    console.error('保存失败:', error)
  }
}
const handleDeleteIntro = async (row: any) => {
  try {
    await message.confirm(`确定删除「版本 v${row.version}」？删除后展示端将回退到下一个有效版本。`)
    await CompanyIntroApi.deleteCompanyIntro(row.id)
    message.success('删除成功')
    getIntroList()
  } catch (error) {
    console.error('删除失败:', error)
  }
}

// ==================== 发展历程 ====================
const milestoneLoading = ref(false)
const milestoneList = ref<MilestoneApi.MilestoneRespVO[]>([])
const milestoneDialogVisible = ref(false)
const milestoneDialogTitle = ref('')
const milestoneFormRef = ref<FormInstance>()
const milestoneForm = reactive({
  id: undefined as number | undefined,
  year: new Date().getFullYear(),
  title: '',
  description: '',
  sort: 0,
  status: 1
})
const milestoneRules: FormRules = {
  year: [{ required: true, message: '请输入年份', trigger: 'blur' }],
  title: [{ required: true, message: '请输入事件标题', trigger: 'blur' }]
}

/** 获取发展历程列表 */
const getMilestoneList = async () => {
  milestoneLoading.value = true
  try {
    const data = await MilestoneApi.getMilestonePage({ pageNo: 1, pageSize: 100 })
    milestoneList.value = data.list
  } finally {
    milestoneLoading.value = false
  }
}

const openMilestoneForm = (type: string, row?: any) => {
  milestoneFormRef.value?.clearValidate()
  if (type === 'update' && row) {
    Object.assign(milestoneForm, row)
    milestoneDialogTitle.value = '编辑事件'
  } else {
    Object.assign(milestoneForm, {
      id: undefined,
      year: new Date().getFullYear(),
      title: '',
      description: '',
      sort: 0,
      status: 1
    })
    milestoneDialogTitle.value = '新增事件'
  }
  milestoneDialogVisible.value = true
}
const saveMilestone = async () => {
  try {
    await milestoneFormRef.value?.validate()
    if (milestoneForm.id) {
      await MilestoneApi.updateMilestone(milestoneForm)
      message.success('更新成功')
    } else {
      await MilestoneApi.createMilestone(milestoneForm)
      message.success('创建成功')
    }
    milestoneDialogVisible.value = false
    getMilestoneList()
  } catch (error) {
    console.error('保存失败:', error)
  }
}
const handleDeleteMilestone = async (row: any) => {
  try {
    await message.confirm(`确定删除「${row.year} ${row.title}」？`)
    await MilestoneApi.deleteMilestone(row.id)
    message.success('删除成功')
    getMilestoneList()
  } catch (error) {
    console.error('删除失败:', error)
  }
}

// ==================== 企业文化 ====================
const cultureLoading = ref(false)
const cultureList = ref<CultureApi.CultureRespVO[]>([])
const cultureDialogVisible = ref(false)
const cultureDialogTitle = ref('')
const cultureFormRef = ref<FormInstance>()
const cultureForm = reactive({
  id: undefined as number | undefined,
  mission: '',
  vision: '',
  values: '',
  version: 1,
  status: 1
})
const cultureRules: FormRules = {
  mission: [{ required: true, message: '请输入公司使命', trigger: 'blur' }],
  vision: [{ required: true, message: '请输入公司愿景', trigger: 'blur' }],
  values: [{ required: true, message: '请输入公司价值观', trigger: 'blur' }]
}

/** 获取企业文化列表 */
const getCultureList = async () => {
  cultureLoading.value = true
  try {
    const data = await CultureApi.getCulturePage({ pageNo: 1, pageSize: 100 })
    cultureList.value = data.list
  } finally {
    cultureLoading.value = false
  }
}

const openCultureForm = (type: string, row?: any) => {
  cultureFormRef.value?.clearValidate()
  if (type === 'update' && row) {
    Object.assign(cultureForm, row)
    cultureDialogTitle.value = '编辑企业文化'
  } else {
    Object.assign(cultureForm, {
      id: undefined,
      mission: '',
      vision: '',
      values: '',
      version: 1,
      status: 1
    })
    cultureDialogTitle.value = '新增版本'
  }
  cultureDialogVisible.value = true
}
const saveCulture = async () => {
  try {
    await cultureFormRef.value?.validate()
    if (cultureForm.id) {
      await CultureApi.updateCulture(cultureForm)
      message.success('更新成功')
    } else {
      await CultureApi.createCulture(cultureForm)
      message.success('创建成功')
    }
    cultureDialogVisible.value = false
    getCultureList()
  } catch (error) {
    console.error('保存失败:', error)
  }
}
const handleDeleteCulture = async (row: any) => {
  try {
    await message.confirm(`确定删除「${row.mission}」？`)
    await CultureApi.deleteCulture(row.id)
    message.success('删除成功')
    getCultureList()
  } catch (error) {
    console.error('删除失败:', error)
  }
}

// ==================== 员工风采 ====================
const teamLoading = ref(false)
const teamList = ref<TeamGalleryApi.TeamGalleryRespVO[]>([])
const teamDialogVisible = ref(false)
const teamDialogTitle = ref('')
const teamFormRef = ref<FormInstance>()
const teamForm = reactive({
  id: undefined as number | undefined,
  image: '',
  description: '',
  sort: 0,
  status: 1
})

/** 获取员工风采列表 */
const getTeamList = async () => {
  teamLoading.value = true
  try {
    const data = await TeamGalleryApi.getTeamGalleryPage({ pageNo: 1, pageSize: 100 })
    teamList.value = data.list
  } finally {
    teamLoading.value = false
  }
}

const openTeamForm = (type: string, row?: any) => {
  teamFormRef.value?.clearValidate()
  if (type === 'update' && row) {
    Object.assign(teamForm, {
      ...row,
      image: row.image || (row.images && row.images[0]) || ''
    })
    teamDialogTitle.value = '编辑图片'
  } else {
    Object.assign(teamForm, { id: undefined, image: '', description: '', sort: 0, status: 1 })
    teamDialogTitle.value = '新增图片'
  }
  teamDialogVisible.value = true
}
const saveTeam = async () => {
  try {
    await teamFormRef.value?.validate()
    if (!teamForm.image) {
      message.error('请上传图片')
      return
    }
    if (teamForm.id) {
      await TeamGalleryApi.updateTeamGallery(teamForm)
      message.success('更新成功')
    } else {
      await TeamGalleryApi.createTeamGallery(teamForm)
      message.success('创建成功')
    }
    teamDialogVisible.value = false
    getTeamList()
  } catch (error) {
    console.error('保存失败:', error)
  }
}
const handleDeleteTeam = async (row: any) => {
  try {
    await message.confirm(`确定删除该图片？`)
    await TeamGalleryApi.deleteTeamGallery(row.id)
    message.success('删除成功')
    getTeamList()
  } catch (error) {
    console.error('删除失败:', error)
  }
}

// ==================== 资质荣誉 ====================
const honorLoading = ref(false)
const honorList = ref<any[]>([])
const honorDialogVisible = ref(false)
const honorDialogTitle = ref('')
const honorFormRef = ref<FormInstance>()
const honorForm = reactive({
  id: undefined as number | undefined,
  name: '',
  image: '',
  type: 'qualification',
  date: '',
  sort: 0,
  status: 1
})

/** 获取资质荣誉列表 */
const getHonorList = async () => {
  honorLoading.value = true
  try {
    const data = await HonorApi.getHonorPage({ pageNo: 1, pageSize: 100 })
    honorList.value = data.list
  } finally {
    honorLoading.value = false
  }
}

const openHonorForm = (type: string, row?: any) => {
  honorFormRef.value?.clearValidate()
  if (type === 'update' && row) {
    Object.assign(honorForm, {
      ...row,
      image: row.image || (row.images && row.images[0]) || ''
    })
    honorDialogTitle.value = '编辑荣誉'
  } else {
    Object.assign(honorForm, {
      id: undefined,
      name: '',
      image: '',
      type: 'qualification',
      date: '',
      sort: 0,
      status: 1
    })
    honorDialogTitle.value = '新增荣誉'
  }
  honorDialogVisible.value = true
}
const saveHonor = async () => {
  try {
    await honorFormRef.value?.validate()
    if (!honorForm.image) {
      message.error('请上传证书图片')
      return
    }
    if (honorForm.id) {
      await HonorApi.updateHonor(honorForm)
      message.success('更新成功')
    } else {
      await HonorApi.createHonor(honorForm)
      message.success('创建成功')
    }
    honorDialogVisible.value = false
    getHonorList()
  } catch (error) {
    console.error('保存失败:', error)
  }
}
const handleDeleteHonor = async (row: any) => {
  try {
    await message.confirm(`确定删除荣誉「${row.name}」？`)
    await HonorApi.deleteHonor(row.id)
    message.success('删除成功')
    getHonorList()
  } catch (error) {
    console.error('删除失败:', error)
  }
}

// ==================== 产品 ====================
const productLoading = ref(false)
const productList = ref<any[]>([])
const productDialogVisible = ref(false)
const productDialogTitle = ref('')
const productFormRef = ref<FormInstance>()
const productForm = reactive({
  id: undefined as number | undefined,
  name: '',
  image: '',
  type: 'self',
  summary: '',
  description: '',
  features: [] as string[],
  scenarios: [] as string[],
  sort: 0,
  status: 1
})
const filteredProductList = computed(() => (type: string) => {
  return productList.value.filter((item) => item.type === type)
})
const openProductForm = (type: string, productType: string, row?: any) => {
  if (type === 'update' && row) {
    Object.assign(productForm, row)
    productDialogTitle.value = '编辑产品'
  } else {
      Object.assign(productForm, {
        id: undefined,
        name: '',
        image: '',
        type: productType,
      summary: '',
      description: '',
      features: [],
      scenarios: [],
      sort: 0,
      status: 1
    })
    productDialogTitle.value = '新增产品'
  }
  productDialogVisible.value = true
}
/** 获取产品列表（自研 + 代理） */
const getProductList = async () => {
  productLoading.value = true
  try {
    const data = await ProductApi.getProductPage({ pageNo: 1, pageSize: 100 })
    productList.value = data.list
  } finally {
    productLoading.value = false
  }
}

const addFeature = () => productForm.features.push('')
const removeFeature = (idx: number) => productForm.features.splice(idx, 1)
const addScenario = () => productForm.scenarios.push('')
const removeScenario = (idx: number) => productForm.scenarios.splice(idx, 1)
const saveProduct = async () => {
  try {
    await productFormRef.value?.validate()
      if (!productForm.image) {
        message.error('请上传产品图片')
        return
      }
    if (productForm.id) {
      await ProductApi.updateProduct(productForm)
      message.success('更新成功')
    } else {
      await ProductApi.createProduct(productForm)
      message.success('创建成功')
    }
    productDialogVisible.value = false
    getProductList()
  } catch (error) {
    console.error('保存失败:', error)
  }
}
const handleDeleteProduct = async (row: any) => {
  try {
    await message.confirm(`确定删除产品「${row.name}」？`)
    await ProductApi.deleteProduct(row.id)
    message.success('删除成功')
    getProductList()
  } catch (error) {
    console.error('删除失败:', error)
  }
}

// ==================== 解决方案 ====================
const solutionLoading = ref(false)
const solutionList = ref<any[]>([])
const solutionDialogVisible = ref(false)
const solutionDialogTitle = ref('')
const solutionFormRef = ref<FormInstance>()
const solutionForm = reactive({
  id: undefined as number | undefined,
  name: '',
  image: '',
  industry: '',
  summary: '',
  description: '',
  demandAnalysis: '',
  sort: 0,
  status: 1
})

/** 获取解决方案列表 */
const getSolutionList = async () => {
  solutionLoading.value = true
  try {
    const data = await SolutionApi.getSolutionPage({ pageNo: 1, pageSize: 100 })
    solutionList.value = data.list
  } finally {
    solutionLoading.value = false
  }
}
const openSolutionForm = (type: string, row?: any) => {
  if (type === 'update' && row) {
    Object.assign(solutionForm, row)
    solutionDialogTitle.value = '编辑方案'
  } else {
    Object.assign(solutionForm, {
      id: undefined,
      name: '',
      image: '',
      industry: '',
      summary: '',
      description: '',
      demandAnalysis: '',
      sort: 0,
      status: 1
    })
    solutionDialogTitle.value = '新增方案'
  }
  solutionDialogVisible.value = true
}
const saveSolution = async () => {
  try {
    await solutionFormRef.value?.validate()
    if (!solutionForm.image) {
      message.error('请上传方案封面')
      return
    }
    if (solutionForm.id) {
      await SolutionApi.updateSolution(solutionForm)
      message.success('更新成功')
    } else {
      await SolutionApi.createSolution(solutionForm)
      message.success('创建成功')
    }
    solutionDialogVisible.value = false
    getSolutionList()
  } catch (error) {
    console.error('保存失败:', error)
  }
}
const handleDeleteSolution = async (row: any) => {
  try {
    await message.confirm(`确定删除解决方案「${row.name}」？`)
    await SolutionApi.deleteSolution(row.id)
    message.success('删除成功')
    getSolutionList()
  } catch (error) {
    console.error('删除失败:', error)
  }
}

// ==================== 技术服务 ====================
const techServiceLoading = ref(false)
const techServiceList = ref<any[]>([])
const techServiceDialogVisible = ref(false)
const techServiceDialogTitle = ref('')
const techServiceFormRef = ref<FormInstance>()
const techServiceForm = reactive({
  id: undefined as number | undefined,
  industry: '',
  icon: '',
  description: '',
  sort: 0,
  status: 1
})

/** 获取技术服务列表 */
const getTechServiceList = async () => {
  techServiceLoading.value = true
  try {
    const data = await TechServiceApi.getTechServicePage({ pageNo: 1, pageSize: 100 })
    techServiceList.value = data.list
  } finally {
    techServiceLoading.value = false
  }
}
// 技术服务图标可选值（与展示端 TechServiceSection 的 iconMap 一一对应）
const techServiceIconOptions = [
  { value: 'ri-government-line', label: '政务', industry: '政务' },
  { value: 'ri-book-read-line', label: '教育', industry: '教育' },
  { value: 'ri-heart-pulse-line', label: '医疗', industry: '医疗' },
  { value: 'ri-bank-line', label: '金融', industry: '金融' },
  { value: 'ri-settings-3-line', label: '制造业', industry: '制造业' },
  { value: 'ri-service-line', label: '服务业', industry: '服务业' }
]
// 选择行业时自动带出对应图标（仍可手动调整）
const handleTechServiceIndustryChange = (industry: string) => {
  const matched = techServiceIconOptions.find((item) => item.industry === industry)
  if (matched) {
    techServiceForm.icon = matched.value
  }
}

const openTechServiceForm = (type: string, row?: any) => {
  if (type === 'update' && row) {
    Object.assign(techServiceForm, row)
    techServiceDialogTitle.value = '编辑技术服务'
  } else {
    Object.assign(techServiceForm, {
      id: undefined,
      industry: '',
      icon: '',
      description: '',
      sort: 0,
      status: 1
    })
    techServiceDialogTitle.value = '新增技术服务'
  }
  techServiceDialogVisible.value = true
}
const saveTechService = async () => {
  try {
    await techServiceFormRef.value?.validate()
    if (techServiceForm.id) {
      await TechServiceApi.updateTechService(techServiceForm)
      message.success('更新成功')
    } else {
      await TechServiceApi.createTechService(techServiceForm)
      message.success('创建成功')
    }
    techServiceDialogVisible.value = false
    getTechServiceList()
  } catch (error) {
    console.error('保存失败:', error)
  }
}
const handleDeleteTechService = async (row: any) => {
  try {
    await message.confirm(`确定删除技术服务「${row.industry}」？`)
    await TechServiceApi.deleteTechService(row.id)
    message.success('删除成功')
    getTechServiceList()
  } catch (error) {
    console.error('删除失败:', error)
  }
}

// ==================== 新闻 ====================
const newsLoading = ref(false)
const newsList = ref<any[]>([])
const newsTotal = ref(0)
const newsQueryParams = reactive({ pageNo: 1, pageSize: 10 })
const newsDialogVisible = ref(false)
const newsDialogTitle = ref('')
const newsFormRef = ref<FormInstance>()
const newsForm = reactive({
  id: undefined as number | undefined,
  title: '',
  cover: '',
  summary: '',
  content: '',
  author: '',
  publishDate: '',
  status: 1
})
const getNewsList = async () => {
  newsLoading.value = true
  try {
    const data = await NewsApi.getNewsPage(newsQueryParams)
    newsList.value = data.list
    newsTotal.value = data.total
  } finally {
    newsLoading.value = false
  }
}
const openNewsForm = (type: string, row?: any) => {
  newsFormRef.value?.clearValidate()
  if (type === 'update' && row) {
    Object.assign(newsForm, row)
    newsDialogTitle.value = '编辑新闻'
  } else {
    Object.assign(newsForm, {
      id: undefined,
      title: '',
      cover: '',
      summary: '',
      content: '',
      author: '',
      publishDate: '',
      status: 1
    })
    newsDialogTitle.value = '新增新闻'
  }
  newsDialogVisible.value = true
}
const saveNews = async () => {
  try {
    await newsFormRef.value?.validate()
    if (!newsForm.title) {
      message.error('请输入新闻标题')
      return
    }
    if (newsForm.id) {
      await NewsApi.updateNews(newsForm)
      message.success('更新成功')
    } else {
      await NewsApi.createNews(newsForm)
      message.success('创建成功')
    }
    newsDialogVisible.value = false
    getNewsList()
  } catch (error) {
    console.error('保存失败:', error)
  }
}
const handleDeleteNews = async (row: any) => {
  try {
    await message.confirm(`确定删除新闻「${row.title}」？`)
    await NewsApi.deleteNews(row.id)
    message.success('删除成功')
    getNewsList()
  } catch (error) {
    console.error('删除失败:', error)
  }
}

// ==================== 公告 ====================
const announcementLoading = ref(false)
const announcementList = ref<any[]>([])
const announcementTotal = ref(0)
const announcementQueryParams = reactive({ pageNo: 1, pageSize: 10 })
const announcementDialogVisible = ref(false)
const announcementDialogTitle = ref('')
const announcementFormRef = ref<FormInstance>()
const announcementForm = reactive({
  id: undefined as number | undefined,
  title: '',
  summary: '',
  content: '',
  publishDate: '',
  important: 0,
  status: 1
})
const getAnnouncementList = async () => {
  announcementLoading.value = true
  try {
    const data = await AnnouncementApi.getAnnouncementPage(announcementQueryParams)
    announcementList.value = data.list
    announcementTotal.value = data.total
  } finally {
    announcementLoading.value = false
  }
}
const openAnnouncementForm = (type: string, row?: any) => {
  announcementFormRef.value?.clearValidate()
  if (type === 'update' && row) {
    Object.assign(announcementForm, row)
    announcementDialogTitle.value = '编辑公告'
  } else {
    Object.assign(announcementForm, {
      id: undefined,
      title: '',
      summary: '',
      content: '',
      publishDate: '',
      important: 0,
      status: 1
    })
    announcementDialogTitle.value = '新增公告'
  }
  announcementDialogVisible.value = true
}
const saveAnnouncement = async () => {
  try {
    await announcementFormRef.value?.validate()
    if (!announcementForm.title) {
      message.error('请输入公告标题')
      return
    }
    if (announcementForm.id) {
      await AnnouncementApi.updateAnnouncement(announcementForm)
      message.success('更新成功')
    } else {
      await AnnouncementApi.createAnnouncement(announcementForm)
      message.success('创建成功')
    }
    announcementDialogVisible.value = false
    getAnnouncementList()
  } catch (error) {
    console.error('保存失败:', error)
  }
}
const handleDeleteAnnouncement = async (row: any) => {
  try {
    await message.confirm(`确定删除公告「${row.title}」？`)
    await AnnouncementApi.deleteAnnouncement(row.id)
    message.success('删除成功')
    getAnnouncementList()
  } catch (error) {
    console.error('删除失败:', error)
  }
}

// ==================== 招聘 ====================
const jobLoading = ref(false)
const jobList = ref<any[]>([])
const jobDialogVisible = ref(false)
const jobDialogTitle = ref('')
/** 获取职位列表 */
const getJobList = async () => {
  jobLoading.value = true
  try {
    const data = await JobApi.getJobPage({ pageNo: 1, pageSize: 100 })
    jobList.value = data.list
  } finally {
    jobLoading.value = false
  }
}
const jobForm = reactive({
  id: undefined as number | undefined,
  title: '',
  location: '',
  department: '',
  type: '全职',
  urgent: 0,
  responsibilities: [] as string[],
  requirements: [] as string[],
  headcount: 1,
  status: 1
})
const branchCityOptions = computed(() => {
  return branchList.value.map((b) => b.city)
})
const addResponsibility = () => jobForm.responsibilities.push('')
const removeResponsibility = (idx: number) => jobForm.responsibilities.splice(idx, 1)
const addRequirement = () => jobForm.requirements.push('')
const removeRequirement = (idx: number) => jobForm.requirements.splice(idx, 1)
const openJobForm = (type: string, row?: any) => {
  if (type === 'update' && row) {
    Object.assign(jobForm, row)
    jobDialogTitle.value = '编辑职位'
  } else {
    Object.assign(jobForm, {
      id: undefined,
      title: '',
      location: '',
      department: '',
      type: '全职',
      urgent: 0,
      responsibilities: [],
      requirements: [],
      headcount: 1,
      status: 1
    })
    jobDialogTitle.value = '新增职位'
  }
  jobDialogVisible.value = true
}
const saveJob = async () => {
  try {
    if (jobForm.id) {
      await JobApi.updateJob(jobForm)
      message.success('更新成功')
    } else {
      await JobApi.createJob(jobForm)
      message.success('创建成功')
    }
    jobDialogVisible.value = false
    getJobList()
  } catch (error) {
    console.error('保存失败:', error)
  }
}
const handleDeleteJob = async (row: any) => {
  try {
    await message.confirm(`确定删除职位「${row.title}」？`)
    await JobApi.deleteJob(row.id)
    message.success('删除成功')
    getJobList()
  } catch (error) {
    console.error('删除失败:', error)
  }
}

// ==================== 分公司 ====================
const branchLoading = ref(false)
const branchList = ref<any[]>([])
const branchDialogVisible = ref(false)
const branchDialogTitle = ref('')
/** 获取分公司列表 */
const getBranchList = async () => {
  branchLoading.value = true
  try {
    const data = await BranchContactApi.getBranchContactPage({ pageNo: 1, pageSize: 100 })
    branchList.value = data.list
  } finally {
    branchLoading.value = false
  }
}
const branchForm = reactive({
  id: undefined as number | undefined,
  city: '',
  address: '',
  phone: '',
  postalCode: '',
  email: '',
  themeColor: '#409eff',
  sort: 0,
  status: 1
})
const openBranchForm = (type: string, row?: any) => {
  if (type === 'update' && row) {
    Object.assign(branchForm, row)
    branchDialogTitle.value = '编辑分公司'
  } else {
    Object.assign(branchForm, {
      id: undefined,
      city: '',
      address: '',
      phone: '',
      postalCode: '',
      email: '',
      themeColor: '#409eff',
      sort: 0,
      status: 1
    })
    branchDialogTitle.value = '新增分公司'
  }
  branchDialogVisible.value = true
}
const saveBranch = async () => {
  try {
    if (branchForm.id) {
      await BranchContactApi.updateBranchContact(branchForm)
      message.success('更新成功')
    } else {
      await BranchContactApi.createBranchContact(branchForm)
      message.success('创建成功')
    }
    branchDialogVisible.value = false
    getBranchList()
  } catch (error) {
    console.error('保存失败:', error)
  }
}
const handleDeleteBranch = async (row: any) => {
  try {
    await message.confirm(`确定删除分公司「${row.city}」？`)
    await BranchContactApi.deleteBranchContact(row.id)
    message.success('删除成功')
    getBranchList()
  } catch (error) {
    console.error('删除失败:', error)
  }
}
</script>

<style lang="scss" scoped>
.content-tabs {
  :deep(.el-tabs__item) {
    font-size: 14px;
  }
}
.sub-tabs {
  :deep(.el-tabs__item) {
    text-align: left !important;
    padding: 0 16px !important;
  }
}
</style>
