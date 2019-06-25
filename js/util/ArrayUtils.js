export default class ArrayUtils{
  /**
   * 更新数组，若item已经存在则从数组中将它移除，否则添加进数组
   */
  static updataArray(array,arrayItem){
    array.forEach((item,index)=>{
      if(item === arrayItem){
        array.splice(index,1)
        return;
      }
    })
    array.push(arrayItem);
  }
  /**
   * clone数组
   * @param {*} from 
   */
  static clone(from) {
    if(!from){
      return []
    }
    let newArray = [];
    from.forEach(item=>{
      newArray.push(item)
    })
    return newArray
  }
  /**
   * 判断两个数组的元素是否一一对应
   * @param {*} arr1 
   * @param {*} arr2 
   */
  static isEqual(arr1,arr2){
    if(!(arr1&&arr2)){
      return false
    }
    if(arr1.length !== arr2.length){
      return false
    }
    for(let i = 0; i < arr1.length; ++i) {
			if(arr1[i] !== arr2[i]){
        return false;
      }
    }
    return true
  }
  /**
   * 删除
   * @param {*} arr 
   * @param {*} item 
   */
  static removeItem(arr,item){
    let i = arr.indexOf(item)
    if(!arr){
      return
    }
    if(i > -1){
      arr.splice(i,1)
    }

  }
}