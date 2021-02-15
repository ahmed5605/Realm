import React, { Component } from 'react';
import { View, TextInput,FlatList,Text, Alert, ScrollView, Button, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext';
import Mytextinput from './components/Mytextinput';
import AwesomeAlert from 'react-native-awesome-alerts';
class MyClass extends Component {

  constructor(props){
    super(props);
   
    this.state = {
      FlatListItems: [],
      textInput : [],
      inputData : [],
      apple: ""
    };
    realm = new Realm({
      path: 'UserDatabase.realm',
      schema: [
        {
          name: 'user_details',
          properties: {
            user_id: { type: 'int', default: 0 },
            user_name: 'string',
            user_contact: 'string',
            user_address: 'string',
          },
        },
      ],
    });

    var user_details = realm.objects('user_details');
    this.state = {
      FlatListItems: user_details,
      textInput : [],
      inputData : [],
      input_user_id: '',
      user_name: '',
      user_contact: '',
      user_address: '',
      showAlert: false,
      value: ''
    };

   
  }



  refresh(){
    console.log("refreeeesss")
    this.props.navigation.addListener('didFocus', () => {
      var user_details = realm.objects('user_details');
     this.setState({   FlatListItems: user_details})
  
    });
  }  

  componentWillMount(){
    this.refresh()
    }


  delete = (id) => {
    console.log(id)

    var that = this;
   
    realm.write(() => {
      var ID = id;
      if (
        realm.objects('user_details').filtered('user_id =' + id)
          .length > 0
      ) {
        realm.delete(
          realm.objects('user_details').filtered('user_id =' + id)
        );
        var user_details = realm.objects('user_details');
        console.log(user_details)
       

        var user_details = realm.objects('user_details');
        this.setState({   FlatListItems: user_details})

        Alert.alert(
          'Success',
          'Deleted successfully',
          [
            {
              text: 'Ok',
              onPress: () => this.refresh()
            },
          ],
          { cancelable: false }
        );
      } else {
        alert('Please insert a valid User Id');
      }
    });
  }




  passData(id, name, contact, address){

    this.setState({
        showAlert: true, 
        user_name: name, 
        user_id: id, 
        user_contact: contact, 
        user_address: address
      })
  }


  updateUser = () => {
    var that = this;
    const { user_id } = this.state;
    const { user_name } = this.state;
    const { user_contact } = this.state;
    const { user_address } = this.state;
    if (user_id) {
      if (user_name) {
        if (user_contact) {
          if (user_address) {
            realm.write(() => {
              var ID = this.state.user_id;
              console.log('ID', ID);
              var obj = realm
                .objects('user_details')
                .filtered('user_id =' + this.state.user_id);
              console.log('obj', obj);
              if (obj.length > 0) {
                obj[0].user_name = this.state.user_name;
                obj[0].user_contact = this.state.user_contact;
                obj[0].user_address = this.state.user_address;
                Alert.alert(
                  'Success',
                  'Updated successfully',
                  [
                    {
                      text: 'Ok',
                      onPress: () =>
                        that.props.navigation.navigate('HomeScreen'),
                    },
                  ],
                  { cancelable: false }
                );
                this.hideAlert();
              } else {
                alert('Updation Failed');
              }
            });
          } else {
            alert('Please fill Address');
          }
        } else {
          alert('Please fill Contact Number');
        }
      } else {
        alert('Please fill Name');
      }
    } else {
      alert('Please fill User Id');
    }


  };


  rendercustomView = () => {
   
     return(
       <View>
         
            <TextInput
              style={{width: 200, borderWidth: 1, borderColor: 'black'}}
               placeholder="Enter Name"
               value={this.state.user_name}
               onChangeText={user_name => this.setState({ user_name })}
             />
             <TextInput
              style={{width: 200, borderWidth: 1, borderColor: 'black', marginTop: 20}}
               placeholder="Enter Contact No"
               value={this.state.user_contact}
               onChangeText={user_contact => this.setState({ user_contact })}
               
             />
             <TextInput
              style={{width: 200, borderWidth: 1, borderColor: 'black', marginTop: 20}}
               value={this.state.user_address}
               placeholder="Enter Address"
               onChangeText={user_address => this.setState({ user_address })}
               
             />
 
       </View>
     );
   }
   
 onChangeText = value => {
    console.log("id is : "+this.state.user_id)
    
    var that = this;
    
    this.setState({ user_name: value})
    realm.write(() => {
     
     var obj = realm
       .objects('user_details')
       .filtered('user_id =' + this.state.user_id);
        console.log('obj', obj);
        if (obj.length > 0) {
          obj[0].user_name = this.state.user_name;
          obj[0].user_contact = this.state.user_contact;
          obj[0].user_address = this.state.user_address;
        
     } else {
       alert('Updation Failed');
     }
   });
   
 }

  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };
  
  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };



  render(){

    return(
      
      <ScrollView>
      
       <View>
               <View style={{  flexDirection: 'row' }}>
                  
                  <TouchableOpacity  style={{fontSize: 22, borderColor: 'black', borderWidth:1, width: 40, height: 40,justifyContent: 'center', alignItems: 'center' }} onPress={() => this.delete(item.user_id)}>
                      <Text style={{fontSize: 28, }} > </Text>
                  </TouchableOpacity>

                 

                  <TouchableOpacity  style={{fontSize: 22, borderColor: 'black', borderWidth:1, width: 120, height: 40,justifyContent: 'center', alignItems: 'center' }} >
                    <Text style={{fontSize: 22,}} >Column 1</Text>
                  </TouchableOpacity>

                  <TouchableOpacity   style={{fontSize: 22, borderColor: 'black', borderWidth:1, width: 120, height: 40,justifyContent: 'center', alignItems: 'center' }} >
                  <Text style={{fontSize: 22,}} >Column 2</Text>
                  </TouchableOpacity>

                  <TouchableOpacity   style={{fontSize: 22, borderColor: 'black', borderWidth:1,flex: 1 ,width: 40, height: 40,justifyContent: 'center', alignItems: 'center' }} >
                        <Text style={{fontSize: 22,}} >Column 3</Text>
                  </TouchableOpacity>
              
              </View>

                <FlatList
                    data={this.state.FlatListItems}
                    ItemSeparatorComponent={this.ListViewItemSeparator}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                    <View >
                          

                          <View style={{  flexDirection: 'row' }}>
                          
                            <TouchableOpacity  style={{fontSize: 22, borderColor: 'black', borderWidth:1, width: 40, height: 40,justifyContent: 'center', alignItems: 'center' }} onPress={() => this.delete(item.user_id)}>
                                <Text style={{fontSize: 28, }} >X</Text>
                            </TouchableOpacity>


                            <TouchableOpacity onPress={() => this.passData(item.user_id, item.user_name,  item.user_contact, item.user_address)} style={{fontSize: 22, borderColor: 'black', borderWidth:1, width: 120, height: 40,justifyContent: 'center', alignItems: 'center' }} >
                              <Text style={{fontSize: 20,}} > {item.user_name}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.passData(item.user_id,item.user_name, item.user_contact, item.user_address)}  style={{fontSize: 22, borderColor: 'black', borderWidth:1, width: 120, height: 40,justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={{fontSize: 20,}} >{item.user_contact}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.passData(item.user_id,item.user_name, item.user_contact, item.user_address)}  style={{fontSize: 22, borderColor: 'black', borderWidth:1,flex: 1 ,width: 40, height: 40,justifyContent: 'center', alignItems: 'center' }} >
                                  <Text style={{fontSize: 20,}} >{item.user_address}</Text>
                            </TouchableOpacity>

                            
                          </View>
                      </View>
                    )}
                  />
          </View>
        
      
            
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 30}} >
                  <TouchableOpacity 
                  // onPress={() => this.props.navigation.navigate('HomeScreen')} 
                   style={{borderRadius: 10, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: "black", height: 50, width: 120, marginRight: 50}} >
                          <Text>Edit Column</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')} style={{borderRadius: 10, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: "black", height: 50, width: 120}} >
                          <Text>Add Row</Text>
                    </TouchableOpacity>
              </View>



              <AwesomeAlert
                          customView={this.rendercustomView()}
                          show={this.state.showAlert}
                          showProgress={false}
                          title="Update Value"
                          closeOnTouchOutside={false}
                          closeOnHardwareBackPress={false}
                          showCancelButton={true}
                          showConfirmButton={true}
                          confirmText="Save"
                          confirmButtonColor="#f3224d"
                          confirmButtonStyle={{borderRadius: 20, height: 40, width: 100,  justifyContent: 'center', alignItems: 'center'}}
                          cancelButtonColor="#f3224d"
                          cancelButtonStyle={{borderRadius: 20, height: 40, width: 100,  justifyContent: 'center', alignItems: 'center'}}
                          
                          titleStyle={{color: 'black'}}
                          onConfirmPressed={() => {this.updateUser();}}
                          onCancelPressed={() => {this.hideAlert();}}
                          
                      />
     
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  buttonView: {
  flexDirection: 'row'
  },
  textInput: {
  height: 40,
  borderColor: 'black', 
  borderWidth: 1,
  margin: 20
},
row:{
  flexDirection: 'row',
  justifyContent: 'center'
  },
});

export default MyClass;