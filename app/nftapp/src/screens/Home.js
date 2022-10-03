import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default function HomeScreen({navigation}) {
  const [collectionData, setCollectionData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://www.postman.com/collections/d74162566f1f86f338b3',
      );
      // console.log(`yoooo`);
      if (!response.ok) {
        throw new Error('error');
      }
      const json = await response.json();
      const filteredData = json.item
        .filter(item => item.name === 'Collections')[0]
        .item.filter(e => e.name === 'Get Collections')[0].response[0].body;
      const parsedData = JSON.parse(filteredData);

      setCollectionData(parsedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    // console.log(77, collectionData, 77);
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: 'red'}}>
      <ScrollView horizontal={true}>
        {collectionData &&
          collectionData.map((collection, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation.navigate('Details', {
                    id: collection.id,
                  })
                }
                style={styles.scrollViewContainer}>
                {/* <Text style={{backgroundColor: 'red'}}>
                  {JSON.stringify(collection)}
                </Text> */}
                <Image
                  source={{
                    uri: collection.image_url,
                  }}
                  style={{
                    width: 200,
                    height: 200,
                    borderRadius: 20,
                    alignItems: 'center',
                    margin: 5,
                  }}
                />
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
