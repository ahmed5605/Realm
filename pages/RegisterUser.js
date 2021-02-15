/*Screen to register the user*/
import React from 'react';
import { View, ScrollView, Text, TextInput, KeyboardAvoidingView, Alert, TouchableOpacity } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import Realm from 'realm';
let realm;

export default class RegisterUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_name: '',
      user_contact: '',
      user_address: '',
      textInput : [],
      inputData : [],
    };
    realm = new Realm({ path: 'UserDatabase.realm' });
  }

  register_user = () => {
    var that = this;
    const { user_name } = this.state;
    const { user_contact } = this.state;
    const { user_address } = this.state;
    if (user_name) {
      if (user_contact) {
        if (user_address) {
          realm.write(() => {
            var ID =
              realm.objects('user_details').sorted('user_id', true).length > 0
                ? realm.objects('user_details').sorted('user_id', true)[0]
                    .user_id + 1
                : 1;

                
            realm.create('user_details', {
              user_id: ID,
              user_name: that.state.user_name,
              user_contact: that.state.user_contact,
              user_address: that.state.user_address,
            });

            

            Alert.alert(
              'Success',
              'Row added successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => that.props.navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          });
        } else {
          alert('Please fill Column 3');
        }
      } else {
        alert('Please fill Column 2');
      }
    } else {
      alert('Please fill Column 1');
    }
  };


    
  render() {

    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps="handled">
      

          <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1, justifyContent: 'space-between' }}>
            <Text style={{ marginLeft: 35, fontSize: 22, marginTop: 20}} >Column 1</Text>
            <Mytextinput
              placeholder="Value"
              onChangeText={user_name => this.setState({ user_name })}
            />

            <Text style={{ marginLeft: 35, fontSize: 22, marginTop: 20}} >Column 2</Text>
            <Mytextinput
              placeholder="Value"
              onChangeText={user_contact => this.setState({ user_contact })}
             
              
            />

            <Text style={{ marginLeft: 35, fontSize: 22, marginTop: 20}} >Column 3</Text>
            <Mytextinput
              placeholder="Value"
              onChangeText={user_address => this.setState({ user_address })}
             
            />
           


          
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 50}} >
                  <TouchableOpacity  onPress={() => this.props.navigation.navigate('HomeScreen')}  style={{borderRadius: 10, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: "black", height: 50, width: 120, marginRight: 50}} >
                          <Text>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.register_user()} style={{borderRadius: 10, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: "black", height: 50, width: 120}} >
                          <Text>Save</Text>
                    </TouchableOpacity>
              </View>
        

          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}