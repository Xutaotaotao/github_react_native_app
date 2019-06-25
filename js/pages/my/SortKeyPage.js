import React,{Component} from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Alert
} from 'react-native'
import NavigationBar from '../../common/NavigationBar'
import CustomKeyPage from './CustomKeyPage'
import LanguageDao,{flagLanguage} from '../../expand/dao/LanguageDao'
import ArrayUtils from '../../util/ArrayUtils'
import SortableListView from 'react-native-sortable-listview'
import ViewUtils from '../../util/ViewUtils'
export default class SortKeyPage extends Component{
  constructor(props){
    super(props);
    this.dataArray = [];
    this.sortResultArray = [];
    this.originCheckedArray= [];
    this.state = {
      checkedArray:[]
    }
  }
  componentDidMount () {
    this.languageDao = new LanguageDao(flagLanguage.flag_key)
    this.loadData()
  }
  /**
   * 获取数据
   */
  loadData(){
    this.languageDao.fetch()
      .then(result => {
        this.getCheckedItems(result)
      })
      .catch(error => {
        console.log(error)
      })
  }
  /**
   * 获取被选择的数据
   * @param {*} result 
   */
  getCheckedItems (result) {
    this.dataArray = result;
    let checkedArray = [];
    result.forEach(element => {
      if(element.checked){
        checkedArray.push(element)
      }
    });
    console.log(checkedArray)
    this.setState({
      checkedArray:checkedArray,
    })
    this.originCheckedArray = ArrayUtils.clone(checkedArray)
  }
  /**
   * 返回
   */
  onBack(){
    if(ArrayUtils.isEqual(this.originCheckedArray,this.state.checkedArray)){
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
          this.onSave(true)
        }},
      ],
    )
  }
  /**
   * 保存
   * @param {*} isChecked 
   */
  onSave(isChecked){
    if(!isChecked&&ArrayUtils.isEqual(this.originCheckedArray,this.state.checkedArray)){
      this.props.navigator.pop();
      return
    }
    this.getSortResult()
    this.languageDao.save(this.sortResultArray)
    this.props.navigator.pop()
  }
  /**
   * 获取最后排序结果
   */
  getSortResult(){
    this.sortResultArray = this.state.checkedArray
  }
  /**
   * 交换数组顺序
   * @param {*} arr 
   * @param {*} k 
   * @param {*} j 
   */
  changeArr(arr,k,j){
    let c = arr[k]
    arr[k] = arr[j]
    arr[j] = c
  }
  render(){
    let _this = this
    let order = Object.keys(this.state.checkedArray)
    let rightButton = <TouchableOpacity
      onPress = {() => _this.onSave()}
    >
      <View style={{margin:10}}>
        <Text style={styles.title}>保存</Text>
      </View>
    </TouchableOpacity>
    return (
      <View style={styles.container}>
        <NavigationBar
          title = '排序标签'
          style = {{backgroundColor:'#6495ED'}}
          leftButton={ViewUtils.getLeftButton(() => this.onBack())}
          rightButton={rightButton}
        />
         <SortableListView
          style={{ flex: 1 }}
          data={_this.state.checkedArray}
          order={order}
          onRowMoved={e => {
            _this.changeArr(_this.state.checkedArray,e.to,e.from)
            this.forceUpdate()
          }}
          renderRow={row => <SortCell data={row} />}
        />
      </View>
    )
  }
}
class SortCell extends Component {
  render(){
    return (
      <TouchableHighlight
        underlayColor={'#eee'}
        style={styles.item}
        {...this.props.sortHandlers}
      >
      <View style={styles.row}>
        <Image source={require('./img/ic_sort.png')}></Image>
        <Text>{this.props.data.name}</Text>
      </View>
      </TouchableHighlight>
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
  item:{
      padding: 15,
      backgroundColor: '#F8F8F8',
      borderBottomWidth: 1,
      borderColor: '#eee'
  },
  row: {
    flexDirection:'row',
    alignItems:'center'
  },
  image:{
    tintColor:'#2196F3',
    height:16,
    width:16,
    marginRight:10
  },
  title:{
    fontSize:20,
    color:'white'
  },
})