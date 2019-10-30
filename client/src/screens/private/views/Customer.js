import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';

import colors from '../../../config/colors';
import strings from '../../../config/strings';

import {METHOD_GET, METHOD_POST, METHOD_PUT} from '../../../config/constants';

import {setHeaderAuth} from '../../../config/api';
import {getAuthKey} from '../../../config/auth';
import fetchCustomers from '../../../_store/customers';
import Error from '../../../components/error';
import Loading from '../../../components/loading';

class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerId: null,
      customerName: null,
      customerIdNum: null,
      customerPhoneNum: null,
      dialogVisible: false,
      isEdit: false,
    };
  }

  showDialog = dialogVisible => {
    this.setState({dialogVisible});
  };

  handleCustomerEdit = (isEdit, customerId) => {
    this.setState({isEdit, customerId});
  };

  handleChangeName = customerName => {
    this.setState({customerName});
  };

  handleChangeIdNum = customerIdNum => {
    this.setState({customerIdNum});
  };

  handleChangePhoneNum = customerPhoneNum => {
    this.setState({customerPhoneNum});
  };

  handleGetCustomers = async () => {
    try {
      const user = await getAuthKey();
      setHeaderAuth(user.token);
      this.props.fetchCustomers(METHOD_GET, user.id);
    } catch (error) {
      console.log(error);
    }
  };

  handleAddCustomer = async customerData => {
    try {
      const user = await getAuthKey();
      this.showDialog(false);
      this.props.fetchCustomers(METHOD_POST, user.id, customerData);
    } catch (error) {
      console.log(error);
    }
  };

  handleEditCustomer = async (customerData, customerId) => {
    try {
      const user = await getAuthKey();
      this.showDialog(false);
      this.props.fetchCustomers(METHOD_PUT, user.id, customerData, customerId);
    } catch (error) {
      console.log(error);
    }
  };

  renderFloatBtn = () => {
    return (
      <TouchableOpacity
        style={styles.floatBtn}
        onPress={() => {
          this.handleChangeName(null);
          this.handleChangeIdNum(null);
          this.handleChangePhoneNum(null);
          this.handleCustomerEdit(false);
          this.showDialog(true);
        }}>
        <Icon name="plus" size={25} color={colors.WHITE} />
      </TouchableOpacity>
    );
  };

  showCustomers = customer => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.handleChangeName(customer.name);
          this.handleChangeIdNum(customer.identity_number);
          this.handleChangePhoneNum(customer.phone_number);
          this.handleCustomerEdit(true, customer.id);
          this.showDialog(true);
        }}>
        <View style={styles.customerCont}>
          <Icon name="user-circle-o" size={50} />
          <View>
            <Text style={styles.customerText}>{customer.name}</Text>
            <Text style={styles.customerText}>{customer.identity_number}</Text>
            <Text style={styles.customerText}>{customer.phone_number}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  renderSub = customers => {
    return (
      <FlatList
        data={customers}
        renderItem={({item}) => this.showCustomers(item)}
        keyExtractor={item => item.id.toString()}
        onRefresh={() => this.handleGetCustomers()}
        refreshing={false}
      />
    );
  };

  render() {
    const {customers} = this.props;

    if (customers.error) {
      return (
        <Error message={customers.error} onPress={this.handleGetCustomers} />
      );
    }

    if (customers.isLoading && !customers.isPost) return <Loading />;

    return (
      <SafeAreaView style={styles.container}>
        {this.renderSub(customers.data)}
        {this.renderFloatBtn()}
        {/* <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title>
            {this.state.isEdit ? 'Edit Customer' : 'Add Customer'}
          </Dialog.Title>
          <Dialog.Input
            label="Name*"
            onChangeText={text => this.handleChangeName(text)}
            value={this.state.customerName}
            style={styles.formInput}
          />
          <Dialog.Input
            label="Identity Number*"
            onChangeText={text => this.handleChangeIdNum(text)}
            value={this.state.customerIdNum}
            style={styles.formInput}
          />
          <Dialog.Input
            label="Phone Number*"
            onChangeText={text => this.handleChangePhoneNum(text)}
            value={this.state.customerPhoneNum}
            style={styles.formInput}
          />
          <Dialog.Button
            label="Cancel"
            onPress={() => this.showDialog(false)}
          />
          <Dialog.Button
            label="Submit"
            onPress={() => {
              const data = {
                name: this.state.customerName,
                identity_number: this.state.customerIdNum,
                phone_number: this.state.customerPhoneNum,
                image: '',
              };
              this.state.isEdit
                ? this.handleEditCustomer(data, this.state.customerId)
                : this.handleAddCustomer(data);
            }}
          />
        </Dialog.Container> */}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    customers: state.customers,
  };
};

const mapDispatchToProps = {
  fetchCustomers,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Customer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  customerCont: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    borderWidth: 4,
    borderRadius: 8,
    margin: 10,
  },
  customerText: {
    fontFamily: strings.FONT,
    fontSize: 20,
    marginLeft: 10,
    marginBottom: 5,
  },
  floatBtn: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: 50,
    height: 50,
    bottom: 20,
    right: 20,
    backgroundColor: colors.DARK_GREEN,
    borderRadius: 100,
  },
  formInput: {
    borderWidth: 1,
  },
});
