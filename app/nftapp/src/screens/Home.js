import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';

export default function HomeScreen() {
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
    <View>
      {collectionData &&
        collectionData.map(collection => {
          return <Text>{collection.name}</Text>;
        })}
      <Text>Home Screen</Text>
      <Text>Home Screen</Text>
      <Text>Home Screen</Text>
      <Text>Home Screen</Text>
    </View>
  );
}
