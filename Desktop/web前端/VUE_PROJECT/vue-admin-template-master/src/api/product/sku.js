import requset from '@/utils/request'

//sku列表的接口
export const reqSkuList =(page,limit) =>requset({url:`/admin/product/list/${page}/${limit}`,method:'get'})

//上架
export const reqSale=(skuId)=>requset({url:`/admin/product/onSale/${skuId}`,method:'get'})
//下架
export const reqCacel=(skuId)=>requset({url:`/admin/product/cancelSale/${skuId}`,method:'get'})

//获取sku接口详情的接口
export const reqSkuById=(skuId)=>requset({url:`/admin/product/getSkuById/${skuId}`,method:'get'})