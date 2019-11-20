import React, { Component } from 'react'
import { StyleSheet, View, Text, PanResponder } from 'react-native'

export default class App extends Component {


  constructor(props) {
    super(props)

    this.state = {
      dragging: false,
      initialTop: 250,
      initialLeft: 150,
      offsetTop: 0,
      offsetLeft: 0,
    }

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.handleStartShouldSetPanResponder,
      onPanResponderGrant: this.handlePanResponderGrant,
      onPanResponderMove: this.handlePanResponderMove,
      onPanResponderRelease: this.handlePanResponderEnd,
      onPanResponderTerminate: this.handlePanResponderEnd,
    })
  }

  render() {
    const {dragging, initialTop, initialLeft, offsetTop, offsetLeft} = this.state

    // Update style with the state of the drag thus far
    const style = {
      backgroundColor: dragging ? 'skyblue' : 'steelblue',
      top: initialTop + offsetTop,
      left: initialLeft + offsetLeft,
    }

    return (
      <View style={styles.container}>
        <View
          // Put all panHandlers into the View's props
          {...this.panResponder.panHandlers}
          style={[styles.square, style]}
        >
          <Text style={styles.text}>
            DRAG ME
          </Text>
        </View>
      </View>
    )
  }

  // Should we become active when the user presses down on the square?
  handleStartShouldSetPanResponder = (e, gestureState) => {
    return true
  }

  // We were granted responder status! Let's update the UI
  handlePanResponderGrant = (e, gestureState) => {
    this.setState({dragging: true})
  }

  // Every time the touch/mouse moves
  handlePanResponderMove = (e, gestureState) => {

    // Keep track of how far we've moved in total (dx and dy)
    this.setState({
      offsetTop: gestureState.dy,
      offsetLeft: gestureState.dx,
    })
    // fetch("http://math.seattleacademy.org:1569?x="+(gestureState.dx)+"&y="+gestureState.dy)
    console.log(gestureState.dy, gestureState.dx, Math.atan2(gestureState.dy, gestureState.dx))
    fetch("https://bot3.seattleacademy.software/drive?left="+((gestureState.dy)*-2)+"&right="+(gestureState.dy)*-2).then({})
    //move right

    if (gestureState.dx > 50) {
    // fetch("https://bot3.seattleacademy.software/drive?left="+((gestureState.dy)*0)+"&right="+(gestureState.dy)*0).then({})
    fetch("https://bot3.seattleacademy.software/drive?left="+((gestureState.dx)*2)+"&right="+(gestureState.dx)*-2).then({})
  }

    if (gestureState.dx < -50) {
    // fetch("https://bot3.seattleacademy.software/drive?left="+((gestureState.dy)*0)+"&right="+(gestureState.dy)*0).then({})
    fetch("https://bot3.seattleacademy.software/drive?left="+((gestureState.dx)*2)+"&right="+(gestureState.dx)*-2).then({})
  }

  //   if(gesutreState.dx,gestureState.dy > 100)
  //         fetch("https://bot3.seattleacademy.software/drive?left="+((gestureState.dx)*0)+"&right="+(gestureState.dx)*0).then({})
}
  // }





  // When the touch/mouse is lifted
  handlePanResponderEnd = (e, gestureState) => {
    const {initialTop, initialLeft} = this.state

    // The drag is finished. Set the initialTop and initialLeft so that
    // the new position sticks. Reset offsetTop and offsetLeft for the next drag.
    this.setState({
      dragging: false,
      initialTop: initialTop + gestureState.dy,
      initialLeft: initialLeft + gestureState.dx,
      offsetTop: 0,
      offsetLeft: 0,
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  square: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 12,
  }
})



