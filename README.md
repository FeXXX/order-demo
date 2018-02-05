##项目介绍
  ###项目简介
  ######这是我根据项目文件夹中的resource中的设计图写的一份功能较为简单的点餐SPA页面。
  
  ###项目启动说明
  ######下载后，在项目主目录下命令行窗口
  ######安装依赖 `cnpm install`
  ######启动服务器和热加载 `npm run dev`
  ######打包 `npm run build`
  
  ###主要内容
  ######1、载入时的一张倒计时页面（其实就是我的简历233）
  ######2、主页面主要包含了头部块、导航栏、内容块、购物车信息块
  ######3、头部块包含了商家的基本信息、公告信息、以及一个公告弹出层
  ######4、导航栏控制内容块中的商品、评论、商家三大块的内容切换
  ######5、内容块包含了商品块（商品简介、商品详情、购买功能）、评论块（商家商品评价、用户评论、用户评论筛选功能）、商家块（商家信息、公告、实景图片等）
  ######6、购物车信息快（点选的商品计数、点选的商品列表）
  
  ###主要组件功能
  ######1、简历块--载入时显示简历页，倒数5秒后自动关闭，或者点击关闭按钮直接关闭;点击暂定按钮可暂停倒计时，再按一次继续倒计时
  ######2、头部块--点击公告信息弹出公告信息详情页，点击详情页下方关闭按钮关闭详情页
  ######3、导航栏--分别点击商品、评论、商家按钮，切换内容块对应的内容
  ######4、商品块--点击激活左侧菜单栏内分类按钮、右侧商品列会滚动到对应的分类商品内容；滚动右侧商品列表时，左侧菜单栏会根据滚动位置激活对应的按钮位置，当激活的按钮超出的展示区域，菜单列对应会滚动以显示该按钮；点击商品信息块，会弹出该商品的信息详情页；商品信息块中，点击加减按钮会将商品加入购物车中；
  ######5、商品详情快--点击左上角返回按钮可退回上平内容块；点击加入购物车按钮，可激活加减按钮，点击加减按钮将该商品加入购物车；点击商品评价中的“全部”、“推荐”、“吐槽”可筛选下方评论内容；点击“只看有内容的评价”可将没有文字的评价筛选掉
  ######6、评价快--点击“全部”“推荐”“吐槽”可切换对应的评价内容，点击“只看有内容的评价”可将没有文字的评价筛选掉
  ######7、商家块--点击“收藏”块，可切换收藏状态；点击商家图片可弹出对应图片的大图；点击大图任意位置关闭该图
  ######8、购物车信息块--根据点击的商品计算并展示数量和总价；当商品数量大于0时，激活购物车详情展示按钮；提交按钮根据当前商品总价显示对应提交状态，当总价大于一定值才会被激活；
  ######9、购物车详情快--展示当前选中的商品名字，数量和总价；点击购物车图片或者后方遮罩层，关闭购物车详情页；点击商品对应的加减按钮可改变改商品的购买情况；点击“清空”按钮可清空当前购物车里所有的商品；当购物车内容为空时，会关闭购物车详情页；
  
  ###主要技术栈
  ######1、移动端REM布局方案
  ######2、CSS3动画
  ######3、animate.css动画
  ######3、BootstrapUI组件、图标
  ######4、Vue、Vue-router、axios、Vuex
  ######5、webpack
