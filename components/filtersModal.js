import { View, Text, StyleSheet, Platform, Pressable } from "react-native";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useMemo, forwardRef } from "react";
import { BlurView } from "expo-blur";
import Animated, {
  Extrapolation,
  FadeInDown,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { hp } from "../helpers/common";
import { theme } from "../constants/theme";
import { SectionView, CommonFiltersRow } from "./filterViews";
import { capilatize } from "../helpers/common";
import { data } from "../constants/data";
import { ColorFilter } from "./filterViews";

const FiltersModal = forwardRef((props, ref) => {
  const { filters, setFilters, onClose, onApply, onReset } = props;
  const snapPoints = useMemo(() => ["75%"], []);
  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={CustomBackdrop}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.content}>
          <Text style={styles.filterText}>Filters</Text>
          {Object.keys(sections).map((sectionName, index) => {
            let sectionView = sections[sectionName];
            let sectionData = data.filters[sectionName];
            let title = capilatize(sectionName);
            return (
              <Animated.View
                entering={FadeInDown.delay(index * 100 + 100)
                  .springify()
                  .damping(11)}
                key={sectionName}
              >
                <SectionView
                  title={title}
                  content={sectionView({
                    data: sectionData,
                    filters,
                    setFilters,
                    filterName: sectionName,
                  })}
                />
              </Animated.View>
            );
          })}
        </View>

        <Animated.View
          entering={FadeInDown.delay(500)
            .springify()
            .damping(11)}
          style={styles.buttons}
        >
          <Pressable style={styles.resetButton} onPress={onReset}>
            <Text
              style={[styles.buttonText, { color: theme.colors.neutral(0.9) }]}
            >
              Reset
            </Text>
          </Pressable>
          <Pressable style={styles.applyButton} onPress={onApply}>
            <Text style={[styles.buttonText, { color: theme.colors.white }]}>
              Apply
            </Text>
          </Pressable>
        </Animated.View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

const sections = {
  order: (props) => <CommonFiltersRow {...props} />,
  orientation: (props) => <CommonFiltersRow {...props} />,
  type: (props) => <CommonFiltersRow {...props} />,
  colors: (props) => <ColorFilter {...props} />,
};

const CustomBackdrop = ({ animatedIndex, style }) => {
  const containerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 1],
      Extrapolation.CLAMP
    );
    return { opacity };
  });

  const containerStyle = [
    StyleSheet.absoluteFill,
    style,
    styles.overlay,
    containerAnimatedStyle,
  ];

  return (
    <Animated.View style={containerStyle}>
      {Platform.OS === "ios" ? (
        <BlurView style={StyleSheet.absoluteFill} tint="dark" intensity={25} />
      ) : (
        <View style={[StyleSheet.absoluteFill, styles.androidOverlay]} />
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  androidOverlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  content: {
    // flex: 1,
    width: "100%",
    gap: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  filterText: {
    fontSize: hp(4),
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.neutral(0.8),
    marginBottom: 5,
  },
  buttons: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  applyButton: {
    flex: 1,
    backgroundColor: theme.colors.neutral(0.8),
    padding: 12,
    borderRadius: theme.radius.md,
    alignItems: "center",
    justifyContent: "center",
    borderCurve: "continuous",
  },
  resetButton: {
    flex: 1,
    backgroundColor: theme.colors.white,
    padding: 12,
    borderRadius: theme.radius.md,
    alignItems: "center",
    justifyContent: "center",
    borderCurve: "continuous",
    borderWidth: 2,
    borderColor: theme.colors.greyBG,
  },
  buttonText: {
    fontSize: hp(2.2),
    fontWeight: theme.fontWeights.medium,
    color: theme.colors.neutral(0.8),
  },
});

export default FiltersModal;
