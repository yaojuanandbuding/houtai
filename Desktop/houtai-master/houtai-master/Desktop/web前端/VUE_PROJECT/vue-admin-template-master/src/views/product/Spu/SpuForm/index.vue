<template>
  <div>
    <el-form ref="form" label-width="80px" :model="spu">
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spu.tmId">
          <el-option
            :label="tm.tmName"
            :value="tm.id"
            v-for="(tm, index) in tradeMarkList"
            :key="tm.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          type="textarea"
          rows="4"
          placeholder="描述"
          v-model="spu.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <!-- 上传图片：action图片上传的地址 list-type:文件类型的声明 on-preview：图片预览  on-remove：删除图片
        file-list:照片墙需要展示的数据【数组：数组里面的元素务必要有name、url属性】 -->
        <el-upload action="/dev-api/admin/product/fileUpload" list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="spuImageList"
          :on-success="handlerSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select :placeholder="`还有${unSelectSaleAttr.length}未选择`" v-model="attrIdAndAttrName">
          <el-option :label="unselect.name" :value="`${unselect.id}:${unselect.name}`" v-for="(unselect,index) in unSelectSaleAttr" :key="unselect.id"></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus" :disabled="!attrIdAndAttrName" @click="addSaleAttr">添加销售属性</el-button>
        <!-- 展示的是当前spu属于自己的销售属性 -->
        <el-table style="width: 100%" border :data="spu.spuSaleAttrList">
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称列表" width="width">
            <template slot-scope="{row,$index}">
              <!--  -->
              <!-- el-tag：用户展示已有属性值列表的数据的 -->
              <el-tag :key="tag.id" v-for="(tag,index) in row.spuSaleAttrValueList" closable :disable-transitions="false"  @close="row.spuSaleAttrValueList.splice(index,1)">{{ tag.saleAttrValueName }}</el-tag>
              <!-- 地下的结构可以当做当年的span与input切换 @keyup.enter.native="handleInputConfirm"
                -->
              <el-input class="input-new-tag" v-if="row.inputVisible" v-model="row.inputValue" ref="saveTagInput" size="small"  @blur="handleInputConfirm(row)">
              </el-input>
              <!--  @click="showInput" -->
              <el-button v-else class="button-new-tag" size="small" @click="addSaleAttrValue(row)">添加</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row,$index}">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="spu.spuSaleAttrList.splice($index,1)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      //spu属性初始化的时候是一个空对象，在修改spu会向服务器发请求，返回spu信息（对象），在修改的时候可以利用服务器返回的整个对象收集最新的数据提交给服务器
      // 如果是添加spu的时候并没有向服务器发请求，数据收集到哪里【spu】，收集数据时候有哪些字段
      spu: {
        category3Id: 0,
        // 品牌id
        tmId: '',
        description: "",
        spuName: "",

        spuImageList: [
          // {
          //   id: 0,
          //   imgName: "string",
          //   imgUrl: "string",
          //   spuId: 0,
          // },
        ],
        //平台属性和属性值的收集
        spuSaleAttrList: [
          // {
          //   baseSaleAttrId: 0,
          //   id: 0,
          //   saleAttrName: "string",
          //   spuId: 0,
          //   spuSaleAttrValueList: [
          //     {
          //       baseSaleAttrId: 0,
          //       id: 0,
          //       isChecked: "string",
          //       saleAttrName: "string",
          //       saleAttrValueName: "string",
          //       spuId: 0,
          //     },
          //   ],
          // },
        ],
      }, //存储spu信息属性
      tradeMarkList: [], //存储品牌信息
      spuImageList: [], //存储SPU图片数据
      saleAttrList: [], //销售属性的数据
      //收集未选择的销售属性的id
      attrIdAndAttrName:'',
    };
  },
  methods: {
    handleRemove(file, fileList) {
      //file代表删除那张图片  filelist照片墙删除某一种图片以后剩余其他图片
      // console.log(file, fileList);
      //收集照片墙图片数据
      //对于已有图片【照片墙中显示的图片：name、url字段】因为照片墙显示数据务必要有这两个属性
      //对于服务器，不需要两个属性
      this.spuImageList= fileList;
    },
    handlePictureCardPreview(file) {
      //将图片的地址赋值给这个属性
      this.dialogImageUrl = file.url;
      //对话框显示
      this.dialogVisible = true;
    },
    //初始化spuform数据
    async initSpuDate(spu) {
      //获取spu信息的数据
      let spuResult = await this.$API.spu.reqSpu(spu.id);
      if (spuResult.code == 200) {
        this.spu = spuResult.data;
      }
      //获取品牌信息的信息
      let tradeMarkResult = await this.$API.spu.reqTradMarkList();
      if (tradeMarkResult.code == 200) {
        this.tradeMarkList = tradeMarkResult.data;
      }
      //获取spu图片数据
      let spuImageResult = await this.$API.spu.reqSpuImageList(spu.id);
      if (spuImageResult.code == 200) {
        let listArr = spuImageResult.data;
        //由于照片墙显示图片的数据需要数组，数组里面的元素需要有url字段和name字段
        //需要把服务器返回数据进行修改
        listArr.forEach((item) => {
          item.url = item.imgUrl;
          item.name = item.imgName;
        });
        //把整理好的数据赋值给
        this.spuImageList = listArr;
      }
      //获取平台全部销售属性
      let saleResult = await this.$API.spu.reqBaseSaleAttrList();
      if (saleResult.code == 200) {
        this.saleAttrList = saleResult.data;
      }
    },
    //照片墙图片上传成功的回调
    handlerSuccess(response,file,fileList){
         //收集图片信息
         this.spuImageList = fileList
    },
    //添加新的销售属性
    addSaleAttr(){
      //已经收集到添加的销售属性的信息
      //把收集到销售属性的数据进行分割
      const [baseSaleAttrId,saleAttrName] = this.attrIdAndAttrName.split(':')
      //向SPU对象的supSaleAttrList属性添加新的销售属性
      let newSaleAttr ={baseSaleAttrId,saleAttrName,spuSaleAttrValueList:[]}
      //添加新的销售属性
      this.spu.spuSaleAttrList.push(newSaleAttr)
      //清空数据
      this.attrIdAndAttrName = ''
    },
    //添加按钮的回调
    addSaleAttrValue(row){
    //点击销售属性值添加按钮时候，需要button变为input
    //挂载在销售属性身上的响应式数据inputVisible控制button与input切换
    this.$set(row,'inputVisible',true)
    //通过响应式数据inputValue字段收集新增的销售属性值
    this.$set(row,'inputValue','')
    },
    //el-input失去焦点事件
    handleInputConfirm(row){
      //结构出销售属性当中收集数据
      const {baseSaleAttrId,inputValue} = row;
      //新增的销售属性值不能未空
      if(inputValue.trim()==''){
        this.$message('属性值不能为空')
        return;
      }

      //属性值不能重复
      let result = row.spuSaleAttrValueList.every(item=>item.saleAttrValueName!=inputValue);
      if(!result) return
      //新增的销售属性值
      let newSaleAttrValue = {baseSaleAttrId,saleAttrValueName:inputValue};
      //新增
      row.spuSaleAttrValueList.push(newSaleAttrValue)
     //修改字段值未false
     row.inputVisible = false;

    },
    //保存按钮回调
   async addOrUpdateSpu(){
      //整理参数：需要整理照片墙的数据
      //携带参数：对于图片，需要携带iamgeNmae和imageUrl字段
      this.spu.spuImageList = this.spuImageList.map(item=>{
        return {
          imgName:item.name,
          imgUrl:(item.response&&item.response.data)||item.url
        }
      });
      //发请求
    let result =   await this.$API.spu.reqAddOrUpdateSpu(this.spu)
    if(result.code==200){
       //提示
       this.$message({type:'success',message:'保存成功'})
       //通知父组件回到场景0
       this.$emit('changeScene',{scene:0,flag:this.spu.id?'修改':'添加'})
       
    }
    //清除数据
     Object.assign(this._data,this.$options.data())
    },
    //点击添加spu按钮的时候发请求的函数
  async addSpuDate(category3Id){
    //添加SPU时候收集三级分类id
    this.spu.category3Id = category3Id
      //获取品牌信息的信息
      let tradeMarkResult = await this.$API.spu.reqTradMarkList();
      if (tradeMarkResult.code == 200) {
        this.tradeMarkList = tradeMarkResult.data;
      }
       //获取平台全部销售属性
      let saleResult = await this.$API.spu.reqBaseSaleAttrList();
      if (saleResult.code == 200) {
        this.saleAttrList = saleResult.data;
      }
    },
    //取消按钮
    cancel(){
      this.$emit('changeScene',{scene:0,flag:''})

      //清理数据
      //Object.assign:es6中新增的方法可以合并对象
      //组件实例this._data，可以操作data中的响应式数据
      //this.$options可以获取配置对象，配置对象的data函数执行，返回的响应式数据为空
      Object.assign(this._data,this.$options.data())
    }
  },
  computed:{
    //计算出还未选择的销售属性
    unSelectSaleAttr(){
      //整个平台销售属性一共三个：颜色、尺寸、版本----saleAttrList
      //当前spu拥有属于自己的销售属性 -----spuSaleAttrList
      //数组过滤方法，可以从已有的数组当中过滤出用户需要的元素，并且返回一个新的数组
     let result =  this.saleAttrList.filter(item=>{
        //every数组的方法，会返回一个布尔值【真、假】
        return this.spu.spuSaleAttrList.every(item1=>{
             return item.name!=item1.saleAttrName;
        })
      })
      return result;
    }
  }
};
</script>

<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }

</style>