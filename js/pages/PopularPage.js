import React,{Component} from 'react'
import {
  View,
  StyleSheet,
  ListView,
  RefreshControl
} from 'react-native'
import {
  Navigator
} from 'react-native-deprecated-custom-components'
import NavigationBar from '../common/NavigationBar'
import HomePage from './HomePage'
import DataRepository from '../expand/dao/DataRepository'
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view'
import RepositoryCell from './../common/RepositoryCell'
import LanguageDao, {flagLanguage} from '../expand/dao/LanguageDao'
const URL = 'https://api.github.com/search/repositories?q='
const QUERY_STR = '&sort=stars'
export default class PopularPage extends Component{
  constructor(props){
    super(props);
    this.languageDao = new LanguageDao(flagLanguage.flag_key)
    this.dataRepository = new DataRepository();
    this.state = {
      result:'',
      languages:[],
    }
  }
  componentDidMount(){
    this.loadData()
  }
  loadData(){
    this.languageDao.fetch()
      .then(result => {
        console.log(result)
        this.setState({
          languages:result
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
  onLoad(){
    let url = this.getUrl(this.text)
    this.dataRepository.fetchRepository(url)
      .then(result => {
        let items = result&&result.items ? result.item : result ? result:[]
        this.setState({
          result:JSON.stringify(result)
        })
      })
      .catch(error => {
        this.setState({
          result:JSON.stringify(error)
        })
      })
  }
  getUrl(key){
    return URL+key+QUERY_STR;
  }
  render(){
    let navigationBar = <NavigationBar
      title = "最热"
      statusBar = {{
        backgroundColor:'#2196F3'
      }}
    />
    let content = this.state.languages.length > 0 ?
    <ScrollableTabView
      ref="scrollableTabView"
      tabBarBackgroundColor="#2196F3"
      tabBarActiveTextColor="white"
      tabBarInactiveTextColor="mintcream"
      tabBarUnderlineStyle={{backgroundColor:'#e7e7e7',height:2}}
      renderTabBar={() => <ScrollableTabBar style={{height: 40, borderWidth: 0, elevation: 2}}
                                                      tabStyle={{height: 39}}/>}
    >
    {this.state.languages.map((item,index)=> {
      return item.checked ? <PopularTab tabLabel={item.name} key={index}></PopularTab> : null
    })}
      {/* <PopularTab tabLabel="Java">Java</PopularTab>
      <PopularTab tabLabel="IOS">IOS</PopularTab>
      <PopularTab tabLabel="Android">Android</PopularTab>
      <PopularTab tabLabel="JavaScript">JavaScript</PopularTab> */}
    </ScrollableTabView> :null
    return (
      <View style={styles.container}>
        {navigationBar}
        {content}
      </View>
    )
  }
}
// PopularTab组件
class PopularTab extends Component {
  constructor(props){
    super(props);
    this.dataRepository = new DataRepository();
    this.state = {
      result:'',
      // 为listview初始化dataSource
      dataSource: new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2}),
      isLoading:false,
    }
  }
  componentDidMount(){
    this.loadData();
  }
  loadData(){
    // 根据props.tabLabelt来拼接动态的URL
    this.setState({
      isLoading:true
    })
    let url = URL + this.props.tabLabel + QUERY_STR
    console.log(url)
    this.dataRepository.fetchNetRepository(url)
      .then(result => {
        this.setState({
          dataSource:this.state.dataSource.cloneWithRows(result.items),
          isLoading:false
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
  renderRow(data){
    return <RepositoryCell data={data}/>
  }
  render(){
    return <View style={{flex:1}}>
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(data)=>this.renderRow(data)}
        // 刷新组件
        refreshControl={
          <RefreshControl
            refreshing={this.state.isLoading}
            onRefresh={() => this.loadData()}
            colors={['#2196F3']}
            tintColor={'#2196F3'}
            title={'Loading...'}
            titleColor={'#2196F3'}
          />
        }
      />
    </View>
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
})