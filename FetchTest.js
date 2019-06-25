import React,{Component} from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native'
import NavigationBar from './js/common/NavigationBar'
import HttpUtils from './HttpUtils'
export default class FetchTest extends Component{
  constructor(props){
    super(props);
    this.state = {
      result:''
    }
  }
  onLoad(url){
    HttpUtils.get(url)
      .then(result => {
        this.setState({
          result:JSON.stringify(result)
        })
      })
      .catch(error=>{
        this.setState({
          result:JSON.stringify(error)
        })
      })
  }
  render(){
    return (
      <View style={styles.container}>
        <NavigationBar
          title='Fetch的使用'
          />
        <Text
            onPress={()=>this.onLoad('http://rap2api.taobao.org/app/mock/117385/getData')}
          >获取数据</Text>
        <Text>返回结果:{this.state.result}</Text>  
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white'
  },
  text:{
    fontSize:22
  }
})