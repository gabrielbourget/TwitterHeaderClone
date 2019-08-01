import React from 'react'
import { 
  StyleSheet, Text, 
  View, ScrollView, 
  Image, Animated
} from 'react-native'

// - Header
const HEADER_MAX_HEIGHT = 120
const HEADER_MIN_HEIGHT = 70
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT

// - Profile Image
const PROFILE_IMAGE_MAX_HEIGHT = 80
const PROFILE_IMAGE_MIN_HEIGHT = 40

class App extends React.Component {
  constructor(props) {
    super(props) 

    this.state = {
      scrollY: new Animated.Value(0)
    }
  }

  render() {

    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [ 0, HEADER_SCROLL_DISTANCE ],
      outputRange:[ HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT ],
      extrapolate: 'clamp'
    })

    const profileImageHeight = this.state.scrollY.interpolate({
      inputRange: [ 0, HEADER_SCROLL_DISTANCE ],
      outputRange:[ PROFILE_IMAGE_MAX_HEIGHT, PROFILE_IMAGE_MIN_HEIGHT ],
      extrapolate: 'clamp'
    })

    const profileImageMarginTop = this.state.scrollY.interpolate({
      inputRange: [ 0, HEADER_SCROLL_DISTANCE ],
      outputRange:[ HEADER_MAX_HEIGHT - (PROFILE_IMAGE_MAX_HEIGHT/2), HEADER_MAX_HEIGHT + 10],
      extrapolate: 'clamp'
    })

    const headerZIndex = this.state.scrollY.interpolate({
      inputRange: [ 0, HEADER_SCROLL_DISTANCE ],
      outputRange:[ 0, 1 ], 
      extrapolate: 'clamp'
    })

    const headerTitleBottom = this.state.scrollY.interpolate({
      inputRange: [ 0, HEADER_SCROLL_DISTANCE, 
        HEADER_SCROLL_DISTANCE + 10 + PROFILE_IMAGE_MAX_HEIGHT,
        HEADER_SCROLL_DISTANCE + 10 + PROFILE_IMAGE_MAX_HEIGHT + 40],
      outputRange:[ -20, -20, -20, 0 ], 
      extrapolate: 'clamp'
    })

    return (
      <View style={ styles.container }>
        <Animated.View style={[ 
          styles.header, 
          { height: headerHeight }, 
          { zIndex: headerZIndex }
        ]}>
          <Animated.View style={[
            styles.smallTitleCradle,
            { bottom: headerTitleBottom }
          ]}>
            <Text style={ styles.titleSmall }>
              John Wick
            </Text>
          </Animated.View>
        </Animated.View>
        <ScrollView 
          style={ styles.scrollView }
          scrollEventThrottle={ 16 }
          onSCroll={ Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY }}}]
          )}
        >
          <Animated.View  style={[
            styles.imageCradle, 
            { height: profileImageHeight, width: profileImageHeight },
            { marginTop: profileImageMarginTop }
          ]}>
            <Image
              style={ styles.profileImage }
              source={ require('./assets/john-wick-2.jpg') }
            />
          </Animated.View >
          <Text style={ styles.titleLarge }>
            John Wick
          </Text>
          <View style={{ height: 1000 }}>

          </View>
        </ScrollView>
      </View>
    );
  }
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1DA1F2', // Sampled from twitter itself.
    alignItems: 'center'
  },
  scrollView: {
    flex: 1
  },
  imageCradle: {
    borderRadius: PROFILE_IMAGE_MAX_HEIGHT/2,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 0 },
    shadowColor: 'black',
    shadowRadius: 5,
    shadowOpacity: 1,
    elevation: 5,
    borderWidth: 0.75,
    borderColor: 'black',
    marginLeft: 20
  },
  profileImage: {
    flex: 1,
    width: null,
    height: null
  },
  titleLarge: {
    fontSize: 25,
    marginTop: 10,
    marginLeft: 20,
    fontWeight: '700'
  },
  smallTitleCradle: {
    position: 'absolute'
  },
  titleSmall: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    alignItems: 'center'
  }
});
