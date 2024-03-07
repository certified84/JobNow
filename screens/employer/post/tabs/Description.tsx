import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SIZES, TYPOGRAPHY, COLORS } from "../../../../theme";
import { TextInput } from "react-native-paper";
import { Job } from "../../../../data/models/Job";

interface DescriptionTabProps {
  descripon?: string;
  setDescripon?: (descripon: string) => void;
}

const DescriptionTab: React.FC<DescriptionTabProps> = ({
  descripon,
  setDescripon,
}) => {
  return (
    <ScrollView style={{ margin: SIZES.md }}>
      <Text style={{ ...TYPOGRAPHY.h4 }}>About this Job</Text>
      <TextInput
        placeholder=""
        theme={{ roundness: SIZES.xs }}
        style={{ ...styles.textInputField, minHeight: 150 }}
        mode="outlined"
        outlineColor="#555555"
        multiline
        activeOutlineColor={"#555555"}
        selectionColor="#555555"
        // textColor={"#555555"}
        value={descripon}
        onChangeText={(text) => {
          setDescripon!(text);
        }}
      />
    </ScrollView>
  );
};

export default DescriptionTab;

const styles = StyleSheet.create({
  textInputField: {
    backgroundColor: "#ECECEC",
    color: COLORS.black,
    marginTop: SIZES.xs,
  },
});
