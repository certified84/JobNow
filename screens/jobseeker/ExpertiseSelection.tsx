import {
  Platform,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, SIZES, TYPOGRAPHY } from "../../theme";
import { Props } from "../../types";
import { useState } from "react";

const ExpertiseSelectionScreen: React.FC<Props> = ({ route, navigation }) => {
  const [selected, setSelected] = useState([-1]); // [0, 1, 2, 3, 4, 5, 6
  const skills = [
    "Accountancy",
    "Aerospace Engineering",
    "Architecture",
    "Banking",
    "Design",
    "Journalism",
    "Nursing",
  ];
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View
        style={{
          flex: 1,
          marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          paddingHorizontal: SIZES.md,
        }}
      >
        <TouchableOpacity
          style={{ padding: 8, paddingStart: 0 }}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons
            name={Platform.OS === "android" ? "arrow-back" : "arrow-back-ios"}
            size={24}
            color="black"
          />
        </TouchableOpacity>

        <FlatList
          ListHeaderComponent={() => (
            <View
              style={{ flex: 1, marginTop: SIZES.xl, alignItems: "center" }}
            >
              <Text style={{ ...TYPOGRAPHY.h1, fontSize: SIZES.lg }}>
                Expertise
              </Text>
              <Text style={{ ...TYPOGRAPHY.p, marginVertical: SIZES.xxs }}>
                Please select your field of expertise
              </Text>

              <View style={styles.line} />
            </View>
          )}
          style={{ width: "100%" }}
          data={skills}
          renderItem={({ item, index }) => {
            return (
              <Option
                title={item}
                isSelected={selected.includes(index)}
                onPress={() => {
                  if (selected.includes(index)) {
                    setSelected(selected.filter((item) => item !== index));
                  } else {
                    setSelected([...selected, index]);
                  }
                }}
              />
            );
          }}
          ListFooterComponent={() => (
            <TouchableOpacity
              activeOpacity={0.5}
              disabled={selected.length > 1}
              onPress={() => {}}
              style={{
                ...styles.btnContinue,
                opacity: selected.length <= 1 ? 0.5 : 1,
              }}
            >
              <Text style={{ ...TYPOGRAPHY.h2, color: COLORS.white }}>
                Continue
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

interface OptionProps {
  title: string;
  isSelected: boolean;
  onPress?: () => void;
}

const Option: React.FC<OptionProps> = ({ title, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      style={{
        ...styles.optionContainer,
        borderColor: isSelected ? "#3C8AFF" : "#F0F0F0",
      }}
    >
      <View
        style={{
          ...styles.checkBox,
          backgroundColor: isSelected ? "#3C8AFF" : "white",
          borderWidth: isSelected ? 0 : 2,
        }}
      >
        <MaterialCommunityIcons name="check" size={14} color="white" />
      </View>
      <Text style={{ ...TYPOGRAPHY.h2, marginStart: SIZES.xxs }}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ExpertiseSelectionScreen;

const styles = StyleSheet.create({
  line: {
    height: 1,
    width: "100%",
    backgroundColor: COLORS.lightGray,
    marginVertical: SIZES.sm,
  },
  btnContinue: {
    marginVertical: SIZES.xl,
    padding: SIZES.sm,
    backgroundColor: "#1472FF",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.md,
  },
  optionContainer: {
    flexDirection: "row",
    width: "100%",
    padding: SIZES.md,
    borderWidth: 2,
    borderRadius: SIZES.xxs,
    borderStartWidth: 2,
    alignItems: "center",
    marginBottom: SIZES.sm,
  },
  checkBox: {
    padding: 2,
    borderColor: "#3C8AFF",
    borderRadius: 4,
  },
});
