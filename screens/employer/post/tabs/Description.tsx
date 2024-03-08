import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SIZES, TYPOGRAPHY, COLORS } from "../../../../theme";
import { TextInput } from "react-native-paper";
import { Job } from "../../../../data/models/Job";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

interface DescriptionTabProps {
  descripon: string;
  setDescription: (descripon: string) => void;
}

const DescriptionTab: React.FC<DescriptionTabProps> = ({
  descripon,
  setDescription,
}) => {
  const [text, setText] = useState(descripon);
  return (
    <ScrollView style={{ margin: SIZES.md }}>
      <Text style={{ ...TYPOGRAPHY.h4 }}>About this Job</Text>
      <View>
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
          value={text}
          onChangeText={setText}
        />
        <Ionicons
          name="checkmark-done-circle"
          size={SIZES.lg}
          style={{ position: "absolute", bottom: 4, right: 4, padding: 4 }}
          onPress={() => setDescription(text)}
        />
      </View>
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
