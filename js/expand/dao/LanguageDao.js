import React,{Component} from 'react'
import {
  View,
  StyleSheet,
  AsyncStorage
} from 'react-native'
import keys from '../../../res/data/keys.json'
export let flagLanguage = {flag_language:'flag_language_language',flag_key:'flag_language_key'};
export default class languageDao{
  constructor(flag){
    this.flag = flag;
  }
  fetch(){
    return new Promise((resolve,reject) => {
      AsyncStorage.getItem(this.flag,(error,result) => {
        if(error){
          reject(error)
        }else{
          if(result){
            try{
              resolve(JSON.parse(result))
            } catch (e){
              reject(e)
            }
          }else{
            let data = this.flag===flagLanguage.flag_key ? keys:null
            console.log(data)
            this.save(data)
            resolve(data)
          }
        }
      })
    })
  }
  save(data){
    AsyncStorage.setItem(this.flag,JSON.stringify(data),(error) => {
      console.log(error)
    })
  }
}