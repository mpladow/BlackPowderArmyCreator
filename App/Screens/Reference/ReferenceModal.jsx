import { StyleSheet, Text, View, FlatList, SectionList } from "react-native";
import React, { useEffect, useState } from "react";
import Heading from "../../Components/Atoms/Heading";
import { useReferenceContext } from "../../Contexts/ReferenceContext";
import OneTwoTemplate from "./Templates/OneTwoTemplate";
import TwoOneTemplate from "./Templates/TwoOneTemplate";
import OneOneTemplate from "./Templates/OneOneTemplate";

const ReferenceModal = ({ category }) => {
  const referenceContext = useReferenceContext();
  const [categoryReferences, setCategoryReferences] = useState([]);
  const [subCategoryReferences, setSubCategoryReferences] = useState([]);
  useEffect(() => {
    // get references
    let _references = referenceContext.references.filter(
      (item) => item.category === category
    );
    
     console.log(_references, `REFERENCES FOR CATEGORY ${category}`);
    setCategoryReferences(_references);
    // console.log(categoryReferences);
    if (_references.length > 0) {
      let grouped = _references[0].rows.reduce((group, item) => {
        const { heading } = item;
        group[heading] = group[heading] ?? [];
        group[heading].push(item);
        return group;
      }, {});
      setSubCategoryReferences(grouped);
      console.log(_references, 'GROUPED')
    }
  }, []);
  const renderRows = (item) => {
    // console.log(item, 'ITEM')
    switch (item.template) {
      case "one-two":
        return <OneTwoTemplate item={item} />;
        break;
        case "two-one":
          return <TwoOneTemplate item={item} />;
          break;
          case "one-one":
            return <OneOneTemplate item={item} />;
            break;
      default:
        return <OneOneTemplate item={item} />;
        break;
    }
  };
  return (
    <View>
      {Object.keys(subCategoryReferences).map((item, index) => {
        return (
          <FlatList
          ListHeaderComponent={(x) => (item !== 'none' && <View style={{paddingVertical: 8}}><Heading>{item}</Heading></View>)}
            keyExtractor={(item, index) => item+(index.toString()+Math.random().toString())}
            data={subCategoryReferences[item]}
            renderItem={(item) => renderRows(item.item)}
          />
        );

      })}

      <View></View>
    </View>
  );
};

export default ReferenceModal;

const styles = StyleSheet.create({});
