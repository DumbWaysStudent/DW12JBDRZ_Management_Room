import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from 'react-native';
import {Picker} from 'native-base';
import {connect} from 'react-redux';

import Modal from 'react-native-modal';
import CountDown from 'react-native-countdown-component';

import colors from '../../../config/colors';
import strings from '../../../config/strings';

import {METHOD_GET, METHOD_POST, METHOD_PUT} from '../../../config/constants';

import {setHeaderAuth} from '../../../config/api';
import {getAuthKey} from '../../../config/auth';
import {getTimeDiffMin, getTimeDiffSec} from '../../../config/utils';
import fetchRooms from '../../../_store/rooms';
import fetchCustomers from '../../../_store/customers';
import fetchCheckin from '../../../_store/checkin';
import Error from '../../../components/error';
import Loading from '../../../components/loading';

import background from '../../../assets/images/background.jpg';

class Checkin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room_id: null,
      customer_id: null,
      order_id: null,
      roomName: null,
      customerName: null,
      duration: null,
      isCheckout: false,
      modalVisible: false,
    };
  }

  componentDidMount() {
    this.handleGetCheckin();
  }

  toogleModal = () => {
    this.setState({modalVisible: !this.state.modalVisible});
  };

  handleGetCheckin = async () => {
    try {
      const user = await getAuthKey();
      setHeaderAuth(user.token);
      this.props.fetchRooms(METHOD_GET, user.id);
      this.props.fetchCustomers(METHOD_GET, user.id);
      this.props.fetchCheckin(METHOD_GET, user.id);
    } catch (error) {
      console.log(error);
    }
  };

  handleAddCheckin = async orderData => {
    try {
      const user = await getAuthKey();
      this.toogleModal();
      this.props.fetchCheckin(METHOD_POST, user.id, orderData);
    } catch (error) {
      console.log(error);
    }
  };

  handleAddCheckout = async (order_id, auto) => {
    try {
      const user = await getAuthKey();
      if (!auto) this.toogleModal();
      this.props.fetchCheckin(METHOD_PUT, user.id, null, order_id);
    } catch (error) {
      console.log(error);
    }
  };

  handleResetState = () => {
    this.setState({
      room_id: null,
      customer_id: null,
      order_id: null,
      roomName: null,
      customerName: null,
      duration: null,
      isCheckout: false,
    });
  };

  showTimer = room => {
    const {order} = room;
    const isCheckout = order && order.is_booked ? true : false;

    if (isCheckout) {
      const date = new Date(order.order_end_time);
      const duration = getTimeDiffSec(date);

      return (
        <View style={styles.timerCont}>
          <CountDown
            until={duration}
            size={8}
            onFinish={() => this.handleAddCheckout(order.id, true)}
            digitStyle={{
              backgroundColor: colors.WHITE,
            }}
            digitTxtStyle={{
              color: colors.BLACK,
              fontFamily: strings.FONT_BOLD,
            }}
            timeToShow={['M', 'S']}
            timeLabels={{m: null, s: null}}
          />
        </View>
      );
    }
    return;
  };

  showCheckin = room => {
    const roomStyle = [
      styles.roomCont,
      room.order && room.order.is_booked
        ? styles.roomUnAvail
        : styles.roomAvail,
    ];

    return (
      <TouchableOpacity
        onPress={() => {
          const {customer, order} = room;
          const customer_id = customer ? customer.id : null;
          const order_id = order ? order.id : null;
          const isCheckout = order && order.is_booked ? true : false;
          let duration = null;

          if (isCheckout) {
            const date = new Date(order.order_end_time);

            duration = getTimeDiffMin(date);
          }

          this.handleResetState();
          this.setState({
            room_id: room.id,
            customer_id,
            order_id,
            roomName: room.name,
            duration,
            isCheckout,
          });
          this.toogleModal();
        }}>
        <View style={roomStyle}>
          {this.showTimer(room)}
          <View style={styles.roomNameCont}>
            <Text style={styles.roomName}>{room.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  renderHeader = () => {
    return (
      <View style={styles.headerCont}>
        <Text style={styles.headerText}>{strings.CHKINCFG}</Text>
      </View>
    );
  };

  renderSub = checkin => {
    return (
      <FlatList
        data={checkin}
        renderItem={({item}) => this.showCheckin(item)}
        keyExtractor={item => item.id.toString()}
        numColumns={3}
        ListHeaderComponent={this.renderHeader()}
        showsVerticalScrollIndicator={false}
        onRefresh={() => this.handleGetCheckin()}
        refreshing={false}
      />
    );
  };

  showModal = () => {
    const {customers} = this.props;

    return (
      <Modal isVisible={this.state.modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalTitleContainer}>
            <Text style={styles.inputTitle}>
              {this.state.isCheckout ? 'Checkout' : 'Checkin'}
            </Text>
          </View>
          <Text style={styles.inputLabel}>{strings.RNAME}</Text>
          <TextInput
            style={styles.textInput}
            value={this.state.roomName}
            editable={false}
          />
          <Text style={styles.inputLabel}>{strings.CNAME}</Text>
          <Picker
            mode="dropdown"
            selectedValue={
              this.state.customer_id ? this.state.customer_id : null
            }
            onValueChange={itemValue => {
              this.setState({customer_id: itemValue});
            }}
            enabled={this.state.isCheckout ? false : true}>
            {customers.data.map(customer => {
              return (
                <Picker.Item
                  key={customer.id.toString()}
                  label={customer.name}
                  value={customer.id}
                />
              );
            })}
          </Picker>
          <Text style={styles.inputLabel}>
            {this.state.isCheckout ? strings.DURATION2 : strings.DURATION}
          </Text>
          <TextInput
            style={styles.textInput}
            keyboardType="numeric"
            onChangeText={duration => this.setState({duration})}
            value={
              this.state.isCheckout ? this.state.duration.toString() : null
            }
            editable={this.state.isCheckout ? false : true}
          />
          <View style={styles.btnInputCont}>
            <TouchableOpacity onPress={() => this.toogleModal()}>
              <Text style={styles.btnCancel}>{strings.CANCEL}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                const {room_id, customer_id, order_id, duration} = this.state;

                if (!duration || isNaN(duration)) {
                  alert('Invalid duration.');
                  return;
                }

                const data = {
                  room_id,
                  customer_id,
                  duration,
                };

                this.state.isCheckout
                  ? this.handleAddCheckout(order_id, false)
                  : this.handleAddCheckin(data);
              }}>
              <Text style={styles.btnSubmit}>{strings.SUBMIT}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  render() {
    const {checkin} = this.props;

    if (checkin.error) {
      return <Error message={checkin.error} onPress={this.handleGetCheckin} />;
    }

    if (checkin.isLoading && !checkin.isPost) return <Loading />;

    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={background} style={styles.background}>
          {this.renderSub(checkin.data)}
          {this.showModal()}
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    customers: state.customers,
    checkin: state.checkin,
  };
};

const mapDispatchToProps = {
  fetchRooms,
  fetchCustomers,
  fetchCheckin,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Checkin);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  headerCont: {
    alignItems: 'center',
    marginVertical: 30,
  },
  headerText: {
    fontFamily: strings.FONT_BOLD,
    fontSize: 28,
    color: colors.DARK_BLUE,
  },
  roomCont: {
    flex: 1,
    padding: 5,
    margin: 5,
    minHeight: 100,
    maxHeight: 100,
    minWidth: 100,
    maxWidth: 100,
    borderRadius: 4,
    elevation: 5,
  },
  timerCont: {
    flex: 1,
    alignItems: 'flex-end',
  },
  roomNameCont: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  roomName: {
    fontFamily: strings.FONT_BOLD,
    fontSize: 12,
    color: colors.DARK_GREY,
  },
  formInput: {
    borderWidth: 1,
  },
  roomAvail: {
    backgroundColor: colors.GREEN,
  },
  roomUnAvail: {
    backgroundColor: colors.SILVER,
  },
  modalContainer: {
    padding: 20,
    backgroundColor: colors.WHITE,
  },
  modalTitleContainer: {
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  inputTitle: {
    fontFamily: strings.FONT_BOLD,
    fontSize: 25,
  },
  textInput: {
    backgroundColor: colors.WHITE,
    minHeight: 45,
    maxHeight: 45,
    borderWidth: 1,
    elevation: 4,
    fontFamily: strings.FONT,
    fontSize: 16,
    padding: 10,
    marginBottom: 10,
  },
  inputLabel: {
    fontFamily: strings.FONT_BOLD,
    fontSize: 16,
    marginBottom: 5,
  },
  btnInputCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  btnSubmit: {
    fontFamily: strings.FONT_BOLD,
    fontSize: 18,
    color: colors.BLUE,
  },
  btnCancel: {
    fontFamily: strings.FONT_BOLD,
    fontSize: 18,
    color: colors.TORCH_RED,
  },
  dropDownCont: {
    maxHeight: 55,
  },
  dropDown: {
    backgroundColor: colors.WHITE,
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    minHeight: 45,
    maxHeight: 45,
  },
  dropDownText: {
    fontFamily: strings.FONT,
    fontSize: 16,
  },
});
