import React, {useState, useEffect} from 'react';
import {Text, View, SafeAreaView, Image, StyleSheet} from 'react-native';
import {LineChart} from 'react-native-chart-kit';

export default function DetailsScreen({route}) {
  const [detailedData, setDetailedData] = useState(null);
  const {id} = route.params;
  console.log(id);

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://www.postman.com/collections/d74162566f1f86f338b3',
      );
      if (!response.ok) {
        throw new Error('error');
      }
      const json = await response.json();
      const filteredDetailedData = json.item
        .filter(item => item.name === 'Collections')[0]
        .item.filter(item => item.name === 'Get Collection Details By ID')[0]
        .response[0].body;
      const parsedData = JSON.parse(filteredDetailedData);

      // const dataByID = parsedData.filter(datum => id === datum.id);

      // console.log(dataByID);

      console.log(666, parsedData);
      setDetailedData(parsedData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchChartData = async () => {
    try {
      const response = await fetch(
        'https://www.postman.com/collections/d74162566f1f86f338b3',
      );
      if (!response.ok) {
        throw new Error('error');
      }
      const json = await response.json();
      const filteredChartData = json.item
        .filter(item => item.name === 'Collection Stats')[0]
        .item.filter(
          item => item.name === 'Get Collection Stats By Collection ID',
        )[0].response[0].body;
      const parsedData = JSON.parse(filteredChartData);

      // const dataByID = parsedData.filter(datum => id === datum.id);

      // console.log(dataByID);

      console.log(666, parsedData);
      // setDetailedData(parsedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchChartData();
    // console.log(77, collectionData, 77);
  }, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'gray',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {detailedData && (
        <View style={styles.viewContainer}>
          <Image
            blurRadius={3}
            source={{
              uri: detailedData.banner_image_url,
            }}
            style={{
              flex: 1,
              height: 250,
              borderRadius: 10,
              alignItems: 'center',
            }}
          />
          <Text style={{flex: 1, backgroundColor: 'red'}}>
            {JSON.stringify(detailedData)}
          </Text>
          {/* <LineChart
            style={{
              flex: 1,
            }}
            data={data}
            verticalLabelRotation={30}
            chartConfig={chartConfig}
            bezier
          /> */}
          <Text style={{flex: 3, backgroundColor: 'red'}}>
            {JSON.stringify(detailedData)}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
