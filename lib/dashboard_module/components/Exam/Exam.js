import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import ExamCard from './ExamCard';
// import { getExamCatList } from "../../../../Api/examCatApi";
import getExamCatList from '../../controller/get_exam_cat_list_controller';
// import LoadingAnimation from "/home/user/Apps/ME/smt-react/lib/utility/constants/loader";
import LoadingAnimation from '../../../utility/constants/loader';

const Exam = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await getExamCatList();

      // Sort categories based on categoryNumber
      const sortedData = response.sort(
        (a, b) => a.categoryNumber - b.categoryNumber,
      );

      setCategoriesData(sortedData);
      setLoading(false);
    };

    if (categoriesData.length === 0) {
      fetchData();
    }
  }, [categoriesData]);

  return (
    <>
      {loading && <LoadingAnimation visible={loading} loop={true} />}

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.container}>
          {categoriesData.map(item => (
            <ExamCard key={item._id} item={item} />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flexDirection: 'row',
    display: 'flex',
    paddingVertical: 10,
  },
});

export default Exam;
