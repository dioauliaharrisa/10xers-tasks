import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import Infobar from '../../components/Infobar';

export default function DetailsScreen({route}) {
  const [detailedData, setDetailedData] = useState(null);
  const [XchartData, setXChartData] = useState(null);
  const [YchartData, setYChartData] = useState(null);

  // for props to infobar
  const [propItems, setPropsItems] = useState(null);
  const [propFloor, setPropFloor] = useState(null);
  const [propTotalFloor, setPropTotalFloor] = useState(null);
  const [prop1Day, setProp1Day] = useState(null);

  const {id} = route.params;
  const screenWidth = Dimensions.get('window').width;

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
      // console.log(parsedData);
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
      const XData = [];
      const YData = [];
      parsedData.forEach(datum => {
        // console.log(datum);
        XData.push(datum.timestamp);
        YData.push(datum.floor_price_eth);
      });
      // setXChartData(XData.slice(0, 7));
      // setYChartData(YData.slice(0, 7));
      setPropFloor(parsedData[id].floor_price_eth);
      console.log(666, parsedData);
      // console.log(XchartData.length);
      // setXChartData(parsedData);
    } catch (error) {
      console.log(error);
    }
  };

  const XDummyChartData = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
  ];
  const YDummyChartData = [
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
  ];

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
          <Text style={{flex: 1, backgroundColor: 'hsl(212,43%,95%)'}}>
            {JSON.stringify(detailedData)}
          </Text>
          {XchartData && YchartData && (
            <LineChart
              data={{
                labels: YchartData,
                datasets: [
                  {
                    data: XchartData,
                  },
                ],
              }}
              width={Dimensions.get('window').width} // from react-native
              height={220}
              yAxisInterval={1}
              chartConfig={{
                backgroundColor: '#f7f7f7',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#ffa726',
                },
              }}
              bezier
            />
          )}
          {/* {!XchartData && !YchartData && (
            <LineChart
              data={{
                labels: YDummyChartData,
                datasets: [
                  {
                    data: XDummyChartData,
                  },
                ],
              }}
              width={Dimensions.get('window').width} // from react-native
              height={220}
              yAxisInterval={1}
              chartConfig={{
                backgroundColor: '#f7f7f7',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#ffa726',
                },
              }}
              bezier
            />
          )} */}
          <Infobar floor={propFloor} style={{flex: 2}} />
          <Text style={{flex: 3, backgroundColor: 'hsl(212,43%,95%)'}}>
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
