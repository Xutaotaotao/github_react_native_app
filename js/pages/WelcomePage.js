import React,{Component} from 'react'
import {
  View,
  Text,
} from 'react-native'
import {
  Navigator
} from 'react-native-deprecated-custom-components'
import NavigationBar from '../common/NavigationBar'
import HomePage from './HomePage'
export default class WelcomePage extends Component{
  constructor(props){
    super(props)
  }
  componentDidMount(){
    this.timer=setTimeout(() => {
      this.props.navigator.resetTo({
        component:HomePage
      })
    },3000)
  }
  componentWillMount(){
    this.timer&&clearTimeout(this.timer);
  }
  render(){
    return <View>
      <NavigationBar
        title={'欢迎'}
      />
      <Text>欢迎页</Text>
    </View>
  }
}