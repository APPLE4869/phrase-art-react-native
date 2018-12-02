import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import * as SubcategoriesAction from "../../actions/subcategories";
import SubcategoryDTO from "../../models/dto/SubcategoryDTO";
import { State as RootState } from "../../reducers";
import * as PhrasesReducers from "../../reducers/phrases";
import { colors } from "../../styles";

interface Props {
  subcategory: SubcategoryDTO | undefined;
  fetchSubcategoryById: any;
  phrasesListStatus: PhrasesReducers.PhrasesListStatus;
}

interface State {}

class CategoryPanelOnList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const subcategoryId = this.props.phrasesListStatus.subcategoryId;
    if (subcategoryId) {
      this.props.fetchSubcategoryById(subcategoryId);
    }
  }

  render() {
    const { subcategory } = this.props;

    if (!subcategory) {
      return null;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.subcategoryName}>{subcategory.name}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colors.grayLevel5
  },
  subcategoryName: {
    fontSize: 18,
    paddingVertical: 15,
    paddingHorizontal: 15,
    color: colors.grayLevel2
  }
});

const mapStateToProps = (state: RootState) => ({
  subcategory: state.subcategories.subcategory,
  phrasesListStatus: state.phrases.phrasesListStatus
});

const mapDispatchToProps = {
  fetchSubcategoryById: SubcategoriesAction.fetchSubcategoryById
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(CategoryPanelOnList);
