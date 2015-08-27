/*
 * sayphp博客js
 * 需要jquery支持
 */
var sayphp = function(){
    var $this = this;
    $this.host;//请求git资源服务器
    $this.user;//请求git资源用户
    $this.repos;//请求git资源
    $this.act;//请求行为index,list,page
    $this.base64;//base64转码
    $this.md;//markdown
    
    $this.init = function(){//初始化方法
        $this.addListen();
        
        $this.cat();
        $this.index();
    };
    //首页
    $this.index = function(){//获取首页
        $this.latest();
    }
    //最新
    $this.latest = function(){
        var url = $this.host + '/repos/' + $this.user + '/' + $this.repos + '/commits';
        $.ajax({
            url:url,//获取文件
            beforeSend:function(){
                $('html').addClass('loading');
            },
            success:function(d){
                var len = d.length;
                var x = 0;
                for(var i in d){
                    if(d[i].type=='dir'){
                        content += '<a class="list" cat="' + d[i].path + '">' + d[i].name + '</a>';
                    }
                    if(x==0) var start = d[i];
                    if(x==len-1) var end = d[i];
                    x++;
                }
                $.ajax({
                        url:$this.host + '/repos/' + $this.user + '/' + $this.repos + '/compare/'+ end.sha + '...' + start.sha,
                        success:function(d){
                            console.log(d);
                            var content = '<ul class="sayphp-list">最新文章';
                            for(var z in d.files){
                                content += '<li class="page" title="' + d.files[z].filename + '">' + d.files[z].filename + '</li>';
                            }
                            content += '</ul>';
                            $('#article').html(content);
                        }
                    });
               
            },
            complete:function(){
                $('html').removeClass('loading');
            }
        });
    };
    //分类
    $this.cat = function(){
        var url = $this.host + '/repos/' + $this.user + '/' + $this.repos + '/contents';
        $.ajax({
            url:url,//获取文件
            beforeSend:function(){
                $('html').addClass('loading');
            },
            success:function(d){
                var content = '<div class="sayphp-tag">';
                for(var i in d){
                    if(d[i].type=='dir'){
                        content += '<a class="list" cat="' + d[i].path + '">' + d[i].name + '</a>';
                    }
//                    console.log(d[i]);
                }
                content += '<li class="clear"></li></ul>';
                $('mark').html($this.md.makeHtml(content));
            },
            complete:function(){
                $('html').removeClass('loading');
            }
        });
    };
    //列表
    $this.list = function(cat){//获取列表
        var url = $this.host + '/repos/' + $this.user + '/' + $this.repos + '/contents/' + cat;
        $.ajax({
            url:url,//获取文件
            beforeSend:function(){
                $('html').addClass('loading');
            },
            success:function(d){
                var content = '<ul class="sayphp-list">分类' + cat + '：';
                console.log(d);
                for(var i in d){
                    content += '<li class="page" title="' + d[i].path + '">' + d[i].name + '</li>';
                }
                $('#article').html(content);
            },
            complete:function(){
                $('html').removeClass('loading');
            }
        });
    };
    //单页
    $this.page = function(file){//获取单页
        var url = $this.host + '/repos/' + $this.user + '/' + $this.repos + '/contents/' + file;
        $.ajax({
            url:url,//获取文件
            beforeSend:function(){
                $('html').addClass('loading');
            },
            success:function(d){
                console.log(d);
                var str = $this.base64.decode(d.content);
                $('#article').html($this.md.makeHtml(str));
            },
            complete:function(){
                $('html').removeClass('loading');
            }
        });
    };
    $this.addListen = function(){//监听事件
        $('header').delegate('.index', 'click', function(){//首页
            $this.index();
        });
        $('main').delegate('.list', 'click', function(){//列表
            var cat = $(this).attr('cat');
            $this.list(cat);
        }).delegate('.page', 'click', function(){//单页
            var title = $(this).attr('title');
            $this.page(title);
        });
    };
    $this.init();
}

//*配置blog
sayphp.prototype = {
    host: 'https://api.github.com',
    user: 'sayphp',
    repos: 'book',
    base64: Base64,
    md: new showdown.Converter({tables:'true',}),
    
};
var blog = new sayphp();
