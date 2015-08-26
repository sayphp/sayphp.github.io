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
        
    };
    $this.index = function(){//获取首页
        
    }
    $this.list = function(){//获取列表
        
    }
    $this.page = function(file){//获取单页
        
    }
    
    $this.addListen = function(){//监听事件
        $('header').delegate('.index', 'click', function(){//首页
            
        });
        $('main').delegate('.list', 'click', function(){//列表
            var cat = $(this).attr('cat');
            $this.list(cat);
        }).delegate('.page', 'click', function(){//单页
            var title = $(this).attr('title');
            $this.page(title);
        });
    }
    
}


