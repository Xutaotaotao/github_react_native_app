import React,{Component} from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ListView,
  StyleSheet,
  RefreshControl
} from 'react-native'
import NavigationBar from './js/common/NavigationBar'
import Toast,{DURATION} from 'react-native-easy-toast'
let data = {
  "result": [
    {
      "name": "qK",
      "number": 12344554545
    },
    {
      "name": "AkK",
      "number": 12344554545
    },
    {
      "name": "9KjB&zrk5",
      "number": 12344554545
    },
    {
      "name": "Nf^wo4",
      "number": 12344554545
    },
    {
      "name": "4&980Xtx3",
      "number": 12344554545
    },
    {
      "name": "ivL$",
      "number": 12344554545
    },
    {
      "name": "AwQH4f",
      "number": 12344554545
    },
    {
      "name": "Q0",
      "number": 12344554545
    },
    {
      "name": "Yj*2Nx",
      "number": 12344554545
    },
    {
      "name": "vn",
      "number": 12344554545
    },
    {
      "name": "MS6tsmY",
      "number": 12344554545
    },
    {
      "name": "OKe",
      "number": 12344554545
    },
    {
      "name": "m6a^oj81y",
      "number": 12344554545
    },
    {
      "name": "!jU^dtiM",
      "number": 12344554545
    },
    {
      "name": "u1#TB",
      "number": 12344554545
    }
  ]
}
export default class ListViewTest extends Component{
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2})
    this.state = {
      dataSource:ds.cloneWithRows(data.result),
      isLoading:true,
    }
  }
  renderRow(item){
    return <View style={styles.row}>
      <TouchableOpacity
        onPress={()=>{
          this.toast.show('你单击了：'+item.name,DURATION.LENGTH_LONG)
        }}  
      >
        <Text style={styles.tips}>{item.name}</Text>
        <Text style={styles.tips}>{item.number}</Text>
      </TouchableOpacity>
    </View>
  }
  renderSeparator(sectionID, rowID,adjacentRowHighlighted){
    return <View key={rowID} style={styles.line}></View>
  }
  renderFooter(){
    return <Image style={{width:400,height:100}} source={{uri:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542203446349&di=5efad9a22bffd4fe72ef9f454076d0e1&imgtype=0&src=http%3A%2F%2Fphotocdn.sohu.com%2F20160110%2Fmp53582441_1452386967464_9.gif'}}/>
  }
  onLoad(){
    setTimeout(()=>{
      this.setState({
        isLoading:false
      })
    },2000)
  }
  render(){
    return (
      <View style={styles.container}>
        <NavigationBar
          title = 'ListViewTest'  
        />
        <ListView
          // 数据源
          dataSource={this.state.dataSource}
          // 渲染的项
          renderRow={(item)=>this.renderRow(item)}
          // 分割线
          renderSeparator={(sectionID, rowID,adjacentRowHighlighted)=>this.renderSeparator()}
          // 渲染底部视图
          renderFooter={()=>this.renderFooter()}
          // 刷新视图
          refreshControl={<RefreshControl
            refreshing={this.state.isLoading}
            onRefresh={()=>this.onLoad()}
          />}
        />
        <Toast ref={toast=>{this.toast=toast}}/>
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
  },
  tips:{
    fontSize:18
  },
  row:{
    height:50
  },
  line:{
    height:1,
    backgroundColor:'black'
  }
})