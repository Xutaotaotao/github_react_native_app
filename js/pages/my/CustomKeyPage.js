import React,{Component} from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert
} from 'react-native'
import {
  Navigator
} from 'react-native-deprecated-custom-components'
import NavigationBar from '../../common/NavigationBar'
import ViewUtils from '../../util/ViewUtils'
import LanguageDao,{flagLanguage} from  '../../expand/dao/LanguageDao'
import CheckBox from 'react-native-check-box'
import ArrayUtils from '../../util/ArrayUtils'
export default class CustomKeyPage extends Component{
  constructor(props){
    super(props);
    this.languageDao = new LanguageDao(flagLanguage.flag_key)
    this.changeValues = [];
    this.isRemoveKey = this.props.isRemoveKey ? true : false
    this.state = {
      dataArray:[]
    }
  }
  componentDidMount(){
    this.loadData();
  }
  loadData(){
    this.languageDao.fetch()
      .then(result => {
        console.log(result)
        this.setState({
          dataArray:result
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
  onSave(){
    if(this.changeValues.length === 0 ){
      this.props.navigator.pop();
      return;
    }
    if(this.isRemoveKey){
      this.changeValues.forEach(item => {
        ArrayUtils.removeItem(this.state.dataArray,item)
      })
    }
    this.languageDao.save(this.state.dataArray)
    this.props.navigator.pop();
  }
  renderView(){
    if(!this.state.dataArray || this.state.dataArray.length === 0){
      return null
    }
    let len = this.state.dataArray.length;
    let views = []
    for(let i=0,l=len-2;i<l;i+=2) {
      views.push(
        <View key={i}>
          <View style={styles.item}>
            {this.renderCheckBox(this.state.dataArray[i])}
            {this.renderCheckBox(this.state.dataArray[i+1])}
          </View>
          <View style={styles.line}></View>
        </View>
      )
    }
    views.push(
      <View key={len-1}>
        <View style={styles.item}>
          {len%2 === 0?<Text>{this.state.dataArray[len-2].name}</Text>:null}
          {this.renderCheckBox(this.state.dataArray[len-1])}
        </View>
        <View style={styles.line}></View>
      </View>
    )
    return views;
  }
  onClick(data){
    if(!this.isRemoveKey){
      data.checked = !data.checked
    }
    ArrayUtils.updataArray(this.changeValues,data)

  }
  renderCheckBox(data){
    let isChecked = this.isRemoveKey ? false : data.checked
    return (
      <CheckBox
        style={{flex:1,padding:10}}
        onClick = {() => this.onClick(data)}
        isChecked={isChecked}
        leftText = {data.name}
        checkedImage={<Image style={{tintColor:'#6495ED'}}
          source={require('./img/ic_check_box.png')}/>}
        unCheckedImage={<Image style={{tintColor:'#6495ED'}}
          source={require('./img/ic_check_box_outline_blank.png')}/>}    
      />
    )
  }
  onBack(){
    if(this.changeValues.length === 0){
      this.props.navigator.pop();
      return
    }
    Alert.alert(
      '提示',
      '要保存修改吗？',
      [
        {text: '不保存', onPress: () => {
          this.props.navigator.pop();
        },style:'cancel'},
        {text: '保存', onPress: () => {
          this.onSave()
        }},
      ],
    )
    
  }
  render(){
    let pageTitle = this.isRemoveKey ? '标签移除' : '自定义标签'
    let rightTitle = this.isRemoveKey ? '移除' : '保存'
    let rightButton = <TouchableOpacity
      onPress = {()=>this.onSave()}
    >
      <View style={{margin:10}}>
        <Text style={styles.title}>{rightTitle}</Text>
      </View>
    </TouchableOpacity>
    return (
      <View style={styles.container}>
        <NavigationBar
          title = {pageTitle}
          style = {{backgroundColor:'#6495ED'}}
          leftButton = {ViewUtils.getLeftButton(() => {this.onBack()})}
          rightButton = {rightButton}
        />
        <ScrollView>
          {this.renderView()}
        </ScrollView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white'
  },
  tips:{
    fontSize:18
  },
  title:{
    fontSize:20,
    color:'white'
  },
  line:{
    height:0.3,
    backgroundColor:'darkgray'
  },
  item:{
    flexDirection:'row',
    alignItems:'center'
  }
})