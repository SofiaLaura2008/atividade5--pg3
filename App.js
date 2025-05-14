import React from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      cliente: null,
      categorias: [],
      doutores: [],
    };
  }

  componentDidMount() {
  Promise.all([
    fetch('http://localhost:3000/cliente').then(res => res.json()),
    fetch('http://localhost:3000/categorias').then(res => res.json()),
    fetch('http://localhost:3000/doutores').then(res => res.json()),
  ])
  .then(([cliente, categorias, doutores]) => {
    this.setState({ cliente, categorias, doutores });
  })
  .catch(error => console.error("Erro ao buscar dados:", error));
}


  updateSearch = (search) => {
    this.setState({ search });
  };

  render() {
    const { search, cliente, categorias, doutores } = this.state;

    return (
      <View style={{ flex: 1 }}>
        {/* Header */}
        <View style={{
          paddingTop: 40,
          paddingHorizontal: 16,
          paddingBottom: 16,
          backgroundColor: '#6C63FF',
        }}>
          {/* Top: ícone + barra de busca */}
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
            <Icon name="plane" size={40} color="#fff" />
            <View style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#fff',
              borderRadius: 20,
              marginHorizontal: 16,
              paddingHorizontal: 8,
              height: 40,
            }}>
              <Ionicons name="search" size={20} color="#aaa" style={{ marginRight: 8 }} />
              <TextInput
                style={{ flex: 1, fontSize: 16, color: '#333' }}
                placeholder="Search here ..."
                placeholderTextColor="#aaa"
                onChangeText={this.updateSearch}
                value={search}
              />
            </View>
          </View>

          {/* Cliente e notificação */}
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Avatar
                rounded
                size="medium"
                source={{
                  uri: cliente?.avatar || 'https://via.placeholder.com/150',
                }}
              />
              <View style={{ marginLeft: 12 }}>
                <Text style={{ color: '#fff', fontSize: 18 }}>Welcome!</Text>
                <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>
                  {cliente?.name || 'Loading...'}
                </Text>
              </View>
            </View>
            <Ionicons name="notifications" size={28} color="#fff" />
          </View>
        </View>

        {/* Categorias */}
        <View style={{ paddingHorizontal: 16, marginTop: 20 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 10 }}>Categorias</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categorias.map((cat) => (
              <View key={cat.id} style={{ marginRight: 16, alignItems: 'center' }}>
                <Icon name="circle" size={40} color="#6C63FF" />
                <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{cat.nome}</Text>
              </View>
            ))}

          </ScrollView>
        </View>

        {/* Título dos doutores */}
        <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 30, marginLeft: 16 }}>
          Top Doctors
        </Text>

        {/* Lista de Doutores */}
        <ScrollView style={{ marginTop: 10 }}>
          {doutores.map((doutor) => (
            <View key={doutor.id} style={{
              backgroundColor: '#e0e0e0',
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 20,
              margin: 16,
              padding: 10,
            }}>
              <Avatar rounded size="medium" source={{ uri: doutor.avatar }} />
              <View style={{ marginLeft: 12 }}>
                <Text style={{ color: '#000', fontSize: 18 }}>{doutor.name}</Text>
                <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold' }}>{doutor.specialty}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon name="star" size={20} color="#FFD700" />
                  <Text style={{ marginLeft: 8, fontSize: 16, color: '#555' }}>
                    {doutor.rating} ({doutor.reviews} Reviews)
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Footer */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          backgroundColor: '#6C63FF',
          paddingVertical: 10,
          marginTop: 20,
        }}>
          <View style={{ alignItems: 'center' }}>
            <Icon name="home" size={30} color="#fff" />
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 14 }}>Home</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Icon name="stethoscope" size={30} color="#fff" />
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 14 }}>Doctors</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Icon name="calendar" size={30} color="#fff" />
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 14 }}>Agenda</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Icon name="user" size={30} color="#fff" />
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 14 }}>Perfil</Text>
          </View>
        </View>
      </View>
    );
  }
}
