import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SIZES, COLORS, TYPOGRAPHY } from "../../../../theme";
import { Job } from "../../../../data/models/Job";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { TextInput } from "react-native-paper";

interface RequirementsTabProps {
  // job: Job;
}

const RequirementsTab: React.FC<RequirementsTabProps> = ({}) => {
  const [requirements, setRequirements] = useState([
    { text: "", editable: true },
  ]);
  useEffect(() => console.log(requirements.length), [requirements]);
  return (
    <ScrollView style={{ margin: SIZES.md }}>
      <Text style={{ ...TYPOGRAPHY.h4 }}>Qualifications</Text>
      {/* {job.requirements.map((requirement, index) => (
        <View key={index} style={{ flexDirection: "row" }}>
          <Text style={styles.text}>{`   \u2022   `}</Text>
          <Text style={styles.text}>{requirement}</Text>
        </View>
      ))} */}

      {requirements.map((item, index) => (
        <View
          key={index}
          style={{
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: SIZES.xl,
            overflow: "hidden",
            flexDirection: "row",
            marginTop: SIZES.sm,
            paddingHorizontal: SIZES.md,
            paddingBottom: 6,
            alignItems: "center",
          }}
        >
          <Ionicons
            name="checkmark-circle-outline"
            size={SIZES.lg}
            color={COLORS.primary}
            style={{ marginTop: SIZES.xs }}
          />
          <TextInput
            placeholder=""
            theme={{ roundness: SIZES.xs }}
            style={{ flex: 1, backgroundColor: COLORS.white }}
            mode="outlined"
            outlineColor="transparent"
            activeOutlineColor={"transparent"}
            selectionColor="#555555"
            // textColor={"#555555"}
            // value={text}
            // onChangeText={setText}
          />
        </View>
      ))}

      <TouchableOpacity
        style={{
          borderWidth: 2,
          borderColor: COLORS.primary,
          borderRadius: SIZES.lg,
          padding: SIZES.sm,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: SIZES.xl,
        }}
        onPress={() => {
          let newRequirements = requirements;
          newRequirements.push({ text: "", editable: true });
          setRequirements(newRequirements);
          console.log(newRequirements.length)
        }}
      >
        <Ionicons name="add-circle" size={SIZES.xl} color={COLORS.primary} />
        <Text
          style={{
            ...TYPOGRAPHY.h4,
            color: COLORS.primary,
            marginStart: SIZES.xxs,
          }}
        >
          Add new requirements
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default RequirementsTab;

const styles = StyleSheet.create({
  text: { ...TYPOGRAPHY.h5, marginVertical: SIZES.xxs },
});
