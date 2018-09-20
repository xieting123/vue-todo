let vm=new Vue({
    el:'#app',
    data:{
       todo:'',
        hash:'all',
        ary:[{title:'示例',isSelect:false,isShow:false}]
    },
    methods:{
        add(){
            let obj={};
            this.todo=this.todo.trim();
            if(!this.todo) return;
            obj.title=this.todo;
            obj.isSelect=false;
            obj.isShow=false;
            this.ary.push(obj);
            this.todo=""
        },
    remove(cur){
        this.ary=this.ary.filter((item)=>{
            return cur!==item
        })
    },
    show(item){
            item.show=!item.show
    }

},
    directives:{
        focus(el,obj){
            if(obj.value){
                el.focus();
            }
            console.log(arguments);
        }
    },
    computed:{
        count:{
            get(){
                let arr=this.ary.filter((item)=>{
                    return !item.isSelect;
                });
                return arr.length
            },
            set(){}
        },
        todoAry:{
            get(){
                console.log(1);
                localStorage.setItem('mytodo',JSON.stringify(this.ary));
                switch (this.hash){
                    case 'all':
                        return this.ary;
                        break;
                    case 'finished':
                        return this.ary.filter(function (item) {
                            return item.isSelect;                            })

                        break;
                    case 'unfinished':
                        return this.ary.filter((item)=>{
                            return !item.isSelect;
                        })
                        break;
                }
            },
            set(){
            }
        },
    },

    created(){
        this.hash=location.hash.slice(2)||'all';
        let arr=JSON.parse(localStorage.getItem('mytodo')||[]);
        this.ary=arr;
        window.onhashchange=()=>{
            this.hash=location.hash.slice(2)
        }
    },


});