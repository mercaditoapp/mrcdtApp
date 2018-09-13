import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Image, ScrollView } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Recetas',
  };

   constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: null,
        }
    }
    componentDidMount() {
        return fetch('http://34.210.212.235:8080/mrcdtAPI/oauth/receta/findAll', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson
                })
            })
            .catch((error) => {
                console.log(error)
            });
    }
    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator />
                </View>
            )
        } else {
            let recetas = this.state.dataSource.map((val, key) => {
                return <Card
                    key={key}
                    style={styles.item}>
                    <Image
                        style={{ width: 200, height: 200 }}
                        source={{ uri: val.imagen }}
                    />
                    <Text>{val.nombre}</Text>
                    <Text>{val.descripcion}</Text>
                    <Text>$130.00 MXN</Text>
                </Card>
            });
            return (
                <ScrollView style={styles.container}>
                    {recetas}
                </ScrollView>
            );
        }
    }



}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    item: {
        flex: 1,
        margin: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    }
});