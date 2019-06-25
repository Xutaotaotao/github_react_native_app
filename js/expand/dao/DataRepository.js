import {
  AsyncStorage
} from 'react-native'
export default class DataRepository{
  /**
   * 获取数据
   * @param {*} url 
   */
  fetchRepository(url){
    return new Promise((resolve,reject) => {
      // 获取本地数据
      this.fetchLocalRepository(url)
        .then(result => {
          if(result){
            resolve(result)
          }else{
            this.fetchNetRepository(url)
              .then(result => {
                resolve(result)
              })
              .catch(e => {
                resolve(e)
              })
          }
        })
        .catch(e => {
          console.log(e)
        })
    })
  }
  /**
   * 获取本地数据
   * @param {*} url 
   */
  fetchLocalRepository(url){
    return new Promise((resolve,reject) => {
      AsyncStorage.getItem(url,(error,result) => {
        if(!error){
          try{
            resolve(JSON.parse(result))
          }catch (e){
            reject(e)
          }
        }
      })
    })
  }
  /**
   * 获取网络数据
   * @param {*} url 
   */
  fetchNetRepository(url){
    return new Promise((resolve,reject) => {
      fetch(url)
        .then(response => response.json())
        .then(result => {
          if(!result){
            reject(new Error('获取数据为空'))
          }
          resolve(result.items)
          this.saveRepository(url,result.items)
        })
        .catch(error => {
          reject(error);
        })
    })
  }
  /**
   * 保存数据
   * @param {*} url 
   * @param {*} items 
   * @param {*} callBack 
   */
  saveRepository(url,items,callBack){
    if(!url || !items){
      return
    }
    let wrapData = {items:items,update_date:new Date().getTime()}
    AsyncStorage.setItem(url,JSON.stringify(wrapData),callBack)
  }
  /**
   * 判断数据是否过时
   * @param {*数据时间戳} longTime 
   */
  checkData(longTime){
    let cDate = new Date()
    let tDate = new Date()
    tDate.setTime(longTime)
    if(cDate.getMonth() !== tDate.getMonth()){
      return false
    }
    if(cDate.getDay() !== tDate.getDay()){
      return false
    }
    if(cDate.getHours() - tDate.getHours() > 2){
      return false
    }
    return true
  }
}