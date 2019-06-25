/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  View,
  ListView
} from 'react-native';
import {
  Navigator
} from 'react-native-deprecated-custom-components'
import TabNavigator from 'react-native-tab-navigator'
import PopularPage from './PopularPage'
import AsyncStorageTest from '../../AsyncStorageTest'
import MyPage from './my/MyPage'
export default class HomePage extends Component {
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2})
    this.state = {
      selectedTab:'tb_polular'
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <TabNavigator>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'tb_polular'}
            title="最热"
            selectedTitleStyle={{color:'#2196F3'}}
            renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_polular.png')} />}
            renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'#2196F3'}]} source={require('../../res/images/ic_polular.png')} />}
            badgeText="1"
            onPress={() => this.setState({ selectedTab: 'tb_polular' })}>
            <PopularPage/>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'tb_trending'}
            title="趋势"
            selectedTitleStyle={{color:'yellow'}}
            renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_trending.png')} />}
            renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'yellow'}]} source={require('../../res/images/ic_trending.png')} />}
            onPress={() => this.setState({ selectedTab: 'tb_trending' })}>
            <AsyncStorageTest/>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'tb_favorite'}
            title="收藏"
            selectedTitleStyle={{color:'blue'}}
            renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_favorite.png')} />}
            renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'blue'}]} source={require('../../res/images/ic_polular.png')} />}
            badgeText="1"
            onPress={() => this.setState({ selectedTab: 'tb_favorite' })}>
            <View style={styles.pageFavorite}></View>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'tb_my'}
            title="我的"
            selectedTitleStyle={{color:'green'}}
            renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_my.png')} />}
            renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'green'}]} source={require('../../res/images/ic_trending.png')} />}
            onPress={() => this.setState({ selectedTab: 'tb_my' })}>
            <MyPage {...this.props}/>
          </TabNavigator.Item>
        </TabNavigator> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  pagePolular:{
    flex:1,
    backgroundColor:'red',
  },
  pageTrending:{
    flex:1,
    backgroundColor:'yellow',
  },
  pageFavorite:{
    flex:1,
    backgroundColor:'blue',
  },
  pageMy:{
    flex:1,
    backgroundColor:'green',
  },
  image:{
    height:22,
    width:22
  }
});
