<template>
    <div class="flash-wrap">
         <!-- 快讯 -->
        <div class="index_flash">
            <div class="index_flash_logo">
                <!-- <span class="i_f_l_text" id="title_name">{{title_name}}</span>
                <span class="i_f_l_img" :style="'border-bottom: .5rem solid ' + apiColor"></span>   -->
                <span class="text-sample">快讯</span>    
            </div>
            <div class="box-wrap">
                <ul class="scroll_box" ref="scroll_box" >
                    <li  v-for="item in data" :key="item.id" @click="hit(item.id)">{{item.title}}</li>
                </ul>
            </div>
            <router-link to="Notice" class="More"><span class="text-sample_img">更多</span></router-link>
        </div>
           <!-- 快捷链接 -->
        <div class="index_Ctrl">
            <div class="index_Ctrl_auto">
                <span class="link" @click = "linkTo(item.link,index)" v-for="(item, index) in nav" :key="index">
                    <img :src="URL+item.pic"/>
                    <span>{{item.nav_titile}}</span>
                </span>
            </div>
        </div>
    </div>
</template>
<script>
import qs from "qs"
    export default {
        name: 'newsflash',
        data() {
            return {
                title_name: this.$constant.mainName,
                apiColor: ''
            }
        },
        props:{
            data:null,
            nav:null
        },
        created() {
            this.styColor();
            // setInterval (this.showMarquee, 2000)
        },
        mounted(){
            this.scroll_box();
        },
        methods: {
            showMarquee(){
              this.animate =true;
              setTimeout (() => {
                this.data.push (
                    this.data[0]
                );
                this.data.shift();
                this.animate =false;
              }, 500);
            },
            styColor() {
                this.axios
                .post(this.$httpConfig.StyColor, qs.stringify({
                    token: sessionStorage.getItem("data_token"),
                    store_id:18,
                }))
                .then(res => {
                    this.apiColor = res.data.data.theme_color;
                })
                .catch(error => {
                    console.log(error);
                });
            },
            linkTo(link,index){
                location.href = link;
            },
            scroll_box(){
                var count = 0,
                    clear = null;
                clear = setInterval(() => {
                  this.animate =true;
                  setTimeout (() => {
                    this.data.push (
                        this.data[0]
                    );
                    this.data.shift();
                    this.animate =false;
                  }, 2000);
                },2000);
            }, 
            hit(id){
            	this.$emit('hit',id)
            }
        }
    }
</script>
<style lang="less" scoped>
    .flash-wrap{
        background:#f2f2f2;
        .flash-dt{
            width:100%;
            height:.59rem;
            padding:.1rem 0;
            border-bottom:1px solid #eaf0f4;
            background:#fff;
            .flash-news{
                width:1.3rem;
                height:100%;
                position:relative;
                border-right:2px dotted #ccc;
                line-height: .59rem;
                font-size:.32rem;
                color:#111;
            }
            .flash-content{
                position: relative;
                width:4.8rem;
                height:100%;
                padding:0 .2rem;
                line-height:.59rem;
                font-size:.28rem;
                color:#333;
                white-space:nowrap; 
                overflow:hidden; 
                text-overflow:ellipsis; 
                border-right:1px dotted #ccc;
                em{
                    display:inline-block;
                    width: .28rem;
                    height: .28rem;
                    background:url(../../../assets/icon1.png) no-repeat;
                    background-size:100% 100%;
                    margin-right:.2rem;
                    margin-top: .16rem; 
                }
                .scroll_box{
                    width: 4.5rem;
                    height: .5rem;
                    position: absolute;
                    left:.7rem;
                    top:-.1rem;
                    transition: 1s all ease;
                    li{
                        font-size: .2rem;
                        line-height: .5rem;
                    }
                }
            }
            .flash-more{
                width:.8rem;
                height:.59rem;
                text-align:center;
                line-height:.59rem;
                font-size:.28rem;
                color:#797979;
            }
        }
        .flash-dd{
            width:100%;
            padding-top:.27rem;
            background:#fff;
            border-bottom:1px solid #eaf0f4;
            li{
                width:25%;
                text-align:center;
                img{
                    width:1.26rem;
                    height:1.26rem;
                }
                p{
                    font-size:.28rem;
                    color:#333;
                    padding:.2rem 0;
                    line-height:100%;
                    font-weight:400;
                    font-size:.28rem;
                    color:#333;
                }
            }
        }
        .container-main{
            width:100%;
            height:2.33rem;
            background:#fff;
        }
    }
        .index_Ctrl{
            width: 100%;
            overflow: hidden;
            .index_Ctrl_auto{
                width: 7.1rem;
                overflow: hidden;
                margin: 0 .2rem 0rem .2rem;
                display: flex;
                justify-content: flex-start;
                flex-direction: row;
                flex-wrap: wrap;
            }
            .index_Ctrl_auto .link{
                display: block;
                width:1.15rem;
                height: 1.6rem;
                float: left;
                margin-right: 0.33rem;
                margin-top: 0.11rem;
                overflow: hidden;
            }
            .index_Ctrl_auto .link:nth-child(5n){
                margin-right: 0;
            }
            .index_Ctrl_auto .link img{
                width: 1.15rem;
                height: 1.15rem;
                display: block;
                border-radius: 50%;
            
            }
            .index_Ctrl_auto .link span{
                width: 100%;
                height: 0.45rem;
                display: block;
                color: #333;
                font-size: 0.24rem;
                text-align: center;
                line-height: 0.45rem;
                font-weight: 500;
            }  
        }
    .index_flash{
        // width: 100%;
        height: 0.5rem;
        background-color: #fff;
        overflow: hidden;
        margin-top: 1.91rem;
        margin-left: .2rem;
        margin-right: .2rem;
        border-radius: .5rem;
        .index_flash_logo{
            width: 0.8rem;
            height: 0.6rem;
            float: left;
            background-color: #d02629;
            text-align: center;
            line-height: .6rem;
        }
        .i_f_l_text{
            width: 1rem;
            height: 0.55rem;
            display: block;
            float: left;
            // font-size: 0.24rem;
            line-height: 0.55rem;
        }
        .i_f_l_img{
            width: 0.6rem;
            height: 0.45rem;
            display: block;
            margin-top: -.4rem;
            font-size: 0.27rem;
            border-bottom: .5rem solid #f1f1f1;
            border-left: .3rem solid transparent;
            margin-left: 1rem;
        }
        .text-sample{
            font-size: 0.28rem;
            text-align: center;
            color: #fff;
            line-height: .5rem;
            margin-left: 0.05rem;        }
        .box-wrap{
            position: relative;
            width: 4.05rem;
            height: 0.5rem;
            float: left;
            margin-left: 0.2rem;
            overflow: hidden;
            .scroll_box{
                position: absolute;
                left:0;
                top:0;
                transition: 1s all ease;
            }
        }
        .scroll_box li{
            width: 4.05rem;
            height: 0.53rem;
            line-height: 0.53rem;
            font-size: 0.28rem;
            color: #333;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            display:block;
            cursor: pointer;
        }
        .More{
            width: 0.8rem;
            height: 0.5rem;
            display: block;
            float: right;
            text-align: center;
            line-height: 0.5rem;
            color:#fff;
            font-size: 0.28rem;
            background-color: #9b9595;
            .text-sample_img{
              font-size: 0.28rem;
              text-align: center;
              color: #fff;
              line-height: .5rem;
              margin-right:0.05rem;
            }
        }
    }
</style>