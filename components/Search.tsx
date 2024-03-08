import { TextInput } from "react-native-paper";
import { SIZES, COLORS, TYPOGRAPHY } from "../theme";
import { Filter } from "../assets/svg/Home";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";

interface SearchProps {
  text: string;
  onChangeText?: (text: string) => void | null;
  placeHolder: string;
  borderColor?: string | null;
  activeBorderColor?: string | null;
  selectionColor?: string | null;
  style?: ViewStyle | null
}

const Search: React.FC<SearchProps> = ({
  text,
  onChangeText,
  placeHolder,
  borderColor,
  activeBorderColor,
  selectionColor,
  style
}) => (
  <TextInput
    placeholder={placeHolder}
    theme={{ roundness: SIZES.xs }}
    left={
      <TextInput.Icon
        icon={() => (
          <Ionicons name="search-outline" size={SIZES.md} color={"black"} />
        )}
        color={COLORS.primary}
      />
    }
    right={
      <TextInput.Icon
        icon={() => (
          <TouchableOpacity activeOpacity={0.5}>
            <Filter />
          </TouchableOpacity>
        )}
        color={COLORS.primary}
      />
    }
    style={{...styles.searchStyle, ...style}}
    mode="outlined"
    outlineColor={borderColor ?? "transparent"}
    activeOutlineColor={activeBorderColor ?? "transparent"}
    placeholderTextColor={"#ADADAF"}
    selectionColor={selectionColor ?? COLORS.black}
    value={text}
    onChangeText={onChangeText}
  />
);

export default Search;

const styles = StyleSheet.create({
  searchStyle: {
    backgroundColor: "white",
    color: COLORS.primary,
    marginTop: SIZES.xl,
  },
});
