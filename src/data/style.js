layui.use(['table', 'dropdown'], function () {
    var table = layui.table;
    var dropdown = layui.dropdown;


    // 创建渲染实例
    table.render({

        /* parseData: function (res) {
            console.log(res);
            return {
                "code": 0,
                "msg": "",
                "count": 1000,
                "data": res
            }
        }, */
        elem: '#test',
        url: 'http://api.hgame.store/', // 此处为静态模拟数据，实际使用时需换成真实接口
        toolbar: '#toolbarDemo',
        defaultToolbar: ['filter', 'exports', 'print', { // 右上角工具图标
            title: '提示',
            layEvent: 'LAYTABLE_TIPS',
            icon: 'layui-icon-tips',
            onClick: function (obj) { // 2.9.12+
                layer.alert('请勿恶意下载分发');
            }
        }],

        css: [ // 重设当前表格样式
            '.layui-table-tool-temp{padding-right: 145px;}'
        ].join(''),
        cellMinWidth: 80,
        // 开启并输出合计行前端合计结果
        totalRow: true,
        // 开启并输出合计行自定义模板。此处 TOTAL_NUMS 即为合计结果的固定特定字段
        totalRow: '{{= d.TOTAL_NUMS }} 单位',
        // 取整或其他运算
        totalRow: '{{= parseInt(d.TOTAL_NUMS) }}',
        /*  id: 'textreload',//这个是重点** */
        totalRow: true, // 开启合计行
        method: 'get',
        page: true, //开启分页
        //其他分页用到的参数按自已需求填写，例如下面这样
        limits: [10, 20, 50],
        limit: 10, //每页默认显示的数量 
        cols: [[
            /* { type: 'checkbox', fixed: 'left' }, */
            { field: 'id', fixed: 'left', width: '10%', title: 'ID', sort: true, totalRow: '合计：' },
            { field: 'name', title: '名称', width: '40%', totalRow: '' },
            /* { field: 'sign', title: '备注', minWidth: 260, expandedWidth: 260, totalRow: '' }, */
            /* { field: 'size', width: 120, title: '文件大小', sort: true, totalRow: '共{{= d.TOTAL_NUMS }} GB😊' }, */
            { field: 'size', /* maxWidth: 180, */ width: '15%', title: '文件大小', templet: '<div>{{= d.size }}GB</div>', totalRow: '共{{= d.TOTAL_NUMS }} GB😊', },
            /* { field: 'url', title: '链接', width: 120 }, */
            { field: 'joinTime', title: '日期', /* maxWidth: 180, */ width: '15%', },
            { fixed: 'right', title: '操作', width: '20%', toolbar: '#barDemo' }
        ]],
        /*  defaultToolbar: ['filter', 'print', 'exports'],
         id: 'textreload', *///这个是重点**,
        /*         response: {
                    statusCode: 0
                }, */
        /*         parseData: function (res) {
        
                    return { //layui  JSON格式
                        "code": res.status, //解析接口状态
                        "msg": res.message, //解析提示文本
                        "count": res.total, //解析数据长度
                        "data": res.rows.item //解析数据列表
                    }
        
                }, */

        done: function () {
            var id = this.id;
            // 下拉按钮测试
            /*  dropdown.render({
                 elem: '#dropdownButton', // 可绑定在任意元素中，此处以上述按钮为例
                 data: [{
                     id: 'add',
                     title: '添加'
                 }, {
                     id: 'update',
                     title: '编辑'
                 }, {
                     id: 'delete',
                     title: '删除'
                 }],
                 // 菜单被点击的事件
                 click: function (obj) {
                     var checkStatus = table.checkStatus(id)
                     var data = checkStatus.data; // 获取选中的数据
                     switch (obj.id) {
                         case 'add':
                             layer.open({
                                 title: '添加',
                                 type: 1,
                                 area: ['80%', '80%'],
                                 content: '<div style="padding: 16px;">自定义表单元素</div>'
                             });
                             break;
                         case 'update':
                             if (data.length !== 1) return layer.msg('请选择一行');
                             layer.open({
                                 title: '编辑',
                                 type: 1,
                                 area: ['80%', '80%'],
                                 content: '<div style="padding: 16px;">自定义表单元素</div>'
                             });
                             break;
                         case 'delete':
                             if (data.length === 0) {
                                 return layer.msg('请选择一行');
                             }
                             layer.msg('delete event');
                             break;
                     }
                 }
             }); */

            // 重载测试
            dropdown.render({
                elem: '#reloadTest', // 可绑定在任意元素中，此处以上述按钮为例
                data: [{
                    id: 'reload',
                    title: '重载'
                }, {
                    id: 'reload-deep',
                    title: '重载 - 参数叠加'
                }/* , {
                    id: 'reloadData',
                    title: '仅重载数据'
                }, {
                    id: 'reloadData-deep',
                    title: '仅重载数据 - 参数叠加'
                } */],
                // 菜单被点击的事件
                click: function (obj) {
                    switch (obj.id) {
                        case 'reload':
                            // 重载 - 默认（参数重置）
                            table.reload('test', {
                                where: {
                                    /* abc: '123456', */
                                    //test: '新的 test2',
                                    //token: '新的 token2'
                                },
                                /*
                                cols: [[ // 重置表头
                                  {type: 'checkbox', fixed: 'left'},
                                  {field:'id', title:'ID', width:80, fixed: 'left', unresize: true, sort: true, totalRow: '合计：'},
                                  {field:'sex', title:'性别', width:80, edit: 'text', sort: true},
                                  {field:'experience', title:'积分', width:80, sort: true, totalRow: true, templet: '<div>{{= d.experience }} 分</div>'},
                                  {field:'logins', title:'登入次数', width:100, sort: true, totalRow: true},
                                  {field:'joinTime', title:'加入时间', width:120}
                                ]]
                                */
                            });
                            break;
                        case 'reload-deep':
                            // 重载 - 深度（参数叠加）
                            table.reload('test', {
                                where: {
                                    /* abc: 123, */
                                    test: '新的 test1'
                                },
                                //defaultToolbar: ['print'], // 重载头部工具栏右侧图标
                                //cols: ins1.config.cols
                            }, true);
                            break;
                        case 'reloadData':
                            // 数据重载 - 参数重置
                            table.reloadData('test', {
                                where: {
                                    /*  abc: '123456', */
                                    //test: '新的 test2',
                                    //token: '新的 token2'
                                },
                                scrollPos: 'fixed',  // 保持滚动条位置不变 - v2.7.3 新增
                                height: 2000, // 测试无效参数（即与数据无关的参数设置无效，此处以 height 设置无效为例）
                                //url: '404',
                                //page: {curr: 1, limit: 30} // 重新指向分页
                            });
                            break;
                        case 'reloadData-deep':
                            // 数据重载 - 参数叠加
                            table.reloadData('test', {
                                where: {
                                    /*     abc: 123, */
                                    test: '新的 test1'
                                }
                            }, true);
                            break;
                    }
                    layer.msg('刷新中(无网络刷新需要重启软件)');
                }
            });
            // 行模式
            dropdown.render({
                elem: '#rowMode',
                data: [{
                    id: 'default-row',
                    title: '默认样式'
                }, {
                    id: 'multi-row',
                    title: '高样式'
                }],
                // 菜单被点击的事件
                click: function (obj) {
                    var checkStatus = table.checkStatus(id)
                    var data = checkStatus.data; // 获取选中的数据
                    switch (obj.id) {
                        case 'default-row':
                            table.reload('test', {
                                lineStyle: null // 恢复单行
                            });
                            layer.msg('已设为默认');
                            break;
                        case 'multi-row':
                            table.reload('test', {
                                // 设置行样式，此处以设置多行高度为例。若为单行，则没必要设置改参数 - 注：v2.7.0 新增
                                lineStyle: 'height: 95px;'
                            });
                            layer.msg('已设为高');
                            break;
                    }
                }
            });
        },
        error: function (res, msg) {
            console.log(res, msg)
        }
    });

    /* 
        var $ = layui.$, active = {
            reload: function () {
                var textdemo = $('#textdemo').val();
                table.reload('textreload', {
                    url: 'http://localhost/sousuo.php',
                    method: 'get',
                    page: {
                        curr: 1 //重新从第 1 页开始
                    },
                    where: {
                        key: textdemo
                    }
                })
    
            }
        }
        $('.chu .layui-btn').on('click', function () {
            var type = $(this).data('type');
    
            if ($('#textdemo').val() == "") {
    
                return false;
            }
            active[type] ? active[type].call(this) : '';
        });
    
     */
    // 工具栏事件
    table.on('toolbar(test)', function (obj) {
        var id = obj.config.id;
        var checkStatus = table.checkStatus(id);
        var othis = lay(this);
        switch (obj.event) {
            case 'getCheckData':
                var data = checkStatus.data;
                layer.alert(layui.util.escape(JSON.stringify(data)));
                break;
            case 'getData':
                var getData = table.getData(id);
                console.log(getData);
                layer.alert(layui.util.escape(JSON.stringify(getData)));
                break;
        };
    });
    // 表头自定义元素工具事件 --- 2.8.8+
    table.on('colTool(test)', function (obj) {
        var event = obj.event;
        console.log(obj);
        if (event === 'email-tips') {
            layer.alert(layui.util.escape(JSON.stringify(obj.col)), {
                title: '当前列属性配置项'
            });
        }
    });

    // 触发单元格工具事件
    table.on('tool(test)', function (obj) { // 双击 toolDouble
        var data = obj.data; // 获得当前行数据
        console.log(obj)
        if (obj.event === 'edit') {
            layer.open({

                title: data.name,
                type: 1,
                area: ['60%', '60%'],
                /* content: "<div class='chakan'> <p>文件备注：" + data.sign + "</p> " +
                    "<button type='button' class='layui-btn guding'  onclick='window.open(" + data.url + ")'><a style='color:#fafafa;' id='baidu' href=" + data.url + " target='_blank'>点击下载</a></button></div>",*/
                content: " <fieldset class='chakan layui-elem-field'><legend>文件备注</legend><div class='layui-field-box'>" + data.sign + "</div></fieldset> ",

            });
        }
        if (obj.event === 'edit1') {
            layer.open({
                type: 3,
                shadeClose: false,
                time: 800,
                title: '第三方链接下载跳转~',
                shadeClose: true,
                maxmin: true, //开启最大化最小化按钮
                btn: onclick = window.open(data.url),
                end: function () {
                    layer.msg('页面跳转完毕，请勿恶意破坏举报资源。');
                }
            });

        }
        /* else if (obj.event === 'more') {
           dropdown.render({
               elem: this, // 触发事件的 DOM 对象
               show: true, // 外部事件触发即显示
               data: [{
                   title: '查看',
                   id: 'detail'
               }, {
                   title: '删除',
                   id: 'del'
               }],
               click: function (menudata) {
                   if (menudata.id === 'detail') {
                       layer.msg('查看操作，当前行 ID:' + data.id);
                   } else if (menudata.id === 'del') {
                       layer.confirm('真的删除行 [id: ' + data.id + '] 么', function (index) {
                           obj.del(); // 删除对应行（tr）的DOM结构
                           layer.close(index);
                           // 向服务端发送删除指令
                       });
                   }
               },
               align: 'right', // 右对齐弹出
               style: 'box-shadow: 1px 1px 10px rgb(0 0 0 / 12%);' // 设置额外样式
           })
       } */
    });

    // 触发表格复选框选择
    table.on('checkbox(test)', function (obj) {
        console.log(obj)
    });

    // 触发表格单选框选择
    /*                 table.on('radio(test)', function (obj) {
                        console.log(obj)
                    }); */

    // 行单击事件
    table.on('row(test)', function (obj) {
        //console.log(obj);
        //layer.closeAll('tips');
    });
    // 行双击事件
    table.on('rowDouble(test)', function (obj) {
        console.log(obj);
    });

    // 单元格编辑事件
    /*                 table.on('edit(test)', function (obj) {
                        var field = obj.field; // 得到字段
                        var value = obj.value; // 得到修改后的值
                        var data = obj.data; // 得到所在行所有键值
                        // 值的校验
                        if (field === 'email') {
                            if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(obj.value)) {
                                layer.tips('输入的邮箱格式不正确，请重新编辑', this, { tips: 1 });
                                return obj.reedit(); // 重新编辑 -- v2.8.0 新增
                            }
                        }
                        // 编辑后续操作，如提交更新请求，以完成真实的数据更新
                        // …
                        layer.msg('编辑成功', { icon: 1 });
    
                        // 其他更新操作
                        var update = {};
                        update[field] = value;
                        obj.update(update);
                    }); */
});



//JS 
layui.use(['element', 'layer', 'util'], function () {
    var element = layui.element;
    var layer = layui.layer;
    var util = layui.util;
    var $ = layui.$;

    //头部事件
    util.event('lay-header-event', {
        menuLeft: function (othis) { // 左侧菜单事件
            layer.msg('展开左侧菜单的操作', { icon: 0 });
        },
        menuRight: function () {  // 右侧菜单事件
            layer.open({
                type: 1,
                title: '公告',
                closeBtn: 0,
                content: '<blockquote class="chakan2 layui-elem-quote layui-quote-nm">本分享网站作者为JiuLiu | B站:久流_BILI | 聊天分享QQ群:971032360(资源寄了群里找我)</blockquote>',
                area: ['500px', '100%'],
                offset: 'lt',
                anim: 'slideRight', // 从右侧抽屉滑出
                shadeClose: true,
                scrollbar: false
            });
        }
    });
});
layui.use(function () {
    var laypage = layui.laypage;
    // 普通用法
    laypage.render({
        elem: 'demo-laypage-normal-1',
        count: 50 // 数据总数
    });
    laypage.render({
        elem: 'demo-laypage-normal-2',
        count: 100 // 数据总数
    });
});
layui.use(function () {
    var carousel = layui.carousel;
    // 渲染 - 常规轮播
    carousel.render({
        elem: '#ID-carousel-demo-1',
        width: 'auto'
    });

    // 渲染 - 设置时间间隔、动画类型、宽高度等属性
    carousel.render({
        elem: '#ID-carousel-demo-2',
        interval: 1800,
        anim: 'fade',
        width: 'auto',
        height: '120px'
    });
});
layui.use(function () {
    var util = layui.util;
    // 自定义固定条
    util.fixbar({
        bars: [/* {
            type: 'help',
            icon: 'layui-icon-help'
        }, */ {
                type: 'QQ群:971032360',
                content: '群',
                style: 'font-size: 21px;'

            }],
        // bar1: true,
        // bar2: true,
        // default: false, // 是否显示默认的 bar 列表 --  v2.8.0 新增
        // bgcolor: '#393D52', // bar 的默认背景色
        // css: {right: 100, bottom: 100},
        // target: '#target-test', // 插入 fixbar 节点的目标元素选择器
        duration: 300, // top bar 等动画时长（毫秒）
        on: { // 任意事件 --  v2.8.0 新增
            mouseenter: function (type) {
                layer.tips(type, this, {
                    tips: 4,
                    fixed: true,

                });
                /*    console.log(type); */
            },

            mouseleave: function (type) {
                layer.closeAll('tips');
            }
        },
        // 点击事件
        click: function (type) {
            console.log(this, type);
            // layer.msg(type);
        }
    });
});
